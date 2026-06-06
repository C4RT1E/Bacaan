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
  book: Book;
  chapter: number;
  verses: Verse[];
}

export type VerseKey = string;

export type HighlightColor = "yellow" | "green" | "blue";

export const HIGHLIGHT_COLORS: HighlightColor[] = ["yellow", "green", "blue"];

export interface Highlight {
  id: string;
  color: HighlightColor;
  createdAt: string;
}

export interface Note {
  text: string;
  updatedAt: string;
}

export interface LastRead {
  bookSlug: string;
  chapter: number;
  updatedAt: string;
}

export interface Streak {
  count: number;
  lastReadDate: string | null;
}

export interface PlanPassage {
  bookSlug: string;
  chapterStart: number;
  chapterEnd: number;
}

export interface PlanDay {
  day: number;
  passages: PlanPassage[];
}

export interface PlanProgress {
  startedOn: string | null;
  completedDays: Record<number, string>;
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
