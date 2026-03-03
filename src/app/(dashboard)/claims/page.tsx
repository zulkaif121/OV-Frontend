import type { Metadata } from "next";
import { Suspense } from "react";

import { FeaturePage } from "@/features/claims/components/feature-page";
import { PageLoadingSkeleton } from "@/shared/components/page-loading-skeleton";

export const metadata: Metadata = {
  title: "Claims",
};

export default function ClaimsRoutePage() {
  return (
    <Suspense fallback={<PageLoadingSkeleton />}>
      <FeaturePage />
    </Suspense>
  );
}
