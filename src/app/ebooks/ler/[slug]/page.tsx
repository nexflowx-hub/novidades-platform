import type { Metadata } from "next";
import { EbookReader } from "@/components/ebooks/ebook-reader";

export const metadata: Metadata = {
  title: "Leitura Digital",
  robots: { index: false, follow: false },
  referrer: "no-referrer",
};

type Props = {
  params: Promise<{ slug: string }>;
  searchParams: Promise<{
    reference?: string | string[];
    claim?: string | string[];
  }>;
};

function one(value?: string | string[]) {
  return Array.isArray(value) ? value[0] : value;
}

export default async function EbookReaderPage({ params, searchParams }: Props) {
  const { slug } = await params;
  const query = await searchParams;

  return (
    <EbookReader
      slug={slug}
      initialReference={one(query.reference)}
      initialClaim={one(query.claim)}
    />
  );
}
