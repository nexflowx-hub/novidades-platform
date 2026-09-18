"use client";

import Image from "next/image";
import { Play } from "lucide-react";
import { toast } from "sonner";
import { VIDEO_CARDS, getProduct } from "@/lib/data";
import { useUI } from "@/lib/store/ui";
import { Reveal } from "@/components/commerce/reveal";
import { Section, SectionHeader } from "@/components/commerce/section-header";

export function VideoDiscovery() {
  const setQuickView = useUI((s) => s.setQuickView);
  const showInfo = useUI((s) => s.showInfo);

  return (
    <Section ariaLabel="Descobertas em vídeo">
      <SectionHeader
        title="Descobertas em vídeo"
        subtitle="Veja produtos em ação e inspire-se."
        action={{
          label: "Ver mais vídeos",
          onClick: () =>
            showInfo(
              "Feed de vídeos em breve",
              "O feed completo de descobertas em vídeo chega na Fase 4 da plataforma — com reprodução automática e vídeos de criadores."
            ),
        }}
      />

      <Reveal>
        <ul className="flex snap-x snap-mandatory gap-3.5 overflow-x-auto pb-2 scrollbar-none md:gap-4 lg:grid lg:grid-cols-5 lg:overflow-visible lg:pb-0">
          {VIDEO_CARDS.map((card) => {
            const product = getProduct(card.productId);
            if (!product) return null;
            return (
              <li
                key={card.productId}
                className="min-w-[62%] snap-start sm:min-w-[44%] lg:min-w-0"
              >
                <button
                  type="button"
                  onClick={() => setQuickView(product.id)}
                  aria-label={`${card.headline} — ver ${product.name}`}
                  className="group relative block aspect-[9/16] w-full overflow-hidden rounded-[14px] bg-header-2 text-left shadow-card transition-all duration-300 hover:-translate-y-0.5 hover:shadow-floating focus-visible:ring-2 focus-visible:ring-brand focus-visible:outline-none"
                >
                  <Image
                    src={card.poster}
                    alt=""
                    fill
                    sizes="(max-width: 640px) 62vw, (max-width: 1024px) 44vw, 260px"
                    className="object-cover transition-transform duration-500 group-hover:scale-[1.04]"
                  />
                  <div
                    className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/15 to-transparent"
                    aria-hidden="true"
                  />
                  <span
                    className="absolute top-1/2 left-1/2 grid h-12 w-12 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full bg-white/92 shadow-lg backdrop-blur transition-transform duration-300 group-hover:scale-110"
                    aria-hidden="true"
                  >
                    <Play className="ml-0.5 h-5 w-5 fill-[#151816] text-[#151816]" />
                  </span>
                  <span className="absolute right-4 bottom-4 left-4 text-[15px] leading-snug font-bold text-white">
                    {card.headline}
                  </span>
                </button>
              </li>
            );
          })}
        </ul>
      </Reveal>
    </Section>
  );
}
