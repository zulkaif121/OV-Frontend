"use client";

import { useState, useMemo } from "react";
import { InboxSidebar } from "./inbox-sidebar";
import { ConversationList } from "./conversation-list";
import { ChatThread } from "./chat-thread";
import { ContextPanel } from "./context-panel";
import { useConversations, type Conversation } from "../hooks/use-inbox";
import { Button } from "@/shared/components/ui/button";
import { PanelLeftClose, PanelLeftOpen } from "lucide-react";
import { cn } from "@/lib/utils";

export const InboxPage = () => {
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [isNavOpen, setIsNavOpen] = useState(true);
  const { data, isLoading } = useConversations();

  const conversations = data?.conversations || [];

  const selectedConversation = useMemo(
    () => conversations.find((c: Conversation) => c.id === selectedId),
    [conversations, selectedId]
  );

  return (
    <div className="flex h-[calc(100vh-theme(spacing.16))] w-full flex-col">
      {/* Dynamic Header */}
      {!isNavOpen && (
        <div className="flex shrink-0 items-center justify-between border-b px-4 py-3 h-[60px]">
          <div className="flex justify-start gap-4 items-center">
            <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground" onClick={() => setIsNavOpen(true)}>
              <PanelLeftOpen className="h-5 w-5" />
            </Button>
            <h1 className="text-xl font-bold">Your Inbox</h1>
          </div>
        </div>
      )}

      <div className="flex flex-1 overflow-hidden bg-background">

        {/* Leftmost Navigation Sidebar (Collapsible) */}
        <div className={cn(
          "shrink-0 border-r bg-background/50 flex flex-col transition-all duration-300 ease-in-out",
          isNavOpen ? "w-[240px] opacity-100" : "w-0 opacity-0 overflow-hidden border-none"
        )}>
          {/* Internal Header when open */}
          <div className="flex shrink-0 items-center justify-between border-b px-4 py-3 h-[60px] w-[240px]">
            <h1 className="text-xl font-bold whitespace-nowrap">Your Inbox</h1>
            <Button variant="ghost" size="icon" className="h-8 w-8 shrink-0 text-muted-foreground" onClick={() => setIsNavOpen(false)}>
              <PanelLeftClose className="h-5 w-5" />
            </Button>
          </div>
          {/* Scrollable sidebar content */}
          <div className="flex-1 overflow-y-auto pr-2 w-[240px]">
            <InboxSidebar />
          </div>
        </div>

        {/* Dynamic Main Content Area */}
        <div className="flex flex-1 overflow-hidden">
          {selectedId && selectedConversation ? (
            // 3-Column View (Narrow List + Thread + Context)
            <>
              <div className="w-[320px] shrink-0 border-r">
                <ConversationList
                  conversations={conversations}
                  isLoading={isLoading}
                  selectedId={selectedId}
                  onSelect={setSelectedId}
                  isNarrow={true}
                />
              </div>
              <div className="flex flex-1 flex-col border-r bg-background">
                <ChatThread conversation={selectedConversation} />
              </div>
              <div className="w-[340px] shrink-0 bg-background">
                <ContextPanel conversation={selectedConversation} />
              </div>
            </>
          ) : (
            // 2-Column View (Wide List)
            <div className="flex-1 p-6 bg-background overflow-y-auto">
              <ConversationList
                conversations={conversations}
                isLoading={isLoading}
                selectedId={selectedId}
                onSelect={setSelectedId}
                isNarrow={false}
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
