import type { Metadata } from "next";
import { Suspense } from "react";

import { FeaturePage } from "@/features/cleaner/components/feature-page";
import { PageLoadingSkeleton } from "@/shared/components/page-loading-skeleton";

export const metadata: Metadata = {
  title: "Cleaner",
};

export default function CleanerRoutePage() {
  return (
    <Suspense fallback={<PageLoadingSkeleton />}>
      <FeaturePage />
    </Suspense>
  );
}
