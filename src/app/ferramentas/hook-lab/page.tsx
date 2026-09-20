import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { HookLab } from "@/components/digital/hook-lab";

export const metadata: Metadata = {
  title: "Hook Lab",
  description:
    "Ferramenta de estruturas de hooks baseada em briefing, relevância, clareza e prova.",
};

export default function HookLabPage() {
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
          Conversion Content OS
        </p>
        <h1 className="mt-2 text-4xl font-extrabold tracking-[-0.04em] md:text-6xl">
          Hook Lab
        </h1>
        <p className="mb-8 mt-4 max-w-3xl text-sm leading-7 text-muted-foreground md:text-base">
          Explore ângulos de mensagem sem usar fake scarcity, números
          inventados, testemunhos falsos ou autoridade fabricada. O resultado é
          uma estrutura para testar, não uma previsão de performance.
        </p>
        <HookLab />
      </section>
    </main>
  );
}
