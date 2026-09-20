import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  ArrowRight,
  CheckCircle2,
  Download,
  ShieldCheck,
  Zap,
} from "lucide-react";
import { CcosCheckout } from "@/components/digital/ccos-checkout";
import { getPublicListingBySlug } from "@/lib/commerce-db";
import { formatMoney } from "@/lib/format";

type Props = {
  params: Promise<{ category: string; product: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { category, product } = await params;
  const listing = await getPublicListingBySlug(category, product);

  if (!listing) {
    return { title: "Produto não encontrado" };
  }

  const canonical = `https://novidades.store/${category}/${product}`;

  return {
    title: listing.title,
    description: listing.description || listing.subtitle,
    alternates: { canonical },
    openGraph: {
      title: listing.title,
      description: listing.description || listing.subtitle,
      url: canonical,
      type: "website",
      images: listing.image ? [{ url: listing.image }] : undefined,
    },
  };
}

export default async function ProductPage({ params }: Props) {
  const { category, product } = await params;
  const listing = await getPublicListingBySlug(category, product);

  if (!listing || listing.priceCents === null) notFound();

  const price = listing.priceCents / 100;
  const funnelUrl = listing.funnelUrl;
  const isDigital = listing.fulfillmentType === "digital";
  const isCcos = isDigital && listing.slug === "conversion-content-os";
  const canonicalUrl = `https://novidades.store/${category}/${product}`;
  const offerActive = Boolean(funnelUrl || isCcos);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: listing.title,
    description: listing.description,
    image: [listing.image, ...listing.gallery].filter(Boolean),
    sku: listing.slug,
    ...(offerActive
      ? {
          offers: {
            "@type": "Offer",
            priceCurrency: listing.currency,
            price: price.toFixed(2),
            availability: "https://schema.org/InStock",
            url: canonicalUrl,
          },
        }
      : {}),
  };

  const ccosDeliverables = [
    "Conversion Content OS — Guide",
    "Conversion Workbook",
    "Hook Library — 300 Structures",
    "Prompt Library — 36 prompts",
    "CTA & Offer Swipe File",
    "Content Repurposing Matrix",
    "Quick Start & Activation Guide",
    "Customer License & Terms",
  ];

  return (
    <article className="bg-[#f7f7f5]">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <div className="mx-auto w-full max-w-[1280px] px-4 py-6 md:px-6 md:py-10 lg:px-8">
        <nav className="mb-5 text-xs text-muted-foreground" aria-label="Breadcrumb">
          <Link href="/" className="hover:text-foreground">
            Início
          </Link>
          <span className="mx-2">/</span>
          <Link href="/conteudos-digitais" className="hover:text-foreground">
            {listing.categoryName}
          </Link>
          <span className="mx-2">/</span>
          <span className="text-foreground">{listing.title}</span>
        </nav>

        <div className="grid gap-6 rounded-[22px] border border-border bg-white p-4 shadow-card md:grid-cols-[1.02fr_.98fr] md:p-7 lg:gap-10 lg:p-10">
          <section>
            <div className="relative aspect-square overflow-hidden rounded-[18px] bg-soft">
              <Image
                src={listing.image}
                alt={listing.title}
                fill
                priority
                sizes="(max-width: 768px) 100vw, 50vw"
                className="object-cover"
              />
            </div>
          </section>

          <section className="flex flex-col justify-center">
            <p className="text-[11px] font-bold tracking-[0.14em] text-brand-dark uppercase">
              {listing.categoryName}
            </p>
            <h1 className="mt-2 font-editorial text-4xl font-semibold leading-[1.02] tracking-[-0.04em] md:text-5xl">
              {listing.title}
            </h1>
            {listing.subtitle ? (
              <p className="mt-3 text-lg font-semibold text-[#7a6546]">
                {listing.subtitle}
              </p>
            ) : null}
            <p className="mt-4 max-w-xl text-sm leading-7 text-muted-foreground md:text-[15px]">
              {listing.description}
            </p>

            <div className="mt-7 border-y border-border py-5">
              <span className="text-[11px] font-semibold tracking-wide text-muted-foreground uppercase">
                {isDigital ? "Acesso por" : "A partir de"}
              </span>
              <strong className="mt-1 block text-3xl tracking-tight">
                {formatMoney(price, listing.currency)}
              </strong>
              {listing.currency === "BRL" ? (
                <p className="mt-2 inline-flex items-center gap-2 text-xs text-muted-foreground">
                  <Zap className="h-4 w-4 text-brand" aria-hidden="true" />
                  PIX via XPAYMENTS no checkout da oferta
                </p>
              ) : null}
              {isDigital ? (
                <p className="mt-2 inline-flex items-center gap-2 text-xs text-muted-foreground">
                  <Download className="h-4 w-4 text-brand" aria-hidden="true" />
                  Produto digital — sem frete ou entrega física
                </p>
              ) : null}
            </div>

            {isCcos ? (
              <CcosCheckout />
            ) : funnelUrl ? (
              <a
                href={funnelUrl}
                className="mt-6 inline-flex min-h-12 items-center justify-center gap-2 rounded-[12px] bg-brand px-6 text-sm font-extrabold text-white transition hover:bg-brand-dark"
              >
                Ver oferta completa
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </a>
            ) : (
              <div className="mt-6 rounded-xl bg-soft p-4 text-sm text-muted-foreground">
                {isDigital
                  ? "Checkout e entrega digital em ativação. O produto já está catalogado, mas a compra só será liberada quando pagamento e acesso protegido estiverem operacionais."
                  : "Esta oferta ainda não está disponível para compra."}
              </div>
            )}

            <div className="mt-4 grid gap-2 rounded-xl bg-soft p-4 text-xs text-muted-foreground">
              <p className="flex items-center gap-2">
                <ShieldCheck className="h-4 w-4 text-success" aria-hidden="true" />
                Vendedor, total, entrega e políticas identificados antes do pagamento.
              </p>
              <p>
                {isDigital
                  ? "Acesso liberado após confirmação de pagamento por entitlement protegido e links temporários."
                  : "Uma experiência Novidades.store."}
              </p>
            </div>
          </section>
        </div>

        {isCcos ? (
          <section className="mt-8 rounded-[22px] border border-border bg-white p-5 shadow-card md:p-8">
            <p className="text-[11px] font-bold tracking-[0.14em] text-brand-dark uppercase">
              Release 1.0
            </p>
            <h2 className="mt-2 text-2xl font-extrabold tracking-[-0.03em] md:text-3xl">
              O que está incluído no pacote
            </h2>
            <p className="mt-3 max-w-3xl text-sm leading-7 text-muted-foreground">
              O Conversion Content OS é um toolkit operacional para estruturar
              mensagem, prova, hooks, conteúdo, CTAs, adaptação multicanal e
              testes. Não promete receita, crescimento ou taxa de conversão.
            </p>

            <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
              {ccosDeliverables.map((item) => (
                <div
                  key={item}
                  className="flex items-start gap-2 rounded-xl border border-border bg-soft/60 p-4 text-sm font-semibold"
                >
                  <CheckCircle2
                    className="mt-0.5 h-4 w-4 shrink-0 text-success"
                    aria-hidden="true"
                  />
                  <span>{item}</span>
                </div>
              ))}
            </div>

            <div className="mt-6 grid gap-3 rounded-xl bg-[#0b1220] p-5 text-sm text-slate-300 md:grid-cols-3">
              <p>
                <strong className="block text-white">Uso prático</strong>
                Para projetos próprios, empresas e trabalho de cliente.
              </p>
              <p>
                <strong className="block text-white">Entrega protegida</strong>
                Downloads privados com URLs assinadas e de curta duração.
              </p>
              <p>
                <strong className="block text-white">Guardrails</strong>
                Sem testemunhos inventados, falsa urgência ou prova fabricada.
              </p>
            </div>
          </section>
        ) : null}
      </div>
    </article>
  );
}
