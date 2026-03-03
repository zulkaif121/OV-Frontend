import type { Metadata } from "next";
import { Suspense } from "react";

import { FeaturePage } from "@/features/vendor-triage/components/feature-page";
import { PageLoadingSkeleton } from "@/shared/components/page-loading-skeleton";

export const metadata: Metadata = {
  title: "Vendor Triage",
};

export default function VendorTriageRoutePage() {
  return (
    <Suspense fallback={<PageLoadingSkeleton />}>
      <FeaturePage />
    </Suspense>
  );
}
