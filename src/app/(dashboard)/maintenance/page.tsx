import type { Metadata } from "next";
import { Suspense } from "react";

import { FeaturePage } from "@/features/maintenance/components/feature-page";
import { PageLoadingSkeleton } from "@/shared/components/page-loading-skeleton";

export const metadata: Metadata = {
  title: "Maintenance",
};

export default function MaintenanceRoutePage() {
  return (
    <Suspense fallback={<PageLoadingSkeleton />}>
      <FeaturePage />
    </Suspense>
  );
}
