"use client";

import { useState } from "react";
import {
  CalendarDays,
  ChevronLeft,
  ChevronRight,
  Sparkles,
  Wrench,
} from "lucide-react";

import { Badge } from "@/shared/components/ui/badge";
import { Button } from "@/shared/components/ui/button";
import { cn } from "@/lib/utils";

type CalendarView = "turnovers" | "maintenance";
type DayKey = "sun" | "mon" | "tue" | "wed" | "thu" | "fri" | "sat";

interface WeekDay {
  key: DayKey;
  label: string;
  dayNumber: string;
}

interface EventCard {
  title: string;
  property: string;
  status: string;
  statusClassName: string;
}

const weekDays: WeekDay[] = [
  { key: "sun", label: "SUN", dayNumber: "1" },
  { key: "mon", label: "MON", dayNumber: "2" },
  { key: "tue", label: "TUE", dayNumber: "3" },
  { key: "wed", label: "WED", dayNumber: "4" },
  { key: "thu", label: "THU", dayNumber: "5" },
  { key: "fri", label: "FRI", dayNumber: "6" },
  { key: "sat", label: "SAT", dayNumber: "7" },
];

const maintenanceEvents: Partial<Record<DayKey, EventCard>> = {
  wed: {
    title: "Broken coffee maker",
    property: "Oceanview Oasis",
    status: "In Progress",
    statusClassName: "bg-amber-100 text-amber-700",
  },
  thu: {
    title: "HVAC filter replacement",
    property: "Mountain Retreat",
    status: "Needs Approval",
    statusClassName: "bg-violet-100 text-violet-700",
  },
};

const turnoverEvents: Partial<Record<DayKey, EventCard>> = {
  wed: {
    title: "Guest checkout",
    property: "Urban Loft",
    status: "Scheduled",
    statusClassName: "bg-primary/15 text-primary",
  },
  thu: {
    title: "Guest arrival",
    property: "Mountain Retreat",
    status: "Confirmed",
    statusClassName: "bg-emerald-100 text-emerald-700",
  },
};

const DayHeader = ({ label, dayNumber, active = false }: { label: string; dayNumber: string; active?: boolean }) => (
  <div className={cn("rounded-xl px-2 py-2.5 text-center", active ? "bg-primary/15" : "")}>
    <p className="text-xs font-semibold tracking-wide text-muted-foreground">{label}</p>
    <p className={cn("mt-1 text-2xl font-semibold text-foreground", active ? "text-primary" : "")}>
      {dayNumber}
    </p>
  </div>
);

export const FeaturePage = () => {
  const [view, setView] = useState<CalendarView>("turnovers");
  const currentEvents = view === "maintenance" ? maintenanceEvents : turnoverEvents;
  const emptyText = view === "maintenance" ? "No maintenance" : "No turnovers";

  return (
    <div className="mx-auto w-full max-w-[1320px] space-y-4 md:space-y-5">
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <h1 className="flex items-center gap-2 text-2xl font-semibold tracking-tight text-foreground sm:text-3xl">
            <CalendarDays className="h-6 w-6 text-primary sm:h-7 sm:w-7" />
            Calendar
          </h1>
          <p className="mt-1 text-lg text-muted-foreground sm:text-xl">March 2026</p>
        </div>

        <div className="inline-flex w-full rounded-xl border border-border bg-muted p-1 sm:w-auto">
          <Button
            type="button"
            variant={view === "turnovers" ? "secondary" : "ghost"}
            className={cn(
              "h-10 flex-1 rounded-lg px-4 text-sm font-semibold sm:flex-none",
              view === "turnovers" ? "bg-background text-foreground shadow-sm" : "text-muted-foreground"
            )}
            onClick={() => setView("turnovers")}
          >
            <Sparkles className="h-4 w-4" />
            Turnovers
          </Button>
          <Button
            type="button"
            variant={view === "maintenance" ? "secondary" : "ghost"}
            className={cn(
              "h-10 flex-1 rounded-lg px-4 text-sm font-semibold sm:flex-none",
              view === "maintenance" ? "bg-background text-foreground shadow-sm" : "text-muted-foreground"
            )}
            onClick={() => setView("maintenance")}
          >
            <Wrench className="h-4 w-4" />
            Maintenance
          </Button>
        </div>
      </div>

      <div className="space-y-3 lg:hidden">
        {weekDays.map((day) => {
          const event = currentEvents[day.key];
          const isActiveDay = day.key === "wed";

          return (
            <div
              key={day.key}
              className={cn(
                "rounded-2xl border bg-background p-4",
                isActiveDay && "border-primary/40 bg-primary/10",
                !isActiveDay && "border-border"
              )}
            >
              <div className="mb-3 flex items-center justify-between">
                <p className="text-xs font-semibold tracking-wide text-muted-foreground">{day.label}</p>
                <p className={cn("text-2xl font-semibold", isActiveDay ? "text-primary" : "text-foreground")}>
                  {day.dayNumber}
                </p>
              </div>

              {event ? (
                <div className="rounded-xl border border-border bg-background p-3">
                  <p className="text-base leading-tight font-semibold text-foreground">{event.title}</p>
                  <p className="mt-1 text-sm font-medium text-muted-foreground">{event.property}</p>
                  <Badge className={cn("mt-3 rounded-full px-3 py-1 text-sm font-semibold", event.statusClassName)}>
                    {event.status}
                  </Badge>
                </div>
              ) : (
                <div className="flex items-center justify-center rounded-xl border border-dashed border-border/70 bg-muted/30 p-4">
                  <span className="text-center text-sm font-medium text-muted-foreground">{emptyText}</span>
                </div>
              )}
            </div>
          );
        })}
      </div>

      <div className="hidden lg:block">
        <div className="flex items-center justify-between px-1">
          <Button variant="ghost" size="icon" className="h-8 w-8 rounded-lg text-muted-foreground">
            <ChevronLeft className="h-4 w-4" />
            <span className="sr-only">Previous week</span>
          </Button>

          <div className="grid flex-1 grid-cols-7 gap-2 xl:gap-3">
            {weekDays.map((day) => (
              <DayHeader key={day.key} label={day.label} dayNumber={day.dayNumber} active={day.key === "wed"} />
            ))}
          </div>

          <Button variant="ghost" size="icon" className="h-8 w-8 rounded-lg text-muted-foreground">
            <ChevronRight className="h-4 w-4" />
            <span className="sr-only">Next week</span>
          </Button>
        </div>

        <div className="mt-2.5 grid grid-cols-7 gap-2 xl:gap-3">
          {weekDays.map((day) => {
            const event = currentEvents[day.key];
            const isActiveDay = day.key === "wed";

            return (
              <div
                key={day.key}
                className={cn(
                  "min-h-[245px] rounded-xl border bg-background p-2.5 xl:min-h-[265px] xl:p-3",
                  isActiveDay && "border-primary/40 bg-primary/10",
                  !isActiveDay && "border-border"
                )}
              >
                {event ? (
                  <div className="rounded-lg border border-border bg-background p-2.5 shadow-xs">
                    <p className="text-base leading-tight font-semibold text-foreground">{event.title}</p>
                    <p className="mt-1 text-sm font-medium text-muted-foreground">{event.property}</p>
                    <Badge className={cn("mt-3 rounded-full px-3 py-1 text-xs font-semibold xl:text-sm", event.statusClassName)}>
                      {event.status}
                    </Badge>
                  </div>
                ) : (
                  <div className="flex h-full items-center justify-center">
                    <span className="text-center text-sm font-medium text-muted-foreground">{emptyText}</span>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
