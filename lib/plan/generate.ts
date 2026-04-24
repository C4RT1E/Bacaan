import { BOOKS } from "@/lib/books";
import type { PlanDay, PlanPassage } from "@/types/bible";

const TOTAL_DAYS = 365;

type FlatChapter = { bookSlug: string; chapter: number };

export function generateYearPlan(): PlanDay[] {
  const chapters: FlatChapter[] = BOOKS.flatMap((b) =>
    Array.from({ length: b.chapters }, (_, i) => ({
      bookSlug: b.slug,
      chapter: i + 1,
    })),
  );

  const total = chapters.length;
  const days: PlanDay[] = [];

  for (let d = 1; d <= TOTAL_DAYS; d++) {
    const start = Math.floor(((d - 1) * total) / TOTAL_DAYS);
    const end = Math.floor((d * total) / TOTAL_DAYS);
    const slice = chapters.slice(start, end);
    days.push({ day: d, passages: groupByBook(slice) });
  }

  return days;
}

function groupByBook(chapters: FlatChapter[]): PlanPassage[] {
  const passages: PlanPassage[] = [];
  for (const ch of chapters) {
    const last = passages[passages.length - 1];
    if (
      last &&
      last.bookSlug === ch.bookSlug &&
      last.chapterEnd + 1 === ch.chapter
    ) {
      last.chapterEnd = ch.chapter;
    } else {
      passages.push({
        bookSlug: ch.bookSlug,
        chapterStart: ch.chapter,
        chapterEnd: ch.chapter,
      });
    }
  }
  return passages;
}

export const PLAN_365: readonly PlanDay[] = generateYearPlan();
