import type { Book } from "@/types/bible";

export const BOOKS: readonly Book[] = [
  { slug: "kejadian", name: "Kejadian", bollsId: 1, chapters: 50, testament: "OT" },
  { slug: "keluaran", name: "Keluaran", bollsId: 2, chapters: 40, testament: "OT" },
  { slug: "imamat", name: "Imamat", bollsId: 3, chapters: 27, testament: "OT" },
  { slug: "bilangan", name: "Bilangan", bollsId: 4, chapters: 36, testament: "OT" },
  { slug: "ulangan", name: "Ulangan", bollsId: 5, chapters: 34, testament: "OT" },
  { slug: "yosua", name: "Yosua", bollsId: 6, chapters: 24, testament: "OT" },
  { slug: "hakim-hakim", name: "Hakim-hakim", bollsId: 7, chapters: 21, testament: "OT" },
  { slug: "rut", name: "Rut", bollsId: 8, chapters: 4, testament: "OT" },
  { slug: "1-samuel", name: "1 Samuel", bollsId: 9, chapters: 31, testament: "OT" },
  { slug: "2-samuel", name: "2 Samuel", bollsId: 10, chapters: 24, testament: "OT" },
  { slug: "1-raja-raja", name: "1 Raja-raja", bollsId: 11, chapters: 22, testament: "OT" },
  { slug: "2-raja-raja", name: "2 Raja-raja", bollsId: 12, chapters: 25, testament: "OT" },
  { slug: "1-tawarikh", name: "1 Tawarikh", bollsId: 13, chapters: 29, testament: "OT" },
  { slug: "2-tawarikh", name: "2 Tawarikh", bollsId: 14, chapters: 36, testament: "OT" },
  { slug: "ezra", name: "Ezra", bollsId: 15, chapters: 10, testament: "OT" },
  { slug: "nehemia", name: "Nehemia", bollsId: 16, chapters: 13, testament: "OT" },
  { slug: "ester", name: "Ester", bollsId: 17, chapters: 10, testament: "OT" },
  { slug: "ayub", name: "Ayub", bollsId: 18, chapters: 42, testament: "OT" },
  { slug: "mazmur", name: "Mazmur", bollsId: 19, chapters: 150, testament: "OT" },
  { slug: "amsal", name: "Amsal", bollsId: 20, chapters: 31, testament: "OT" },
  { slug: "pengkhotbah", name: "Pengkhotbah", bollsId: 21, chapters: 12, testament: "OT" },
  { slug: "kidung-agung", name: "Kidung Agung", bollsId: 22, chapters: 8, testament: "OT" },
  { slug: "yesaya", name: "Yesaya", bollsId: 23, chapters: 66, testament: "OT" },
  { slug: "yeremia", name: "Yeremia", bollsId: 24, chapters: 52, testament: "OT" },
  { slug: "ratapan", name: "Ratapan", bollsId: 25, chapters: 5, testament: "OT" },
  { slug: "yehezkiel", name: "Yehezkiel", bollsId: 26, chapters: 48, testament: "OT" },
  { slug: "daniel", name: "Daniel", bollsId: 27, chapters: 12, testament: "OT" },
  { slug: "hosea", name: "Hosea", bollsId: 28, chapters: 14, testament: "OT" },
  { slug: "yoel", name: "Yoel", bollsId: 29, chapters: 3, testament: "OT" },
  { slug: "amos", name: "Amos", bollsId: 30, chapters: 9, testament: "OT" },
  { slug: "obaja", name: "Obaja", bollsId: 31, chapters: 1, testament: "OT" },
  { slug: "yunus", name: "Yunus", bollsId: 32, chapters: 4, testament: "OT" },
  { slug: "mikha", name: "Mikha", bollsId: 33, chapters: 7, testament: "OT" },
  { slug: "nahum", name: "Nahum", bollsId: 34, chapters: 3, testament: "OT" },
  { slug: "habakuk", name: "Habakuk", bollsId: 35, chapters: 3, testament: "OT" },
  { slug: "zefanya", name: "Zefanya", bollsId: 36, chapters: 3, testament: "OT" },
  { slug: "hagai", name: "Hagai", bollsId: 37, chapters: 2, testament: "OT" },
  { slug: "zakharia", name: "Zakharia", bollsId: 38, chapters: 14, testament: "OT" },
  { slug: "maleakhi", name: "Maleakhi", bollsId: 39, chapters: 4, testament: "OT" },

  { slug: "matius", name: "Matius", bollsId: 40, chapters: 28, testament: "NT" },
  { slug: "markus", name: "Markus", bollsId: 41, chapters: 16, testament: "NT" },
  { slug: "lukas", name: "Lukas", bollsId: 42, chapters: 24, testament: "NT" },
  { slug: "yohanes", name: "Yohanes", bollsId: 43, chapters: 21, testament: "NT" },
  { slug: "kisah-para-rasul", name: "Kisah Para Rasul", bollsId: 44, chapters: 28, testament: "NT" },
  { slug: "roma", name: "Roma", bollsId: 45, chapters: 16, testament: "NT" },
  { slug: "1-korintus", name: "1 Korintus", bollsId: 46, chapters: 16, testament: "NT" },
  { slug: "2-korintus", name: "2 Korintus", bollsId: 47, chapters: 13, testament: "NT" },
  { slug: "galatia", name: "Galatia", bollsId: 48, chapters: 6, testament: "NT" },
  { slug: "efesus", name: "Efesus", bollsId: 49, chapters: 6, testament: "NT" },
  { slug: "filipi", name: "Filipi", bollsId: 50, chapters: 4, testament: "NT" },
  { slug: "kolose", name: "Kolose", bollsId: 51, chapters: 4, testament: "NT" },
  { slug: "1-tesalonika", name: "1 Tesalonika", bollsId: 52, chapters: 5, testament: "NT" },
  { slug: "2-tesalonika", name: "2 Tesalonika", bollsId: 53, chapters: 3, testament: "NT" },
  { slug: "1-timotius", name: "1 Timotius", bollsId: 54, chapters: 6, testament: "NT" },
  { slug: "2-timotius", name: "2 Timotius", bollsId: 55, chapters: 4, testament: "NT" },
  { slug: "titus", name: "Titus", bollsId: 56, chapters: 3, testament: "NT" },
  { slug: "filemon", name: "Filemon", bollsId: 57, chapters: 1, testament: "NT" },
  { slug: "ibrani", name: "Ibrani", bollsId: 58, chapters: 13, testament: "NT" },
  { slug: "yakobus", name: "Yakobus", bollsId: 59, chapters: 5, testament: "NT" },
  { slug: "1-petrus", name: "1 Petrus", bollsId: 60, chapters: 5, testament: "NT" },
  { slug: "2-petrus", name: "2 Petrus", bollsId: 61, chapters: 3, testament: "NT" },
  { slug: "1-yohanes", name: "1 Yohanes", bollsId: 62, chapters: 5, testament: "NT" },
  { slug: "2-yohanes", name: "2 Yohanes", bollsId: 63, chapters: 1, testament: "NT" },
  { slug: "3-yohanes", name: "3 Yohanes", bollsId: 64, chapters: 1, testament: "NT" },
  { slug: "yudas", name: "Yudas", bollsId: 65, chapters: 1, testament: "NT" },
  { slug: "wahyu", name: "Wahyu", bollsId: 66, chapters: 22, testament: "NT" },
];

const BOOKS_BY_SLUG = new Map(BOOKS.map((b) => [b.slug, b]));

export function getBookBySlug(slug: string): Book | undefined {
  return BOOKS_BY_SLUG.get(slug);
}

export function getBookByIndex(index: number): Book | undefined {
  return BOOKS[index];
}

export function getBookIndex(slug: string): number {
  return BOOKS.findIndex((b) => b.slug === slug);
}

export const OT_BOOKS = BOOKS.filter((b) => b.testament === "OT");
export const NT_BOOKS = BOOKS.filter((b) => b.testament === "NT");
