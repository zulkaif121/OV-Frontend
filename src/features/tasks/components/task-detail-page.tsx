import { PageHeader } from "@/shared/components/page-header";
import { Card, CardContent, CardHeader, CardTitle } from "@/shared/components/ui/card";

interface TaskDetailPageProps {
  taskId: string;
}

export const TaskDetailPage = ({ taskId }: TaskDetailPageProps) => (
  <div className="space-y-6">
    <PageHeader title={`Task ${taskId}`} description="Detailed task workflow, proof capture, and verification." eyebrow="Task Detail" />
    <Card>
      <CardHeader>
        <CardTitle>Task Detail Panel</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-[hsl(var(--muted-foreground))]">
          This route is intentionally thin and designed to be fed by task-specific TanStack Query hooks.
        </p>
      </CardContent>
    </Card>
  </div>
);
