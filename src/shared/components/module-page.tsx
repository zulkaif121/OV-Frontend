import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/shared/components/ui/card";
import { PageHeader } from "@/shared/components/page-header";

interface ModulePageProps {
  title: string;
  description: string;
  eyebrow: string;
}

export const ModulePage = ({ title, description, eyebrow }: ModulePageProps) => (
  <div className="space-y-6">
    <PageHeader title={title} description={description} eyebrow={eyebrow} />
    <Card>
      <CardHeader>
        <CardTitle>Module Scaffolded</CardTitle>
        <CardDescription>This screen is wired into role-aware routing, shell layout, and loading boundaries.</CardDescription>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-[hsl(var(--muted-foreground))]">
          Connect this feature to backend endpoints through `apiClient` and TanStack Query hooks as endpoint contracts are finalized.
        </p>
      </CardContent>
    </Card>
  </div>
);
