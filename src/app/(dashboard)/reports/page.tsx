import type { Metadata } from "next";
import { Suspense } from "react";

import { FeaturePage } from "@/features/reports/components/feature-page";
import { PageLoadingSkeleton } from "@/shared/components/page-loading-skeleton";

export const metadata: Metadata = {
  title: "Reports",
};

export default function ReportsRoutePage() {
  return (
    <Suspense fallback={<PageLoadingSkeleton />}>
      <FeaturePage />
    </Suspense>
  );
}
