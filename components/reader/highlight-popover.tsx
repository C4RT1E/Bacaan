"use client";

import { StickyNote, X } from "lucide-react";
import { toast } from "sonner";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import {
  HIGHLIGHT_COLORS,
  type Highlight,
  type HighlightColor,
  type VerseKey,
} from "@/types/bible";
import { useBacaanStore } from "@/lib/store";

type Props = {
  children: React.ReactNode;
  verseKey: VerseKey;
  highlights: Highlight[];
  onOpenNote: () => void;
};

const COLOR_STYLES: Record<HighlightColor, string> = {
  yellow: "bg-[var(--highlight-yellow)]",
  green: "bg-[var(--highlight-green)]",
  blue: "bg-[var(--highlight-blue)]",
};

const COLOR_LABELS: Record<HighlightColor, string> = {
  yellow: "Kuning",
  green: "Hijau",
  blue: "Biru",
};

export function HighlightPopover({
  children,
  verseKey,
  highlights,
  onOpenNote,
}: Props) {
  const addHighlight = useBacaanStore((s) => s.addHighlight);
  const clearHighlights = useBacaanStore((s) => s.clearHighlights);

  const currentColor =
    highlights.length > 0 ? highlights[highlights.length - 1].color : null;

  return (
    <Popover>
      <PopoverTrigger render={<span />}>{children}</PopoverTrigger>
      <PopoverContent className="w-auto flex-row items-center gap-1.5 p-1.5">
        {HIGHLIGHT_COLORS.map((color) => {
          const active = color === currentColor;
          return (
            <button
              key={color}
              type="button"
              onClick={() => {
                addHighlight(verseKey, color);
                toast.success(`Ditandai ${COLOR_LABELS[color].toLowerCase()}`, {
                  duration: 1500,
                });
              }}
              aria-label={`Tandai ${COLOR_LABELS[color].toLowerCase()}`}
              className={cn(
                "size-8 rounded-full transition-transform hover:scale-110 focus-visible:outline-2 focus-visible:outline-ring",
                COLOR_STYLES[color],
                active && "ring-2 ring-offset-2 ring-offset-popover ring-foreground",
              )}
            />
          );
        })}
        <span className="mx-1 h-6 w-px bg-border" aria-hidden />
        <button
          type="button"
          onClick={onOpenNote}
          aria-label="Tambah catatan"
          className="flex size-8 items-center justify-center rounded-full text-muted-foreground hover:bg-muted hover:text-foreground transition-colors"
        >
          <StickyNote className="size-4" />
        </button>
        {currentColor && (
          <button
            type="button"
            onClick={() => {
              clearHighlights(verseKey);
              toast("Tanda dihapus", { duration: 1500 });
            }}
            aria-label="Hapus tanda"
            className="flex size-8 items-center justify-center rounded-full text-muted-foreground hover:bg-muted hover:text-destructive transition-colors"
          >
            <X className="size-4" />
          </button>
        )}
      </PopoverContent>
    </Popover>
  );
}
