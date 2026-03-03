import type { Metadata } from "next";
import { Suspense } from "react";

import { FeaturePage } from "@/features/integrations/components/feature-page";
import { PageLoadingSkeleton } from "@/shared/components/page-loading-skeleton";

export const metadata: Metadata = {
  title: "Integrations",
};

export default function IntegrationsRoutePage() {
  return (
    <Suspense fallback={<PageLoadingSkeleton />}>
      <FeaturePage />
    </Suspense>
  );
}
