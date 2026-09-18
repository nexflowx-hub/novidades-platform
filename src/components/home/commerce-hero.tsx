"use client";

import Image from "next/image";
import { ArrowRight, ShieldCheck, Sparkles, Zap } from "lucide-react";
import { scrollToId } from "@/lib/scroll";

export function CommerceHero() {
  return (
    <section
      aria-label="Destaque do dia"
      className="mx-auto w-full max-w-[1440px] px-4 pt-4 pb-2 md:px-6 md:pt-6 lg:px-8"
    >
      <div className="grid gap-4 lg:grid-cols-[3fr_1fr]">
        <article className="relative min-h-[445px] overflow-hidden rounded-[20px] bg-[#0d100f] text-white lg:min-h-[470px]">
          <div
            className="absolute inset-0 opacity-90"
            style={{
              background:
                "radial-gradient(circle at 76% 38%, rgba(77,118,97,.36), transparent 28%), radial-gradient(circle at 34% 92%, rgba(181,125,54,.18), transparent 32%), linear-gradient(135deg,#0b0d0c,#161b18 55%,#090a09)",
            }}
            aria-hidden="true"
          />

          <div className="relative grid min-h-[445px] items-center md:grid-cols-[1.05fr_.95fr] lg:min-h-[470px]">
            <div className="z-10 flex flex-col justify-center p-6 md:p-10 lg:p-12">
              <span className="mb-4 inline-flex w-fit items-center gap-1.5 rounded-full border border-white/12 bg-white/6 px-3 py-1.5 text-[10px] font-bold tracking-[0.16em] text-white/75 uppercase">
                <Sparkles className="h-3.5 w-3.5 text-gold" aria-hidden="true" />
                Arte &amp; Vida · Em destaque
              </span>

              <h1 className="font-editorial text-[42px] leading-[.98] font-bold tracking-tight sm:text-5xl lg:text-[62px]">
                SIGNUM 312
              </h1>

              <p className="mt-3 text-base font-semibold text-[#E8C989] md:text-lg">
                Fé. Coragem. Propósito.
              </p>

              <p className="mt-3 max-w-lg text-[14px] leading-relaxed text-white/72 md:text-[15px]">
                Uma coleção contemporânea inspirada em simbolismo histórico,
                criada para quem prefere carregar significado.
              </p>

              <div className="mt-6 flex flex-wrap items-end gap-5">
                <div>
                  <span className="block text-[10px] font-semibold tracking-[0.1em] text-white/45 uppercase">
                    A partir de
                  </span>
                  <strong className="mt-1 block text-3xl tracking-tight md:text-4xl">
                    R$ 89,90
                  </strong>
                </div>

                <span className="inline-flex items-center gap-1.5 pb-1 text-xs text-white/60">
                  <Zap className="h-3.5 w-3.5 text-brand" aria-hidden="true" />
                  PIX via XPAYMENTS
                </span>
              </div>

              <div className="mt-7 flex flex-col gap-3 sm:flex-row">
                <a
                  href="https://signum312.novidades.store"
                  className="inline-flex h-12 items-center justify-center gap-2 rounded-[11px] bg-[#F3EDE2] px-7 text-sm font-bold text-[#151816] transition-all hover:bg-white hover:shadow-lg active:scale-[0.99]"
                >
                  Ver oferta SIGNUM 312
                  <ArrowRight className="h-4 w-4" aria-hidden="true" />
                </a>

                <button
                  type="button"
                  onClick={() => scrollToId("destaques")}
                  className="inline-flex h-12 items-center justify-center rounded-[11px] border border-white/14 bg-white/5 px-6 text-sm font-semibold text-white/85 transition hover:bg-white/10"
                >
                  Explorar Novidades.store
                </button>
              </div>

              <p className="mt-4 inline-flex items-center gap-2 text-[10px] text-white/45">
                <ShieldCheck className="h-3.5 w-3.5 text-success" aria-hidden="true" />
                Produto real · condições e vendedor identificados antes do pagamento
              </p>
            </div>

            <div className="relative hidden h-full min-h-[445px] md:block">
              <div className="absolute top-[9%] right-[12%] w-[54%] rotate-[3deg] overflow-hidden rounded-2xl border border-white/10 bg-white/6 p-2 shadow-2xl">
                <Image
                  src="/images/products/signum-patina-real.webp"
                  alt="SIGNUM 312 edição pátina — fotografia real"
                  width={300}
                  height={411}
                  priority
                  className="h-auto w-full rounded-xl object-cover"
                />
              </div>

              <div className="absolute right-[52%] bottom-[8%] w-[37%] -rotate-[5deg] overflow-hidden rounded-2xl border border-white/10 bg-white/6 p-2 shadow-2xl">
                <Image
                  src="/images/products/signum-gold-real.webp"
                  alt="SIGNUM 312 edição dourada — fotografia real"
                  width={300}
                  height={411}
                  priority
                  className="h-auto w-full rounded-xl object-cover"
                />
              </div>

              <span className="absolute right-[7%] bottom-[5%] text-[9px] tracking-[0.08em] text-white/35 uppercase">
                Fotografias reais do produto
              </span>
            </div>
          </div>
        </article>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-1">
          <HeroPromoCard
            image="/images/promo/discovery.png"
            alt="Seleção editorial Novidades.store"
            title="Descobertas para o seu dia a dia"
            description="Curadoria antes de quantidade."
            ctaLabel="Explorar"
            onCta={() => scrollToId("destaques")}
          />
          <HeroPromoCard
            image="/images/promo/gift.png"
            alt="Seleção de presentes"
            title="Presentes com intenção"
            description="Ideias selecionadas para momentos especiais."
            ctaLabel="Ver universo"
            onCta={() => scrollToId("presentes")}
          />
        </div>
      </div>
    </section>
  );
}

function HeroPromoCard({
  image,
  alt,
  title,
  description,
  ctaLabel,
  onCta,
}: {
  image: string;
  alt: string;
  title: string;
  description: string;
  ctaLabel: string;
  onCta: () => void;
}) {
  return (
    <article className="group relative min-h-[190px] overflow-hidden rounded-[18px] bg-header-2 lg:min-h-[227px]">
      <Image
        src={image}
        alt={alt}
        fill
        sizes="(max-width: 640px) 50vw, (max-width: 1024px) 50vw, 350px"
        className="object-cover transition-transform duration-700 group-hover:scale-[1.025]"
      />
      <div
        className="absolute inset-0 bg-gradient-to-t from-black/82 via-black/38 to-black/10"
        aria-hidden="true"
      />
      <div className="relative flex h-full flex-col justify-between gap-4 p-5 lg:p-6">
        <div>
          <h2 className="text-lg leading-snug font-extrabold text-white md:text-xl">
            {title}
          </h2>
          <p className="mt-1 text-xs text-white/72 md:text-[13px]">{description}</p>
        </div>
        <button
          type="button"
          onClick={onCta}
          className="inline-flex h-10 w-fit items-center gap-2 rounded-[10px] bg-white/95 px-4 text-[13px] font-bold text-[#151816] transition-all hover:bg-white hover:shadow-lg active:scale-[0.99]"
        >
          {ctaLabel}
          <ArrowRight className="h-4 w-4" aria-hidden="true" />
        </button>
      </div>
    </article>
  );
}
