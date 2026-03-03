import type { Metadata } from "next";
import { Suspense } from "react";

import { TaskDetailPage } from "@/features/tasks/components/task-detail-page";
import { PageLoadingSkeleton } from "@/shared/components/page-loading-skeleton";

interface TaskPageProps {
  params: Promise<{ taskId: string }>;
}

export async function generateMetadata({ params }: TaskPageProps): Promise<Metadata> {
  const { taskId } = await params;
  return {
    title: `Task ${taskId}`,
  };
}

export default async function TaskRoutePage({ params }: TaskPageProps) {
  const { taskId } = await params;

  return (
    <Suspense fallback={<PageLoadingSkeleton />}>
      <TaskDetailPage taskId={taskId} />
    </Suspense>
  );
}
