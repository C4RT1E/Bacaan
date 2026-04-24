import Link from "next/link";
import { Sun } from "lucide-react";
import { Card } from "@/components/ui/card";
import { getRandomVerse } from "@/lib/bible/client";
import { todayIsoDate } from "@/lib/streak";

export async function VerseOfTheDay() {
  const data = await loadVerseOfTheDay();

  return (
    <Card className="flex flex-col gap-0 p-6 md:p-8">
      <div className="mb-4 flex items-center gap-2 text-xs uppercase tracking-[0.2em] text-muted-foreground">
        <Sun className="size-3.5" />
        Ayat Hari Ini
      </div>
      {data ? (
        <>
          <blockquote className="font-serif text-xl md:text-2xl leading-relaxed text-foreground">
            <span className="text-muted-foreground/60" aria-hidden>
              &ldquo;
            </span>
            {data.verse.text}
            <span className="text-muted-foreground/60" aria-hidden>
              &rdquo;
            </span>
          </blockquote>
          <Link
            href={`/read/${data.book.slug}/${data.chapter}`}
            className="mt-5 inline-flex items-center gap-1 self-start text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            {data.book.name} {data.chapter}:{data.verse.number}
            <span aria-hidden>→</span>
          </Link>
        </>
      ) : (
        <p className="text-sm text-muted-foreground">
          Tidak dapat memuat ayat hari ini. Coba lagi nanti.
        </p>
      )}
    </Card>
  );
}

async function loadVerseOfTheDay() {
  try {
    return await getRandomVerse(todayIsoDate());
  } catch {
    return null;
  }
}
