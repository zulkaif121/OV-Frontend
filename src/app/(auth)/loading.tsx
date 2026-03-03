import { Skeleton } from "@/shared/components/ui/skeleton";

export default function AuthLoading() {
  return (
    <div className="mx-auto w-full max-w-md space-y-4 rounded-xl border bg-[hsl(var(--card))] p-6">
      <Skeleton className="h-4 w-20" />
      <Skeleton className="h-8 w-52" />
      <Skeleton className="h-4 w-64" />
      <Skeleton className="h-10 w-full" />
      <Skeleton className="h-10 w-full" />
      <Skeleton className="h-10 w-full" />
    </div>
  );
}
