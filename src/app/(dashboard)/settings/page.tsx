import type { Metadata } from "next";
import { Suspense } from "react";

import { FeaturePage } from "@/features/settings/components/feature-page";
import { PageLoadingSkeleton } from "@/shared/components/page-loading-skeleton";

export const metadata: Metadata = {
  title: "Settings",
};

export default function SettingsRoutePage() {
  return (
    <Suspense fallback={<PageLoadingSkeleton />}>
      <FeaturePage />
    </Suspense>
  );
}
