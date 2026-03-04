"use client";

import * as React from "react";

import type { AppRole } from "@/config/roles";
import { CommandPalette } from "@/shared/components/command-palette";
import { Header } from "@/shared/components/header";
import { SideSheet } from "@/shared/components/side-sheet";
import { Sidebar } from "@/shared/components/sidebar";
import { SidebarProvider, SidebarInset } from "@/shared/components/ui/sidebar";

interface AppShellProps {
  role: AppRole;
  email: string | null;
  children: React.ReactNode;
}

export const AppShell = ({ role, email, children }: AppShellProps) => {
  React.useEffect(() => {
    if (typeof document === "undefined") {
      return;
    }
    const match = document.cookie.match(/(?:^|;\s*)ovi-org-id=([^;]+)/);
    if (match?.[1]) {
      window.localStorage.setItem("ovi-org-id", decodeURIComponent(match[1]));
    }
  }, []);

  return (
    <SidebarProvider>
      <Sidebar role={role} email={email} />
      <SidebarInset>
        <Header role={role} email={email} />
        <main className="flex-1 min-w-0 overflow-x-hidden overflow-y-auto px-4 py-6 md:px-6 lg:px-8">
          {children}
        </main>
      </SidebarInset>
      <SideSheet />
      <CommandPalette role={role} />
    </SidebarProvider>
  );
};
