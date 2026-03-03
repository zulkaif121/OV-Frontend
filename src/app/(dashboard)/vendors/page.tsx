import type { Metadata } from "next";
import { Suspense } from "react";

import { FeaturePage } from "@/features/vendors/components/feature-page";
import { PageLoadingSkeleton } from "@/shared/components/page-loading-skeleton";

export const metadata: Metadata = {
  title: "Vendors",
};

export default function VendorsRoutePage() {
  return (
    <Suspense fallback={<PageLoadingSkeleton />}>
      <FeaturePage />
    </Suspense>
  );
}
