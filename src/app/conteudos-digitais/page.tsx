import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowLeft,
  ArrowRight,
  BookOpenCheck,
  ClipboardCheck,
  Layers3,
  ShieldCheck,
  Sparkles,
} from "lucide-react";
import { ProductCard } from "@/components/commerce/product-card";
import { getPublicCatalog } from "@/lib/commerce-db";
import { CATEGORIES, type BadgeId, type Product } from "@/lib/data";

export const metadata: Metadata = {
  title: "Conteúdos Digitais",
  description:
    "Produtos e ferramentas digitais para conteúdo, conversão, páginas de venda e gestão.",
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
    <main className="bg-[#f7f7f5]">
      <section className="mx-auto w-full max-w-[1280px] px-4 py-8 md:px-6 md:py-12 lg:px-8">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-sm font-semibold text-muted-foreground transition hover:text-foreground"
        >
          <ArrowLeft className="h-4 w-4" />
          Voltar à Novidades.store
        </Link>

        <div className="mt-7 overflow-hidden rounded-[24px] bg-[#0b1220] px-6 py-8 text-white md:px-10 md:py-12">
          <div className="max-w-4xl">
            <span className="inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-1.5 text-xs font-bold tracking-[0.12em] uppercase">
              <BookOpenCheck className="h-4 w-4 text-cyan-300" />
              Novidades Digital Suite
            </span>
            <h1 className="mt-5 text-4xl font-extrabold tracking-[-0.04em] md:text-6xl">
              Produtos, ferramentas e sistemas para executar melhor.
            </h1>
            <p className="mt-5 max-w-3xl text-sm leading-7 text-slate-300 md:text-base">
              Conteúdo, conversão, páginas de venda e gestão numa linha de
              produtos versionados, com checkout server-side e entrega privada.
            </p>
          </div>

          <div className="mt-8 grid gap-3 md:grid-cols-3">
            {[
              ["1", "Mensagem", "Conversion Content OS"],
              ["2", "Página", "Sales Page Blueprint"],
              ["3", "Operação", "FinanceOS MEI"],
            ].map(([step, label, product]) => (
              <div
                key={step}
                className="rounded-2xl border border-white/10 bg-white/5 p-4"
              >
                <span className="text-xs font-extrabold text-cyan-300">
                  {step}
                </span>
                <p className="mt-2 text-sm font-extrabold">{label}</p>
                <p className="mt-1 text-xs text-slate-400">{product}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-8 flex items-start gap-3 rounded-2xl border border-border bg-white p-4 text-sm text-muted-foreground">
          <ShieldCheck className="mt-0.5 h-5 w-5 shrink-0 text-success" />
          <p>
            O valor é resolvido no servidor a partir do catálogo publicado.
            Produtos digitais não exigem frete e o acesso só é concedido após
            confirmação de pagamento.
          </p>
        </div>

        <section className="mt-10" aria-label="Produtos digitais">
          <div className="mb-5">
            <p className="text-xs font-bold tracking-[0.14em] text-brand-dark uppercase">
              Releases digitais
            </p>
            <h2 className="mt-1 text-2xl font-extrabold tracking-tight md:text-3xl">
              Soluções disponíveis
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
              Os primeiros produtos digitais estão em ativação no Commerce Core.
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
              <h2 className="mt-1 text-2xl font-extrabold md:text-3xl">
                Use antes de comprar ou enquanto implementa.
              </h2>
            </div>
          </div>

          <div className="mt-6 grid gap-4 md:grid-cols-2">
            {tools.map((item) => {
              const Icon = item.icon;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className="group rounded-2xl border border-border bg-soft/60 p-5 transition hover:border-brand"
                >
                  <Icon className="h-5 w-5 text-brand-dark" aria-hidden="true" />
                  <h3 className="mt-4 text-lg font-extrabold">{item.title}</h3>
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
