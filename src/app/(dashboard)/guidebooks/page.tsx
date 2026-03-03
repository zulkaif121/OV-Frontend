import type { Metadata } from "next";
import { Suspense } from "react";

import { FeaturePage } from "@/features/guidebooks/components/feature-page";
import { PageLoadingSkeleton } from "@/shared/components/page-loading-skeleton";

export const metadata: Metadata = {
  title: "Guidebooks",
};

export default function GuidebooksRoutePage() {
  return (
    <Suspense fallback={<PageLoadingSkeleton />}>
      <FeaturePage />
    </Suspense>
  );
}
