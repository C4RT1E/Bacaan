import Link from "next/link";
import type { Book } from "@/types/bible";
import { Card } from "@/components/ui/card";

type Props = {
  books: readonly Book[];
};

export function BookGrid({ books }: Props) {
  return (
    <ul
      role="list"
      className="grid grid-cols-2 gap-2.5 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5"
    >
      {books.map((book) => (
        <li key={book.slug}>
          <Link
            href={`/read/${book.slug}/1`}
            className="group block focus-visible:outline-none"
          >
            <Card className="flex h-full min-h-[5.5rem] flex-col justify-between gap-1 p-4 transition-all group-hover:border-foreground/20 group-hover:shadow-md group-focus-visible:ring-3 group-focus-visible:ring-ring/50">
              <span className="font-serif text-base leading-tight tracking-tight">
                {book.name}
              </span>
              <span className="text-xs text-muted-foreground">
                {book.chapters} pasal
              </span>
            </Card>
          </Link>
        </li>
      ))}
    </ul>
  );
}
