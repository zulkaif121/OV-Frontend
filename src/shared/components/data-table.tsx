"use client";

import {
  flexRender,
  getCoreRowModel,
  useReactTable,
  type ColumnDef,
  type PaginationState,
  type RowSelectionState,
  type SortingState,
} from "@tanstack/react-table";
import { Download, Loader2 } from "lucide-react";
import * as React from "react";

import { Button } from "@/shared/components/ui/button";
import { Input } from "@/shared/components/ui/input";
import { Skeleton } from "@/shared/components/ui/skeleton";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/shared/components/ui/table";

interface BulkAction<TData> {
  label: string;
  onExecute: (selectedRows: TData[]) => void;
}

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  totalRows: number;
  page: PaginationState;
  sorting: SortingState;
  loading?: boolean;
  filterValue?: string;
  onFilterChange?: (value: string) => void;
  onPageChange: (next: PaginationState) => void;
  onSortingChange: (sorting: SortingState) => void;
  getRowId?: (row: TData, index: number) => string;
  bulkActions?: BulkAction<TData>[];
  emptyStateTitle?: string;
  emptyStateDescription?: string;
}

export const DataTable = <TData, TValue>({
  columns,
  data,
  totalRows,
  page,
  sorting,
  loading = false,
  filterValue,
  onFilterChange,
  onPageChange,
  onSortingChange,
  getRowId,
  bulkActions = [],
  emptyStateTitle = "No results",
  emptyStateDescription = "Try adjusting your filters.",
}: DataTableProps<TData, TValue>) => {
  const [rowSelection, setRowSelection] = React.useState<RowSelectionState>({});

  const table = useReactTable({
    data,
    columns,
    state: {
      sorting,
      pagination: page,
      rowSelection,
    },
    pageCount: Math.max(Math.ceil(totalRows / page.pageSize), 1),
    enableRowSelection: true,
    manualSorting: true,
    manualPagination: true,
    onSortingChange: (updater) => {
      const next = typeof updater === "function" ? updater(sorting) : updater;
      onSortingChange(next);
    },
    onPaginationChange: (updater) => {
      const next = typeof updater === "function" ? updater(page) : updater;
      onPageChange(next);
    },
    onRowSelectionChange: setRowSelection,
    getCoreRowModel: getCoreRowModel(),
    getRowId,
  });

  const selectedRows = table.getSelectedRowModel().rows.map((row) => row.original);

  const exportCsv = React.useCallback(() => {
    const rows = selectedRows.length > 0 ? selectedRows : data;
    if (rows.length === 0) {
      return;
    }

    const headers = table
      .getAllLeafColumns()
      .filter((column) => column.getCanHide() || column.columnDef.header)
      .map((column) => column.id);

    const csv = [
      headers.join(","),
      ...rows.map((row) =>
        headers
          .map((header) => {
            const value = (row as Record<string, unknown>)[header];
            if (value === null || value === undefined) {
              return "";
            }
            const escaped = String(value).replaceAll('"', '""');
            return `"${escaped}"`;
          })
          .join(","),
      ),
    ].join("\n");

    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", "table-export.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  }, [data, selectedRows, table]);

  const canPrevious = page.pageIndex > 0;
  const canNext = (page.pageIndex + 1) * page.pageSize < totalRows;

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <div className="flex items-center gap-2">
          {onFilterChange ? (
            <Input
              value={filterValue ?? ""}
              onChange={(event) => onFilterChange(event.target.value)}
              placeholder="Filter records"
              className="w-64"
              aria-label="Filter records"
            />
          ) : null}
          {bulkActions.map((action) => (
            <Button
              key={action.label}
              variant="secondary"
              size="sm"
              disabled={selectedRows.length === 0}
              onClick={() => action.onExecute(selectedRows)}
            >
              {action.label}
            </Button>
          ))}
        </div>
        <Button variant="outline" size="sm" onClick={exportCsv}>
          <Download className="mr-2 h-4 w-4" />
          Export CSV
        </Button>
      </div>

      <div className="rounded-md border bg-card">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <TableHead key={header.id}>
                    {header.isPlaceholder ? null : (
                      <button
                        type="button"
                        className="inline-flex items-center gap-1"
                        onClick={header.column.getToggleSortingHandler()}
                        disabled={!header.column.getCanSort()}
                      >
                        {flexRender(header.column.columnDef.header, header.getContext())}
                      </button>
                    )}
                  </TableHead>
                ))}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {loading
              ? Array.from({ length: page.pageSize }).map((_, rowIndex) => (
                  <TableRow key={`loading-${rowIndex}`}>
                    {columns.map((_, columnIndex) => (
                      <TableCell key={`loading-cell-${rowIndex}-${columnIndex}`}>
                        <Skeleton className="h-5 w-full" />
                      </TableCell>
                    ))}
                  </TableRow>
                ))
              : table.getRowModel().rows.map((row) => (
                  <TableRow key={row.id}>
                    {row.getVisibleCells().map((cell) => (
                      <TableCell key={cell.id}>{flexRender(cell.column.columnDef.cell, cell.getContext())}</TableCell>
                    ))}
                  </TableRow>
                ))}
          </TableBody>
        </Table>

        {!loading && data.length === 0 ? (
          <div className="flex flex-col items-center justify-center px-4 py-16 text-center">
            <p className="text-base font-semibold">{emptyStateTitle}</p>
            <p className="text-muted-foreground mt-1 text-sm">{emptyStateDescription}</p>
          </div>
        ) : null}
      </div>

      <div className="flex items-center justify-between">
        <p className="text-muted-foreground text-xs">
          Page {page.pageIndex + 1} of {Math.max(Math.ceil(totalRows / page.pageSize), 1)}
        </p>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" disabled={!canPrevious || loading} onClick={() => onPageChange({ ...page, pageIndex: page.pageIndex - 1 })}>
            Previous
          </Button>
          <Button variant="outline" size="sm" disabled={!canNext || loading} onClick={() => onPageChange({ ...page, pageIndex: page.pageIndex + 1 })}>
            {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : "Next"}
          </Button>
        </div>
      </div>
    </div>
  );
};
