import type { Metadata } from "next";
import { Suspense } from "react";

import { FeaturePage } from "@/features/supplies/components/feature-page";
import { PageLoadingSkeleton } from "@/shared/components/page-loading-skeleton";

export const metadata: Metadata = {
  title: "Supplies",
};

export default function SuppliesRoutePage() {
  return (
    <Suspense fallback={<PageLoadingSkeleton />}>
      <FeaturePage />
    </Suspense>
  );
}
