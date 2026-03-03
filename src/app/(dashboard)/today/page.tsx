import type { Metadata } from "next";
import { Suspense } from "react";

import { TodayPage } from "@/features/today/components/today-page";
import { PageLoadingSkeleton } from "@/shared/components/page-loading-skeleton";

export const metadata: Metadata = {
  title: "Today",
};

export default function TodayRoutePage() {
  return (
    <Suspense fallback={<PageLoadingSkeleton />}>
      <TodayPage />
    </Suspense>
  );
}
