"use client";

import { Flame, RotateCcw } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useBacaanStore } from "@/lib/store";
import { useHydrated } from "@/lib/use-hydrated";
import {
  TOTAL_PLAN_DAYS,
  currentPlanDay,
  planStreak,
} from "@/lib/plan/progress";
import { StartPlan } from "./start-plan";
import { TodayCard } from "./today-card";
import { DayList } from "./day-list";

export function PlanView() {
  const hydrated = useHydrated();
  const plan = useBacaanStore((s) => s.plan);
  const resetPlan = useBacaanStore((s) => s.resetPlan);

  if (!hydrated) {
    return (
      <Card className="h-64 animate-pulse" aria-hidden />
    );
  }

  if (!plan.startedOn) return <StartPlan />;

  const day = currentPlanDay(plan) ?? TOTAL_PLAN_DAYS;
  const streak = planStreak(plan);
  const completedCount = Object.keys(plan.completedDays).length;
  const progressPct = Math.round((completedCount / TOTAL_PLAN_DAYS) * 100);

  return (
    <div className="space-y-6">
      <ProgressBanner
        day={day}
        streak={streak}
        completed={completedCount}
        progressPct={progressPct}
      />
      <TodayCard day={day} total={TOTAL_PLAN_DAYS} />
      <DayList currentDay={day} />
      <div className="flex justify-center pt-4">
        <Button
          variant="ghost"
          size="sm"
          className="text-muted-foreground"
          onClick={() => {
            if (
              window.confirm(
                "Reset rencana? Semua progres akan hilang dan hari 1 dimulai ulang.",
              )
            ) {
              resetPlan();
              toast("Rencana direset", { duration: 1500 });
            }
          }}
        >
          <RotateCcw className="size-3.5" />
          Reset rencana
        </Button>
      </div>
    </div>
  );
}

type BannerProps = {
  day: number;
  streak: number;
  completed: number;
  progressPct: number;
};

function ProgressBanner({ day, streak, completed, progressPct }: BannerProps) {
  return (
    <div className="grid gap-3 sm:grid-cols-3">
      <Card className="p-4">
        <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground">
          Hari saat ini
        </p>
        <p className="mt-1 font-serif text-3xl tracking-tight tabular-nums">
          {day}
          <span className="text-base text-muted-foreground"> / {TOTAL_PLAN_DAYS}</span>
        </p>
      </Card>
      <Card className="p-4">
        <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground">
          Selesai
        </p>
        <p className="mt-1 font-serif text-3xl tracking-tight tabular-nums">
          {completed}
          <span className="text-base text-muted-foreground"> ({progressPct}%)</span>
        </p>
        <div className="mt-2 h-1.5 w-full overflow-hidden rounded-full bg-muted">
          <div
            className="h-full bg-foreground/60 transition-all"
            style={{ width: `${progressPct}%` }}
            aria-hidden
          />
        </div>
      </Card>
      <Card className="p-4">
        <p className="flex items-center gap-1.5 text-xs uppercase tracking-[0.2em] text-muted-foreground">
          <Flame className="size-3" />
          Rangkaian
        </p>
        <p className="mt-1 font-serif text-3xl tracking-tight tabular-nums">
          {streak}
          <span className="text-base text-muted-foreground"> hari</span>
        </p>
      </Card>
    </div>
  );
}
