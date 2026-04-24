"use client";

import * as React from "react";
import { Trash2 } from "lucide-react";
import { toast } from "sonner";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { useBacaanStore } from "@/lib/store";
import { toVerseKey, type Book, type Verse, type VerseKey } from "@/types/bible";

type Props = {
  book: Book;
  chapter: number;
  verse: Verse | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
};

export function NoteDrawer({ book, chapter, verse, open, onOpenChange }: Props) {
  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent
        side="right"
        className="w-full sm:max-w-md gap-0 bg-background"
      >
        {verse && (
          <NoteForm
            key={`${book.slug}-${chapter}-${verse.number}-${open ? 1 : 0}`}
            verseKey={toVerseKey(book.slug, chapter, verse.number)}
            book={book}
            chapter={chapter}
            verse={verse}
            onClose={() => onOpenChange(false)}
          />
        )}
      </SheetContent>
    </Sheet>
  );
}

type FormProps = {
  verseKey: VerseKey;
  book: Book;
  chapter: number;
  verse: Verse;
  onClose: () => void;
};

function NoteForm({ verseKey, book, chapter, verse, onClose }: FormProps) {
  const existing = useBacaanStore((s) => s.notes[verseKey]);
  const setNote = useBacaanStore((s) => s.setNote);
  const clearNote = useBacaanStore((s) => s.clearNote);

  const [draft, setDraft] = React.useState(existing?.text ?? "");

  const handleSave = () => {
    const trimmed = draft.trim();
    if (!trimmed) {
      if (existing) clearNote(verseKey);
    } else {
      setNote(verseKey, trimmed);
    }
    toast.success(trimmed ? "Catatan tersimpan" : "Catatan kosong, dihapus", {
      duration: 1500,
    });
    onClose();
  };

  const handleDelete = () => {
    clearNote(verseKey);
    toast("Catatan dihapus", { duration: 1500 });
    onClose();
  };

  return (
    <>
      <SheetHeader className="gap-2 border-b border-border pb-4">
        <SheetTitle className="font-serif text-xl">
          {book.name} {chapter}:{verse.number}
        </SheetTitle>
        <SheetDescription className="sr-only">
          Tambahkan catatan untuk ayat ini.
        </SheetDescription>
        <p className="font-serif text-base leading-relaxed text-foreground/80">
          {verse.text}
        </p>
      </SheetHeader>
      <div className="flex-1 p-4">
        <label className="flex flex-col gap-2 text-sm font-medium">
          <span className="text-muted-foreground">Catatanmu</span>
          <textarea
            value={draft}
            onChange={(e) => setDraft(e.target.value)}
            placeholder="Apa yang Tuhan sampaikan padamu lewat ayat ini?"
            rows={10}
            className="min-h-60 w-full resize-none rounded-md border border-input bg-background px-3 py-2 font-serif text-base leading-relaxed shadow-xs outline-none transition-[color,box-shadow] focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50"
            autoFocus
          />
        </label>
      </div>
      <SheetFooter className="flex-row items-center justify-between border-t border-border">
        {existing ? (
          <Button
            variant="ghost"
            size="sm"
            onClick={handleDelete}
            className="text-muted-foreground"
          >
            <Trash2 className="size-4" />
            Hapus
          </Button>
        ) : (
          <span />
        )}
        <div className="flex gap-2">
          <Button variant="outline" size="sm" onClick={onClose}>
            Batal
          </Button>
          <Button size="sm" onClick={handleSave}>
            Simpan
          </Button>
        </div>
      </SheetFooter>
    </>
  );
}
