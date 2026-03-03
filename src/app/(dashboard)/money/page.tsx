import type { Metadata } from "next";
import { Suspense } from "react";

import { FeaturePage } from "@/features/money/components/feature-page";
import { PageLoadingSkeleton } from "@/shared/components/page-loading-skeleton";

export const metadata: Metadata = {
  title: "Money",
};

export default function MoneyRoutePage() {
  return (
    <Suspense fallback={<PageLoadingSkeleton />}>
      <FeaturePage />
    </Suspense>
  );
}
