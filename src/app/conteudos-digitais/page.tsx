import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowLeft,
  ArrowRight,
  Bot,
  BookMarked,
  BrainCircuit,
  ClipboardCheck,
  Code2,
  Cpu,
  Layers3,
  Mail,
  Rocket,
  ShieldCheck,
  Sparkles,
  WandSparkles,
} from "lucide-react";
import { ProductCard } from "@/components/commerce/product-card";
import { getPublicCatalog } from "@/lib/commerce-db";
import { CATEGORIES, type BadgeId, type Product } from "@/lib/data";

export const metadata: Metadata = {
  title: "Academia Digital",
  description:
    "Software, IA, ferramentas, produtos digitais e soluções práticas para criação, vendas, operação e crescimento no mercado digital.",
  alternates: { canonical: "https://novidades.store/conteudos-digitais" },
};

const validBadges = new Set<BadgeId>([
  "novo",
  "em-alta",
  "oferta",
  "tendencia",
  "mais-vendido",
]);

const tools = [
  {
    href: "/ferramentas/hook-lab",
    title: "Hook Lab",
    description:
      "Estruturas de hooks por função a partir de um briefing real.",
    icon: Sparkles,
  },
  {
    href: "/ferramentas/page-audit",
    title: "Sales Page Audit",
    description:
      "Scorecard interativo para prova, mobile, checkout e entrega.",
    icon: ClipboardCheck,
  },
  {
    href: "/ferramentas/email-sequence-builder",
    title: "Email Sequence Builder",
    description:
      "Mapeie welcome, nurture, recovery, launch e activation antes de escrever copy.",
    icon: Mail,
  },
  {
    href: "/ferramentas/prompt-builder",
    title: "Prompt Builder",
    description:
      "Monte prompts com evidence rules, output schema e quality check.",
    icon: WandSparkles,
  },
  {
    href: "/ferramentas/launch-readiness",
    title: "Launch Readiness",
    description:
      "Release gate para produto, checkout, delivery, mobile e suporte.",
    icon: Rocket,
  },
];

