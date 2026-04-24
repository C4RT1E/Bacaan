import { differenceInCalendarDays, addDays, format } from "date-fns";
import type { PlanDay, PlanPassage, PlanProgress } from "@/types/bible";
import { getBookBySlug } from "@/lib/books";
import { PLAN_365 } from "./generate";

export { PLAN_365 };
export const TOTAL_PLAN_DAYS = PLAN_365.length;

export function getPlanDay(day: number): PlanDay | undefined {
  if (day < 1 || day > TOTAL_PLAN_DAYS) return undefined;
  return PLAN_365[day - 1];
}

export function currentPlanDay(
  progress: PlanProgress,
  today: Date = new Date(),
): number | null {
  if (!progress.startedOn) return null;
  const diff = differenceInCalendarDays(today, new Date(progress.startedOn));
  const day = diff + 1;
  if (day < 1) return null;
  if (day > TOTAL_PLAN_DAYS) return TOTAL_PLAN_DAYS;
  return day;
}

export function plannedDateForDay(
  progress: PlanProgress,
  day: number,
): string | null {
  if (!progress.startedOn) return null;
  return format(addDays(new Date(progress.startedOn), day - 1), "yyyy-MM-dd");
}

export function planStreak(progress: PlanProgress, today: Date = new Date()): number {
  const current = currentPlanDay(progress, today);
  if (!current) return 0;
  const { completedDays } = progress;
  let streak = 0;
  let day = completedDays[current] ? current : current - 1;
  while (day >= 1 && completedDays[day]) {
    streak += 1;
    day -= 1;
  }
  return streak;
}

export function formatPassage(passage: PlanPassage): string {
  const book = getBookBySlug(passage.bookSlug);
  const name = book?.name ?? passage.bookSlug;
  if (passage.chapterStart === passage.chapterEnd) {
    return `${name} ${passage.chapterStart}`;
  }
  return `${name} ${passage.chapterStart}\u2013${passage.chapterEnd}`;
}

export function summarizeDay(day: PlanDay): string {
  return day.passages.map(formatPassage).join(", ");
}

export function firstPassageHref(day: PlanDay): string | null {
  const first = day.passages[0];
  if (!first) return null;
  return `/read/${first.bookSlug}/${first.chapterStart}`;
}
