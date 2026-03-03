import { type LucideIcon } from "lucide-react";

import { Card, CardContent } from "@/shared/components/ui/card";

interface StatCardProps {
  label: string;
  value: string;
  delta?: string;
  icon?: LucideIcon;
}

export const StatCard = ({ label, value, delta, icon: Icon }: StatCardProps) => (
  <Card>
    <CardContent className="flex items-start justify-between gap-3 p-5">
      <div className="space-y-1">
        <p className="text-xs font-semibold uppercase tracking-[0.08em] text-[hsl(var(--muted-foreground))]">{label}</p>
        <p className="text-2xl font-semibold leading-none">{value}</p>
        {delta ? <p className="text-xs text-[hsl(var(--muted-foreground))]">{delta}</p> : null}
      </div>
      {Icon ? <Icon className="h-5 w-5 text-[hsl(var(--muted-foreground))]" aria-hidden="true" /> : null}
    </CardContent>
  </Card>
);
