"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import {
  Building2,
  ChevronRight,
  ChevronUp,
  Clock3,
  ClipboardList,
  CheckCircle2,
  LayoutGrid,
  List,
  Package,
  Plus,
  Search,
  Sparkles,
  TriangleAlert,
  Wrench,
  Zap,
} from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/shared/components/ui/button";
import { Input } from "@/shared/components/ui/input";
import { Tabs, TabsList, TabsTrigger } from "@/shared/components/ui/tabs";
import { useUiStore } from "@/shared/stores/ui-store";

type ViewMode = "grid" | "list";
type QueueFilter = "All" | "Pending" | "Active" | "Urgent";
type QueueTone = "teal" | "sky" | "amber" | "rose" | "red" | "blue";

interface QueueTask {
  id: string;
  title: string;
  property: string;
  statusLabel: string;
  statusTone: QueueTone;
  priorityLabel: string;
  priorityTone: QueueTone;
  confidence: number;
  analysis: string;
  assignee: string;
  reliability: string;
  price: string;
  availability: string;
  dueLabel: string;
  elapsed: string;
  action: "approve" | "view";
  highlight: boolean;
  showAlert: boolean;
  filterGroup: Exclude<QueueFilter, "All">;
  supplyLabel?: string;
  supplyState?: string;
}

type BoardTone = "new" | "scheduled" | "progress" | "verification" | "completed" | "blocked";
type BoardPriorityTone = "critical" | "high" | "medium" | "low";
type BoardStatusTone = "scheduled" | "approval" | "progress" | "dispatch" | "new";

interface BoardTask {
  id: string;
  title: string;
  property: string;
  priority: string;
  priorityTone: BoardPriorityTone;
  date: string;
  statusLabel?: string;
  statusTone?: BoardStatusTone;
  metaLine?: string;
  timeWindow?: string;
  dueLabel?: string;
  dueTone?: "overdue" | "time";
  actionLabel?: string;
  actionVariant?: "default" | "outline" | "secondary";
}

interface BoardColumn {
  id: string;
  title: string;
  tone: BoardTone;
  tasks: BoardTask[];
}

const queueFilters: QueueFilter[] = ["All", "Pending", "Active", "Urgent"];

const queueToneClass: Record<QueueTone, string> = {
  teal: "border-border bg-muted/60 text-muted-foreground",
  sky: "border-border bg-muted/60 text-muted-foreground",
  amber: "border-accent bg-accent text-accent-foreground",
  rose: "border-destructive/30 bg-destructive/10 text-destructive",
  red: "border-destructive/40 bg-destructive/10 text-destructive",
  blue: "border-border bg-muted/60 text-muted-foreground",
};

const boardDotClass: Record<BoardTone, string> = {
  new: "bg-primary",
  scheduled: "bg-accent-foreground",
  progress: "bg-muted-foreground",
  verification: "bg-foreground/70",
  completed: "bg-primary/70",
  blocked: "bg-destructive",
};

const boardPriorityClass: Record<BoardPriorityTone, string> = {
  critical: "border-destructive/30 bg-destructive/10 text-destructive",
  high: "border-primary/25 bg-primary/10 text-primary",
  medium: "border-accent bg-accent text-accent-foreground",
  low: "border-border bg-muted/60 text-muted-foreground",
};

const boardStatusClass: Record<BoardStatusTone, string> = {
  scheduled: "border-primary/25 bg-primary/10 text-primary",
  approval: "border-accent bg-accent text-accent-foreground",
  progress: "border-border bg-muted/60 text-muted-foreground",
  dispatch: "border-secondary bg-secondary text-secondary-foreground",
  new: "border-border bg-foreground/5 text-foreground",
};

