import { exchangeCodeForAccessToken, getAccountDetails } from "@/lib/aurinko";
import { db } from "@/server/db";
import { auth } from "@clerk/nextjs/server";
import { NextRequest, NextResponse } from "next/server";
import { waitUntil } from "@vercel/functions";
import axios from "axios";

export async function GET(req: NextRequest) {
  const { userId } = await auth();
  if (!userId)
    return NextResponse.json(
      {
        message: "Unauthorized",
      },
      { status: 401 },
    );
  const params = req.nextUrl.searchParams;
  const status = params.get("status");
  if (status !== "success")
    return NextResponse.json(
      {
        message: "Failed to link",
      },
      { status: 400 },
    );
  const code = params.get("code");
  if (!code)
    return NextResponse.json({ message: "No code provided" }, { status: 400 });
  const token = await exchangeCodeForAccessToken(code);
  if (!token)
    return NextResponse.json(
      { message: "Failed to exchange code for token" },
      { status: 400 },
    );
  const accountDetails = await getAccountDetails(token.accessToken);
  if (accountDetails) {
    await db.account.upsert({
      where: {
        id: token.accountId.toString(),
      },
      update: {
        accessToken: token.accessToken,
      },
      create: {
        id: token.accountId.toString(),
        userId,
        emailAddress: accountDetails.email,
        name: accountDetails.name,
        accessToken: token.accessToken,
      },
    });
  }

  //trigger initial sync
  if (token && token.accountId) {
    // Check if token and accountId are defined
    waitUntil(
      axios.post(`${process.env.NEXT_PUBLIC_APP_URL}/api/initial-sync`, {
        accountId: token.accountId.toString(),
        userId,
      }),
    )
      .then((response) => {
        console.log(" initial sync triggered", response.data);
      })
      .catch((error) => {
        console.error("Failed to trigger initial sync", error);
      });
  } else {
    console.error("Token or accountId is undefined");
  }
  return NextResponse.redirect(new URL("/mail", req.url));
}
