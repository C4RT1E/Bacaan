"use client";

import { StickyNote } from "lucide-react";
import type { Book, Verse as VerseType } from "@/types/bible";
import { toVerseKey } from "@/types/bible";
import { useHighlightsFor, useNoteFor, latestHighlightColor } from "@/lib/store";
import { cn } from "@/lib/utils";
import { HighlightPopover } from "./highlight-popover";

type Props = {
  book: Book;
  chapter: number;
  verse: VerseType;
  onOpenNote: (verse: VerseType) => void;
};

const COLOR_TINT: Record<string, string> = {
  yellow:
    "bg-[color-mix(in_oklch,var(--highlight-yellow)_40%,transparent)] dark:bg-[color-mix(in_oklch,var(--highlight-yellow)_55%,transparent)]",
  green:
    "bg-[color-mix(in_oklch,var(--highlight-green)_40%,transparent)] dark:bg-[color-mix(in_oklch,var(--highlight-green)_55%,transparent)]",
  blue: "bg-[color-mix(in_oklch,var(--highlight-blue)_40%,transparent)] dark:bg-[color-mix(in_oklch,var(--highlight-blue)_55%,transparent)]",
};

export function Verse({ book, chapter, verse, onOpenNote }: Props) {
  const key = toVerseKey(book.slug, chapter, verse.number);
  const highlights = useHighlightsFor(key);
  const note = useNoteFor(key);
  const color = latestHighlightColor(highlights);
  const tint = color ? COLOR_TINT[color] : "";

  return (
    <HighlightPopover
      verseKey={key}
      highlights={highlights}
      onOpenNote={() => onOpenNote(verse)}
    >
      <span
        data-verse={verse.number}
        className={cn(
          "group relative inline cursor-pointer rounded-[0.2em] -mx-0.5 px-0.5 transition-colors",
          tint,
          !tint && "hover:bg-muted/60",
        )}
      >
        <sup className="mr-1 select-none text-[0.65em] font-sans font-medium text-muted-foreground">
          {verse.number}
        </sup>
        {verse.text}
        {note && (
          <StickyNote
            aria-label="Ada catatan"
            className="ml-1 inline size-3.5 -translate-y-0.5 text-muted-foreground"
          />
        )}{" "}
      </span>
    </HighlightPopover>
  );
}
