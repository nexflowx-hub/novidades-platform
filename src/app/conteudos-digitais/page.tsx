import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, BookOpenCheck, ShieldCheck } from "lucide-react";
import { ProductCard } from "@/components/commerce/product-card";
import { getPublicCatalog } from "@/lib/commerce-db";
import { CATEGORIES, type BadgeId, type Product } from "@/lib/data";

export const metadata: Metadata = {
  title: "Conteúdos Digitais",
  description:
    "Guias, sistemas, templates, planilhas e ferramentas digitais selecionados pela Novidades.store.",
  alternates: { canonical: "https://novidades.store/conteudos-digitais" },
};

const validBadges = new Set<BadgeId>([
  "novo",
  "em-alta",
  "oferta",
  "tendencia",
  "mais-vendido",
]);

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
          <div className="max-w-3xl">
            <span className="inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-1.5 text-xs font-bold tracking-[0.12em] uppercase">
              <BookOpenCheck className="h-4 w-4 text-cyan-300" />
              Novidades Digital
            </span>
            <h1 className="mt-5 text-4xl font-extrabold tracking-[-0.04em] md:text-6xl">
              Conteúdos digitais feitos para usar, não apenas para ler.
            </h1>
            <p className="mt-5 max-w-2xl text-sm leading-7 text-slate-300 md:text-base">
              Guias, workbooks, planilhas, bibliotecas e sistemas práticos com
              escopo claro, versão identificada e entrega digital separada do
              fluxo de produtos físicos.
            </p>
          </div>
        </div>

        <div className="mt-8 flex items-start gap-3 rounded-2xl border border-border bg-white p-4 text-sm text-muted-foreground">
          <ShieldCheck className="mt-0.5 h-5 w-5 shrink-0 text-success" />
          <p>
            Produtos digitais não exigem frete. Compra e acesso só serão
            apresentados como ativos quando o checkout e a entrega protegida
            estiverem operacionais.
          </p>
        </div>

        <section className="mt-10" aria-label="Produtos digitais">
          <div className="mb-5">
            <p className="text-xs font-bold tracking-[0.14em] text-brand-dark uppercase">
              Releases digitais
            </p>
            <h2 className="mt-1 text-2xl font-extrabold tracking-tight md:text-3xl">
              Produtos disponíveis no catálogo
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
      </section>
    </main>
  );
}
