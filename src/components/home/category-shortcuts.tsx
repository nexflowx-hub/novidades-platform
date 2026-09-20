"use client";

import Image from "next/image";
import { BadgePercent } from "lucide-react";
import { CATEGORIES } from "@/lib/data";
import { useUI } from "@/lib/store/ui";
import { scrollToId } from "@/lib/scroll";

export function CategoryShortcuts() {
  const setFilter = useUI((state) => state.setFilter);

  const goCategory = (id: string, label: string) => {
    setFilter({ type: "category", value: id, label });
    scrollToId("destaques");
  };

  const goOffers = () => {
    setFilter({ type: "badge", value: "oferta", label: "Ofertas Especiais" });
    scrollToId("destaques");
  };

  return (
    <section id="categorias" aria-label="Categorias Novidades.store" className="nv-shell scroll-mt-36 py-5 md:py-7">
      <div className="scrollbar-none flex gap-3 overflow-x-auto pb-2 lg:grid lg:grid-cols-10 lg:overflow-visible">
        <CategoryMedallion
          label="Ofertas Especiais"
          onClick={goOffers}
          offer
        />
        {CATEGORIES.map((category) => (
          <CategoryMedallion
            key={category.id}
            label={category.name}
            image={category.image}
            onClick={() => goCategory(category.id, category.name)}
          />
        ))}
      </div>
    </section>
  );
}

function CategoryMedallion({
  label,
  image,
  onClick,
  offer = false,
}: {
  label: string;
  image?: string;
  onClick: () => void;
  offer?: boolean;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="group flex w-[92px] shrink-0 flex-col items-center gap-2.5 text-center lg:w-auto"
      aria-label={label}
    >
      <span
        className={`nv-metal-ring grid h-[82px] w-[82px] place-items-center rounded-full p-[4px] transition duration-300 group-hover:-translate-y-1 group-hover:scale-[1.035] lg:h-[96px] lg:w-[96px] ${offer ? "shadow-[0_0_30px_rgba(255,43,67,.30)]" : ""}`}
      >
        <span
          className={`relative grid h-full w-full place-items-center overflow-hidden rounded-full border border-white/20 ${offer ? "bg-[radial-gradient(circle_at_35%_20%,#ff6b52,#c40e24_55%,#5c0610)]" : "nv-category-core"}`}
        >
          {offer ? (
            <>
              <BadgePercent className="h-10 w-10 text-amber-200 drop-shadow-[0_2px_8px_rgba(255,184,40,.45)]" aria-hidden="true" />
              <span className="absolute bottom-2 text-[8px] font-black tracking-[.09em] text-white uppercase">Ofertas</span>
            </>
          ) : image ? (
            <Image
              src={image}
              alt=""
              fill
              sizes="96px"
              className="object-cover opacity-95 transition duration-500 group-hover:scale-110"
            />
          ) : null}
          <span className="absolute inset-0 rounded-full bg-gradient-to-br from-white/18 via-transparent to-black/15" />
        </span>
      </span>
      <span className="max-w-[110px] text-[10px] leading-[1.12] font-extrabold text-white/86 lg:text-[11px]">
        {label}
      </span>
    </button>
  );
}
