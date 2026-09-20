import type { Metadata } from "next";
import Link from "next/link";
import { CheckCircle2 } from "lucide-react";
import { DigitalAccessPanel } from "@/components/digital/digital-access-panel";

export const metadata: Metadata = {
  title: "Acesso Digital",
  robots: { index: false, follow: false },
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

        <Link
          href="/conteudos-digitais/conversion-content-os"
          className="mt-7 inline-flex min-h-11 items-center justify-center rounded-xl bg-primary px-5 text-sm font-bold text-primary-foreground"
        >
          Voltar ao produto
        </Link>
      </section>
    </main>
  );
}
