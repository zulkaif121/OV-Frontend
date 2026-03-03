import { Skeleton } from "@/shared/components/ui/skeleton";

export default function LoginLoading() {
  return (
    <div className="space-y-4 rounded-xl border bg-[hsl(var(--card))] p-6">
      <Skeleton className="h-8 w-40" />
      <Skeleton className="h-10 w-full" />
      <Skeleton className="h-10 w-full" />
      <Skeleton className="h-10 w-full" />
    </div>
  );
}
