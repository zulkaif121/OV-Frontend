import { Search, SlidersHorizontal, ArrowDownUp, CheckCircle2, AlertCircle, ArrowLeft } from "lucide-react";
import { Input } from "@/shared/components/ui/input";
import { Button } from "@/shared/components/ui/button";
import { Tabs, TabsList, TabsTrigger } from "@/shared/components/ui/tabs";
import { Badge } from "@/shared/components/ui/badge";
import { Avatar, AvatarFallback } from "@/shared/components/ui/avatar";
import { ScrollArea } from "@/shared/components/ui/scroll-area";
import type { Conversation } from "../hooks/use-inbox";
import { formatDistanceToNow } from "date-fns";

interface ConversationListProps {
    conversations: Conversation[];
    isLoading: boolean;
    selectedId: string | null;
    onSelect: (id: string | null) => void;
    isNarrow?: boolean;
}

export const ConversationList = ({ conversations, isLoading, selectedId, onSelect, isNarrow }: ConversationListProps) => {
    return (
        <div className={`flex h-full flex-col bg-background ${isNarrow ? 'border-r' : 'rounded-2xl border shadow-sm'}`}>
            <div className="flex items-center p-4">
                {isNarrow && (
                    <Button variant="ghost" size="icon" className="mr-2 h-8 w-8" onClick={() => onSelect(null)}>
                        <ArrowLeft className="h-4 w-4" />
                    </Button>
                )}
                <div className="flex-1 px-2">
                    <h2 className="text-xl font-semibold">{isNarrow ? "Guest" : "All Conversations"}</h2>
                </div>
                {!isNarrow && (
                    <div className="flex max-w-sm flex-1 items-center gap-2">
                        <div className="relative flex-1">
                            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                            <Input type="search" placeholder="Search" className="w-full rounded-md bg-muted/50 pl-9" />
                        </div>
                    </div>
                )}
                {isNarrow && (
                    <div className="flex gap-1">
                        <Button variant="ghost" size="icon" className="h-8 w-8"><ArrowDownUp className="h-4 w-4" /></Button>
                        <Button variant="ghost" size="icon" className="h-8 w-8"><SlidersHorizontal className="h-4 w-4" /></Button>
                    </div>
                )}
            </div>

            <div className="flex items-center justify-between border-b px-4 py-2">
                <Tabs defaultValue="todo" className="w-[400px]">
                    <TabsList className="grid w-full grid-cols-3">
                        <TabsTrigger value="todo">Todo</TabsTrigger>
                        <TabsTrigger value="followup">Follow up</TabsTrigger>
                        <TabsTrigger value="done">Done</TabsTrigger>
                    </TabsList>
                </Tabs>
                {!isNarrow && (
                    <div className="flex items-center gap-4 text-sm text-muted-foreground">
                        <button className="flex items-center gap-1 hover:text-foreground"><ArrowDownUp className="h-3 w-3" /> Sort by</button>
                        <button className="flex items-center gap-1 hover:text-foreground"><SlidersHorizontal className="h-3 w-3" /> Filter</button>
                    </div>
                )}
            </div>

            <ScrollArea className="flex-1">
                {isLoading ? (
                    <div className="p-8 text-center text-sm text-muted-foreground">Loading conversations...</div>
                ) : conversations.length === 0 ? (
                    <div className="p-8 text-center text-sm text-muted-foreground">No conversations found.</div>
                ) : (
                    <div className="divide-y">
                        {conversations.map((conv) => {
                            const isSelected = selectedId === conv.id;
                            const name = conv.guest_name || "Unknown Guest";
                            const initial = name.charAt(0).toUpperCase();

                            const dateStr = conv.last_message_at
                                ? formatDistanceToNow(new Date(conv.last_message_at), { addSuffix: true })
                                : "Just now";

                            return (
                                <div
                                    key={conv.id}
                                    onClick={() => onSelect(conv.id)}
                                    className={`flex cursor-pointer gap-4 p-4 transition-colors hover:bg-muted/50 ${isSelected ? 'bg-muted/50' : ''}`}
                                >
                                    <div className="relative">
                                        <Avatar className="h-10 w-10">
                                            <AvatarFallback className="bg-zinc-800 text-white">{initial}</AvatarFallback>
                                        </Avatar>
                                        <div className="absolute -bottom-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-background">
                                            <div className="h-3 w-3 rounded-full bg-red-500" />
                                        </div>
                                    </div>

                                    <div className="flex min-w-0 flex-1 flex-col">
                                        <div className="flex items-start justify-between">
                                            <span className="truncate font-semibold text-foreground">{name}</span>
                                            {isNarrow && <span className="shrink-0 text-xs text-muted-foreground">{dateStr}</span>}
                                        </div>
                                        {isNarrow ? (
                                            <span className="mt-1 truncate text-sm text-muted-foreground">Click to view thread</span>
                                        ) : (
                                            <div className="mt-1 flex items-center justify-between text-sm text-muted-foreground">
                                                <div className="flex items-center gap-3">
                                                    <Badge variant="secondary" className="bg-orange-100 text-orange-700 hover:bg-orange-100/80 rounded-md">
                                                        <AlertCircle className="mr-1 h-3 w-3" />
                                                        Inquiry
                                                    </Badge>
                                                    <span>May 2 - May 31</span>
                                                </div>
                                                <div className="flex items-center gap-2">
                                                    <Badge variant="outline" className="rounded-full">
                                                        <span className="mr-1 h-2 w-2 rounded-full bg-red-400" /> Needs Reply
                                                    </Badge>
                                                    <Badge variant="outline" className="rounded-full">
                                                        <span className="mr-1 h-2 w-2 rounded-full bg-purple-400" /> AI needs your help
                                                    </Badge>
                                                </div>
                                                <div className="flex items-center gap-6">
                                                    <span>{conv.property_name || "Unknown Property"}</span>
                                                    <span className="w-24 text-right text-xs">{dateStr}</span>
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                )}
            </ScrollArea>
        </div>
    );
};