const triageTasks: QueueTask[] = [
  {
    id: "T-9012",
    title: "HVAC filter replacement",
    property: "Oceanview Oasis",
    statusLabel: "Accepted",
    statusTone: "teal",
    priorityLabel: "Medium",
    priorityTone: "amber",
    confidence: 92,
    analysis: "HVAC filter replacement is recommended due to guest-reported air quality issues.",
    assignee: "Mike's HVAC Services",
    reliability: "98% reliable",
    price: "$85",
    availability: "Available tomorrow",
    dueLabel: "Within 48h",
    elapsed: "21h ago",
    action: "approve",
    highlight: false,
    showAlert: false,
    filterGroup: "Active",
  },
  {
    id: "T-9018",
    title: "Pool heater maintenance",
    property: "Mountain Retreat",
    statusLabel: "Triaged",
    statusTone: "blue",
    priorityLabel: "High",
    priorityTone: "rose",
    confidence: 88,
    analysis: "Pool heater running below optimal temp. Guest arriving in 3 days requested heated pool.",
    assignee: "AquaTech Pool Services",
    reliability: "95% reliable",
    price: "$150",
    availability: "Available today",
    dueLabel: "Before check-in",
    elapsed: "21h ago",
    action: "approve",
    highlight: true,
    showAlert: true,
    filterGroup: "Pending",
  },
  {
    id: "T-9021",
    title: "Smart lock battery replacement",
    property: "Urban Loft",
    statusLabel: "In Route",
    statusTone: "sky",
    priorityLabel: "High",
    priorityTone: "rose",
    confidence: 96,
    analysis: "Smart lock battery at 12%. Will likely fail within 48 hours.",
    assignee: "In-house team",
    reliability: "100% reliable",
    price: "$15",
    availability: "Available now",
    dueLabel: "Within 24h",
    elapsed: "21h ago",
    action: "view",
    highlight: true,
    showAlert: true,
    filterGroup: "Active",
  },
  {
    id: "T-9028",
    title: "Missing towels + excessive mess",
    property: "Oceanview Oasis",
    statusLabel: "Triaged",
    statusTone: "blue",
    priorityLabel: "High",
    priorityTone: "rose",
    confidence: 91,
    analysis: "Cleaner reported excessive dirtiness requiring deep clean and identified 2 missing towels.",
    assignee: "Maria Santos",
    reliability: "98% reliable",
    price: "$175 (deep clean)",
    availability: "Available in 2 hours",
    dueLabel: "Before next check-in",
    elapsed: "21h ago",
    action: "approve",
    highlight: true,
    showAlert: true,
    filterGroup: "Urgent",
    supplyLabel: "Bath Towels (2x), Shampoo, Soap, Toilet Paper, Bleach, Floor Cleaner",
    supplyState: "Order drafted",
  },
];

const boardColumns: BoardColumn[] = [
  {
    id: "new",
    title: "New",
    tone: "new",
    tasks: [
      {
        id: "B-2001",
        title: "Wall damage from guest",
        property: "Mountain Retreat",
        priority: "Critical",
        priorityTone: "critical",
        date: "Mar 3",
        statusLabel: "New",
        statusTone: "new",
        metaLine: "No window set",
        actionLabel: "View",
        actionVariant: "outline",
      },
      {
        id: "B-2006",
        title: "Low toilet paper supply",
        property: "Oceanview Oasis",
        priority: "Low",
        priorityTone: "low",
        date: "Mar 3",
        statusLabel: "Needs Approval",
        statusTone: "approval",
        metaLine: "No window set",
        actionLabel: "Approve",
        actionVariant: "default",
      },
      {
        id: "B-2002",
        title: "HVAC filter replacement",
        property: "Mountain Retreat",
        priority: "Medium",
        priorityTone: "medium",
        date: "Mar 3",
        statusLabel: "Needs Approval",
        statusTone: "approval",
        metaLine: "No window set",
        dueLabel: "1d 2h",
        dueTone: "time",
        actionLabel: "Approve",
        actionVariant: "default",
      },
    ],
  },
  {
    id: "scheduled",
    title: "Scheduled",
    tone: "scheduled",
    tasks: [
      {
        id: "B-2003",
        title: "Pre-arrival deep clean",
        property: "Oceanview Oasis",
        priority: "High",
        priorityTone: "high",
        date: "Mar 3",
        statusLabel: "Scheduled",
        statusTone: "scheduled",
        metaLine: "Mar 3 - 4:39 AM to 6:39 AM",
        dueLabel: "Overdue",
        dueTone: "overdue",
        actionLabel: "View",
        actionVariant: "outline",
      },
      {
        id: "B-2005",
        title: "Turnover cleaning",
        property: "Urban Loft",
        priority: "High",
        priorityTone: "high",
        date: "Today",
        statusLabel: "Dispatching",
        statusTone: "dispatch",
        metaLine: "Today - 2:39 AM to 4:39 AM",
        dueLabel: "2h 2m",
        dueTone: "time",
        actionLabel: "Dispatch",
        actionVariant: "default",
      },
    ],
  },
  {
    id: "progress",
    title: "In Progress",
    tone: "progress",
    tasks: [
      {
        id: "B-2004",
        title: "Broken coffee maker",
        property: "Oceanview Oasis",
        priority: "Low",
        priorityTone: "low",
        date: "Mar 2",
        statusLabel: "In Progress",
        statusTone: "progress",
        metaLine: "No window set",
        dueLabel: "Overdue",
        dueTone: "overdue",
        actionLabel: "Track",
        actionVariant: "outline",
      },
    ],
  },
  {
    id: "verification",
    title: "Verification",
    tone: "verification",
    tasks: [],
  },
  {
    id: "completed",
    title: "Completed",
    tone: "completed",
    tasks: [],
  },
  {
    id: "blocked",
    title: "Blocked",
    tone: "blocked",
    tasks: [],
  },
];

