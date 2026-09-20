import type { Metadata } from "next";
import Link from "next/link";
import { BookMarked, CheckCircle2, LayoutGrid } from "lucide-react";
import { DigitalAccessPanel } from "@/components/digital/digital-access-panel";

export const metadata: Metadata = {
  title: "Acesso Digital",
  robots: { index: false, follow: false },
  referrer: "no-referrer",
};

type Props = {
  searchParams: Promise<{
    reference?: string | string[];
    claim?: string | string[];
  }>;
};

function one(value?: string | string[]) {
  return Array.isArray(value) ? value[0] : value;
}

export default async function DigitalAccessPage({ searchParams }: Props) {
  const params = await searchParams;

  return (
    <main className="bg-[#f7f7f5] px-4 py-12 md:py-20">
      <section className="mx-auto max-w-2xl rounded-[24px] border border-border bg-white p-7 text-center shadow-card md:p-10">
        <CheckCircle2
          className="mx-auto h-12 w-12 text-success"
          aria-hidden="true"
        />

        <p className="mt-5 text-[11px] font-bold tracking-[0.14em] text-brand-dark uppercase">
          Novidades Digital
        </p>

        <h1 className="mt-2 text-3xl font-extrabold tracking-[-0.035em] md:text-4xl">
          A sua compra está a ser validada.
        </h1>

        <p className="mx-auto mt-3 max-w-xl text-sm leading-7 text-muted-foreground">
          O acesso só é concedido após a confirmação assinada do XPayments.
          Depois disso, os ficheiros são entregues por links privados de curta
          duração.
        </p>

        <DigitalAccessPanel
          reference={one(params.reference)}
          claim={one(params.claim)}
        />

        <div className="mt-7 flex flex-col justify-center gap-2 sm:flex-row">
          <Link
            href="/conteudos-digitais/biblioteca"
            className="inline-flex min-h-11 items-center justify-center gap-2 rounded-xl bg-primary px-5 text-sm font-bold text-primary-foreground"
          >
            <BookMarked className="h-4 w-4" aria-hidden="true" />
            Minha biblioteca
          </Link>
          <Link
            href="/conteudos-digitais"
            className="inline-flex min-h-11 items-center justify-center gap-2 rounded-xl border border-border bg-white px-5 text-sm font-bold"
          >
            <LayoutGrid className="h-4 w-4" aria-hidden="true" />
            Ver soluções
          </Link>
        </div>
      </section>
    </main>
  );
}
