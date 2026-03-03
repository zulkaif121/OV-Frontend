import type { Metadata } from "next";
import { Suspense } from "react";

import { FeaturePage } from "@/features/staff-mobile/components/feature-page";
import { PageLoadingSkeleton } from "@/shared/components/page-loading-skeleton";

export const metadata: Metadata = {
  title: "Staff Mobile",
};

export default function StaffMobileRoutePage() {
  return (
    <Suspense fallback={<PageLoadingSkeleton />}>
      <FeaturePage />
    </Suspense>
  );
}
