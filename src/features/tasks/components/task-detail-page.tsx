import Link from "next/link";
import { ArrowLeft, Clock3, DollarSign, MessageSquare, Plus, Sparkles, Upload } from "lucide-react";

import { Button } from "@/shared/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/shared/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/shared/components/ui/tabs";
import { cn } from "@/lib/utils";

interface TaskDetailPageProps {
  taskId: string;
}

const taskPrimaryButtonClass =
  "border border-[hsl(var(--primary)/var(--task-action-border-alpha))] bg-[hsl(var(--primary)/var(--task-action-bg-alpha))] text-[hsl(var(--task-action-fg))] hover:bg-[hsl(var(--primary)/var(--task-action-hover-alpha))] hover:text-[hsl(var(--task-action-fg))]";

export const TaskDetailPage = ({ taskId }: TaskDetailPageProps) => (
  <div className="space-y-6">
    <section className="space-y-5 rounded-2xl border bg-background p-4 shadow-sm md:p-6">
      <div className="relative overflow-hidden rounded-2xl border bg-muted">
        <div className="h-40 bg-gradient-to-r from-muted via-background to-muted" />
        <div className="absolute inset-0 bg-gradient-to-t from-background/90 to-transparent" />
        <Button
          asChild
          variant="ghost"
          size="sm"
          className="absolute left-4 top-4 h-9 rounded-xl border border-input bg-muted/50 px-3 text-muted-foreground shadow-none hover:bg-muted hover:text-foreground"
        >
          <Link href="/tasks">
            <ArrowLeft className="h-4 w-4" />
            Back
          </Link>
        </Button>
      </div>

      <div className="flex flex-wrap items-start justify-between gap-3">
        <div className="space-y-2">
          <h1 className="text-2xl font-semibold">Wall damage from guest</h1>
          <p className="text-sm text-muted-foreground">
            Mountain Retreat - 892 Pine Ridge Rd, Aspen, CO 81611
          </p>
        </div>
        <div className="flex items-center gap-2">
          <span className="rounded-full border border-border bg-foreground/5 px-3 py-1 text-xs font-medium text-foreground">
            New
          </span>
          <span className="rounded-full border border-destructive/30 bg-destructive/10 px-3 py-1 text-xs font-medium text-destructive">
            Critical
          </span>
        </div>
      </div>

      <div className="flex flex-wrap items-center justify-between gap-3 rounded-xl border bg-background px-4 py-3">
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <Clock3 className="h-4 w-4" />
          Due:
          <span className="font-semibold text-foreground">No window set</span>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="secondary" size="sm">
            <MessageSquare className="h-4 w-4" />
            Request Info
          </Button>
          <Button variant="outline" size="sm">Assign</Button>
        </div>
      </div>
    </section>

    <Tabs defaultValue="overview" className="space-y-4">
      <TabsList className="w-full justify-start">
        <TabsTrigger value="overview">Overview</TabsTrigger>
        <TabsTrigger value="evidence">Evidence</TabsTrigger>
        <TabsTrigger value="tasks">Tasks (0)</TabsTrigger>
        <TabsTrigger value="costs">Costs</TabsTrigger>
        <TabsTrigger value="conversation">Conversation (1)</TabsTrigger>
        <TabsTrigger value="history">History</TabsTrigger>
      </TabsList>

      <TabsContent value="overview">
        <div className="space-y-4">
          <div className="grid gap-4 lg:grid-cols-[1.2fr_1fr]">
            <Card className="h-full bg-background">
              <CardHeader className="flex flex-row items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-accent text-accent-foreground">
                    <Sparkles className="h-4 w-4" />
                  </span>
                  <CardTitle className="text-base font-semibold">AI Summary</CardTitle>
                </div>
                <span className="rounded-full border bg-muted px-2 py-0.5 text-xs text-muted-foreground">
                  88% confidence
                </span>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  Hole in drywall discovered during turnover inspection.
                </p>
              </CardContent>
            </Card>

            <Card className="h-full bg-background">
              <CardHeader>
                <CardTitle className="text-base font-semibold">Details</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3 text-sm">
                <div className="flex items-center justify-between text-muted-foreground">
                  <span>Task ID</span>
                  <span className="font-medium text-foreground">{taskId}</span>
                </div>
                <div className="flex items-center justify-between text-muted-foreground">
                  <span>Category</span>
                  <span className="font-medium text-foreground">Damage</span>
                </div>
                <div className="flex items-center justify-between text-muted-foreground">
                  <span>Created</span>
                  <span className="font-medium text-foreground">Mar 3, 12:39 AM</span>
                </div>
                <div className="flex items-center justify-between text-muted-foreground">
                  <span>Source</span>
                  <span className="font-medium text-foreground">WhatsApp</span>
                </div>
                <div className="flex items-center justify-between text-muted-foreground">
                  <span>Property</span>
                  <span className="font-medium text-foreground">Mountain Retreat</span>
                </div>
              </CardContent>
            </Card>
          </div>

          <Card className="bg-background">
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle className="text-base font-semibold">Active Tasks</CardTitle>
              <Button variant="ghost" size="sm">View all</Button>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap items-center justify-between gap-3 rounded-xl border bg-background px-4 py-3">
                <div className="space-y-1">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="rounded-full border border-primary/25 bg-primary/10 px-2 py-0.5 text-xs font-medium text-primary">
                      Scheduled
                    </span>
                  </div>
                  <p className="text-sm font-semibold">Cleaning</p>
                  <p className="text-xs text-muted-foreground">Assigned to Maria Santos</p>
                </div>
                <div className="text-sm font-semibold">$150</div>
              </div>
            </CardContent>
          </Card>
        </div>
      </TabsContent>

      <TabsContent value="evidence">
        <Card className="bg-background">
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="text-base font-semibold">Photos & Evidence</CardTitle>
            <Button variant="secondary" size="sm">
              <Upload className="h-4 w-4" />
              Upload
            </Button>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col items-center justify-center gap-3 rounded-xl border border-dashed bg-muted/60 p-6 text-sm text-muted-foreground">
              <Upload className="h-5 w-5" />
              No evidence uploaded yet
            </div>
          </CardContent>
        </Card>
      </TabsContent>

      <TabsContent value="tasks">
        <Card className="bg-background">
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="text-base font-semibold">Tasks</CardTitle>
            <Button size="sm" className={cn(taskPrimaryButtonClass)}>
              <Plus className="h-4 w-4" />
              Create Task
            </Button>
          </CardHeader>
          <CardContent className="text-sm text-muted-foreground">
            No tasks created yet.
          </CardContent>
        </Card>
      </TabsContent>

      <TabsContent value="costs">
        <Card className="bg-background">
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="text-base font-semibold">Cost Items</CardTitle>
            <Button variant="secondary" size="sm">
              <DollarSign className="h-4 w-4" />
              Add Cost
            </Button>
          </CardHeader>
          <CardContent className="text-sm text-muted-foreground">
            No costs recorded yet.
          </CardContent>
        </Card>
      </TabsContent>

      <TabsContent value="conversation">
        <Card className="bg-background">
          <CardHeader>
            <CardTitle className="text-base font-semibold">Conversation Thread</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3 text-sm text-muted-foreground">
            <div className="flex items-start gap-3">
              <div className="flex h-9 w-9 items-center justify-center rounded-full bg-muted text-xs font-semibold text-foreground">
                JT
              </div>
              <div className="space-y-1">
                <div className="flex items-center gap-2 text-sm font-semibold text-foreground">
                  Jake Thompson
                  <span className="text-xs font-normal text-muted-foreground">12:39 AM</span>
                </div>
                <div className="rounded-xl bg-muted/60 px-4 py-3">
                  Found damage during checkout inspection. There is a hole in the wall near the bedroom. Sending photos now.
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </TabsContent>

      <TabsContent value="history">
        <Card className="bg-background">
          <CardHeader>
            <CardTitle className="text-base font-semibold">Audit Timeline</CardTitle>
          </CardHeader>
          <CardContent className="flex items-center gap-3 text-sm text-muted-foreground">
            <span className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-accent text-accent-foreground">
              <Sparkles className="h-4 w-4" />
            </span>
            <div>
              <p className="font-medium text-foreground">Ticket created</p>
              <p>3/3/2026, 12:39 AM - via WhatsApp</p>
            </div>
          </CardContent>
        </Card>
      </TabsContent>
    </Tabs>
  </div>
);