const boardTaskCount = boardColumns.reduce((total, column) => total + column.tasks.length, 0);
const taskPrimaryButtonClass =
  "border border-[hsl(var(--primary)/var(--task-action-border-alpha))] bg-[hsl(var(--primary)/var(--task-action-bg-alpha))] text-[hsl(var(--task-action-fg))] hover:bg-[hsl(var(--primary)/var(--task-action-hover-alpha))] hover:text-[hsl(var(--task-action-fg))]";
const taskViewActiveClass =
  "border border-[hsl(var(--primary)/var(--task-view-active-border-alpha))] bg-[hsl(var(--primary)/var(--task-view-active-bg-alpha))] text-[hsl(var(--task-view-active-fg))]";

function TriageCard({ task }: { task: QueueTask }) {
  const openSideSheet = useUiStore((state) => state.openSideSheet);
  const [isExpanded, setIsExpanded] = useState(false);

  // Helper to get remaining supply count
  const suppliesList = task.supplyLabel?.split(",").map(s => s.trim()) || [];
  const collapsedSupplyText = suppliesList.length > 1
    ? `${suppliesList[0]} +${suppliesList.length - 1} more`
    : suppliesList[0] || "";

  return (
    <article
      className={cn(
        "flex flex-col rounded-xl border bg-background shadow-sm transition-all duration-300 cursor-pointer overflow-hidden relative",
        "w-[340px] shrink-0",
        task.highlight ? "border-primary/30" : "border-border",
        isExpanded ? "h-auto" : "max-h-[300px]"
      )}
      onClick={() => setIsExpanded(!isExpanded)}
    >
      <div className={cn("flex flex-1 flex-col p-4 md:p-5 gap-4", !isExpanded && "pb-16")}>
        {/* Header Row */}
        <div className="flex items-start justify-between gap-3">
          <div className="min-w-0">
            <h3 className="truncate text-base font-semibold leading-tight text-foreground">
              {task.title}
            </h3>
            <p className="mt-1 text-xs text-muted-foreground truncate">{task.property}</p>
          </div>
          <div className="shrink-0 flex gap-1.5 flex-col items-end">
            <span className={cn("inline-flex rounded-full px-2.5 py-0.5 text-[10px] uppercase tracking-wider font-bold border", queueToneClass[task.priorityTone])}>
              {task.priorityLabel}
            </span>
          </div>
        </div>

        {/* Status Row */}
        <div className="flex flex-wrap gap-2">
          <span className={cn("inline-flex rounded-full border px-2 py-0.5 text-[10px] font-medium", queueToneClass[task.statusTone])}>
            {task.statusLabel}
          </span>
          <span className="inline-flex rounded-full border bg-primary/5 text-primary border-primary/20 px-2 py-0.5 text-[10px] font-medium">
            <Sparkles className="mr-1 h-3 w-3" /> AI Detected
          </span>
        </div>

        {/* Summary Row */}
        <div className="rounded-xl border bg-muted/30 p-3">
          <p
            className={cn(
              "text-xs leading-5 text-muted-foreground transition-all duration-300",
              !isExpanded && "line-clamp-1"
            )}
            title={task.analysis}
          >
            {task.analysis}
          </p>
        </div>

        {/* Assigned Cleaner Row */}
        <div className="rounded-xl border bg-background px-3 py-2.5 flex flex-col gap-2">
          <div className="flex items-center justify-between gap-3">
            <div className="flex min-w-0 items-center gap-2.5">
              <span className="inline-flex size-7 items-center justify-center rounded-full bg-muted text-muted-foreground">
                <Wrench className="h-3.5 w-3.5" />
              </span>
              <div className="min-w-0">
                <p className="truncate text-xs font-semibold text-foreground">
                  {task.assignee} <span className="text-muted-foreground font-normal mx-0.5">•</span> {task.price}
                </p>
                <p className="text-[10px] text-muted-foreground">{task.availability}</p>
              </div>
            </div>
          </div>
          {isExpanded && (
            <div className="flex items-center justify-between border-t pt-2 mt-0.5">
              <p className="text-[10px] text-muted-foreground flex items-center gap-1">
                <CheckCircle2 className="h-3 w-3 text-emerald-500" />
                {task.reliability}
              </p>
              <button
                type="button"
                className="text-[10px] text-primary font-medium hover:underline"
                onClick={(e) => {
                  e.stopPropagation();
                  // Placeholder for change assignee
                  console.log("Change assignee");
                }}
              >
                Change vendor
              </button>
            </div>
          )}
        </div>

        {/* Supplies Row */}
        {task.supplyLabel ? (
          <div className="flex flex-col gap-2 rounded-xl border bg-background px-3 py-2.5">
            <div className="flex items-center justify-between">
              <span className="inline-flex items-center gap-2 text-xs font-medium text-foreground">
                <Package className="h-3.5 w-3.5 text-muted-foreground" />
                Supplies
              </span>
              <span className="rounded-full border bg-muted px-2 py-0.5 text-[10px] font-medium text-muted-foreground">
                {task.supplyState}
              </span>
            </div>

            {isExpanded ? (
              <ul className="text-xs text-muted-foreground space-y-1 list-disc list-inside mt-1 ml-1">
                {suppliesList.map((item, i) => (
                  <li key={i}>{item}</li>
                ))}
              </ul>
            ) : (
              <p className="text-xs text-muted-foreground ml-5 truncate">
                {collapsedSupplyText}
              </p>
            )}
          </div>
        ) : null}

        {/* Footer Row */}
        <div
          className={cn(
            "flex items-center justify-between gap-3 border-t bg-background/95 backdrop-blur pt-3 px-4 md:px-5 pb-4",
            isExpanded ? "mt-2 -mx-4 md:-mx-5 -mb-4 md:-mb-5 border-t" : "absolute bottom-0 left-0 right-0 w-full z-10"
          )}
        >
          <div className="min-w-0 text-xs text-muted-foreground">
            <div className="inline-flex items-center gap-1.5 font-medium text-foreground">
              <Clock3 className="h-3.5 w-3.5" />
              <span>{task.dueLabel}</span>
            </div>
            <span className="mt-0.5 block text-[10px]">{task.elapsed}</span>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            <Button
              size="sm"
              variant="ghost"
              className="h-8 text-xs px-3 hover:bg-muted"
              onClick={(e) => {
                e.stopPropagation();
                openSideSheet({
                  title: task.title,
                  description: "Task detail panel",
                  view: "task-detail",
                  width: 480,
                  payload: { taskId: task.id },
                });
              }}
            >
              Details
            </Button>
            {task.action === "approve" ? (
              <Button
                size="sm"
                className={cn("h-8 shrink-0 rounded-lg px-4 text-xs font-medium", taskPrimaryButtonClass)}
                onClick={(e) => {
                  e.stopPropagation();
                  openSideSheet({
                    title: `Approve ${task.id}`,
                    description: "Review and approve recommended task action.",
                    view: "approval-panel",
                    width: 480,
                    payload: { taskId: task.id },
                  });
                }}
              >
                Approve
              </Button>
            ) : null}
          </div>
        </div>
      </div>
    </article>
  );
}

