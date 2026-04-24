import Link from "next/link";
import type { Metadata } from "next";
import { ThemeToggle } from "@/components/theme-toggle";
import { LibraryTabs } from "@/components/library/library-tabs";

export const metadata: Metadata = {
  title: "Pustaka",
  description: "Semua kitab Alkitab Terjemahan Baru.",
};

export default function LibraryPage() {
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

      <main className="mx-auto w-full max-w-5xl flex-1 px-5 py-10 md:px-8 md:py-16">
        <div className="mb-10 text-center">
          <p className="text-sm uppercase tracking-[0.2em] text-muted-foreground">
            Pustaka
          </p>
          <h1 className="mt-2 font-serif text-4xl md:text-5xl tracking-tight">
            Kitab Suci
          </h1>
          <p className="mt-3 text-muted-foreground">
            Enam puluh enam kitab — satu kisah.
          </p>
        </div>
        <LibraryTabs />
      </main>
    </div>
  );
}
