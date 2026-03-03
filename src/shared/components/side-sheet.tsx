"use client";

import * as React from "react";

import { useUiStore } from "@/shared/stores/ui-store";
import { Button } from "@/shared/components/ui/button";
import { StatusBadge } from "@/shared/components/status-badge";
import { Input } from "@/shared/components/ui/input";
import { Label } from "@/shared/components/ui/label";
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle } from "@/shared/components/ui/sheet";

const TaskCreateFlow = () => {
  const [title, setTitle] = React.useState("");
  const [stage, setStage] = React.useState<"draft" | "created" | "completed">("draft");

  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="task-title">Task title</Label>
        <Input
          id="task-title"
          value={title}
          onChange={(event) => setTitle(event.target.value)}
          placeholder="Ex: Water heater inspection"
        />
      </div>
      <div className="flex items-center gap-2">
        {stage === "draft" ? (
          <Button
            onClick={() => {
              if (title.trim().length > 0) {
                setStage("created");
              }
            }}
          >
            Create Task
          </Button>
        ) : null}
        {stage === "created" ? (
          <>
            <StatusBadge status="info" label="Created" />
            <Button variant="secondary" onClick={() => setStage("completed")}>
              Mark Complete
            </Button>
          </>
        ) : null}
        {stage === "completed" ? <StatusBadge status="success" label="Completed" /> : null}
      </div>
      <p className="text-muted-foreground text-xs">
        This flow is UI-only until backend task create/complete endpoints are wired through TanStack Query mutations.
      </p>
    </div>
  );
};

const renderViewContent = (view: string, payload?: Record<string, string | number | boolean | null>) => {
  switch (view) {
    case "create-task":
      return <TaskCreateFlow />;
    case "task-detail":
      return <p className="text-muted-foreground text-sm">Task details load here from API-backed queries.</p>;
    case "vendor-detail":
      return <p className="text-muted-foreground text-sm">Vendor details load here from API-backed queries.</p>;
    case "property-quick-view":
      return <p className="text-muted-foreground text-sm">Property quick view panel.</p>;
    case "inbox-thread":
      return <p className="text-muted-foreground text-sm">Inbox conversation thread panel.</p>;
    case "approval-panel":
      return <p className="text-muted-foreground text-sm">Approval workflow panel.</p>;
    default:
      return (
        <pre className="bg-muted text-muted-foreground overflow-x-auto rounded-xl p-3 text-xs">
          {JSON.stringify(payload ?? {}, null, 2)}
        </pre>
      );
  }
};

export const SideSheet = () => {
  const sideSheet = useUiStore((state) => state.sideSheet);
  const closeSideSheet = useUiStore((state) => state.closeSideSheet);

  return (
    <Sheet
      open={sideSheet.open}
      onOpenChange={(open) => {
        if (!open) {
          closeSideSheet();
        }
      }}
    >
      <SheetContent side="right" className="w-full p-0 sm:max-w-none" style={{ width: sideSheet.width }}>
        <SheetHeader className="border-b px-6 py-5">
          <SheetTitle>{sideSheet.title}</SheetTitle>
          {sideSheet.description ? <SheetDescription>{sideSheet.description}</SheetDescription> : null}
        </SheetHeader>
        <div className="h-[calc(100%-5.5rem)] overflow-y-auto px-6 py-5">{renderViewContent(sideSheet.view, sideSheet.payload)}</div>
      </SheetContent>
    </Sheet>
  );
};
