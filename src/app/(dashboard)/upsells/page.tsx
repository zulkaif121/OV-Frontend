import type { Metadata } from "next";
import { Suspense } from "react";

import { FeaturePage } from "@/features/upsells/components/feature-page";
import { PageLoadingSkeleton } from "@/shared/components/page-loading-skeleton";

export const metadata: Metadata = {
  title: "Upsells",
};

export default function UpsellsRoutePage() {
  return (
    <Suspense fallback={<PageLoadingSkeleton />}>
      <FeaturePage />
    </Suspense>
  );
}
