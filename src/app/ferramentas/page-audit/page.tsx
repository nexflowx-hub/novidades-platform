import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { SalesPageAudit } from "@/components/digital/page-audit";

export const metadata: Metadata = {
  title: "Sales Page Audit",
  description:
    "Scorecard interativo para auditar páginas de venda, mobile, prova, checkout e entrega.",
};

export default function SalesPageAuditPage() {
  return (
    <main className="bg-[#f7f7f5] px-4 py-8 md:py-12">
      <section className="mx-auto max-w-[1240px]">
        <Link
          href="/ferramentas"
          className="inline-flex items-center gap-2 text-sm font-semibold text-muted-foreground hover:text-foreground"
        >
          <ArrowLeft className="h-4 w-4" aria-hidden="true" />
          Ferramentas
        </Link>
        <p className="mt-7 text-xs font-extrabold tracking-[0.14em] text-brand-dark uppercase">
          Sales Page Blueprint
        </p>
        <h1 className="mt-2 text-4xl font-extrabold tracking-[-0.04em] md:text-6xl">
          Sales Page Audit
        </h1>
        <p className="mb-8 mt-4 max-w-3xl text-sm leading-7 text-muted-foreground md:text-base">
          Faça um preflight de hero, mecanismo, prova, offer stack, termos,
          checkout, mobile e entrega. O objetivo é descobrir o que precisa de
          evidência ou correção antes de comprar tráfego.
        </p>
        <SalesPageAudit />
      </section>
    </main>
  );
}
