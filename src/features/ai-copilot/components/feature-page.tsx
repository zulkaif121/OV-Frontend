"use client";

import { useMemo, useState } from "react";
import { Bot, FileText, Plus, Search, Send, Sparkles } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/shared/components/ui/button";
import { Input } from "@/shared/components/ui/input";

interface ChatMessage {
  id: string;
  role: "assistant" | "user";
  content: string;
}

interface SourceItem {
  id: string;
  title: string;
  meta: string;
}

const initialMessages: ChatMessage[] = [
  {
    id: "m-1",
    role: "assistant",
    content: "Add sources on the left, then ask anything. I will answer using your selected context.",
  },
];

const sourceItems: SourceItem[] = [
  { id: "s-1", title: "Operations Handbook", meta: "PDF - Updated today" },
  { id: "s-2", title: "Task SLA Policy", meta: "Doc - 12 pages" },
  { id: "s-3", title: "Vendor Performance Report", meta: "Sheet - Weekly" },
];

const askAiPrimaryButtonClass =
  "border border-[hsl(var(--primary)/var(--task-action-border-alpha))] bg-[hsl(var(--primary)/var(--task-action-bg-alpha))] text-[hsl(var(--task-action-fg))] hover:bg-[hsl(var(--primary)/var(--task-action-hover-alpha))] hover:text-[hsl(var(--task-action-fg))]";

