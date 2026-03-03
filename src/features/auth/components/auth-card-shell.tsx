import type { ReactNode } from "react";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/shared/components/ui/card";

interface AuthCardShellProps {
  title: string;
  description: string;
  children: ReactNode;
}

export const AuthCardShell = ({ title, description, children }: AuthCardShellProps) => (
  <Card className="w-full max-w-md">
    <CardHeader>
      <p className="text-xs font-semibold uppercase tracking-[0.14em] text-[hsl(var(--muted-foreground))]">OVI Platform</p>
      <CardTitle>{title}</CardTitle>
      <CardDescription>{description}</CardDescription>
    </CardHeader>
    <CardContent>{children}</CardContent>
  </Card>
);
