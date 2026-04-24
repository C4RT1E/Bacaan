import { Suspense } from "react";
import Link from "next/link";
import { BookMarked, Sprout } from "lucide-react";
import { ThemeToggle } from "@/components/theme-toggle";
import { buttonVariants } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { VerseOfTheDay } from "@/components/home/verse-of-the-day";
import { ContinueReadingCard } from "@/components/home/continue-reading-card";
import { StreakCounter } from "@/components/home/streak-counter";
import { PlanTodayCard } from "@/components/home/plan-today-card";

export default function Home() {
  return (
    <div className="flex flex-1 flex-col">
      <header className="flex items-center justify-between px-5 py-3 md:px-8">
        <Link href="/" className="font-serif text-base tracking-tight">
          Bacaan
        </Link>
        <div className="flex items-center gap-1">
          <Link
            href="/plan"
            className={buttonVariants({ variant: "ghost", size: "sm" })}
          >
            <Sprout className="size-4" />
            Rencana
          </Link>
          <Link
            href="/library"
            className={buttonVariants({ variant: "ghost", size: "sm" })}
          >
            <BookMarked className="size-4" />
            Pustaka
          </Link>
          <ThemeToggle />
        </div>
      </header>

      <main className="mx-auto w-full max-w-3xl flex-1 px-5 py-10 md:px-8 md:py-16">
        <section className="mb-10">
          <p className="text-sm uppercase tracking-[0.2em] text-muted-foreground">
            Selamat datang
          </p>
          <h1 className="mt-2 font-serif text-4xl md:text-5xl tracking-tight">
            Bacaan
          </h1>
          <p className="mt-3 text-muted-foreground max-w-md">
            Sebuah tempat tenang untuk membaca, menandai, dan merenungkan firman.
          </p>
        </section>

        <div className="space-y-4">
          <Suspense fallback={<Skeleton className="h-48 w-full rounded-lg" />}>
            <VerseOfTheDay />
          </Suspense>
          <PlanTodayCard />
          <div className="grid gap-4 md:grid-cols-2">
            <ContinueReadingCard />
            <StreakCounter />
          </div>
        </div>
      </main>
    </div>
  );
}
