import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { Suspense } from "react";

import { VerifyOtpForm } from "@/features/auth/components/verify-otp-form";
import { getUiOnlyDefaultRoute, isUiOnlyMode } from "@/lib/dev-mode";
import { Skeleton } from "@/shared/components/ui/skeleton";

export const metadata: Metadata = {
  title: "Verify OTP",
};

const VerifyOtpFallback = () => (
  <div className="space-y-4 rounded-xl border bg-[hsl(var(--card))] p-6">
    <Skeleton className="h-8 w-44" />
    <Skeleton className="h-10 w-full" />
    <Skeleton className="h-10 w-full" />
    <Skeleton className="h-10 w-full" />
  </div>
);

export default function VerifyOtpPage() {
  if (isUiOnlyMode()) {
    redirect(getUiOnlyDefaultRoute());
  }

  return (
    <Suspense fallback={<VerifyOtpFallback />}>
      <VerifyOtpForm />
    </Suspense>
  );
}
