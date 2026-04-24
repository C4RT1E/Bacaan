import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { Reader } from "@/components/reader/reader";
import { BibleNotFoundError, getChapter } from "@/lib/bible/client";
import { getBookBySlug } from "@/lib/books";

type Params = { book: string; chapter: string };

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}): Promise<Metadata> {
  const { book: bookSlug, chapter } = await params;
  const book = getBookBySlug(bookSlug);
  if (!book) return { title: "Tidak ditemukan" };
  return {
    title: `${book.name} ${chapter}`,
    description: `Baca ${book.name} pasal ${chapter} — Terjemahan Baru.`,
  };
}

export default async function ReadPage({
  params,
}: {
  params: Promise<Params>;
}) {
  const { book: bookSlug, chapter: chapterStr } = await params;
  const chapterNum = Number.parseInt(chapterStr, 10);
  if (!Number.isInteger(chapterNum) || chapterNum < 1) notFound();

  const book = getBookBySlug(bookSlug);
  if (!book || chapterNum > book.chapters) notFound();

  const chapter = await loadChapter(bookSlug, chapterNum);
  return <Reader chapter={chapter} />;
}

async function loadChapter(bookSlug: string, chapterNum: number) {
  try {
    return await getChapter(bookSlug, chapterNum);
  } catch (err) {
    if (err instanceof BibleNotFoundError) notFound();
    throw err;
  }
}
