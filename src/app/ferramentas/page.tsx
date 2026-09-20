import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, ClipboardCheck, Sparkles } from "lucide-react";

export const metadata: Metadata = {
  title: "Ferramentas Digitais",
  description:
    "Ferramentas práticas da Novidades Digital para conteúdo, páginas de venda e QA.",
};

const tools = [
  {
    href: "/ferramentas/hook-lab",
    title: "Hook Lab",
    description:
      "Gere estruturas de hooks por função a partir de um briefing real, sem inventar prova.",
    icon: Sparkles,
  },
  {
    href: "/ferramentas/page-audit",
    title: "Sales Page Audit",
    description:
      "Avalie hero, mecanismo, prova, oferta, checkout, mobile e entrega antes de publicar.",
    icon: ClipboardCheck,
  },
];

export default function ToolsPage() {
  return (
    <main className="bg-[#f7f7f5] px-4 py-10 md:py-16">
      <section className="mx-auto max-w-[1180px]">
        <p className="text-xs font-extrabold tracking-[0.14em] text-brand-dark uppercase">
          Novidades Digital
        </p>
        <h1 className="mt-2 max-w-3xl text-4xl font-extrabold tracking-[-0.04em] md:text-6xl">
          Ferramentas para transformar método em execução.
        </h1>
        <p className="mt-4 max-w-2xl text-sm leading-7 text-muted-foreground md:text-base">
          Use os produtos como sistemas de trabalho e estas ferramentas como
          camada prática para briefings, geração de estruturas e QA.
        </p>

        <div className="mt-9 grid gap-4 md:grid-cols-2">
          {tools.map((item) => {
            const Icon = item.icon;
            return (
              <Link
                key={item.href}
                href={item.href}
                className="group rounded-[22px] border border-border bg-white p-6 shadow-card transition hover:-translate-y-0.5 hover:shadow-floating"
              >
                <Icon className="h-6 w-6 text-brand-dark" aria-hidden="true" />
                <h2 className="mt-5 text-2xl font-extrabold">{item.title}</h2>
                <p className="mt-2 text-sm leading-6 text-muted-foreground">
                  {item.description}
                </p>
                <span className="mt-6 inline-flex items-center gap-2 text-sm font-extrabold text-brand-dark">
                  Abrir ferramenta
                  <ArrowRight className="h-4 w-4" aria-hidden="true" />
                </span>
              </Link>
            );
          })}
        </div>
      </section>
    </main>
  );
}
