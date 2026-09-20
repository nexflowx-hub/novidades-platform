import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, BookMarked, ShieldCheck } from "lucide-react";
import { DigitalLibrary } from "@/components/digital/digital-library";

export const metadata: Metadata = {
  title: "Minha Biblioteca Digital",
  description: "Atalhos de acesso digital guardados neste navegador.",
  robots: { index: false, follow: false },
  referrer: "no-referrer",
};

export default function DigitalLibraryPage() {
  return (
    <main className="bg-[#f7f7f5] px-4 py-8 md:py-12">
      <section className="mx-auto max-w-[980px]">
        <Link
          href="/conteudos-digitais"
          className="inline-flex items-center gap-2 text-sm font-semibold text-muted-foreground hover:text-foreground"
        >
          <ArrowLeft className="h-4 w-4" aria-hidden="true" />
          Conteúdos Digitais
        </Link>

        <div className="mt-7 rounded-[24px] bg-[#0b1220] p-7 text-white md:p-10">
          <BookMarked className="h-7 w-7 text-cyan-300" aria-hidden="true" />
          <p className="mt-5 text-xs font-extrabold tracking-[0.14em] text-cyan-300 uppercase">
            Neste navegador
          </p>
          <h1 className="mt-2 text-4xl font-extrabold tracking-[-0.04em] md:text-5xl">
            Minha Biblioteca Digital
          </h1>
          <p className="mt-4 max-w-2xl text-sm leading-7 text-slate-300">
            Atalhos locais para compras digitais iniciadas neste dispositivo.
            Os downloads continuam protegidos e só são emitidos quando existe
            entitlement ativo.
          </p>
        </div>

        <div className="my-6 flex items-start gap-3 rounded-2xl border border-border bg-white p-4 text-xs leading-5 text-muted-foreground">
          <ShieldCheck
            className="mt-0.5 h-5 w-5 shrink-0 text-success"
            aria-hidden="true"
          />
          <p>
            Esta biblioteca não é uma conta cloud. Limpar os dados do navegador
            remove os atalhos locais. A compra/entitlement continua registada no
            backend e o suporte pode ajudar na recuperação.
          </p>
        </div>

        <DigitalLibrary />
      </section>
    </main>
  );
}