export const FeaturePage = () => {
  const [messages, setMessages] = useState<ChatMessage[]>(initialMessages);
  const [draft, setDraft] = useState("");
  const [sourceSearch, setSourceSearch] = useState("");
  const [notes, setNotes] = useState<string[]>([
    "Review urgent tasks before noon.",
    "Draft guest follow-up for delayed check-in.",
  ]);
  const [noteDraft, setNoteDraft] = useState("");

  const visibleSources = useMemo(() => {
    const query = sourceSearch.trim().toLowerCase();
    if (!query) {
      return sourceItems;
    }
    return sourceItems.filter((source) => source.title.toLowerCase().includes(query) || source.meta.toLowerCase().includes(query));
  }, [sourceSearch]);

  const handleSend = () => {
    const text = draft.trim();
    if (!text) {
      return;
    }

    const userMessage: ChatMessage = {
      id: `u-${Date.now()}`,
      role: "user",
      content: text,
    };

    const aiMessage: ChatMessage = {
      id: `a-${Date.now()}`,
      role: "assistant",
      content: "Understood. I can help with that using your current sources and notes.",
    };

    setMessages((prev) => [...prev, userMessage, aiMessage]);
    setDraft("");
  };

  const handleAddNote = () => {
    const text = noteDraft.trim();
    if (!text) {
      return;
    }
    setNotes((prev) => [text, ...prev]);
    setNoteDraft("");
  };

  return (
    <div className="space-y-4">
      <section className="grid gap-4 xl:grid-cols-[260px_minmax(0,1.25fr)_280px]">
        <aside className="flex min-h-[80vh] flex-col overflow-hidden rounded-2xl border bg-background shadow-sm">
          <header className="flex items-center justify-between border-b px-4 py-3">
            <h2 className="text-lg font-semibold">Sources</h2>
          </header>
          <div className="space-y-3 p-4">
            <Button size="sm" variant="outline" className="w-full rounded-xl">
              <Plus className="h-4 w-4" />
              Add source
            </Button>
            <label className="relative block">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                value={sourceSearch}
                onChange={(event) => setSourceSearch(event.target.value)}
                className="rounded-xl bg-muted/40 pl-9"
                placeholder="Search sources..."
                aria-label="Search sources"
              />
            </label>
          </div>
          <div className="flex-1 space-y-2 overflow-y-auto px-4 pb-4">
            {visibleSources.map((source) => (
              <div key={source.id} className="rounded-xl border bg-muted/30 p-3">
                <p className="text-sm font-medium">{source.title}</p>
                <p className="text-xs text-muted-foreground">{source.meta}</p>
              </div>
            ))}
            {visibleSources.length === 0 ? (
              <div className="rounded-xl border bg-muted/30 p-4 text-sm text-muted-foreground">No sources found.</div>
            ) : null}
          </div>
        </aside>

        <main className="flex min-h-[80vh] flex-col overflow-hidden rounded-2xl border bg-background shadow-sm">
          <header className="flex items-center gap-3 border-b px-4 py-3 md:px-5">
            <div className="flex size-9 items-center justify-center rounded-xl bg-[hsl(var(--primary)/0.16)] text-foreground">
              <Sparkles className="h-5 w-5" />
            </div>
            <h1 className="text-xl font-semibold">Ask AI</h1>
          </header>

          <div className="flex-1 space-y-4 overflow-y-auto p-4 md:p-6">
            {messages.map((message) => (
              <div key={message.id} className={cn("flex", message.role === "user" ? "justify-end" : "justify-start")}>
                <div
                  className={cn(
                    "max-w-[82%] rounded-2xl border px-4 py-3 text-sm leading-6 shadow-sm",
                    message.role === "user"
                      ? "border-[hsl(var(--primary)/var(--task-action-border-alpha))] bg-[hsl(var(--primary)/var(--task-action-bg-alpha))] text-[hsl(var(--task-action-fg))]"
                      : "border-border bg-muted/40 text-foreground",
                  )}
                >
                  {message.role === "assistant" ? (
                    <div className="mb-2 inline-flex items-center gap-2 text-xs text-muted-foreground">
                      <Bot className="h-3.5 w-3.5" />
                      Ask AI
                    </div>
                  ) : null}
                  <p>{message.content}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="border-t bg-background p-4">
            <div className="rounded-xl border bg-muted/30 p-2.5">
              <textarea
                value={draft}
                onChange={(event) => setDraft(event.target.value)}
                onKeyDown={(event) => {
                  if (event.key === "Enter" && !event.shiftKey) {
                    event.preventDefault();
                    handleSend();
                  }
                }}
                placeholder="Ask AI about your operations..."
                className="min-h-20 w-full resize-none bg-transparent px-2 py-2 text-sm outline-none placeholder:text-muted-foreground"
              />
              <div className="flex items-center justify-end border-t pt-2">
                <Button size="sm" className={cn("rounded-xl", askAiPrimaryButtonClass)} onClick={handleSend}>
                  <Send className="h-4 w-4" />
                  Send
                </Button>
              </div>
            </div>
          </div>
        </main>

        <aside className="flex min-h-[80vh] flex-col overflow-hidden rounded-2xl border bg-background shadow-sm">
          <header className="flex items-center justify-between border-b px-4 py-3">
            <h2 className="text-lg font-semibold">Notes</h2>
          </header>
          <div className="flex-1 space-y-2 overflow-y-auto p-4">
            {notes.map((note, index) => (
              <div key={`${note}-${index}`} className="rounded-xl border bg-muted/30 p-3 text-sm text-foreground">
                <div className="mb-2 inline-flex items-center gap-2 text-xs text-muted-foreground">
                  <FileText className="h-3.5 w-3.5" />
                  Note {index + 1}
                </div>
                <p className="leading-6">{note}</p>
              </div>
            ))}
          </div>
          <div className="border-t p-4">
            <textarea
              value={noteDraft}
              onChange={(event) => setNoteDraft(event.target.value)}
              placeholder="Add note..."
              className="min-h-20 w-full resize-none rounded-xl border bg-muted/30 px-3 py-2 text-sm outline-none placeholder:text-muted-foreground"
            />
            <Button size="sm" className={cn("mt-3 w-full rounded-xl", askAiPrimaryButtonClass)} onClick={handleAddNote}>
              Add note
            </Button>
          </div>
        </aside>
      </section>
    </div>
  );
};
