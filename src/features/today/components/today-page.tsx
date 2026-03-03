import { CalendarRange, ClockArrowUp, Send } from "lucide-react";

import { PageHeader } from "@/shared/components/page-header";
import { StatCard } from "@/shared/components/stat-card";
import { Card, CardContent, CardHeader, CardTitle } from "@/shared/components/ui/card";

export const TodayPage = () => (
  <div className="space-y-6">
    <PageHeader
      title="Today"
      description="Prioritized today-only operational workload across properties and vendors."
      eyebrow="Daily View"
    />

    <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
      <StatCard label="Scheduled Arrivals" value="--" icon={CalendarRange} />
      <StatCard label="Urgent Tasks" value="--" icon={ClockArrowUp} />
      <StatCard label="Dispatches Due" value="--" icon={Send} />
    </section>

    <Card>
      <CardHeader>
        <CardTitle>Today Queue</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-[hsl(var(--muted-foreground))]">
          Today queue items will stream from org-scoped API endpoints through TanStack Query.
        </p>
      </CardContent>
    </Card>
  </div>
);
