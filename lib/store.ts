"use client";

import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import type {
  Highlight,
  HighlightColor,
  LastRead,
  Note,
  PlanProgress,
  Streak,
  VerseKey,
} from "@/types/bible";
import { recordStreakRead, todayIsoDate } from "@/lib/streak";

type BacaanState = {
  highlights: Record<VerseKey, Highlight[]>;
  notes: Record<VerseKey, Note>;
  lastRead: LastRead | null;
  streak: Streak;
  plan: PlanProgress;

  addHighlight: (key: VerseKey, color: HighlightColor) => void;
  clearHighlights: (key: VerseKey) => void;
  setNote: (key: VerseKey, text: string) => void;
  clearNote: (key: VerseKey) => void;
  setLastRead: (bookSlug: string, chapter: number) => void;
  recordReadToday: () => void;

  startPlan: () => void;
  resetPlan: () => void;
  markPlanDayDone: (day: number) => void;
  unmarkPlanDay: (day: number) => void;
};

const initialStreak: Streak = { count: 0, lastReadDate: null };
const initialPlan: PlanProgress = { startedOn: null, completedDays: {} };

export const useBacaanStore = create<BacaanState>()(
  persist(
    (set) => ({
      highlights: {},
      notes: {},
      lastRead: null,
      streak: initialStreak,
      plan: initialPlan,

      addHighlight: (key, color) =>
        set((s) => {
          const existing = s.highlights[key] ?? [];
          const next: Highlight = {
            id:
              typeof crypto !== "undefined" && "randomUUID" in crypto
                ? crypto.randomUUID()
                : `${Date.now()}-${Math.random().toString(36).slice(2)}`,
            color,
            createdAt: new Date().toISOString(),
          };
          return { highlights: { ...s.highlights, [key]: [...existing, next] } };
        }),

      clearHighlights: (key) =>
        set((s) => {
          if (!s.highlights[key]) return s;
          const next = { ...s.highlights };
          delete next[key];
          return { highlights: next };
        }),

      setNote: (key, text) =>
        set((s) => ({
          notes: {
            ...s.notes,
            [key]: { text, updatedAt: new Date().toISOString() },
          },
        })),

      clearNote: (key) =>
        set((s) => {
          if (!s.notes[key]) return s;
          const next = { ...s.notes };
          delete next[key];
          return { notes: next };
        }),

      setLastRead: (bookSlug, chapter) =>
        set({
          lastRead: {
            bookSlug,
            chapter,
            updatedAt: new Date().toISOString(),
          },
        }),

      recordReadToday: () =>
        set((s) => ({ streak: recordStreakRead(s.streak, todayIsoDate()) })),

      startPlan: () =>
        set((s) =>
          s.plan.startedOn
            ? s
            : { plan: { startedOn: todayIsoDate(), completedDays: {} } },
        ),

      resetPlan: () => set({ plan: { startedOn: null, completedDays: {} } }),

      markPlanDayDone: (day) =>
        set((s) => ({
          plan: {
            ...s.plan,
            completedDays: {
              ...s.plan.completedDays,
              [day]: todayIsoDate(),
            },
          },
        })),

      unmarkPlanDay: (day) =>
        set((s) => {
          if (!s.plan.completedDays[day]) return s;
          const next = { ...s.plan.completedDays };
          delete next[day];
          return { plan: { ...s.plan, completedDays: next } };
        }),
    }),
    {
      name: "bacaan-state",
      version: 1,
      storage: createJSONStorage(() => localStorage),
      partialize: (s) => ({
        highlights: s.highlights,
        notes: s.notes,
        lastRead: s.lastRead,
        streak: s.streak,
        plan: s.plan,
      }),
    },
  ),
);

export function useHighlightsFor(key: VerseKey): Highlight[] {
  return useBacaanStore((s) => s.highlights[key] ?? EMPTY_HIGHLIGHTS);
}

export function useNoteFor(key: VerseKey): Note | undefined {
  return useBacaanStore((s) => s.notes[key]);
}

const EMPTY_HIGHLIGHTS: Highlight[] = [];

export function latestHighlightColor(
  highlights: Highlight[],
): HighlightColor | null {
  if (highlights.length === 0) return null;
  return highlights[highlights.length - 1].color;
}
