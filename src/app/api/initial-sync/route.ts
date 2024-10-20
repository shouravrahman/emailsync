import { Account } from "@/lib/account";
import { syncEmailsToDatabase } from "@/lib/sync-to-db";
import { db } from "@/server/db";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const { accountId, userId } = await req.json();

  if (!accountId || !userId) {
    return NextResponse.json(
      { error: "Missing accountId or userId" },
      { status: 400 },
    );
  }

  const dbAccount = await db.account.findUnique({
    where: {
      id: accountId,
      userId,
    },
  });
  if (!dbAccount)
    return NextResponse.json({ error: "Account not found" }, { status: 404 });

  console.log("dbAccount", dbAccount);
  const account = new Account(dbAccount.accessToken);

  const response = await account.performInitialSync();
  if (!response)
    return NextResponse.json({ error: "FAILED_TO_SYNC" }, { status: 500 });

  const { emails, deltaToken } = response;

  console.log("user emails", emails);
  //   await db.account.update({
  //     where: { id: accountId },
  //     data: { nextDeltaToken: deltaToken },
  //   });
  await syncEmailsToDatabase(emails, accountId);

  console.log("sync completed", deltaToken);
  return NextResponse.json({ message: "done" }, { status: 200 });
}
