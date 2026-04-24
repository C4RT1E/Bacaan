"use client";

import Link from "next/link";
import { BookOpen, ChevronRight } from "lucide-react";
import { formatDistanceToNow } from "date-fns";
import { id as idLocale } from "date-fns/locale";
import { Card } from "@/components/ui/card";
import { useBacaanStore } from "@/lib/store";
import { getBookBySlug } from "@/lib/books";
import { useHydrated } from "@/lib/use-hydrated";

export function ContinueReadingCard() {
  const lastRead = useBacaanStore((s) => s.lastRead);
  const hydrated = useHydrated();

  if (!hydrated || !lastRead) {
    return (
      <Card className="flex flex-col gap-3 p-6">
        <div className="flex items-center gap-2 text-xs uppercase tracking-[0.2em] text-muted-foreground">
          <BookOpen className="size-3.5" />
          Mulai Membaca
        </div>
        <p className="text-sm text-muted-foreground">
          Pilih kitab dari pustaka untuk memulai.
        </p>
        <Link
          href="/library"
          className="mt-2 inline-flex items-center gap-1 self-start text-sm font-medium hover:text-muted-foreground transition-colors"
        >
          Buka pustaka
          <ChevronRight className="size-4" />
        </Link>
      </Card>
    );
  }

  const book = getBookBySlug(lastRead.bookSlug);
  if (!book) return null;

  return (
    <Link
      href={`/read/${book.slug}/${lastRead.chapter}`}
      className="group block focus-visible:outline-none"
    >
      <Card className="flex flex-col gap-2 p-6 transition-all group-hover:border-foreground/20 group-hover:shadow-md group-focus-visible:ring-3 group-focus-visible:ring-ring/50">
        <div className="flex items-center gap-2 text-xs uppercase tracking-[0.2em] text-muted-foreground">
          <BookOpen className="size-3.5" />
          Lanjutkan Membaca
        </div>
        <div className="flex items-baseline justify-between gap-2">
          <p className="font-serif text-2xl tracking-tight">
            {book.name} {lastRead.chapter}
          </p>
          <ChevronRight className="size-5 text-muted-foreground transition-transform group-hover:translate-x-0.5" />
        </div>
        <p className="text-xs text-muted-foreground">
          Dibaca{" "}
          {formatDistanceToNow(new Date(lastRead.updatedAt), {
            addSuffix: true,
            locale: idLocale,
          })}
        </p>
      </Card>
    </Link>
  );
}
