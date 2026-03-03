import { Card, CardContent, CardHeader, CardTitle } from "@/shared/components/ui/card";
import { PageHeader } from "@/shared/components/page-header";

interface PublicJobPageProps {
  jobId: string;
}

export const PublicJobPage = ({ jobId }: PublicJobPageProps) => (
  <div className="mx-auto max-w-3xl space-y-6 py-10">
    <PageHeader
      title={`Job ${jobId}`}
      description="Public vendor/contractor page for execution proof and completion updates."
      eyebrow="Public Job"
    />

    <Card>
      <CardHeader>
        <CardTitle>Job Execution</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-[hsl(var(--muted-foreground))]">
          This public route is ready to bind to signed-access job endpoints from the existing backend.
        </p>
      </CardContent>
    </Card>
  </div>
);
