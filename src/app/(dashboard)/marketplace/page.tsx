import type { Metadata } from "next";
import { Suspense } from "react";

import { FeaturePage } from "@/features/marketplace/components/feature-page";
import { PageLoadingSkeleton } from "@/shared/components/page-loading-skeleton";

export const metadata: Metadata = {
  title: "Marketplace",
};

export default function MarketplaceRoutePage() {
  return (
    <Suspense fallback={<PageLoadingSkeleton />}>
      <FeaturePage />
    </Suspense>
  );
}
