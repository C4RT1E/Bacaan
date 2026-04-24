"use client";

import * as React from "react";
import Link from "next/link";
import { motion } from "motion/react";
import type { Chapter, Verse as VerseType } from "@/types/bible";
import { useBacaanStore } from "@/lib/store";
import { ThemeToggle } from "@/components/theme-toggle";
import { ChapterNav } from "./chapter-nav";
import { Verse } from "./verse";
import { NoteDrawer } from "./note-drawer";

type Props = {
  chapter: Chapter;
};

export function Reader({ chapter }: Props) {
  const { book, chapter: chapterNum, verses } = chapter;

  const setLastRead = useBacaanStore((s) => s.setLastRead);
  const recordReadToday = useBacaanStore((s) => s.recordReadToday);

  const [noteVerse, setNoteVerse] = React.useState<VerseType | null>(null);
  const [noteOpen, setNoteOpen] = React.useState(false);

  React.useEffect(() => {
    setLastRead(book.slug, chapterNum);
    recordReadToday();
  }, [book.slug, chapterNum, setLastRead, recordReadToday]);

  const openNote = React.useCallback((v: VerseType) => {
    setNoteVerse(v);
    setNoteOpen(true);
  }, []);

  return (
    <div className="flex flex-1 flex-col">
      <header className="sticky top-0 z-10 flex items-center justify-between border-b border-border/60 bg-background/80 px-4 py-3 backdrop-blur supports-[backdrop-filter]:bg-background/60 md:px-8">
        <Link
          href="/library"
          className="font-serif text-base tracking-tight hover:text-muted-foreground transition-colors"
        >
          Bacaan
        </Link>
        <div className="flex items-center gap-3">
          <Link
            href="/library"
            className="text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            {book.name}{" "}
            <span className="font-medium text-foreground">{chapterNum}</span>
          </Link>
          <ChapterNav book={book} chapter={chapterNum} variant="compact" />
          <ThemeToggle />
        </div>
      </header>

      <main className="mx-auto w-full max-w-[42rem] flex-1 px-5 py-10 md:px-8 md:py-16">
        <motion.div
          key={`${book.slug}-${chapterNum}`}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className="mb-10 border-b border-border pb-6">
            <p className="text-sm uppercase tracking-[0.2em] text-muted-foreground">
              {book.testament === "OT" ? "Perjanjian Lama" : "Perjanjian Baru"}
            </p>
            <h1 className="mt-2 font-serif text-4xl md:text-5xl tracking-tight">
              {book.name}
            </h1>
            <p className="mt-1 font-serif text-2xl text-muted-foreground">
              Pasal {chapterNum}
            </p>
          </div>

          <article className="font-serif text-[1.125rem] md:text-[1.2rem] leading-[1.9] text-foreground/90">
            {verses.map((v) => (
              <Verse
                key={v.number}
                book={book}
                chapter={chapterNum}
                verse={v}
                onOpenNote={openNote}
              />
            ))}
          </article>

          <ChapterNav book={book} chapter={chapterNum} />
        </motion.div>
      </main>

      <NoteDrawer
        book={book}
        chapter={chapterNum}
        verse={noteVerse}
        open={noteOpen}
        onOpenChange={setNoteOpen}
      />
    </div>
  );
}
