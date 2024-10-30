"use client"
import React from "react";
import useThreads from "./use-threads";
import { useThread } from "./use-thread";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { Button } from "@/components/ui/button";
import { Archive, ArchiveX, Calendar, Clock, Trash2 } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";

import { addDays, addHours, format, nextSaturday } from "date-fns"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import EmailDisplay from "./EmailDisplay";
import ReplyBox from "./ReplyBox";
const ThreadDisplay = () => {
   const [threadId, setThreadId] = useThread()
   const { threads } = useThreads()
   const today = new Date()
   const thread = threads?.find(t => t.id === threadId)
   return (<div className="flex flex-col h-full">
      <div className="flex flex-col items-center p-2">
         <div className="flex items-center gap-2">
            <Tooltip>
               <TooltipTrigger asChild>
                  <Button variant="ghost" size="icon" disabled={!thread}>
                     <Archive className="w-4 h-4" />
                     <span className="sr-only">Archive</span>
                  </Button>
               </TooltipTrigger>
               <TooltipContent>Archive</TooltipContent>
            </Tooltip>
            <Tooltip>
               <TooltipTrigger asChild>
                  <Button variant="ghost" size="icon" disabled={!thread}>
                     <ArchiveX className="w-4 h-4" />
                     <span className="sr-only">Move to junk</span>
                  </Button>
               </TooltipTrigger>
               <TooltipContent>Move to junk</TooltipContent>
            </Tooltip>
            <Tooltip>
               <TooltipTrigger asChild>
                  <Button variant="ghost" size="icon" disabled={!thread}>
                     <Trash2 className="w-4 h-4" />
                     <span className="sr-only">Move to trash</span>
                  </Button>
               </TooltipTrigger>
               <TooltipContent>Move to trash</TooltipContent>
            </Tooltip>
            <Separator orientation="vertical" className="h-6 mx-1" />
            <Tooltip>
               <Popover>
                  <PopoverTrigger asChild>
                     <TooltipTrigger asChild>
                        <Button variant="ghost" size="icon" disabled={!thread}>
                           <Clock className="w-4 h-4" />
                           <span className="sr-only">Snooze</span>
                        </Button>
                     </TooltipTrigger>
                  </PopoverTrigger>
                  <PopoverContent className="flex w-[535px] p-0">
                     <div className="flex flex-col gap-2 px-2 py-4 border-r">
                        <div className="px-4 text-sm font-medium">Snooze until</div>
                        <div className="grid min-w-[250px] gap-1">
                           <Button
                              variant="ghost"
                              className="justify-start font-normal"
                           >
                              Later today{" "}
                              <span className="ml-auto text-muted-foreground">
                                 {format(addHours(today, 4), "E, h:m b")}
                              </span>
                           </Button>
                           <Button
                              variant="ghost"
                              className="justify-start font-normal"
                           >
                              Tomorrow
                              <span className="ml-auto text-muted-foreground">
                                 {format(addDays(today, 1), "E, h:m b")}
                              </span>
                           </Button>
                           <Button
                              variant="ghost"
                              className="justify-start font-normal"
                           >
                              This weekend
                              <span className="ml-auto text-muted-foreground">
                                 {format(nextSaturday(today), "E, h:m b")}
                              </span>
                           </Button>
                           <Button
                              variant="ghost"
                              className="justify-start font-normal"
                           >
                              Next week
                              <span className="ml-auto text-muted-foreground">
                                 {format(addDays(today, 7), "E, h:m b")}
                              </span>
                           </Button>
                        </div>
                     </div>
                     <div className="p-2">
                        <Calendar />
                     </div>
                  </PopoverContent>
               </Popover>
               <TooltipContent>Snooze</TooltipContent>
            </Tooltip>
         </div>
         <Separator />
         {thread ? (
            <div className="w-full flex flex-col flex-1 overflow-scroll">
               <div className="flex items-start p-4">
                  <div className="flex items-start gap-4 text-sm">
                     <Avatar>
                        <AvatarImage alt={'lol'} />
                        <AvatarFallback>
                           {thread?.emails[0]?.from?.name?.split(" ")
                              .map((chunk) => chunk[0])
                              .join("")}
                        </AvatarFallback>
                     </Avatar>
                     <div className="grid gap-1">
                        <div className="font-semibold">{thread.emails[0]?.from?.name}</div>
                        <div className="text-xs line-clamp-1">{thread.emails[0]?.subject}</div>
                        <div className="text-xs line-clamp-1">
                           <span className="font-medium">Reply-To:</span> {thread.emails[0]?.from?.address}
                        </div>
                     </div>
                  </div>
                  {thread.emails[0]?.sentAt && (
                     <div className="ml-auto text-xs text-muted-foreground">
                        {format(new Date(thread.emails[0].sentAt), "PPpp")}
                     </div>
                  )}
               </div>
               <Separator />
               <div className="max-h-[calc(100vh-500px)] overflow-scroll flex flex-col">
                  <div className="p-6 flex flex-col gap-4">
                     {thread.emails.map(email => {
                        return <EmailDisplay key={email.id} email={email} />
                     })}
                  </div>
               </div>
               <div className="flex-1"></div>
               <Separator className="mt-auto" />
               <ReplyBox />
            </div>
         ) : (
            <>
               <div className="p-8 text-center text-muted-foreground">
                  No message selected {threadId}
               </div>
            </>
         )}
      </div>
   </div >)
}
export default ThreadDisplay;
