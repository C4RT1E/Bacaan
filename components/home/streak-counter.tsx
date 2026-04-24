"use client";

import { Flame } from "lucide-react";
import { Card } from "@/components/ui/card";
import { useBacaanStore } from "@/lib/store";
import { streakIsActive, todayIsoDate } from "@/lib/streak";
import { useHydrated } from "@/lib/use-hydrated";

export function StreakCounter() {
  const streak = useBacaanStore((s) => s.streak);
  const hydrated = useHydrated();

  const active = hydrated && streakIsActive(streak, todayIsoDate());
  const count = hydrated ? streak.count : 0;

  return (
    <Card className="flex flex-col gap-2 p-6">
      <div className="flex items-center gap-2 text-xs uppercase tracking-[0.2em] text-muted-foreground">
        <Flame className="size-3.5" />
        Rangkaian Hari
      </div>
      <div className="flex items-baseline gap-2">
        <span
          className={`font-serif text-5xl tracking-tight tabular-nums ${
            active ? "text-foreground" : "text-muted-foreground"
          }`}
        >
          {count}
        </span>
        <span className="text-sm text-muted-foreground">
          {count === 1 ? "hari" : "hari berturut-turut"}
        </span>
      </div>
      <p className="text-xs text-muted-foreground">
        {!hydrated || streak.count === 0
          ? "Mulai rangkaianmu hari ini."
          : active
            ? "Tetap semangat — jangan putus."
            : "Rangkaian terputus. Mulai lagi hari ini."}
      </p>
    </Card>
  );
}
