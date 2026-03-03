"use client";

import { MessageSquare } from "lucide-react";
import { useState } from "react";

import { PageHeader } from "@/shared/components/page-header";
import { Button } from "@/shared/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/shared/components/ui/card";
import { Input } from "@/shared/components/ui/input";
import { useUiStore } from "@/shared/stores/ui-store";

export const InboxPage = () => {
  const openSideSheet = useUiStore((state) => state.openSideSheet);
  const [draft, setDraft] = useState("");
  const [messages, setMessages] = useState<string[]>([]);

  return (
    <div className="space-y-6">
      <PageHeader
        title="Inbox"
        description="Centralized communications across guests, staff, and vendors."
        eyebrow="Launch Critical"
      />

      <div className="grid gap-4 xl:grid-cols-[280px_1fr_320px]">
        <Card className="h-[70vh]">
          <CardHeader>
            <CardTitle>Conversations</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-[hsl(var(--muted-foreground))]">Conversation list will render from inbox query hooks.</p>
          </CardContent>
        </Card>

        <Card className="h-[70vh]">
          <CardHeader className="flex-row items-center justify-between">
            <CardTitle>Thread</CardTitle>
            <Button
              variant="outline"
              size="sm"
              onClick={() =>
                openSideSheet({
                  title: "Inbox Thread",
                  description: "Thread details and approvals",
                  view: "inbox-thread",
                  width: 480,
                })
              }
            >
              <MessageSquare className="h-4 w-4" />
              Open Panel
            </Button>
          </CardHeader>
          <CardContent className="flex h-[calc(100%-5rem)] flex-col gap-4">
            <div className="min-h-0 flex-1 space-y-2 overflow-y-auto rounded-xl border p-3">
              {messages.length === 0 ? (
                <p className="text-sm text-[hsl(var(--muted-foreground))]">No messages yet.</p>
              ) : (
                messages.map((message, index) => (
                  <div key={`${message}-${index}`} className="rounded-lg bg-[hsl(var(--muted)/0.7)] px-3 py-2 text-sm">
                    {message}
                  </div>
                ))
              )}
            </div>
            <div className="flex gap-2">
              <Input
                aria-label="Message input"
                placeholder="Type a message"
                value={draft}
                onChange={(event) => setDraft(event.target.value)}
              />
              <Button
                onClick={() => {
                  const next = draft.trim();
                  if (next.length === 0) {
                    return;
                  }
                  setMessages((prev) => [...prev, next]);
                  setDraft("");
                }}
              >
                Send
              </Button>
            </div>
          </CardContent>
        </Card>

        <Card className="h-[70vh]">
          <CardHeader>
            <CardTitle>Context</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-[hsl(var(--muted-foreground))]">Property/task context cards will appear for active thread.</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
