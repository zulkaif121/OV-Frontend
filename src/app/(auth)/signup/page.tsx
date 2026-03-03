import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { Suspense } from "react";

import { SignupForm } from "@/features/auth/components/signup-form";
import { getUiOnlyDefaultRoute, isUiOnlyMode } from "@/lib/dev-mode";
import { Skeleton } from "@/shared/components/ui/skeleton";

export const metadata: Metadata = {
  title: "Signup",
};

const SignupFallback = () => (
  <div className="space-y-4 rounded-xl border bg-[hsl(var(--card))] p-6">
    <Skeleton className="h-8 w-40" />
    <Skeleton className="h-10 w-full" />
    <Skeleton className="h-10 w-full" />
    <Skeleton className="h-10 w-full" />
    <Skeleton className="h-10 w-full" />
  </div>
);

export default function SignupPage() {
  if (isUiOnlyMode()) {
    redirect(getUiOnlyDefaultRoute());
  }

  return (
    <Suspense fallback={<SignupFallback />}>
      <SignupForm />
    </Suspense>
  );
}
