import { Separator } from "@/shared/components/ui/separator";
import { Tabs, TabsList, TabsTrigger } from "@/shared/components/ui/tabs";
import { Plus, LayoutPanelLeft, Box, Pause } from "lucide-react";
import { Button } from "@/shared/components/ui/button";
import type { Conversation } from "../hooks/use-inbox";

export const ContextPanel = ({ conversation }: { conversation: Conversation }) => {
    return (
        <div className="flex h-full flex-col overflow-y-auto bg-muted/10 p-6">
            <h3 className="mb-4 text-lg font-semibold">At a glance</h3>

            <div className="mb-6 rounded-2xl border bg-background p-4 shadow-sm">
                <div className="mb-4 flex items-center justify-between">
                    <span className="font-semibold text-foreground">Before Stay</span>
                    <span className="text-sm font-medium text-muted-foreground">May 02 - May 31</span>
                </div>
                <div className="grid grid-cols-3 gap-2">
                    <div className="h-1 rounded-full bg-primary/20" />
                    <div className="h-1 rounded-full bg-muted" />
                    <div className="h-1 rounded-full bg-muted" />
                </div>
                <div className="mt-2 grid grid-cols-3 gap-2 text-[10px] font-semibold tracking-wider text-muted-foreground">
                    <span>BEFORE</span>
                    <span className="text-center">DURING</span>
                    <span className="text-right">AFTER</span>
                </div>
            </div>

            <div className="mb-6 rounded-2xl border bg-background p-4 shadow-sm">
                <div className="mb-3 flex items-start gap-2">
                    <div className="mt-0.5"><span className="flex h-4 w-4 items-center justify-center font-serif text-lg leading-none">✨</span></div>
                    <h4 className="font-semibold text-foreground">{conversation.guest_name?.split(' ')[0] || "Guest"} is doing great</h4>
                </div>
                <div className="space-y-2 text-xs leading-relaxed text-muted-foreground">
                    <p>- {conversation.guest_name?.split(' ')[0] || "Guest"} asks if a special offer will be sent for the agreed flat rate.</p>
                    <p>- The agent explains that their rate is already below clarifying fees account for the difference.</p>
                    <p>- Apologizes for letting the special offer expire, expresses continued gratitude.</p>
                </div>
            </div>

            <div className="mb-8 flex items-center gap-2">
                <span className="text-sm text-foreground">Conversation Tags</span>
                <Button variant="ghost" size="icon" className="ml-auto h-6 w-6"><Plus className="h-4 w-4 text-muted-foreground" /></Button>
            </div>

            <div className="mb-4 flex items-center justify-between">
                <h3 className="text-lg font-semibold">About</h3>
                <div className="flex gap-1">
                    <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground"><LayoutPanelLeft className="h-4 w-4" /></Button>
                    <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground"><Box className="h-4 w-4" /></Button>
                    <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground"><Pause className="h-4 w-4" /></Button>
                </div>
            </div>

            <Tabs defaultValue="booking" className="w-full">
                <TabsList className="h-9 w-full justify-start rounded-none border-b bg-transparent p-0">
                    <TabsTrigger value="booking" className="relative h-9 rounded-none border-b-2 border-b-transparent bg-transparent px-2 pb-3 pt-2 text-sm font-semibold text-muted-foreground shadow-none transition-none data-[state=active]:border-b-primary data-[state=active]:text-foreground data-[state=active]:shadow-none">Booking V</TabsTrigger>
                    <TabsTrigger value="contact" className="relative h-9 rounded-none border-b-2 border-b-transparent bg-transparent px-2 pb-3 pt-2 text-sm font-semibold text-muted-foreground shadow-none transition-none data-[state=active]:border-b-primary data-[state=active]:text-foreground data-[state=active]:shadow-none">Contact</TabsTrigger>
                    <TabsTrigger value="appts" className="relative h-9 rounded-none border-b-2 border-b-transparent bg-transparent px-2 pb-3 pt-2 text-sm font-semibold text-muted-foreground shadow-none transition-none data-[state=active]:border-b-primary data-[state=active]:text-foreground data-[state=active]:shadow-none">Appts.</TabsTrigger>
                    <TabsTrigger value="tasks" className="relative h-9 rounded-none border-b-2 border-b-transparent bg-transparent px-2 pb-3 pt-2 text-sm font-semibold text-muted-foreground shadow-none transition-none data-[state=active]:border-b-primary data-[state=active]:text-foreground data-[state=active]:shadow-none">Tasks</TabsTrigger>
                    <TabsTrigger value="calls" className="relative h-9 rounded-none border-b-2 border-b-transparent bg-transparent px-2 pb-3 pt-2 text-sm font-semibold text-muted-foreground shadow-none transition-none data-[state=active]:border-b-primary data-[state=active]:text-foreground data-[state=active]:shadow-none">Calls</TabsTrigger>
                </TabsList>
            </Tabs>

            <div className="mt-4 rounded-xl border bg-background p-4 shadow-sm">
                <div className="flex items-center gap-3">
                    <div className="h-10 w-16 overflow-hidden rounded-md bg-muted">
                        {/* Mock image placeholder */}
                        <div className="h-full w-full bg-gradient-to-r from-orange-200 to-pink-200" />
                    </div>
                    <div>
                        <div className="font-semibold text-sm">UT-E1492</div>
                        <div className="text-xs text-muted-foreground">Beautiful Alpine Retreat</div>
                    </div>
                </div>
            </div>
        </div>
    );
};
