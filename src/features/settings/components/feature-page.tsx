"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useState } from "react";

import { settingsUpdateSchema, type SettingsUpdateValues } from "@/features/settings/schemas";
import type { SettingsUpdateResult } from "@/features/settings/types";
import { PageHeader } from "@/shared/components/page-header";
import { StatusBadge } from "@/shared/components/status-badge";
import { Button } from "@/shared/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/shared/components/ui/card";
import { Input } from "@/shared/components/ui/input";
import { Label } from "@/shared/components/ui/label";

export const FeaturePage = () => {
  const [saved, setSaved] = useState<SettingsUpdateResult | null>(null);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SettingsUpdateValues>({
    resolver: zodResolver(settingsUpdateSchema),
    defaultValues: {
      organizationName: "",
      timezone: "",
    },
  });

  const onSubmit = handleSubmit((values) => {
    setSaved(values);
  });

  return (
    <div className="space-y-6">
      <PageHeader title="Settings" description="Manage organization-level operational configuration." eyebrow="Operational" />

      <Card>
        <CardHeader>
          <CardTitle>Organization Settings</CardTitle>
        </CardHeader>
        <CardContent>
          <form className="grid gap-4 md:grid-cols-3" onSubmit={onSubmit}>
            <div className="space-y-2">
              <Label htmlFor="settings-org-name">Organization Name</Label>
              <Input id="settings-org-name" {...register("organizationName")} />
              {errors.organizationName ? (
                <p className="text-xs text-[hsl(var(--destructive))]">{errors.organizationName.message}</p>
              ) : null}
            </div>

            <div className="space-y-2">
              <Label htmlFor="settings-timezone">Timezone</Label>
              <Input id="settings-timezone" placeholder="America/New_York" {...register("timezone")} />
              {errors.timezone ? <p className="text-xs text-[hsl(var(--destructive))]">{errors.timezone.message}</p> : null}
            </div>

            <div className="flex items-end">
              <Button type="submit">Save Settings</Button>
            </div>
          </form>

          {saved ? (
            <div className="mt-4 flex flex-wrap items-center gap-2 rounded-xl border bg-[hsl(var(--muted)/0.35)] p-3">
              <StatusBadge status="success" label="Updated" />
              <p className="text-sm">
                {saved.organizationName} · {saved.timezone}
              </p>
            </div>
          ) : null}
        </CardContent>
      </Card>
    </div>
  );
};
