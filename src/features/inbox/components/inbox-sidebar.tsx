import { Inbox, Hammer, Mail, Smartphone, MessageCircle, Link, Briefcase } from "lucide-react";
import { Button } from "@/shared/components/ui/button";

interface InboxSidebarProps {
    onSelectFolder: (folderId: string) => void;
}

export const InboxSidebar = ({ onSelectFolder }: InboxSidebarProps) => {
    return (
        <div className="flex flex-col gap-6 py-4 px-4 h-full bg-transparent">
            {/* Main Inbox Actions */}
            <div className="space-y-1">
                <Button variant="secondary" className="w-full justify-start gap-3 px-2 h-9 font-medium" onClick={() => onSelectFolder("all")}>
                    <Inbox className="h-4 w-4 shrink-0" />
                    All conversations
                </Button>
                <Button variant="ghost" className="w-full justify-start gap-3 px-2 h-9 font-medium text-muted-foreground" onClick={() => onSelectFolder("yours")}>
                    <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-md bg-primary/20 text-[11px] font-bold text-foreground">YC</div>
                    Your conversations
                </Button>
            </div>

            {/* Your Inboxes */}
            <div>
                <h3 className="mb-2 px-2 text-xs font-semibold uppercase tracking-wider text-sidebar-foreground/70">Your inboxes</h3>
                <div className="space-y-1">
                    <Button variant="ghost" className="w-full justify-between font-medium text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground" size="sm" onClick={() => onSelectFolder("guest")}>
                        <span className="flex items-center gap-2"><Briefcase className="h-4 w-4" /> Guest</span>
                        <span className="text-xs">33</span>
                    </Button>
                    <Button variant="ghost" className="w-full justify-between font-medium text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground" size="sm" onClick={() => onSelectFolder("maintenance")}>
                        <span className="flex items-center gap-2"><Hammer className="h-4 w-4" /> Maintenance</span>
                    </Button>
                </div>
            </div>

            {/* Unknown Contacts */}
            <div>
                <h3 className="mb-2 px-2 text-xs font-semibold uppercase tracking-wider text-sidebar-foreground/70">Unknown contacts</h3>
                <div className="space-y-1">
                    <Button variant="ghost" className="w-full justify-between font-medium text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground" size="sm">
                        <span className="flex items-center gap-2"><Mail className="h-4 w-4" /> Email</span>
                        <span className="text-xs">4</span>
                    </Button>
                    <Button variant="ghost" className="w-full justify-between font-medium text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground" size="sm">
                        <span className="flex items-center gap-2"><Smartphone className="h-4 w-4" /> Text</span>
                        <span className="text-xs">3</span>
                    </Button>
                    <Button variant="ghost" className="w-full justify-start gap-3 font-medium text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground" size="sm">
                        <MessageCircle className="h-4 w-4" /> WhatsApp
                    </Button>
                    <Button variant="ghost" className="w-full justify-start gap-3 font-medium text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground" size="sm">
                        <Link className="h-4 w-4" /> Widget
                    </Button>
                </div>
            </div>
        </div>
    );
};
