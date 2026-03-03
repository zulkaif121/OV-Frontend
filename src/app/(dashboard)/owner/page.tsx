import type { Metadata } from "next";
import { Suspense } from "react";

import { FeaturePage } from "@/features/owner/components/feature-page";
import { PageLoadingSkeleton } from "@/shared/components/page-loading-skeleton";

export const metadata: Metadata = {
  title: "Owner",
};

export default function OwnerRoutePage() {
  return (
    <Suspense fallback={<PageLoadingSkeleton />}>
      <FeaturePage />
    </Suspense>
  );
}
