import type { Metadata } from "next";
import { Suspense } from "react";

import { FeaturePage } from "@/features/signals/components/feature-page";
import { PageLoadingSkeleton } from "@/shared/components/page-loading-skeleton";

export const metadata: Metadata = {
  title: "Signals",
};

export default function SignalsRoutePage() {
  return (
    <Suspense fallback={<PageLoadingSkeleton />}>
      <FeaturePage />
    </Suspense>
  );
}
