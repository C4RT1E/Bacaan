import "server-only";
import type { Book, Chapter, Verse } from "@/types/bible";
import { getBookBySlug } from "@/lib/books";

const BASE_URL = "https://bolls.life";
const TRANSLATION = "TB";

type BollsVerse = {
  pk: number;
  verse: number;
  text: string;
};

export class BibleNotFoundError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "BibleNotFoundError";
  }
}

export class BibleFetchError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "BibleFetchError";
  }
}

function stripMarkup(text: string): string {
  return text.replace(/<[^>]+>/g, "").trim();
}

export async function getChapter(
  bookSlug: string,
  chapter: number,
): Promise<Chapter> {
  const book = getBookBySlug(bookSlug);
  if (!book) throw new BibleNotFoundError(`Unknown book: ${bookSlug}`);
  if (!Number.isInteger(chapter) || chapter < 1 || chapter > book.chapters) {
    throw new BibleNotFoundError(
      `Chapter ${chapter} is out of range for ${book.name}`,
    );
  }

  const url = `${BASE_URL}/get-text/${TRANSLATION}/${book.bollsId}/${chapter}/`;
  let res: Response;
  try {
    res = await fetch(url, { cache: "force-cache" });
  } catch (err) {
    throw new BibleFetchError(
      `Network error fetching ${book.name} ${chapter}: ${(err as Error).message}`,
    );
  }

  if (!res.ok) {
    throw new BibleFetchError(
      `bolls.life returned ${res.status} for ${book.name} ${chapter}`,
    );
  }

  const raw = (await res.json()) as BollsVerse[];
  const verses: Verse[] = raw
    .map((v) => ({ number: v.verse, text: stripMarkup(v.text) }))
    .sort((a, b) => a.number - b.number);

  return { book, chapter, verses };
}

export async function getRandomVerse(
  seed: string,
): Promise<{ book: Book; chapter: number; verse: Verse }> {
  const hash = hashSeed(seed);
  const book = pickDeterministic(
    // curated shortlist of chapters well-suited for a "verse of the day"
    VOTD_CHAPTERS,
    hash,
  );
  const chapterData = await getChapter(book.bookSlug, book.chapter);
  const verse = chapterData.verses[hash % chapterData.verses.length];
  return { book: chapterData.book, chapter: chapterData.chapter, verse };
}

function hashSeed(seed: string): number {
  let h = 2166136261;
  for (let i = 0; i < seed.length; i++) {
    h ^= seed.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  return Math.abs(h);
}

function pickDeterministic<T>(items: readonly T[], hash: number): T {
  return items[hash % items.length];
}

const VOTD_CHAPTERS: readonly { bookSlug: string; chapter: number }[] = [
  { bookSlug: "mazmur", chapter: 23 },
  { bookSlug: "mazmur", chapter: 46 },
  { bookSlug: "mazmur", chapter: 91 },
  { bookSlug: "mazmur", chapter: 121 },
  { bookSlug: "amsal", chapter: 3 },
  { bookSlug: "amsal", chapter: 16 },
  { bookSlug: "yesaya", chapter: 40 },
  { bookSlug: "yesaya", chapter: 41 },
  { bookSlug: "yeremia", chapter: 29 },
  { bookSlug: "matius", chapter: 5 },
  { bookSlug: "matius", chapter: 6 },
  { bookSlug: "matius", chapter: 11 },
  { bookSlug: "yohanes", chapter: 3 },
  { bookSlug: "yohanes", chapter: 14 },
  { bookSlug: "yohanes", chapter: 15 },
  { bookSlug: "roma", chapter: 8 },
  { bookSlug: "roma", chapter: 12 },
  { bookSlug: "1-korintus", chapter: 13 },
  { bookSlug: "galatia", chapter: 5 },
  { bookSlug: "efesus", chapter: 2 },
  { bookSlug: "filipi", chapter: 4 },
  { bookSlug: "ibrani", chapter: 11 },
  { bookSlug: "yakobus", chapter: 1 },
  { bookSlug: "1-yohanes", chapter: 4 },
];
