export type Testament = "OT" | "NT";

export interface Book {
  slug: string;
  name: string;
  bollsId: number;
  chapters: number;
  testament: Testament;
}

export interface Verse {
  number: number;
  text: string;
}

export interface Chapter {
  chapter: number;
  verses: Verse[];
}

export type VerseKey = string;

export type HighlightColor = "yellow" | "green" | "blue";

export const HIGHLIGHT_COLORS: HighlightColor[] = ["yellow", "green", "blue"];

export interface Highlight {
  color: HighlightColor;
  createdAt: number;
}

export interface Note {
  text: string;
  createdAt: number;
}

export function toVerseKey(bookSlug: string, chapter: number, verse: number): VerseKey {
  return `${bookSlug}:${chapter}:${verse}`;
}

export function parseVerseKey(key: VerseKey): {
  bookSlug: string;
  chapter: number;
  verse: number;
} {
  const [bookSlug, chapter, verse] = key.split(":");
  return {
    bookSlug,
    chapter: parseInt(chapter, 10),
    verse: parseInt(verse, 10),
  };
}
