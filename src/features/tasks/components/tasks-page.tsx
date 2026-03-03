"use client";

import { useMemo, useState } from "react";
import type { ColumnDef, PaginationState, SortingState } from "@tanstack/react-table";
import { Eye, Plus } from "lucide-react";

import { PageHeader } from "@/shared/components/page-header";
import { DataTable } from "@/shared/components/data-table";
import { StatusBadge } from "@/shared/components/status-badge";
import { Button } from "@/shared/components/ui/button";
import { useUiStore } from "@/shared/stores/ui-store";

interface TaskRow {
  id: string;
  title: string;
  status: "success" | "warning" | "error" | "info" | "default";
  priority: string;
  dueAt: string;
}

export const TasksPage = () => {
  const [page, setPage] = useState<PaginationState>({ pageIndex: 0, pageSize: 10 });
  const [sorting, setSorting] = useState<SortingState>([]);
  const [filter, setFilter] = useState("");
  const openSideSheet = useUiStore((state) => state.openSideSheet);

  const columns = useMemo<ColumnDef<TaskRow>[]>(
    () => [
      { accessorKey: "id", header: "Task ID" },
      { accessorKey: "title", header: "Title" },
      {
        accessorKey: "status",
        header: "Status",
        cell: ({ row }) => <StatusBadge status={row.original.status} label={row.original.status.toUpperCase()} />,
      },
      { accessorKey: "priority", header: "Priority" },
      { accessorKey: "dueAt", header: "Due" },
      {
        id: "actions",
        header: "",
        cell: ({ row }) => (
          <Button
            size="sm"
            variant="ghost"
            onClick={() =>
              openSideSheet({
                title: `Task ${row.original.id}`,
                description: "Task detail panel",
                view: "task-detail",
                width: 480,
                payload: { taskId: row.original.id },
              })
            }
          >
            <Eye className="h-4 w-4" />
          </Button>
        ),
      },
    ],
    [openSideSheet],
  );

  const data: TaskRow[] = [];

  return (
    <div className="space-y-6">
      <PageHeader
        title="Tasks"
        description="Track, dispatch, and close operational tasks with proof and SLA visibility."
        eyebrow="Launch Critical"
        actions={
          <Button
            onClick={() =>
              openSideSheet({
                title: "Create Task",
                description: "Open and complete a task workflow.",
                view: "create-task",
                width: 480,
              })
            }
          >
            <Plus className="h-4 w-4" />
            Create Task
          </Button>
        }
      />

      <DataTable
        columns={columns}
        data={data}
        totalRows={0}
        page={page}
        sorting={sorting}
        onPageChange={setPage}
        onSortingChange={setSorting}
        filterValue={filter}
        onFilterChange={setFilter}
        bulkActions={[
          {
            label: "Dispatch",
            onExecute: (rows) => {
              openSideSheet({
                title: "Bulk Dispatch",
                description: `Selected rows: ${rows.length}`,
                view: "approval-panel",
                width: 480,
                payload: { count: rows.length },
              });
            },
          },
        ]}
        emptyStateTitle="No tasks yet"
        emptyStateDescription="Tasks will appear after backend task endpoints are connected."
      />
    </div>
  );
};
