"use client";

import Image from "next/image";
import { ArrowRight, Gift } from "lucide-react";
import { scrollToId } from "@/lib/scroll";
import { Reveal } from "@/components/commerce/reveal";
import { Section } from "@/components/commerce/section-header";

export function GiftBanner() {
  return (
    <Section ariaLabel="Presentes que marcam">
      <Reveal>
        <div
          id="presentes"
          className="relative min-h-[220px] scroll-mt-36 overflow-hidden rounded-[18px] bg-warm md:min-h-[240px] lg:scroll-mt-40"
        >
          <Image
            src="/images/banner/gift-banner.png"
            alt="Coleção de presentes embrulhados com fitas de cetim"
            fill
            sizes="100vw"
            className="object-cover object-right"
          />
          <div
            className="absolute inset-0 bg-gradient-to-r from-warm via-warm/85 to-transparent md:via-warm/60"
            aria-hidden="true"
          />

          <div className="relative flex max-w-[70%] flex-col items-start justify-center gap-2.5 p-6 md:max-w-[52%] md:p-12">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-coral/12 px-3 py-1.5 text-[11px] font-bold tracking-wide text-coral uppercase">
              <Gift className="h-3.5 w-3.5" aria-hidden="true" />
              Sugestões de presentes
            </span>
            <h2 className="text-2xl font-extrabold tracking-tight text-[#151816] md:text-[32px]">
              Presentes que marcam
            </h2>
            <p className="text-sm text-muted-foreground md:text-[15px]">
              Encontre algo especial para quem você ama.
            </p>
            <button
              type="button"
              onClick={() => scrollToId("categorias-destaque")}
              className="mt-2 inline-flex h-11 items-center gap-2 rounded-[10px] bg-[#151816] px-6 text-sm font-bold text-white transition-all hover:bg-header-2 active:scale-[0.98]"
            >
              Ver sugestões
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </button>
          </div>
        </div>
      </Reveal>
    </Section>
  );
}
