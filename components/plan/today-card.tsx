"use client";

import Link from "next/link";
import { ArrowRight, Check, RotateCcw } from "lucide-react";
import { toast } from "sonner";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useBacaanStore } from "@/lib/store";
import {
  firstPassageHref,
  formatPassage,
  getPlanDay,
} from "@/lib/plan/progress";

type Props = {
  day: number;
  total: number;
};

export function TodayCard({ day, total }: Props) {
  const completed = useBacaanStore(
    (s) => Boolean(s.plan.completedDays[day]),
  );
  const markDone = useBacaanStore((s) => s.markPlanDayDone);
  const unmark = useBacaanStore((s) => s.unmarkPlanDay);

  const planDay = getPlanDay(day);
  if (!planDay) return null;

  const href = firstPassageHref(planDay);

  return (
    <Card className="flex flex-col gap-5 p-6 md:p-8">
      <div className="flex items-center justify-between gap-2">
        <div className="flex items-center gap-2 text-xs uppercase tracking-[0.2em] text-muted-foreground">
          <span>Hari Ini</span>
          <span aria-hidden>·</span>
          <span>
            Hari {day} / {total}
          </span>
        </div>
        {completed && (
          <span className="inline-flex items-center gap-1 rounded-full bg-[color-mix(in_oklch,var(--highlight-green)_30%,transparent)] px-2.5 py-0.5 text-xs font-medium">
            <Check className="size-3" />
            Selesai
          </span>
        )}
      </div>

      <ul className="space-y-1.5 font-serif text-2xl md:text-3xl tracking-tight">
        {planDay.passages.map((p) => (
          <li key={`${p.bookSlug}-${p.chapterStart}-${p.chapterEnd}`}>
            <Link
              href={`/read/${p.bookSlug}/${p.chapterStart}`}
              className="hover:text-muted-foreground transition-colors"
            >
              {formatPassage(p)}
            </Link>
          </li>
        ))}
      </ul>

      <div className="flex flex-wrap items-center gap-2">
        {href && (
          <Link
            href={href}
            className="inline-flex h-9 items-center gap-1.5 rounded-lg bg-primary px-3 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            Baca sekarang
            <ArrowRight className="size-4" />
          </Link>
        )}
        {completed ? (
          <Button
            variant="ghost"
            size="sm"
            onClick={() => {
              unmark(day);
              toast("Tanda selesai dihapus", { duration: 1500 });
            }}
          >
            <RotateCcw className="size-4" />
            Batalkan
          </Button>
        ) : (
          <Button
            variant="outline"
            size="sm"
            onClick={() => {
              markDone(day);
              toast.success(`Hari ${day} selesai!`, { duration: 1800 });
            }}
          >
            <Check className="size-4" />
            Tandai selesai
          </Button>
        )}
      </div>
    </Card>
  );
}
