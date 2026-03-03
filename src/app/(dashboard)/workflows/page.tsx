import type { Metadata } from "next";
import { Suspense } from "react";

import { FeaturePage } from "@/features/workflows/components/feature-page";
import { PageLoadingSkeleton } from "@/shared/components/page-loading-skeleton";

export const metadata: Metadata = {
  title: "Workflows",
};

export default function WorkflowsRoutePage() {
  return (
    <Suspense fallback={<PageLoadingSkeleton />}>
      <FeaturePage />
    </Suspense>
  );
}
