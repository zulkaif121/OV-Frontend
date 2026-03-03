import { Skeleton } from "@/shared/components/ui/skeleton";

export default function VerifyOtpLoading() {
  return (
    <div className="space-y-4 rounded-xl border bg-[hsl(var(--card))] p-6">
      <Skeleton className="h-8 w-44" />
      <Skeleton className="h-10 w-full" />
      <Skeleton className="h-10 w-full" />
      <Skeleton className="h-10 w-full" />
    </div>
  );
}
