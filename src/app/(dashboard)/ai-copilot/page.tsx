import type { Metadata } from "next";
import { Suspense } from "react";

import { FeaturePage } from "@/features/ai-copilot/components/feature-page";
import { PageLoadingSkeleton } from "@/shared/components/page-loading-skeleton";

export const metadata: Metadata = {
  title: "Ai Copilot",
};

export default function AiCopilotRoutePage() {
  return (
    <Suspense fallback={<PageLoadingSkeleton />}>
      <FeaturePage />
    </Suspense>
  );
}
