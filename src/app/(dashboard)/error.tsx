"use client";

import { useEffect } from "react";

import { Button } from "@/shared/components/ui/button";

export default function DashboardError({
  error,
  reset,
}: Readonly<{
  error: Error & { digest?: string };
  reset: () => void;
}>) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="space-y-3 rounded-xl border bg-[hsl(var(--card))] p-6">
      <h2 className="text-lg font-semibold">Dashboard Error</h2>
      <p className="text-sm text-[hsl(var(--muted-foreground))]">This module could not load.</p>
      <Button onClick={reset}>Retry</Button>
    </div>
  );
}
