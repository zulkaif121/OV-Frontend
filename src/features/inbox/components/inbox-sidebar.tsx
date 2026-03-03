import { Inbox, Hammer, Mail, Smartphone, MessageCircle, Link } from "lucide-react";
import { Button } from "@/shared/components/ui/button";

export const InboxSidebar = () => {
    return (
        <div className="flex flex-col gap-6 py-4 px-4 h-full bg-transparent">
            {/* Main Inbox Actions */}
            <div className="space-y-1">
                <Button variant="secondary" className="w-full justify-start gap-3 font-medium" size="lg">
                    <Inbox className="h-5 w-5" />
                    All conversations
                </Button>
                <Button variant="ghost" className="w-full justify-start gap-3 font-medium text-muted-foreground" size="lg">
                    <div className="flex h-5 w-5 items-center justify-center rounded-full bg-primary/20 text-xs font-bold text-primary">A</div>
                    Your conversations
                </Button>
            </div>

            {/* Your Inboxes */}
            <div>
                <h3 className="mb-2 px-2 text-xs font-semibold uppercase tracking-wider text-muted-foreground">Your inboxes</h3>
                <div className="space-y-1">
                    <Button variant="ghost" className="w-full justify-between font-medium text-muted-foreground" size="sm">
                        <span className="flex items-center gap-2"><Inbox className="h-4 w-4" /> Guest</span>
                        <span className="text-xs">33</span>
                    </Button>
                    <Button variant="ghost" className="w-full justify-between font-medium text-muted-foreground" size="sm">
                        <span className="flex items-center gap-2"><Hammer className="h-4 w-4" /> Maintenance</span>
                    </Button>
                </div>
            </div>

            {/* Unknown Contacts */}
            <div>
                <h3 className="mb-2 px-2 text-xs font-semibold uppercase tracking-wider text-muted-foreground">Unknown contacts</h3>
                <div className="space-y-1">
                    <Button variant="ghost" className="w-full justify-between font-medium text-muted-foreground" size="sm">
                        <span className="flex items-center gap-2"><Mail className="h-4 w-4" /> Email</span>
                        <span className="text-xs">4</span>
                    </Button>
                    <Button variant="ghost" className="w-full justify-between font-medium text-muted-foreground" size="sm">
                        <span className="flex items-center gap-2"><Smartphone className="h-4 w-4" /> Text</span>
                        <span className="text-xs">3</span>
                    </Button>
                    <Button variant="ghost" className="w-full justify-start gap-3 font-medium text-muted-foreground" size="sm">
                        <MessageCircle className="h-4 w-4" /> WhatsApp
                    </Button>
                    <Button variant="ghost" className="w-full justify-start gap-3 font-medium text-muted-foreground" size="sm">
                        <Link className="h-4 w-4" /> Widget
                    </Button>
                </div>
            </div>
        </div>
    );
};
