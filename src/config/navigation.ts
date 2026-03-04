import {
  Activity,
  BadgeDollarSign,
  Bell,
  BookOpen,
  Briefcase,
  Building2,
  Calendar,
  CircuitBoard,
  ClipboardList,
  Compass,
  FileClock,
  FolderKanban,
  HandCoins,
  House,
  Inbox,
  LayoutDashboard,
  MessageSquare,
  Settings,
  ShoppingBasket,
  Sparkles,
  Timer,
  UserCog,
  Wrench,
} from "lucide-react";
import type { ComponentType } from "react";

import type { AppRole } from "@/config/roles";

export interface NavItem {
  title: string;
  href: string;
  icon: ComponentType<{ className?: string }>;
}

export interface NavSection {
  label: string;
  items: NavItem[];
}

export const navigationByRole: Record<AppRole, NavSection[]> = {
  SUPERADMIN: [
    {
      label: "Overview",
      items: [
        { title: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
        { title: "Today", href: "/today", icon: Calendar },
        { title: "Inbox", href: "/inbox", icon: Inbox },
        { title: "Calendar", href: "/calendar", icon: Calendar },
      ],
    },
    {
      label: "Operations",
      items: [
        { title: "Tasks", href: "/tasks", icon: ClipboardList },
        { title: "Signals", href: "/signals", icon: Activity },
        { title: "AI Triage", href: "/vendor-triage", icon: Wrench },
        { title: "Ask AI", href: "/ai-copilot", icon: Sparkles },
        { title: "Properties", href: "/properties", icon: Building2 },
        { title: "Vendors", href: "/vendors", icon: Briefcase },
        { title: "Vendor Portal", href: "/vendor-portal", icon: Wrench },
        { title: "SMS Preview", href: "/sms-preview", icon: MessageSquare },
        { title: "Job Card", href: "/tracker", icon: Timer },
      ],
    },
    {
      label: "Intelligence",
      items: [
        { title: "Reports", href: "/reports", icon: FileClock },
        { title: "Supplies", href: "/supplies", icon: ShoppingBasket },
        { title: "Wiki", href: "/wiki", icon: BookOpen },
        { title: "Guidebooks", href: "/guidebooks", icon: MessageSquare },
      ],
    },
    {
      label: "Finance",
      items: [
        { title: "Money", href: "/money", icon: BadgeDollarSign },
        { title: "Upsells", href: "/upsells", icon: Bell },
        { title: "Claims", href: "/claims", icon: HandCoins },
      ],
    },
    {
      label: "Platform",
      items: [
        { title: "Workflows", href: "/workflows", icon: FolderKanban },
        { title: "Devices", href: "/smart-devices", icon: Compass },
        { title: "Integrations", href: "/integrations", icon: CircuitBoard },
        { title: "Settings", href: "/settings", icon: Settings },
        { title: "Feature Requests", href: "/feature-requests", icon: Bell },
        { title: "Help", href: "/help", icon: BookOpen },
      ],
    },
  ],
  ADMIN: [
    {
      label: "Overview",
      items: [
        { title: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
        { title: "Today", href: "/today", icon: Calendar },
        { title: "Calendar", href: "/calendar", icon: Calendar },
        { title: "Inbox", href: "/inbox", icon: Inbox },
      ],
    },
    {
      label: "Operations",
      items: [
        { title: "Tasks", href: "/tasks", icon: ClipboardList },
        { title: "Properties", href: "/properties", icon: Building2 },
        { title: "Vendors", href: "/vendors", icon: Briefcase },
        { title: "Vendor Triage", href: "/vendor-triage", icon: Wrench },
      ],
    },
    {
      label: "Finance",
      items: [
        { title: "Money", href: "/money", icon: BadgeDollarSign },
        { title: "Claims", href: "/claims", icon: HandCoins },
        { title: "Upsells", href: "/upsells", icon: Bell },
      ],
    },
    {
      label: "Platform",
      items: [
        { title: "Settings", href: "/settings", icon: Settings },
        { title: "Integrations", href: "/integrations", icon: CircuitBoard },
      ],
    },
  ],
  MANAGER: [
    {
      label: "Overview",
      items: [
        { title: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
        { title: "Today", href: "/today", icon: Calendar },
        { title: "Calendar", href: "/calendar", icon: Calendar },
        { title: "Inbox", href: "/inbox", icon: Inbox },
      ],
    },
    {
      label: "Operations",
      items: [
        { title: "Tasks", href: "/tasks", icon: ClipboardList },
        { title: "Properties", href: "/properties", icon: Building2 },
        { title: "Vendors", href: "/vendors", icon: Briefcase },
        { title: "Signals", href: "/signals", icon: Activity },
      ],
    },
    {
      label: "Knowledge",
      items: [
        { title: "Wiki", href: "/wiki", icon: BookOpen },
        { title: "Guidebooks", href: "/guidebooks", icon: MessageSquare },
        { title: "Supplies", href: "/supplies", icon: ShoppingBasket },
      ],
    },
    {
      label: "Control",
      items: [
        { title: "Settings", href: "/settings", icon: Settings },
        { title: "Reports", href: "/reports", icon: FileClock },
      ],
    },
  ],
  ASSISTANT: [
    {
      label: "Core",
      items: [
        { title: "Assistant Hub", href: "/assistant", icon: UserCog },
        { title: "Today", href: "/today", icon: Calendar },
        { title: "Calendar", href: "/calendar", icon: Calendar },
        { title: "Inbox", href: "/inbox", icon: Inbox },
        { title: "Tasks", href: "/tasks", icon: ClipboardList },
      ],
    },
  ],
  OWNER: [
    {
      label: "Owner",
      items: [
        { title: "Owner Dashboard", href: "/owner", icon: House },
        { title: "Reports", href: "/reports", icon: FileClock },
        { title: "Claims", href: "/claims", icon: HandCoins },
      ],
    },
  ],
  CLEANER: [
    {
      label: "Cleaner",
      items: [
        { title: "Cleaner Dashboard", href: "/cleaner", icon: House },
        { title: "Tasks", href: "/tasks", icon: ClipboardList },
        { title: "Staff Mobile", href: "/staff-mobile", icon: MessageSquare },
      ],
    },
  ],
  MAINTENANCE: [
    {
      label: "Maintenance",
      items: [
        { title: "Maintenance Dashboard", href: "/maintenance", icon: House },
        { title: "Tasks", href: "/tasks", icon: ClipboardList },
        { title: "Vendor Portal", href: "/vendor-portal", icon: Wrench },
      ],
    },
  ],
  GUEST: [
    {
      label: "Guest",
      items: [{ title: "Today", href: "/today", icon: Calendar }],
    },
  ],
};
