import { Skeleton } from "@/shared/components/ui/skeleton";

export const PageLoadingSkeleton = () => (
  <div className="space-y-6">
    <div className="space-y-2">
      <Skeleton className="h-4 w-24" />
      <Skeleton className="h-10 w-72" />
      <Skeleton className="h-4 w-96" />
    </div>
    <div className="grid gap-4 md:grid-cols-3">
      <Skeleton className="h-28 w-full" />
      <Skeleton className="h-28 w-full" />
      <Skeleton className="h-28 w-full" />
    </div>
    <Skeleton className="h-96 w-full" />
  </div>
);
