import type { Metadata } from "next";
import { Suspense } from "react";

import { FeaturePage } from "@/features/wiki/components/feature-page";
import { PageLoadingSkeleton } from "@/shared/components/page-loading-skeleton";

export const metadata: Metadata = {
  title: "Wiki",
};

export default function WikiRoutePage() {
  return (
    <Suspense fallback={<PageLoadingSkeleton />}>
      <FeaturePage />
    </Suspense>
  );
}
