"use client";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { OT_BOOKS, NT_BOOKS } from "@/lib/books";
import { BookGrid } from "./book-grid";

export function LibraryTabs() {
  return (
    <Tabs defaultValue="ot" className="w-full">
      <TabsList className="mx-auto">
        <TabsTrigger value="ot">Perjanjian Lama</TabsTrigger>
        <TabsTrigger value="nt">Perjanjian Baru</TabsTrigger>
      </TabsList>
      <TabsContent value="ot" className="mt-8">
        <BookGrid books={OT_BOOKS} />
      </TabsContent>
      <TabsContent value="nt" className="mt-8">
        <BookGrid books={NT_BOOKS} />
      </TabsContent>
    </Tabs>
  );
}
