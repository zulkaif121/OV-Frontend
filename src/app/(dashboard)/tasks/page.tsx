import type { Metadata } from "next";
import { Suspense } from "react";

import { TasksPage } from "@/features/tasks/components/tasks-page";
import { PageLoadingSkeleton } from "@/shared/components/page-loading-skeleton";

export const metadata: Metadata = {
  title: "Tasks",
};

export default function TasksRoutePage() {
  return (
    <Suspense fallback={<PageLoadingSkeleton />}>
      <TasksPage />
    </Suspense>
  );
}
