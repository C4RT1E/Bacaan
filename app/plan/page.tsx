import Link from "next/link";
import type { Metadata } from "next";
import { ThemeToggle } from "@/components/theme-toggle";
import { PlanView } from "@/components/plan/plan-view";

export const metadata: Metadata = {
  title: "Renungan 365 Hari",
  description:
    "Rencana membaca Alkitab dalam setahun — 365 hari dari Kejadian sampai Wahyu.",
};

export default function PlanPage() {
  return (
    <div className="flex flex-1 flex-col">
      <header className="sticky top-0 z-10 flex items-center justify-between border-b border-border/60 bg-background/80 px-5 py-3 backdrop-blur supports-[backdrop-filter]:bg-background/60 md:px-8">
        <Link
          href="/"
          className="font-serif text-base tracking-tight hover:text-muted-foreground transition-colors"
        >
          Bacaan
        </Link>
        <ThemeToggle />
      </header>

      <main className="mx-auto w-full max-w-3xl flex-1 px-5 py-10 md:px-8 md:py-16">
        <section className="mb-10">
          <p className="text-sm uppercase tracking-[0.2em] text-muted-foreground">
            Rencana
          </p>
          <h1 className="mt-2 font-serif text-4xl md:text-5xl tracking-tight">
            Renungan 365 Hari
          </h1>
          <p className="mt-3 text-muted-foreground max-w-md">
            Seluruh Alkitab, satu tahun. Tandai hari yang sudah selesai dan
            biarkan rangkaianmu bertumbuh.
          </p>
        </section>
        <PlanView />
      </main>
    </div>
  );
}
