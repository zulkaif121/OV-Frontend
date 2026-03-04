"use client";

import { useState, useMemo } from "react";
import { InboxSidebar } from "./inbox-sidebar";
import { ConversationList } from "./conversation-list";
import { ChatThread } from "./chat-thread";
import { ContextPanel } from "./context-panel";
import { useConversations, type Conversation } from "../hooks/use-inbox";
import { Button } from "@/shared/components/ui/button";
import { PanelLeftClose, PanelLeftOpen, Inbox } from "lucide-react";
import { cn } from "@/lib/utils";

export const InboxPage = () => {
  const [selectedFolder, setSelectedFolder] = useState<string | null>(null);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [isNavOpen, setIsNavOpen] = useState(true);
  const { data, isLoading } = useConversations();

  const conversations = useMemo(() => {
    if (isLoading) return [];
    if (data?.conversations && data.conversations.length > 0) {
      return data.conversations;
    }
    return [
      {
        id: "mock-1",
        guest_id: "g1",
        guest_name: "Sarah Miller",
        property_name: "Downtown Loft",
        last_message_at: new Date().toISOString(),
      },
      {
        id: "mock-2",
        guest_id: "g2",
        guest_name: "Michael Chen",
        property_name: "Sunny Beach Haus",
        last_message_at: new Date(Date.now() - 3600000).toISOString(),
      },
      {
        id: "mock-3",
        guest_id: "g3",
        guest_name: "Elena Rodriguez",
        property_name: "Mountain View Cabin",
        last_message_at: new Date(Date.now() - 86400000).toISOString(),
      }
    ] as Conversation[];
  }, [data, isLoading]);

  const selectedConversation = useMemo(
    () => conversations.find((c: Conversation) => c.id === selectedId),
    [conversations, selectedId]
  );

  return (
    <div className="flex h-[calc(100vh-theme(spacing.16))] w-full flex-col">
      {/* Permanent Global Header */}
      <div className="flex shrink-0 items-center justify-between border-b px-4 py-4 md:px-6">
        <div className="flex items-start gap-4">
          <div className="flex size-12 shrink-0 items-center justify-center rounded-xl bg-[hsl(var(--primary)/0.16)] text-foreground">
            <Inbox className="h-6 w-6" />
          </div>
          <div className="flex flex-col py-1 justify-center">
            <h1 className="text-2xl font-semibold tracking-tight md:text-3xl">Your Inbox</h1>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="icon" className="h-10 w-10 text-muted-foreground" onClick={() => setIsNavOpen(!isNavOpen)} title={isNavOpen ? "Close sidebar" : "Open sidebar"}>
            {isNavOpen ? <PanelLeftClose className="h-5 w-5" /> : <PanelLeftOpen className="h-5 w-5" />}
          </Button>
        </div>
      </div>

      <div className="flex flex-1 overflow-hidden bg-background">
        {/* Leftmost Navigation Sidebar / Conversation List */}
        <div className={cn(
          "shrink-0 border-r border-sidebar-border bg-sidebar flex flex-col transition-all duration-300 ease-in-out overflow-hidden",
          isNavOpen
            ? (selectedId ? "w-[320px] min-w-[320px] opacity-100" : "w-[240px] min-w-[240px] opacity-100")
            : "w-0 min-w-0 opacity-0 border-none"
        )}>
          <div className="flex-1 overflow-hidden w-full pt-4">
            {selectedId ? (
              <ConversationList
                conversations={conversations}
                isLoading={isLoading}
                selectedId={selectedId}
                onSelect={setSelectedId}
                isNarrow={true}
                onBack={() => setSelectedId(null)}
                folderName={selectedFolder || "All Conversations"}
              />
            ) : (
              <div className="h-full overflow-y-auto pr-2 px-2">
                <InboxSidebar onSelectFolder={setSelectedFolder} />
              </div>
            )}
          </div>
        </div>

        {/* Dynamic Main Content Area */}
        <div className="flex flex-1 overflow-hidden bg-background">
          {selectedId && selectedConversation ? (
            // 2-Column View for thread info (Thread + Context)
            <>
              <div className="flex flex-1 flex-col border-r bg-background">
                <ChatThread conversation={selectedConversation} />
              </div>
              <div className="w-[340px] shrink-0 bg-background">
                <ContextPanel conversation={selectedConversation} />
              </div>
            </>
          ) : (
            // Main content area when NO conversation is specifically selected: Wide List with Tabs
            <div className="flex-1 p-6 bg-background overflow-y-auto">
              <ConversationList
                conversations={conversations}
                isLoading={isLoading}
                selectedId={selectedId}
                onSelect={setSelectedId}
                isNarrow={false}
                folderName={selectedFolder || "All Conversations"}
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
