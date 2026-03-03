import Link from "next/link";

import { buttonVariants } from "@/shared/components/ui/button";

export default function NotFoundPage() {
  return (
    <main className="mx-auto flex min-h-screen max-w-lg flex-col items-center justify-center gap-4 px-4 text-center">
      <p className="text-xs font-semibold uppercase tracking-[0.14em] text-[hsl(var(--muted-foreground))]">404</p>
      <h1 className="text-3xl font-semibold">Page not found</h1>
      <p className="text-sm text-[hsl(var(--muted-foreground))]">The page you requested does not exist or you may not have access.</p>
      <Link href="/dashboard" className={buttonVariants({ variant: "primary" })}>
        Go to dashboard
      </Link>
    </main>
  );
}
