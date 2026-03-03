"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useState } from "react";

import { vendorDispatchSchema, type VendorDispatchValues } from "@/features/vendor-triage/schemas";
import type { VendorDispatchResult } from "@/features/vendor-triage/types";
import { PageHeader } from "@/shared/components/page-header";
import { StatusBadge } from "@/shared/components/status-badge";
import { Button } from "@/shared/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/shared/components/ui/card";
import { Input } from "@/shared/components/ui/input";
import { Label } from "@/shared/components/ui/label";

export const FeaturePage = () => {
  const [result, setResult] = useState<VendorDispatchResult | null>(null);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<VendorDispatchValues>({
    resolver: zodResolver(vendorDispatchSchema),
    defaultValues: {
      vendorName: "",
      taskReference: "",
    },
  });

  const onSubmit = handleSubmit((values) => {
    setResult({
      vendorName: values.vendorName,
      taskReference: values.taskReference,
      status: "dispatched",
    });
  });

  return (
    <div className="space-y-6">
      <PageHeader
        title="Vendor Triage"
        description="Dispatch vendors from triage intake with clear task references."
        eyebrow="Launch Critical"
      />

      <Card>
        <CardHeader>
          <CardTitle>Dispatch Vendor</CardTitle>
        </CardHeader>
        <CardContent>
          <form className="grid gap-4 md:grid-cols-3" onSubmit={onSubmit}>
            <div className="space-y-2">
              <Label htmlFor="vendor-name">Vendor Name</Label>
              <Input id="vendor-name" {...register("vendorName")} />
              {errors.vendorName ? <p className="text-xs text-[hsl(var(--destructive))]">{errors.vendorName.message}</p> : null}
            </div>

            <div className="space-y-2">
              <Label htmlFor="task-reference">Task Reference</Label>
              <Input id="task-reference" {...register("taskReference")} />
              {errors.taskReference ? (
                <p className="text-xs text-[hsl(var(--destructive))]">{errors.taskReference.message}</p>
              ) : null}
            </div>

            <div className="flex items-end">
              <Button type="submit" className="w-full md:w-auto">
                Dispatch
              </Button>
            </div>
          </form>

          {result ? (
            <div className="mt-4 flex flex-wrap items-center gap-2 rounded-xl border bg-[hsl(var(--muted)/0.35)] p-3">
              <StatusBadge status="success" label="Dispatched" />
              <p className="text-sm">
                {result.vendorName} assigned to {result.taskReference}.
              </p>
            </div>
          ) : null}
        </CardContent>
      </Card>
    </div>
  );
};
