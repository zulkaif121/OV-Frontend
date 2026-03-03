import type { Metadata } from "next";
import { Suspense } from "react";

import { FeaturePage } from "@/features/calendar/components/feature-page";
import { PageLoadingSkeleton } from "@/shared/components/page-loading-skeleton";

export const metadata: Metadata = {
  title: "Calendar",
};

export default function CalendarRoutePage() {
  return (
    <Suspense fallback={<PageLoadingSkeleton />}>
      <FeaturePage />
    </Suspense>
  );
}