export const TasksPage = () => {
  const openSideSheet = useUiStore((state) => state.openSideSheet);
  const router = useRouter();
  const [viewMode, setViewMode] = useState<ViewMode>("grid");
  const [activeFilter, setActiveFilter] = useState<QueueFilter>("All");
  const [searchValue, setSearchValue] = useState("");
  const isBoardGrid = viewMode === "grid";
  const [isTriageOpen, setIsTriageOpen] = useState(true);

  const boardListItems = useMemo(() => boardColumns.flatMap((column) => column.tasks), []);

  const handleBoardAction = (task: BoardTask) => {
    openSideSheet({
      title: task.actionLabel ?? "Action",
      description: "Approval workflow panel",
      view: "approval-panel",
      width: 480,
      payload: { taskId: task.id },
    });
  };

  const handleOpenTask = (taskId: string) => {
    router.push(`/tasks/${taskId}`);
  };

  const visibleTriageTasks = useMemo(() => {
    const search = searchValue.trim().toLowerCase();

    return triageTasks.filter((task) => {
      if (activeFilter === "Pending" && task.filterGroup !== "Pending") {
        return false;
      }
      if (activeFilter === "Active" && task.filterGroup !== "Active") {
        return false;
      }
      if (activeFilter === "Urgent" && task.priorityTone !== "rose" && task.priorityTone !== "red") {
        return false;
      }
      if (search.length === 0) {
        return true;
      }

      return [task.title, task.property, task.assignee].some((field) => field.toLowerCase().includes(search));
    });
  }, [activeFilter, searchValue]);

  return (
    <div className="min-w-0 space-y-6 overflow-x-hidden">
      <section className="bg-background">
        <div>
          <div className="space-y-5 p-4 md:p-6">
            <div className="flex flex-wrap items-start justify-between gap-4">
              <div className="flex items-start gap-4">
                <div className="flex size-12 shrink-0 items-center justify-center rounded-xl bg-[hsl(var(--primary)/0.16)] text-foreground">
                  <ClipboardList className="h-6 w-6" />
                </div>
                <div className="flex flex-col justify-center py-1">
                  <h1 className="text-2xl font-semibold tracking-tight md:text-3xl">Tasks</h1>
                </div>
              </div>

              <Button
                className={cn("h-10 rounded-xl px-5 text-sm font-semibold", taskPrimaryButtonClass)}
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
            </div>

            <div className="flex flex-col gap-3 md:flex-row md:items-center">
              <div className="flex max-w-sm flex-1 items-center gap-2">
                <label className="relative flex-1">
                  <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input
                    type="search"
                    value={searchValue}
                    onChange={(event) => setSearchValue(event.target.value)}
                    className="w-full rounded-md bg-muted/50 pl-9"
                    placeholder="Search tasks, properties, vendors..."
                    aria-label="Search tasks"
                  />
                </label>
              </div>

              <div className="inline-flex h-9 w-fit items-center rounded-lg bg-muted/40 p-1">
                <button
                  type="button"
                  onClick={() => setViewMode("grid")}
                  className={cn(
                    "inline-flex h-7 items-center justify-center gap-2 rounded-md px-3 text-sm font-medium transition-colors hover:bg-background/60 hover:text-foreground",
                    viewMode === "grid"
                      ? "bg-background text-foreground shadow-sm"
                      : "text-muted-foreground",
                  )}
                  aria-label="Grid view"
                >
                  <LayoutGrid className="h-4 w-4" />
                </button>
                <button
                  type="button"
                  onClick={() => setViewMode("list")}
                  className={cn(
                    "inline-flex h-7 items-center justify-center gap-2 rounded-md px-3 text-sm font-medium transition-colors hover:bg-background/60 hover:text-foreground",
                    viewMode === "list"
                      ? "bg-background text-foreground shadow-sm"
                      : "text-muted-foreground",
                  )}
                  aria-label="List view"
                >
                  <List className="h-4 w-4" />
                </button>
              </div>
            </div>
          </div>

          <div className="border-y bg-muted/40 px-4 py-4 md:px-6">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div className="flex flex-wrap items-center gap-3">
                <div className="flex size-8 items-center justify-center rounded-md border border-[hsl(var(--primary)/var(--task-triage-icon-border-alpha))] bg-[hsl(var(--primary)/var(--task-triage-icon-bg-alpha))] text-[hsl(var(--task-triage-icon-fg))]">
                  <Sparkles className="h-4 w-4" />
                </div>
                <h2 className="text-lg font-semibold">AI Triage Queue</h2>
                <span className="rounded-full border border-accent bg-accent px-2 py-0.5 text-xs font-medium text-accent-foreground">
                  3 needs approval
                </span>
                <span className="rounded-full border border-destructive/30 bg-destructive/10 px-2 py-0.5 text-xs font-medium text-destructive">
                  3 urgent
                </span>
              </div>

              <button
                type="button"
                className="inline-flex items-center gap-2 rounded-xl text-sm font-medium text-muted-foreground transition hover:text-foreground"
                aria-label="Toggle AI triage cards"
                aria-expanded={isTriageOpen}
                aria-controls="ai-triage-cards"
                onClick={() => setIsTriageOpen((prev) => !prev)}
              >
                4 items
                <ChevronUp className={cn("h-4 w-4 transition-transform", isTriageOpen ? "" : "rotate-180")} />
              </button>
            </div>
          </div>

          {isTriageOpen ? (
            <div className="px-4 pb-4 pt-4 md:px-6">
              <Tabs
                value={activeFilter}
                onValueChange={(value) => setActiveFilter(value as QueueFilter)}
                className="w-full max-w-[440px]"
              >
                <TabsList className="grid w-full grid-cols-4">
                  {queueFilters.map((filter) => (
                    <TabsTrigger key={filter} value={filter}>
                      {filter}
                    </TabsTrigger>
                  ))}
                </TabsList>
              </Tabs>
            </div>
          ) : null}

          {isTriageOpen ? (
            <div className="px-4 pb-6 md:px-6" id="ai-triage-cards">
              <div className="overflow-x-auto scrollbar-thin pb-2">
                <div className="flex min-w-max gap-4 p-2">
                  {visibleTriageTasks.map((task) => (
                    <TriageCard key={task.id} task={task} />
                  ))}
                </div>
              </div>
            </div>
          ) : null}
        </div>
      </section >

      <section className="min-w-0 overflow-x-hidden bg-background px-4 pb-4 md:px-6 md:pb-6">
        <div>
          <header className="mb-4 flex items-center gap-3">
            <div className="inline-flex size-7 items-center justify-center rounded-full bg-muted text-muted-foreground">
              <ClipboardList className="h-3.5 w-3.5" />
            </div>
            <h2 className="text-lg font-semibold">Task Board</h2>
            <span className="rounded-full bg-muted px-2 py-0.5 text-xs font-medium text-muted-foreground">
              {boardTaskCount} tasks
            </span>
          </header>

          {isBoardGrid ? (
            <div className="w-full max-w-full overflow-x-auto pb-2 scrollbar-thin">
              <div className="flex min-w-max gap-4 pb-2 pr-2">
                {boardColumns.map((column) => (
                  <section key={column.id} className="w-[320px] shrink-0 rounded-2xl border bg-muted/40 p-4">
                    <div className="mb-4 flex items-center justify-between gap-2">
                      <div className="flex items-center gap-2">
                        <span className={cn("inline-flex h-2.5 w-2.5 rounded-full", boardDotClass[column.tone])} />
                        <h3 className="text-base font-semibold">{column.title}</h3>
                        <span className="inline-flex h-5 min-w-5 items-center justify-center rounded-full bg-muted px-1 text-[11px] text-muted-foreground">
                          {column.tasks.length}
                        </span>
                      </div>
                      <button
                        type="button"
                        className="inline-flex size-6 items-center justify-center rounded-xl text-muted-foreground transition hover:bg-muted hover:text-foreground"
                        aria-label={`Add task to ${column.title}`}
                      >
                        <Plus className="h-3.5 w-3.5" />
                      </button>
                    </div>

                    {column.tasks.length > 0 ? (
                      <div className="space-y-3">
                        {column.tasks.map((task) => (
                          <article
                            className="rounded-xl border bg-background p-4 shadow-sm transition-transform transition-shadow duration-200 hover:-translate-y-0.5 hover:shadow-md cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[hsl(var(--ring)/0.4)]"
                            key={task.id}
                            role="button"
                            tabIndex={0}
                            onClick={() => handleOpenTask(task.id)}
                            onKeyDown={(event) => {
                              if (event.key === "Enter" || event.key === " ") {
                                event.preventDefault();
                                handleOpenTask(task.id);
                              }
                            }}
                          >
                            <h4 className="text-base font-semibold">{task.title}</h4>
                            <p className="mt-1 text-sm text-muted-foreground">{task.property}</p>
                            <div className="mt-4 flex items-center justify-between gap-2">
                              <span className={cn("inline-flex rounded-full border px-2 py-0.5 text-xs font-medium", boardPriorityClass[task.priorityTone])}>
                                {task.priority}
                              </span>
                              <span className="text-xs text-muted-foreground">{task.date}</span>
                            </div>
                          </article>
                        ))}
                      </div>
                    ) : (
                      <div className="flex h-[240px] items-center justify-center rounded-xl border bg-background">
                        <p className="text-sm text-muted-foreground">No tasks</p>
                      </div>
                    )}
                  </section>
                ))}
              </div>
            </div>
          ) : (
            <div className="space-y-3">
              {boardListItems.length > 0 ? (
                boardListItems.map((task) => (
                  <article
                    key={task.id}
                    className="rounded-xl border bg-background p-4 shadow-sm transition-transform transition-shadow duration-200 hover:-translate-y-0.5 hover:shadow-md"
                  >
                    <div className="flex flex-wrap items-center justify-between gap-4">
                      <div className="flex min-w-0 items-start gap-3">
                        <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg border bg-muted text-foreground">
                          <Building2 className="h-5 w-5" />
                        </div>
                        <div className="min-w-0 space-y-1.5">
                          <div className="flex flex-wrap items-center gap-2">
                            {task.statusLabel && task.statusTone ? (
                              <span className={cn("inline-flex rounded-full border px-2 py-0.5 text-xs font-medium", boardStatusClass[task.statusTone])}>
                                {task.statusLabel}
                              </span>
                            ) : null}
                            <span className={cn("inline-flex rounded-full border px-2 py-0.5 text-xs font-medium", boardPriorityClass[task.priorityTone])}>
                              {task.priority}
                            </span>
                          </div>
                          <h4 className="text-base font-semibold">{task.title}</h4>
                          <p className="text-sm text-muted-foreground">{task.property}</p>
                          {task.metaLine ? (
                            <p className="text-xs text-muted-foreground">{task.metaLine}</p>
                          ) : (
                            <p className="text-xs text-muted-foreground">{task.date}</p>
                          )}
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        {task.dueLabel ? (
                          <span
                            className={cn(
                              "inline-flex items-center gap-1 text-xs",
                              task.dueTone === "overdue" ? "text-destructive" : "text-muted-foreground",
                            )}
                          >
                            {task.dueTone === "overdue" ? (
                              <span className="inline-flex h-2 w-2 rounded-full bg-destructive" />
                            ) : (
                              <Clock3 className="h-3.5 w-3.5" />
                            )}
                            {task.dueLabel}
                          </span>
                        ) : null}
                        {task.actionLabel === "View" || task.actionLabel === "Track" ? (
                          <Button size="sm" variant={task.actionVariant ?? "outline"} className="rounded-xl" onClick={() => handleOpenTask(task.id)}>
                            {task.actionLabel}
                          </Button>
                        ) : (
                          <Button
                            size="sm"
                            variant={task.actionVariant ?? "outline"}
                            className={cn("rounded-xl", task.actionVariant === "default" ? taskPrimaryButtonClass : "")}
                            onClick={() => handleBoardAction(task)}
                          >
                            {task.actionLabel ?? "View"}
                          </Button>
                        )}
                      </div>
                    </div>
                  </article>
                ))
              ) : (
                <div className="flex h-[240px] items-center justify-center rounded-xl border bg-background">
                  <p className="text-sm text-muted-foreground">No tasks</p>
                </div>
              )}
            </div>
          )}
        </div>
      </section>
    </div>
  );
};
