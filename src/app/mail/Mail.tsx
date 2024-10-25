"use client";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { cn } from "@/lib/utils";
import { TooltipProvider } from "@radix-ui/react-tooltip";
import { useState } from "react";
import AccountSwitcher from "./AccountSwitcher";
import Sidebar from "./Sidebar";
import { ThreadList } from "./ThreadList";
import ThreadDisplay from "./ThreadDisplay";

type Props = {
  defaultLayout: number[] | undefined;
  navCollapsedSize: number;
  defaultCollapsed: boolean;
};
const Mail = ({
  defaultLayout = [20, 30, 50],
  navCollapsedSize,
  defaultCollapsed,
}: Props) => {
  const [isCollapsed, setisCollapsed] = useState(defaultCollapsed);
  return (
    <TooltipProvider delayDuration={0}>
      <ResizablePanelGroup
        direction="horizontal"
        onLayout={(sizes: number[]) => {
          console.log(sizes);
        }}
        className="h-full min-h-screen items-stretch"
      >
        <ResizablePanel
          defaultSize={defaultLayout[0]}
          collapsedSize={navCollapsedSize}
          collapsible
          minSize={15}
          onCollapse={() => {
            setisCollapsed(true);
          }}
          maxSize={40}
          onResize={() => {
            setisCollapsed(false);
          }}
          className={cn(
            isCollapsed &&
              "min-w-[50px] transition-all duration-300 ease-in-out",
          )}
        >
          <div className="flex h-full flex-1 flex-col">
            <div
              className={cn(
                "flex h-[50px] items-center justify-between",
                isCollapsed ? "h-[50px]" : "px-2",
              )}
            >
              {/* switcher */}
              <AccountSwitcher isCollapsed={isCollapsed} />
            </div>
            <Separator />
            {/* sidebar */}
            <Sidebar isCollapsed={isCollapsed} />
            <div className="flex-1"></div>
            {/* ai */}
            ask ai
          </div>
        </ResizablePanel>
        <ResizableHandle withHandle />
        <ResizablePanel minSize={30} defaultSize={defaultLayout[1]}>
          <Tabs defaultValue="inbox">
            <div className="flex items-center px-4 py-2">
              <h3 className="text-xl font-bold">Inbox</h3>
              <TabsList className="ml-auto">
                <TabsTrigger value="inbox">Inbox</TabsTrigger>
                <TabsTrigger value="done">Done</TabsTrigger>
              </TabsList>
            </div>
            <Separator />
            Search bar
            {/* search */}
            <TabsContent value="inbox">
              {" "}
              <ThreadList />
            </TabsContent>
            <TabsContent value="done">
              {" "}
              <ThreadList />
            </TabsContent>
          </Tabs>
        </ResizablePanel>
        <ResizableHandle withHandle />
        <ResizablePanel minSize={50} defaultSize={defaultLayout[2]}>
          <ThreadDisplay />
        </ResizablePanel>
      </ResizablePanelGroup>
    </TooltipProvider>
  );
};

export default Mail;
