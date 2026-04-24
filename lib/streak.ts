import { differenceInCalendarDays, format } from "date-fns";
import type { Streak } from "@/types/bible";

export const todayIsoDate = (now: Date = new Date()): string =>
  format(now, "yyyy-MM-dd");

export function recordStreakRead(current: Streak, today: string): Streak {
  if (current.lastReadDate === today) return current;
  if (!current.lastReadDate) {
    return { count: 1, lastReadDate: today };
  }
  const diff = differenceInCalendarDays(
    new Date(today),
    new Date(current.lastReadDate),
  );
  if (diff === 1) return { count: current.count + 1, lastReadDate: today };
  return { count: 1, lastReadDate: today };
}

export function streakIsActive(current: Streak, today: string): boolean {
  if (!current.lastReadDate) return false;
  const diff = differenceInCalendarDays(
    new Date(today),
    new Date(current.lastReadDate),
  );
  return diff <= 1;
}
