"use client";

import { useEffect } from "react";

import { Button } from "@/shared/components/ui/button";

export default function AuthError({
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
    <div className="mx-auto max-w-md space-y-4 rounded-xl border bg-[hsl(var(--card))] p-6 text-center">
      <h2 className="text-lg font-semibold">Authentication Error</h2>
      <p className="text-sm text-[hsl(var(--muted-foreground))]">Unable to load this authentication screen.</p>
      <Button onClick={reset}>Retry</Button>
    </div>
  );
}
