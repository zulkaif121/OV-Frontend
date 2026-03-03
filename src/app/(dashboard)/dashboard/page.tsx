import type { Metadata } from "next";
import { Suspense } from "react";

import { DashboardPage } from "@/features/dashboard/components/dashboard-page";
import { PageLoadingSkeleton } from "@/shared/components/page-loading-skeleton";

export const metadata: Metadata = {
  title: "Dashboard",
};

export default function DashboardRoutePage() {
  return (
    <Suspense fallback={<PageLoadingSkeleton />}>
      <DashboardPage />
    </Suspense>
  );
}
