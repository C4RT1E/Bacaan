"use client";

import Link from "next/link";
import { Check, ChevronRight, Sprout } from "lucide-react";
import { Card } from "@/components/ui/card";
import { useBacaanStore } from "@/lib/store";
import { useHydrated } from "@/lib/use-hydrated";
import {
  TOTAL_PLAN_DAYS,
  currentPlanDay,
  firstPassageHref,
  getPlanDay,
  summarizeDay,
} from "@/lib/plan/progress";

export function PlanTodayCard() {
  const hydrated = useHydrated();
  const plan = useBacaanStore((s) => s.plan);

  if (!hydrated || !plan.startedOn) {
    return (
      <Link href="/plan" className="group block focus-visible:outline-none">
        <Card className="flex flex-col gap-3 p-6 transition-all group-hover:border-foreground/20 group-hover:shadow-md group-focus-visible:ring-3 group-focus-visible:ring-ring/50">
          <div className="flex items-center gap-2 text-xs uppercase tracking-[0.2em] text-muted-foreground">
            <Sprout className="size-3.5" />
            Renungan 365 Hari
          </div>
          <p className="text-sm text-muted-foreground">
            Baca seluruh Alkitab dalam setahun. Mulai kapan saja.
          </p>
          <span className="inline-flex items-center gap-1 self-start text-sm font-medium">
            Mulai sekarang
            <ChevronRight className="size-4" />
          </span>
        </Card>
      </Link>
    );
  }

  const day = currentPlanDay(plan) ?? TOTAL_PLAN_DAYS;
  const planDay = getPlanDay(day);
  if (!planDay) return null;
  const href = firstPassageHref(planDay) ?? "/plan";
  const completed = Boolean(plan.completedDays[day]);

  return (
    <Link href={href} className="group block focus-visible:outline-none">
      <Card className="flex flex-col gap-2 p-6 transition-all group-hover:border-foreground/20 group-hover:shadow-md group-focus-visible:ring-3 group-focus-visible:ring-ring/50">
        <div className="flex items-center justify-between gap-2 text-xs uppercase tracking-[0.2em] text-muted-foreground">
          <span className="flex items-center gap-1.5">
            <Sprout className="size-3.5" />
            Hari {day} / {TOTAL_PLAN_DAYS}
          </span>
          {completed && (
            <span className="inline-flex items-center gap-1 rounded-full bg-[color-mix(in_oklch,var(--highlight-green)_30%,transparent)] px-2 py-0.5 font-medium normal-case tracking-normal">
              <Check className="size-3" />
              Selesai
            </span>
          )}
        </div>
        <p className="font-serif text-2xl tracking-tight">
          {summarizeDay(planDay)}
        </p>
        <p className="inline-flex items-center gap-1 text-xs text-muted-foreground">
          Renungan hari ini
          <ChevronRight className="size-3.5 transition-transform group-hover:translate-x-0.5" />
        </p>
      </Card>
    </Link>
  );
}
