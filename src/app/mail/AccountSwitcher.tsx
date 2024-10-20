"use client";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { api } from "@/trpc/react";
import { useLocalStorage } from "usehooks-ts";
import React from "react";
import { cn } from "@/lib/utils";
import { Plus } from "lucide-react";
import { getAurinkoAuthUrl } from "@/lib/aurinko";
type Props = {
  isCollapsed: boolean;
};
const AccountSwitcher = ({ isCollapsed }: Props) => {
  const { data } = api.account.getAccounts.useQuery();
  const [accountId, setAccountId] = useLocalStorage("accountId", "");
  if (!data) return null;
  return (
    <Select defaultValue={accountId} onValueChange={setAccountId}>
      <SelectTrigger>
        <SelectValue placeholder="Select an account">
          <span className={cn({ hidden: !isCollapsed })}>
            {data.find((account) => account.id === accountId)?.emailAddress[0]}
          </span>
          <span className={cn({ hidden: isCollapsed, "ml-2": true })}>
            {data.find((account) => account.id === accountId)?.emailAddress}
          </span>
        </SelectValue>
      </SelectTrigger>
      <SelectContent>
        {data?.map((account) => {
          return (
            <SelectItem value={account.id} key={account.id}>
              {account.emailAddress}
            </SelectItem>
          );
        })}
        <div
          onClick={async () => {
            const authUrl = await getAurinkoAuthUrl("Google");
            window.location.href = authUrl;
          }}
          className="relative flex w-full cursor-pointer items-center rounded-sm py-1.5 pl-2 pr-8 text-sm outline-none hover:bg-gray-50 focus:bg-accent"
        >
          <Plus className="mr-1 size-4" />
          Add Account
        </div>
      </SelectContent>
    </Select>
  );
};

export default AccountSwitcher;
