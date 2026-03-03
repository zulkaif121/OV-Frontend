import { PageLoadingSkeleton } from "@/shared/components/page-loading-skeleton";

export default function RootLoading() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-8 md:px-6 lg:px-8">
      <PageLoadingSkeleton />
    </div>
  );
}
