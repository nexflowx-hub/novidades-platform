"use client";

import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import { CATEGORIES } from "@/lib/data";
import { useUI } from "@/lib/store/ui";
import { scrollToId } from "@/lib/scroll";
import { Reveal } from "@/components/commerce/reveal";
import { Section, SectionHeader } from "@/components/commerce/section-header";

export function FeaturedCategories() {
  const setFilter = useUI((s) => s.setFilter);

  return (
    <Section ariaLabel="Categorias em destaque">
      <SectionHeader
        title="Categorias em destaque"
        action={{
          label: "Ver todas",
          onClick: () => scrollToId("categorias"),
        }}
      />

      <Reveal>
        <ul className="grid grid-cols-2 gap-3.5 md:grid-cols-4 md:gap-4">
          {CATEGORIES.map((cat) => (
            <li key={cat.id}>
              <button
                type="button"
                onClick={() => {
                  setFilter({ type: "category", value: cat.id, label: cat.name });
                  scrollToId("destaques");
                }}
                aria-label={`Explorar categoria ${cat.name}`}
                className="group relative block aspect-[4/3] w-full overflow-hidden rounded-[14px] text-left shadow-card transition-all duration-300 hover:-translate-y-0.5 hover:shadow-floating focus-visible:ring-2 focus-visible:ring-brand focus-visible:outline-none md:aspect-[3/2]"
              >
                <Image
                  src={cat.image}
                  alt=""
                  fill
                  sizes="(max-width: 768px) 46vw, 340px"
                  className="object-cover transition-transform duration-500 group-hover:scale-[1.05]"
                />
                <div
                  className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/15 to-transparent"
                  aria-hidden="true"
                />
                <span className="absolute right-3.5 bottom-3 left-3.5 flex items-center justify-between gap-2">
                  <span className="text-[14px] leading-tight font-bold text-white md:text-[15px]">
                    {cat.name}
                  </span>
                  <span className="grid h-7 w-7 shrink-0 translate-y-1 place-items-center rounded-full bg-white/20 opacity-0 backdrop-blur transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
                    <ArrowUpRight className="h-4 w-4 text-white" aria-hidden="true" />
                  </span>
                </span>
              </button>
            </li>
          ))}
        </ul>
      </Reveal>
    </Section>
  );
}
