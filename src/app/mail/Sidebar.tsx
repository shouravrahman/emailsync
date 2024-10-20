"use client";

import { api } from "@/trpc/react";
import { Nav } from "./Nav";
import { File, Inbox, Send } from "lucide-react";
import { useLocalStorage } from "usehooks-ts";
type Props = {
  isCollapsed: boolean;
};
const Sidebar = ({ isCollapsed }: Props) => {
  const [tab] = useLocalStorage<"inbox" | "draft" | "sent">(
    "emailsynctab",
    "inbox",
  );
  const [accountId] = useLocalStorage("accountId", "");
  const refetchInterval = 5000;
  const { data: inboxThreads } = api.account.getNumberOfThreads.useQuery(
    {
      accountId,
      tab: "inbox",
    },
    { enabled: !!accountId && !!tab, refetchInterval },
  );

  const { data: draftsThreads } = api.account.getNumberOfThreads.useQuery(
    {
      accountId,
      tab: "drafts",
    },
    { enabled: !!accountId && !!tab, refetchInterval },
  );

  const { data: sentThreads } = api.account.getNumberOfThreads.useQuery(
    {
      accountId,
      tab: "sent",
    },
    { enabled: !!accountId && !!tab, refetchInterval },
  );

  return (
    <Nav
      isCollapsed={isCollapsed}
      links={[
        {
          title: "Inbox",
          label: inboxThreads?.toString() || "0",
          icon: Inbox,
          variant: tab === "inbox" ? "default" : "ghost",
        },
        {
          title: "Drafts",
          label: draftsThreads?.toString() || "0",
          icon: File,
          variant: tab === "draft" ? "default" : "ghost",
        },
        {
          title: "Sent",
          label: sentThreads?.toString() || "0",
          icon: Send,
          variant: tab === "sent" ? "default" : "ghost",
        },
      ]}
    />
  );
};

export default Sidebar;
