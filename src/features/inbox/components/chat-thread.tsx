import { useState } from "react";
import { Send, Phone, Languages, Book, LayoutPanelLeft } from "lucide-react";
import { Button } from "@/shared/components/ui/button";
import { Avatar, AvatarFallback } from "@/shared/components/ui/avatar";
import { ScrollArea } from "@/shared/components/ui/scroll-area";
import { useConversationMessages, useSendMessage, type Conversation, type Message } from "../hooks/use-inbox";

export const ChatThread = ({ conversation }: { conversation: Conversation }) => {
    const { data: messagesData, isLoading } = useConversationMessages(conversation.id);
    const { mutate: sendMessage, isPending } = useSendMessage();
    const [draft, setDraft] = useState("");

    const handleSend = () => {
        if (!draft.trim()) return;
        sendMessage(
            { conversation_id: conversation.id, content: draft, channel: "sms" },
            {
                onSuccess: () => {
                    setDraft("");
                    // Note: you may want to invalidate queries here if you use react-query 
                    // to trigger a re-fetch of messages.
                },
            }
        );
    };

    const name = conversation.guest_name || "Unknown Guest";
    const initial = name.charAt(0).toUpperCase();

    return (
        <div className="flex h-full flex-col bg-background">
            <div className="flex items-center justify-between border-b px-6 py-4">
                <div className="flex items-center gap-3">
                    <Avatar className="h-10 w-10">
                        <AvatarFallback className="bg-zinc-800 text-white">{initial}</AvatarFallback>
                    </Avatar>
                    <h2 className="text-xl font-semibold">{name}</h2>
                </div>
                <div className="flex gap-2">
                    <Button variant="ghost" size="icon" className="h-8 w-8 rounded-full bg-muted/50 hover:bg-muted"><Languages className="h-4 w-4 text-muted-foreground" /></Button>
                    <Button variant="ghost" size="icon" className="h-8 w-8 rounded-full bg-muted/50 hover:bg-muted"><Phone className="h-4 w-4 text-muted-foreground" /></Button>
                    <Button variant="ghost" size="icon" className="h-8 w-8 rounded-full bg-muted/50 hover:bg-muted"><LayoutPanelLeft className="h-4 w-4 text-muted-foreground" /></Button>
                </div>
            </div>

            <div className="flex items-center gap-4 border-b px-6 py-2 text-sm text-muted-foreground">
                <button className="flex items-center gap-1 hover:text-foreground">+ Add a note N</button>
                <button className="flex items-center gap-1 hover:text-foreground">&gt;&gt; Teach AI K</button>
            </div>

            <ScrollArea className="flex-1 p-6">
                {isLoading ? (
                    <div className="py-8 text-center text-sm text-muted-foreground">Loading thread...</div>
                ) : (
                    <div className="flex flex-col gap-6 pb-20">
                        {messagesData?.messages?.map((msg: Message) => {
                            const isUser = msg.direction === "outbound";
                            return (
                                <div key={msg.id} className={`flex w-full ${isUser ? 'justify-end' : 'justify-start'}`}>
                                    {!isUser && (
                                        <Avatar className="mr-3 mt-1 h-8 w-8 shrink-0">
                                            <AvatarFallback className="bg-zinc-800 text-xs text-white">{initial}</AvatarFallback>
                                        </Avatar>
                                    )}
                                    <div className={`max-w-[75%] rounded-2xl px-5 py-3 text-sm ${isUser ? 'bg-primary text-primary-foreground' : 'bg-muted'}`}>
                                        <p className="whitespace-pre-wrap leading-relaxed">{msg.content}</p>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                )}
            </ScrollArea>

            <div className="mt-auto border-t bg-background p-4">
                <div className="relative overflow-hidden rounded-2xl border bg-background shadow-sm focus-within:ring-1 focus-within:ring-ring">
                    <textarea
                        className="w-full resize-none bg-transparent px-4 py-3 pb-12 text-sm outline-none placeholder:text-muted-foreground"
                        placeholder="Press R to reply"
                        rows={3}
                        value={draft}
                        onChange={(e) => setDraft(e.target.value)}
                        onKeyDown={(e) => {
                            if (e.key === "Enter" && !e.shiftKey) {
                                e.preventDefault();
                                handleSend();
                            }
                        }}
                    />
                    <div className="absolute bottom-2 left-2 flex items-center gap-2">
                        <Button variant="outline" size="sm" className="h-8 rounded-lg px-3 text-xs font-medium text-muted-foreground">
                            <Avatar className="mr-2 h-4 w-4"><AvatarFallback className="text-[10px]">A</AvatarFallback></Avatar>
                            Unassigned
                        </Button>
                    </div>
                    <div className="absolute bottom-2 right-2 flex items-center gap-2">
                        <Button variant="ghost" size="sm" className="h-8 rounded-lg px-3 text-xs font-medium text-muted-foreground">Follow up Z</Button>
                        <Button variant="ghost" size="sm" className="h-8 rounded-lg px-3 text-xs font-medium text-emerald-600 hover:bg-emerald-50 hover:text-emerald-700">Mark done E</Button>
                        <Button size="sm" className="h-8 rounded-lg px-4" onClick={handleSend} disabled={isPending || !draft.trim()}>
                            Send
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    );
};
