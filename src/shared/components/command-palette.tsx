"use client";

import { usePathname, useRouter } from "next/navigation";
import * as React from "react";

import { navigationByRole } from "@/config/navigation";
import type { AppRole } from "@/config/roles";
import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandShortcut,
} from "@/shared/components/ui/command";
import { useUiStore } from "@/shared/stores/ui-store";

interface CommandPaletteProps {
  role: AppRole;
}

interface RecentItem {
  href: string;
  title: string;
}

const RECENT_STORAGE_KEY = "ovi-command-recent";

const quickActions = [
  { key: "create-task", title: "Create Task", href: "/tasks", shortcut: "T" },
  { key: "go-inbox", title: "Go to Inbox", href: "/inbox", shortcut: "I" },
];

export const CommandPalette = ({ role }: CommandPaletteProps) => {
  const router = useRouter();
  const pathname = usePathname();
  const open = useUiStore((state) => state.commandPaletteOpen);
  const setOpen = useUiStore((state) => state.setCommandPaletteOpen);
  const [recent, setRecent] = React.useState<RecentItem[]>([]);

  const navItems = React.useMemo(
    () =>
      navigationByRole[role].flatMap((section) =>
        section.items.map((item) => ({
          ...item,
          key: `${section.label}-${item.href}`,
        })),
      ),
    [role],
  );

  React.useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === "k") {
        event.preventDefault();
        setOpen(!open);
      }
      if (event.key === "Escape") {
        setOpen(false);
      }
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [open, setOpen]);

  React.useEffect(() => {
    if (typeof window === "undefined") {
      return;
    }

    const raw = window.localStorage.getItem(RECENT_STORAGE_KEY);
    if (!raw) {
      return;
    }

    try {
      const parsed = JSON.parse(raw) as unknown;
      if (Array.isArray(parsed)) {
        const items = parsed.filter(
          (item): item is RecentItem =>
            typeof item === "object" &&
            item !== null &&
            "href" in item &&
            "title" in item &&
            typeof item.href === "string" &&
            typeof item.title === "string",
        );
        setRecent(items.slice(0, 5));
      }
    } catch {
      window.localStorage.removeItem(RECENT_STORAGE_KEY);
    }
  }, []);

  const handleSelect = React.useCallback(
    (href: string, title: string) => {
      router.push(href);
      setRecent((prev) => {
        const next = [{ href, title }, ...prev.filter((item) => item.href !== href)].slice(0, 5);
        if (typeof window !== "undefined") {
          window.localStorage.setItem(RECENT_STORAGE_KEY, JSON.stringify(next));
        }
        return next;
      });
      setOpen(false);
    },
    [router, setOpen],
  );

  return (
    <CommandDialog open={open} onOpenChange={setOpen} title="Global Search" description="Search tasks, properties, vendors and wiki.">
      <CommandInput placeholder="Search tasks, properties, vendors, wiki..." />
      <CommandList>
        <CommandEmpty>No results found.</CommandEmpty>

        {recent.length > 0 ? (
          <CommandGroup heading="Recent">
            {recent.map((item) => (
              <CommandItem key={`recent-${item.href}`} value={`recent ${item.title}`} onSelect={() => handleSelect(item.href, item.title)}>
                {item.title}
              </CommandItem>
            ))}
          </CommandGroup>
        ) : null}

        <CommandGroup heading="Navigation">
          {navItems.map((item) => (
            <CommandItem key={item.key} value={`nav ${item.title} ${item.href}`} onSelect={() => handleSelect(item.href, item.title)}>
              {item.title}
              <CommandShortcut>{item.href === pathname ? "Active" : item.href}</CommandShortcut>
            </CommandItem>
          ))}
        </CommandGroup>

        <CommandGroup heading="Quick Actions">
          {quickActions.map((action) => (
            <CommandItem
              key={action.key}
              value={`action ${action.title}`}
              onSelect={() => handleSelect(action.href, action.title)}
            >
              {action.title}
              <CommandShortcut>{action.shortcut}</CommandShortcut>
            </CommandItem>
          ))}
        </CommandGroup>
      </CommandList>
    </CommandDialog>
  );
};
