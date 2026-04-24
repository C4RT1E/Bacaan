"use client";

import * as React from "react";
import Link from "next/link";
import { Check, Circle } from "lucide-react";
import { useBacaanStore } from "@/lib/store";
import {
  PLAN_365,
  firstPassageHref,
  summarizeDay,
} from "@/lib/plan/progress";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

type Props = {
  currentDay: number;
};

const WINDOW = 30;

export function DayList({ currentDay }: Props) {
  const [expanded, setExpanded] = React.useState(false);
  const completedDays = useBacaanStore((s) => s.plan.completedDays);
  const markDone = useBacaanStore((s) => s.markPlanDayDone);
  const unmark = useBacaanStore((s) => s.unmarkPlanDay);

  const days = expanded
    ? PLAN_365
    : PLAN_365.slice(
        Math.max(0, currentDay - WINDOW),
        Math.min(PLAN_365.length, currentDay + WINDOW),
      );

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="font-serif text-xl tracking-tight">Jadwal bacaan</h2>
        <Button
          variant="ghost"
          size="sm"
          onClick={() => setExpanded((v) => !v)}
        >
          {expanded ? "Tampilkan sekitar hari ini" : "Tampilkan semua 365 hari"}
        </Button>
      </div>
      <ul role="list" className="divide-y divide-border rounded-lg border border-border">
        {days.map((d) => {
          const isToday = d.day === currentDay;
          const isCompleted = Boolean(completedDays[d.day]);
          const href = firstPassageHref(d);
          return (
            <li
              key={d.day}
              className={cn(
                "flex items-center gap-3 px-4 py-3 text-sm transition-colors",
                isToday && "bg-muted/40",
              )}
            >
              <button
                type="button"
                onClick={() =>
                  isCompleted ? unmark(d.day) : markDone(d.day)
                }
                className={cn(
                  "flex size-6 shrink-0 items-center justify-center rounded-full transition-colors",
                  isCompleted
                    ? "bg-[color-mix(in_oklch,var(--highlight-green)_50%,transparent)] text-foreground"
                    : "border border-border text-muted-foreground hover:text-foreground",
                )}
                aria-label={
                  isCompleted
                    ? `Batalkan hari ${d.day}`
                    : `Tandai hari ${d.day} selesai`
                }
              >
                {isCompleted ? (
                  <Check className="size-3.5" />
                ) : (
                  <Circle className="size-2.5" fill="currentColor" />
                )}
              </button>
              <div className="min-w-0 flex-1">
                <div className="flex items-baseline gap-2">
                  <span
                    className={cn(
                      "shrink-0 font-mono text-xs tabular-nums text-muted-foreground",
                      isToday && "font-semibold text-foreground",
                    )}
                  >
                    Hari {d.day}
                  </span>
                  {isToday && (
                    <span className="text-xs uppercase tracking-wider text-muted-foreground">
                      Hari ini
                    </span>
                  )}
                </div>
                {href ? (
                  <Link
                    href={href}
                    className="block truncate font-serif text-base hover:text-muted-foreground transition-colors"
                  >
                    {summarizeDay(d)}
                  </Link>
                ) : (
                  <span className="block truncate font-serif text-base">
                    {summarizeDay(d)}
                  </span>
                )}
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
