import type { Metadata } from "next";
import { Suspense } from "react";

import { PublicJobPage } from "@/features/public-job/components/public-job-page";
import { PageLoadingSkeleton } from "@/shared/components/page-loading-skeleton";

interface JobPageProps {
  params: Promise<{ jobId: string }>;
}

export async function generateMetadata({ params }: JobPageProps): Promise<Metadata> {
  const { jobId } = await params;
  return {
    title: `Job ${jobId}`,
  };
}

export default async function JobPage({ params }: JobPageProps) {
  const { jobId } = await params;

  return (
    <Suspense fallback={<PageLoadingSkeleton />}>
      <PublicJobPage jobId={jobId} />
    </Suspense>
  );
}
