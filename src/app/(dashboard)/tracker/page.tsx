import type { Metadata } from "next";
import { Suspense } from "react";

import { FeaturePage } from "@/features/tracker/components/feature-page";
import { PageLoadingSkeleton } from "@/shared/components/page-loading-skeleton";

export const metadata: Metadata = {
  title: "Tracker",
};

export default function TrackerRoutePage() {
  return (
    <Suspense fallback={<PageLoadingSkeleton />}>
      <FeaturePage />
    </Suspense>
  );
}
