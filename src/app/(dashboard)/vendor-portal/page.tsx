import type { Metadata } from "next";
import { Suspense } from "react";

import { FeaturePage } from "@/features/vendor-portal/components/feature-page";
import { PageLoadingSkeleton } from "@/shared/components/page-loading-skeleton";

export const metadata: Metadata = {
  title: "Vendor Portal",
};

export default function VendorPortalRoutePage() {
  return (
    <Suspense fallback={<PageLoadingSkeleton />}>
      <FeaturePage />
    </Suspense>
  );
}
