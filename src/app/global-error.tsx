"use client";

import { useEffect } from "react";

import { Button } from "@/shared/components/ui/button";

export default function GlobalError({
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
    <html lang="en">
      <body>
        <main className="mx-auto flex min-h-screen max-w-lg flex-col items-center justify-center gap-4 px-4 text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.14em] text-[hsl(var(--muted-foreground))]">Error Boundary</p>
          <h1 className="text-2xl font-semibold">Something went wrong</h1>
          <p className="text-sm text-[hsl(var(--muted-foreground))]">An unexpected client or server error occurred.</p>
          <Button onClick={reset}>Try again</Button>
        </main>
      </body>
    </html>
  );
}
