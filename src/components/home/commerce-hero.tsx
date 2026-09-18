"use client";

import Image from "next/image";
import { ArrowRight, Flame, Star, Zap } from "lucide-react";
import { scrollToId } from "@/lib/scroll";

export function CommerceHero() {
  return (
    <section
      aria-label="Destaque do dia"
      className="mx-auto w-full max-w-[1440px] px-4 pt-4 pb-2 md:px-6 md:pt-6 lg:px-8"
    >
      <div className="grid gap-4 lg:grid-cols-[3fr_1fr]">
        {/* ——— Card principal: SIGNUM 312 ——— */}
        <article className="group relative min-h-[420px] overflow-hidden rounded-[18px] bg-black text-white lg:min-h-[440px]">
          <Image
            src="/images/hero/signum-hero.png"
            alt="SIGNUM 312 — colar medalhão de bronze com cruz gravada em cordão preto"
            fill
            priority
            sizes="(max-width: 1024px) 100vw, 900px"
            className="object-cover object-center transition-transform duration-700 group-hover:scale-[1.02]"
          />
          <div
            className="absolute inset-0 bg-gradient-to-r from-black/85 via-black/45 to-transparent md:via-black/30"
            aria-hidden="true"
          />

          <div className="relative flex h-full max-w-[92%] flex-col justify-center gap-2.5 p-6 md:max-w-[62%] md:p-10 lg:gap-3 lg:p-12">
            <div className="flex items-center gap-3">
              <span className="inline-flex items-center gap-1 rounded-md bg-gold px-2.5 py-1 text-[10px] font-extrabold tracking-wider text-[#241B05] uppercase md:text-[11px]">
                <Flame className="h-3 w-3" aria-hidden="true" />
                Mais vendido
              </span>
              <span className="flex items-center gap-1.5 text-xs font-medium text-white/75 md:text-[13px]">
                <span
                  className="h-2 w-2 rounded-full bg-[#D8C6A5]"
                  aria-hidden="true"
                />
                Arte &amp; Vida
              </span>
            </div>

            <h1 className="font-editorial text-4xl font-bold tracking-tight md:text-5xl lg:text-[56px] lg:leading-[1.05]">
              SIGNUM 312
            </h1>
            <p className="text-base font-semibold text-[#E8C989] md:text-lg">
              Fé. Coragem. Propósito.
            </p>
            <p className="max-w-md text-[13px] leading-relaxed text-white/75 md:text-sm">
              Mais que um colar. Um símbolo que atravessa o tempo.
            </p>

            <p className="flex items-center gap-1.5 text-xs md:text-[13px]">
              <Star className="h-3.5 w-3.5 fill-rating text-rating" aria-hidden="true" />
              <span className="font-bold">4.9</span>
              <span className="text-white/60">(128 avaliações)</span>
            </p>

            <div className="mt-1">
              <p className="text-3xl font-extrabold tracking-tight md:text-4xl">
                R$ 99,90
              </p>
              <p className="mt-1 flex items-center gap-1.5 text-xs text-white/70 md:text-[13px]">
                <Zap className="h-3.5 w-3.5 text-brand" aria-hidden="true" />
                ou PIX com aprovação imediata
              </p>
            </div>

            <div className="mt-3">
              <a
                href="https://signum312.novidades.store"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex h-11 items-center gap-2 rounded-[10px] bg-[#F3EDE2] px-6 text-sm font-bold text-[#151816] transition-all hover:bg-white hover:shadow-lg active:scale-[0.98] md:h-12 md:px-7"
              >
                Ver oferta
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </a>
              <p className="mt-2.5 text-[10px] text-white/50 md:text-[11px]">
                Você será direcionado para signum312.novidades.store · Uma
                experiência Novidades.store
              </p>
            </div>
          </div>

          <p
            className="pointer-events-none absolute right-8 bottom-6 hidden font-editorial text-xl text-white/55 italic md:block"
            aria-hidden="true"
          >
            Carregue o seu símbolo.
          </p>
        </article>

        {/* ——— Cards secundários ——— */}
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-1">
          <HeroPromoCard
            image="/images/promo/discovery.png"
            alt="Viajante com mochila em trilha ao pôr do sol"
            title="Descobertas para o seu dia a dia"
            description="Produtos úteis, inovadores e com propósito."
            ctaLabel="Explorar agora"
            onCta={() => scrollToId("destaques")}
          />
          <HeroPromoCard
            image="/images/promo/gift.png"
            alt="Caixa de presente elegante com fita de cetim"
            title="Presentes que marcam"
            description="Encontre algo especial."
            ctaLabel="Ver sugestões"
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
    <article className="group relative min-h-[190px] overflow-hidden rounded-[18px] bg-header-2 lg:min-h-[212px]">
      <Image
        src={image}
        alt={alt}
        fill
        sizes="(max-width: 640px) 50vw, (max-width: 1024px) 50vw, 350px"
        className="object-cover transition-transform duration-700 group-hover:scale-[1.04]"
      />
      <div
        className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/35 to-black/10 lg:bg-gradient-to-b lg:from-black/75 lg:via-black/30 lg:to-transparent"
        aria-hidden="true"
      />
      <div className="relative flex h-full flex-col justify-between gap-4 p-5 lg:p-6">
        <div>
          <h2 className="text-lg leading-snug font-extrabold text-white md:text-xl">
            {title}
          </h2>
          <p className="mt-1 text-xs text-white/75 md:text-[13px]">{description}</p>
        </div>
        <div>
          <button
            type="button"
            onClick={onCta}
            className="inline-flex h-10 items-center gap-2 rounded-[10px] bg-white/95 px-4 text-[13px] font-bold text-[#151816] transition-all hover:bg-white hover:shadow-lg active:scale-[0.98]"
          >
            {ctaLabel}
            <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </button>
        </div>
      </div>
    </article>
  );
}
