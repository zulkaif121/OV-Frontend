import type { Metadata } from "next";
import { Suspense } from "react";

import { FeaturePage } from "@/features/properties/components/feature-page";
import { PageLoadingSkeleton } from "@/shared/components/page-loading-skeleton";

export const metadata: Metadata = {
  title: "Properties",
};

export default function PropertiesRoutePage() {
  return (
    <Suspense fallback={<PageLoadingSkeleton />}>
      <FeaturePage />
    </Suspense>
  );
}
