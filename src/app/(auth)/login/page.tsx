import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { Suspense } from "react";

import { LoginForm } from "@/features/auth/components/login-form";
import { getUiOnlyDefaultRoute, isUiOnlyMode } from "@/lib/dev-mode";
import { Skeleton } from "@/shared/components/ui/skeleton";

export const metadata: Metadata = {
  title: "Login",
};

const LoginFallback = () => (
  <div className="space-y-4 rounded-xl border bg-[hsl(var(--card))] p-6">
    <Skeleton className="h-8 w-40" />
    <Skeleton className="h-10 w-full" />
    <Skeleton className="h-10 w-full" />
    <Skeleton className="h-10 w-full" />
  </div>
);

export default function LoginPage() {
  if (isUiOnlyMode()) {
    redirect(getUiOnlyDefaultRoute());
  }

  return (
    <Suspense fallback={<LoginFallback />}>
      <LoginForm />
    </Suspense>
  );
}
