"use client";

import Link from "next/link";
import { Bell, ChevronDown, Palette, Search, Sparkles } from "lucide-react";
import { useTheme } from "next-themes";

import type { AppRole } from "@/config/roles";
import { appThemeOptions, defaultAppTheme, isAppTheme, type AppTheme } from "@/config/theme";
import { Button } from "@/shared/components/ui/button";
import { SidebarTrigger } from "@/shared/components/ui/sidebar";
import { useUiStore } from "@/shared/stores/ui-store";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/shared/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/shared/components/ui/avatar";

interface HeaderProps {
  role: AppRole;
  email: string | null;
}

export const Header = ({ role, email }: HeaderProps) => {
  const { resolvedTheme, setTheme } = useTheme();
  const setCommandPaletteOpen = useUiStore((state) => state.setCommandPaletteOpen);
  const themeValue = resolvedTheme ?? defaultAppTheme;
  const activeTheme: AppTheme = isAppTheme(themeValue) ? themeValue : defaultAppTheme;
  const activeThemeLabel = appThemeOptions.find((theme) => theme.value === activeTheme)?.label ?? "Theme";

  return (
    <header className="sticky top-0 z-20 flex h-14 shrink-0 items-center justify-between border-b bg-background/95 px-4 backdrop-blur-sm md:px-6 transition-all ease-linear shadow-sm">
      {/* Left section: Sidebar trigger (visible on mobile/when collapsed) */}
      <div className="flex items-center gap-2">
        <SidebarTrigger className="-ml-2 text-muted-foreground hover:text-foreground" />
      </div>

      {/* Center section: Search bar */}
      <div className="flex flex-1 items-center justify-start ml-2 md:ml-4">
        <Button
          variant="outline"
          className="relative h-9 w-full max-w-[240px] md:max-w-[320px] lg:max-w-[400px] justify-start rounded-md bg-muted/40 hover:bg-muted/60 text-sm font-normal text-muted-foreground shadow-none pr-12 transition-colors border-transparent hover:border-border/50"
          onClick={() => setCommandPaletteOpen(true)}
        >
          <Search className="mr-2 h-4 w-4 shrink-0" />
          <span className="truncate">Search workspace...</span>
          <kbd className="pointer-events-none absolute right-[0.3rem] top-[0.3rem] hidden h-6 select-none items-center gap-1 rounded border bg-background/50 px-1.5 font-mono text-[10px] font-medium opacity-100 sm:flex">
            <span className="text-xs">⌘</span>K
          </kbd>
        </Button>
      </div>

      {/* Right section: Actions and Profile */}
      <div className="flex items-center gap-1.5 sm:gap-2 ml-auto shrink-0">
        <Button 
          variant="outline" 
          size="sm" 
          className="hidden h-9 sm:flex bg-primary/5 text-primary border-primary/20 hover:bg-primary/10 hover:text-primary transition-colors"
          asChild
        >
          <Link href="/ai-copilot">
            <Sparkles className="mr-2 h-4 w-4" />
            <span>AI Copilot</span>
          </Link>
        </Button>

        <Button 
          variant="ghost" 
          size="icon" 
          className="h-9 w-9 sm:hidden text-primary hover:text-primary hover:bg-primary/10"
          asChild
        >
          <Link href="/ai-copilot">
            <Sparkles className="h-4 w-4" />
            <span className="sr-only">AI Copilot</span>
          </Link>
        </Button>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="ghost"
              className="h-9 gap-1.5 px-2 text-muted-foreground hover:text-foreground sm:gap-2 sm:px-3"
            >
              <Palette className="h-4 w-4" />
              <span className="hidden text-xs font-medium sm:inline">{activeThemeLabel}</span>
              <ChevronDown className="h-3.5 w-3.5 opacity-70" />
              <span className="sr-only">Select theme</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-40">
            <DropdownMenuLabel>Theme</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuRadioGroup
              value={activeTheme}
              onValueChange={(value) => {
                if (isAppTheme(value)) {
                  setTheme(value);
                }
              }}
            >
              {appThemeOptions.map((themeOption) => (
                <DropdownMenuRadioItem key={themeOption.value} value={themeOption.value}>
                  {themeOption.label}
                </DropdownMenuRadioItem>
              ))}
            </DropdownMenuRadioGroup>
          </DropdownMenuContent>
        </DropdownMenu>

        <Button variant="ghost" size="icon" className="h-9 w-9 relative text-muted-foreground hover:text-foreground">
          <Bell className="h-4 w-4" />
          <span className="absolute right-2.5 top-2.5 h-2 w-2 rounded-full bg-destructive border-2 border-background" />
          <span className="sr-only">Notifications</span>
        </Button>

        <div className="mx-1 h-4 w-px bg-border hidden sm:block" />

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="relative h-9 w-9 rounded-full sm:ml-1">
              <Avatar className="h-8 w-8 border border-border/50">
                <AvatarImage src="" alt={email ?? "User"} />
                <AvatarFallback className="bg-muted text-foreground text-xs font-medium">
                  {email?.charAt(0).toUpperCase() ?? "U"}
                </AvatarFallback>
              </Avatar>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-56" align="end" forceMount>
            <DropdownMenuLabel className="font-normal">
              <div className="flex flex-col space-y-1">
                <p className="text-sm font-medium leading-none capitalize">{role.toLowerCase()}</p>
                <p className="text-xs leading-none text-muted-foreground">
                  {email ?? "No email"}
                </p>
              </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem>Profile</DropdownMenuItem>
            <DropdownMenuItem>Settings</DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem asChild>
               <Link href="/api/auth/signout" className="w-full cursor-pointer">Log out</Link>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
};