export default async function DigitalContentPage() {
  const catalog = await getPublicCatalog();
  const category = CATEGORIES.find((item) => item.slug === "conteudos-digitais");

  const products: Product[] = catalog
    .filter(
      (listing) =>
        listing.categorySlug === "conteudos-digitais" &&
        listing.priceCents !== null,
    )
    .map((listing) => ({
      id: listing.productId,
      slug: listing.slug,
      name: listing.title,
      categoryId: category?.id ?? "conteudos-digitais",
      price: (listing.priceCents ?? 0) / 100,
      currency: listing.currency,
      badge: listing.badges.find((badge): badge is BadgeId =>
        validBadges.has(badge as BadgeId),
      ),
      image: listing.image,
      tagline: listing.subtitle,
      description: listing.description,
      storefrontUrl: listing.funnelUrl ?? undefined,
      published: true,
      fulfillmentType: listing.fulfillmentType,
      requiresShipping: listing.requiresShipping,
    }));

  return (
    <main className="min-h-screen bg-[radial-gradient(circle_at_75%_4%,rgba(0,180,255,.18),transparent_28rem),linear-gradient(180deg,#03152f,#061f42_48%,#f5f8fc_48%)]">
      <section className="mx-auto w-full max-w-[1280px] px-4 py-8 md:px-6 md:py-12 lg:px-8">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-sm font-semibold text-cyan-100/70 transition hover:text-white"
        >
          <ArrowLeft className="h-4 w-4" />
          Voltar à Novidades.store
        </Link>

        <div className="mt-7 overflow-hidden rounded-[28px] border border-cyan-200/20 bg-[radial-gradient(circle_at_80%_22%,rgba(0,216,255,.25),transparent_32%),linear-gradient(135deg,#04162f,#082d5e_62%,#031126)] px-6 py-8 text-white shadow-[0_28px_90px_rgba(0,34,92,.3)] md:px-10 md:py-12">
          <div className="grid gap-8 lg:grid-cols-[1fr_.55fr] lg:items-center">
            <div>
              <span className="inline-flex items-center gap-2 rounded-full border border-cyan-200/20 bg-cyan-300/10 px-3 py-1.5 text-xs font-black tracking-[0.12em] text-cyan-200 uppercase">
                <BrainCircuit className="h-4 w-4" />
                Academia Digital Novidades
              </span>
              <h1 className="mt-5 max-w-4xl text-4xl font-black tracking-[-0.045em] md:text-6xl">
                Software, IA e soluções para executar melhor no mercado digital.
              </h1>
              <p className="mt-5 max-w-3xl text-sm leading-7 text-slate-300 md:text-base">
                Produtos digitais, sistemas, ferramentas, templates e recursos práticos para criação, marketing, vendas, automação, operação e crescimento online.
              </p>
            </div>

            <div className="grid grid-cols-2 gap-3">
              {[
                [Cpu, "Software"],
                [Bot, "IA & Automação"],
                [Code2, "Ferramentas"],
                [Layers3, "Produtos Digitais"],
              ].map(([Icon, label]) => {
                const IconComponent = Icon as typeof Cpu;
                return (
                  <div
                    key={String(label)}
                    className="rounded-2xl border border-white/10 bg-white/5 p-4 backdrop-blur"
                  >
                    <IconComponent className="h-6 w-6 text-cyan-300" />
                    <p className="mt-3 text-sm font-black">{String(label)}</p>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-5">
            {[
              ["1", "Mensagem", "Conversion Content OS"],
              ["2", "Página", "Sales Page Blueprint"],
              ["3", "Email", "Email Conversion Kit"],
              ["4", "Lançamento", "Digital Product Launch Kit"],
              ["5", "Operação", "FinanceOS MEI"],
            ].map(([step, label, product]) => (
              <div key={step} className="rounded-2xl border border-white/10 bg-white/5 p-4">
                <span className="text-xs font-extrabold text-cyan-300">{step}</span>
                <p className="mt-2 text-sm font-extrabold">{label}</p>
                <p className="mt-1 text-xs text-slate-400">{product}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-8 grid gap-3 md:grid-cols-[1fr_auto]">
          <div className="flex items-start gap-3 rounded-2xl border border-border bg-white p-4 text-sm text-muted-foreground shadow-card">
            <ShieldCheck className="mt-0.5 h-5 w-5 shrink-0 text-success" />
            <p>
              O valor é resolvido no servidor a partir do catálogo publicado.
              Produtos digitais não exigem frete e o acesso só é concedido após
              confirmação de pagamento.
            </p>
          </div>
          <Link
            href="/conteudos-digitais/biblioteca"
            className="inline-flex min-h-14 items-center justify-center gap-2 rounded-2xl bg-primary px-5 text-sm font-extrabold text-primary-foreground"
          >
            <BookMarked className="h-4 w-4" aria-hidden="true" />
            Minha biblioteca
          </Link>
        </div>

        <section className="mt-10" aria-label="Produtos digitais">
          <div className="mb-5">
            <p className="text-xs font-bold tracking-[0.14em] text-brand-dark uppercase">
              Academia Digital
            </p>
            <h2 className="mt-1 text-2xl font-extrabold tracking-tight text-[#07142a] md:text-3xl">
              Software, sistemas e produtos digitais disponíveis
            </h2>
          </div>

          {products.length ? (
            <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {products.map((product) => (
                <li key={product.id}>
                  <ProductCard product={product} className="h-full" />
                </li>
              ))}
            </ul>
          ) : (
            <div className="rounded-2xl border border-dashed border-border bg-white p-8 text-sm text-muted-foreground">
              Os primeiros produtos da Academia Digital estão em ativação no Commerce Core.
            </div>
          )}
        </section>

        <section className="mt-12 rounded-[24px] bg-white p-5 shadow-card md:p-8">
          <div className="flex items-start gap-3">
            <Layers3 className="mt-1 h-6 w-6 text-brand-dark" aria-hidden="true" />
            <div>
              <p className="text-xs font-bold tracking-[0.14em] text-brand-dark uppercase">
                Ferramentas web
              </p>
              <h2 className="mt-1 text-2xl font-extrabold text-[#07142a] md:text-3xl">
                Soluções práticas para criar, testar e operar.
              </h2>
            </div>
          </div>

          <div className="mt-6 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            {tools.map((item) => {
              const Icon = item.icon;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className="group rounded-2xl border border-border bg-soft/60 p-5 transition hover:border-brand"
                >
                  <Icon className="h-5 w-5 text-brand-dark" aria-hidden="true" />
                  <h3 className="mt-4 text-lg font-extrabold text-[#07142a]">{item.title}</h3>
                  <p className="mt-2 text-sm leading-6 text-muted-foreground">
                    {item.description}
                  </p>
                  <span className="mt-4 inline-flex items-center gap-2 text-xs font-extrabold text-brand-dark">
                    Abrir
                    <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
                  </span>
                </Link>
              );
            })}
          </div>
        </section>
      </section>
    </main>
  );
}
