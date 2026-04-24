"use client";

import Link from "next/link";
import { ChevronLeft, ChevronRight, Library } from "lucide-react";
import type { Book } from "@/types/bible";
import { BOOKS, getBookIndex } from "@/lib/books";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

type Props = {
  book: Book;
  chapter: number;
  variant?: "compact" | "full";
};

export function ChapterNav({ book, chapter, variant = "full" }: Props) {
  const prev = getPrev(book, chapter);
  const next = getNext(book, chapter);

  if (variant === "compact") {
    return (
      <div className="flex items-center gap-1">
        <NavLink href={prev ? toHref(prev) : null} label="Pasal sebelumnya">
          <ChevronLeft className="size-4" />
        </NavLink>
        <NavLink href={next ? toHref(next) : null} label="Pasal berikutnya">
          <ChevronRight className="size-4" />
        </NavLink>
      </div>
    );
  }

  return (
    <nav
      aria-label="Navigasi pasal"
      className="flex items-center justify-between gap-3 border-t border-border pt-8 mt-16"
    >
      <NavButton
        href={prev ? toHref(prev) : null}
        icon={<ChevronLeft className="size-4" />}
        label="Sebelumnya"
        subLabel={prev ? `${prev.book.name} ${prev.chapter}` : "Awal Alkitab"}
        align="start"
      />
      <Link
        href="/library"
        className={cn(
          buttonVariants({ variant: "ghost", size: "sm" }),
          "shrink-0",
        )}
        aria-label="Pustaka"
      >
        <Library className="size-4" />
      </Link>
      <NavButton
        href={next ? toHref(next) : null}
        icon={<ChevronRight className="size-4" />}
        label="Berikutnya"
        subLabel={next ? `${next.book.name} ${next.chapter}` : "Akhir Alkitab"}
        align="end"
      />
    </nav>
  );
}

function NavLink({
  href,
  label,
  children,
}: {
  href: string | null;
  label: string;
  children: React.ReactNode;
}) {
  if (!href) {
    return (
      <span
        aria-label={label}
        className={cn(
          buttonVariants({ variant: "ghost", size: "icon-sm" }),
          "opacity-30 pointer-events-none",
        )}
      >
        {children}
      </span>
    );
  }
  return (
    <Link
      href={href}
      aria-label={label}
      className={buttonVariants({ variant: "ghost", size: "icon-sm" })}
    >
      {children}
    </Link>
  );
}

function NavButton({
  href,
  icon,
  label,
  subLabel,
  align,
}: {
  href: string | null;
  icon: React.ReactNode;
  label: string;
  subLabel: string;
  align: "start" | "end";
}) {
  const body = (
    <>
      {align === "start" && icon}
      <div
        className={cn(
          "flex flex-col",
          align === "end" ? "items-end" : "items-start",
        )}
      >
        <span className="text-xs uppercase tracking-wide text-muted-foreground">
          {label}
        </span>
        <span className="text-sm font-medium">{subLabel}</span>
      </div>
      {align === "end" && icon}
    </>
  );

  const base = cn(
    "flex min-w-0 flex-1 items-center gap-3 rounded-lg px-3 py-2 transition-colors",
    align === "end" ? "justify-end text-right" : "justify-start text-left",
  );

  if (!href) {
    return (
      <span className={cn(base, "opacity-40 pointer-events-none")}>
        {body}
      </span>
    );
  }
  return (
    <Link href={href} className={cn(base, "hover:bg-muted")}>
      {body}
    </Link>
  );
}

function getPrev(book: Book, chapter: number): { book: Book; chapter: number } | null {
  if (chapter > 1) return { book, chapter: chapter - 1 };
  const idx = getBookIndex(book.slug);
  if (idx <= 0) return null;
  const prevBook = BOOKS[idx - 1];
  return { book: prevBook, chapter: prevBook.chapters };
}

function getNext(book: Book, chapter: number): { book: Book; chapter: number } | null {
  if (chapter < book.chapters) return { book, chapter: chapter + 1 };
  const idx = getBookIndex(book.slug);
  if (idx < 0 || idx >= BOOKS.length - 1) return null;
  const nextBook = BOOKS[idx + 1];
  return { book: nextBook, chapter: 1 };
}

function toHref({ book, chapter }: { book: Book; chapter: number }) {
  return `/read/${book.slug}/${chapter}`;
}
