import { Activity, ClipboardCheck, Timer, Wrench } from "lucide-react";

import { PageHeader } from "@/shared/components/page-header";
import { StatCard } from "@/shared/components/stat-card";
import { Card, CardContent, CardHeader, CardTitle } from "@/shared/components/ui/card";

export const DashboardPage = () => (
  <div className="space-y-6">
    <PageHeader
      title="Dashboard"
      description="Operational command center across issue detection, triage, dispatch, execution, and closure."
      eyebrow="Overview"
    />

    <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
      <StatCard label="Active Incidents" value="--" icon={Activity} />
      <StatCard label="Open Tasks" value="--" icon={ClipboardCheck} />
      <StatCard label="Pending Vendor ETA" value="--" icon={Timer} />
      <StatCard label="Escalations" value="--" icon={Wrench} />
    </section>

    <section className="grid gap-4 xl:grid-cols-3">
      <Card className="xl:col-span-2">
        <CardHeader>
          <CardTitle>Ops Timeline</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-[hsl(var(--muted-foreground))]">
            Timeline events will populate from backend event streams once endpoint contracts are mapped.
          </p>
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>SLA Health</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-[hsl(var(--muted-foreground))]">SLA breach indicators and risk scoring appear here.</p>
        </CardContent>
      </Card>
    </section>
  </div>
);
