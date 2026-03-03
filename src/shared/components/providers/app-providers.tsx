"use client";

import * as React from "react";

import { appThemes, defaultAppTheme } from "@/config/theme";
import { QueryProvider } from "@/shared/components/providers/query-provider";
import { ThemeProvider } from "@/shared/components/providers/theme-provider";
import { TooltipProvider } from "@/shared/components/ui/tooltip";

export const AppProviders = ({ children }: { children: React.ReactNode }) => (
  <ThemeProvider
    attribute="class"
    themes={[...appThemes]}
    defaultTheme={defaultAppTheme}
    enableSystem={false}
    disableTransitionOnChange
  >
    <QueryProvider>
      <TooltipProvider>{children}</TooltipProvider>
    </QueryProvider>
  </ThemeProvider>
);
