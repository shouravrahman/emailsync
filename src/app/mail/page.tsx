import { ThemeToggle } from "@/components/ThemeToggler";
import { UserButton } from "@clerk/nextjs";
import dynamic from "next/dynamic";
import React from "react";
import ComposeButton from "./ComposeButton";
// import Mail from "./mail";
const Mail = dynamic(
  () => {
    return import("./Mail");
  },
  { ssr: false },
);
const Dashboard = () => {
  return (
    <>
      <div className="absolute bottom-4 left-0">
        <div className="flex items-center gap-3">
          <UserButton />
          <ThemeToggle />
          <ComposeButton />
        </div>
      </div>
      <Mail
        defaultCollapsed={false}
        navCollapsedSize={4}
        defaultLayout={[20, 30, 50]}
      />
    </>
  );
};

export default Dashboard;
