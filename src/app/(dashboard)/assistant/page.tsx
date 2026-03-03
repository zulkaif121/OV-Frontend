import type { Metadata } from "next";
import { Suspense } from "react";

import { FeaturePage } from "@/features/assistant/components/feature-page";
import { PageLoadingSkeleton } from "@/shared/components/page-loading-skeleton";

export const metadata: Metadata = {
  title: "Assistant",
};

export default function AssistantRoutePage() {
  return (
    <Suspense fallback={<PageLoadingSkeleton />}>
      <FeaturePage />
    </Suspense>
  );
}
