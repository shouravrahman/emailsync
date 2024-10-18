import axios from "axios";
import { EmailMessage, SyncResponse, SyncUpdatedResponse } from "./types";

export class Account {
  private token: string;
  constructor(token: string) {
    this.token = token;
  }

  private async startSync() {
    const response = await axios.post("https://api.aurinko.io/v1/email/sync", {
      headers: {
        Authorization: `Bearer ${this.token}`,
      },
      params: {
        daysWithin: 5,
        bodyType: "html",
      },
    });
    console.log("startsync", response.data);
    return response.data;
  }

  async getUpdatedEmails({
    deltaToken,
    pageToken,
  }: {
    deltaToken?: string;
    pageToken?: string;
  }) {
    let params: Record<string, string> = {};
    if (deltaToken) params.deltaToken = deltaToken;
    if (pageToken) params.pageToken = pageToken;

    const response = await axios.get<SyncUpdatedResponse>(
      "https://api.aurinko.io/v1/email/sync/updated",
      {
        headers: {
          Authorization: `Bearer ${this.token}`,
        },
        params,
      },
    );
    console.log("getUpdatedEmails", response.data);
    return response.data;
  }

  async performInitalSync() {
    try {
      let syncResponse: SyncResponse = await this.startSync();
      console.log("syncResponse", syncResponse);
      while (!syncResponse.ready) {
        await new Promise((resolve) => setTimeout(resolve, 1000));
        syncResponse = await this.startSync();
      }
      //delta token
      let deltaToken: string = await syncResponse.syncUpdatedToken;
      console.log("deltaToken", deltaToken);
      let upadatedResponse = await this.getUpdatedEmails({
        deltaToken: deltaToken,
      });
      console.log("upadatedResponse", upadatedResponse);
      if (upadatedResponse.nextDeltaToken) {
        //sync complete
        deltaToken = upadatedResponse.nextDeltaToken;
      }
      let allEmails: EmailMessage[] = upadatedResponse.records;

      //fetch all
      while (upadatedResponse.nextPageToken) {
        upadatedResponse = await this.getUpdatedEmails({
          pageToken: upadatedResponse.nextPageToken,
        });
        allEmails = allEmails.concat(upadatedResponse.records);
        if (upadatedResponse.nextDeltaToken) {
          //sync ended
          deltaToken = upadatedResponse.nextDeltaToken;
        }
      }

      console.log(`sync completed, we have synced`, allEmails.length, "emails");

      return {
        emails: allEmails,
        deltaToken,
      };
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.error(error.response?.data.error);
      }
      console.error(error);
    }
  }
}
