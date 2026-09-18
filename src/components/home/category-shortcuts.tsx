"use client";

import Image from "next/image";
import { Ellipsis, Flame, Sparkles } from "lucide-react";
import { CATEGORIES } from "@/lib/data";
import { useUI } from "@/lib/store/ui";
import { scrollToId } from "@/lib/scroll";

export function CategoryShortcuts() {
  const setFilter = useUI((s) => s.setFilter);

  const goCategory = (id: string, label: string) => {
    setFilter({ type: "category", value: id, label });
    scrollToId("destaques");
  };

  const quickFilters: Array<{
    label: string;
    icon: React.ElementType;
    className: string;
    action: () => void;
  }> = [
    {
      label: "Em alta",
      icon: Flame,
      className: "bg-brand/12 text-brand-dark",
      action: () => {
        setFilter({ type: "badge", value: "em-alta", label: "Em alta" });
        scrollToId("destaques");
      },
    },
    {
      label: "Novidades",
      icon: Sparkles,
      className: "bg-rating/15 text-[#8a6200]",
      action: () => {
        setFilter({ type: "badge", value: "novo", label: "Novidades" });
        scrollToId("destaques");
      },
    },
  ];

  return (
    <section aria-label="Atalhos de categorias" className="py-2">
      {/* Mobile: scroll horizontal (mockup) */}
      <div className="scrollbar-none flex gap-1 overflow-x-auto px-3 pb-1 lg:hidden">
        {quickFilters.map(({ label, icon: Icon, className, action }) => (
          <button
            key={label}
            type="button"
            onClick={action}
            className="flex w-[68px] shrink-0 flex-col items-center gap-1.5 py-1"
          >
            <span
              className={`grid h-[58px] w-[58px] place-items-center rounded-full ${className}`}
            >
              <Icon className="h-6 w-6" aria-hidden="true" />
            </span>
            <span className="text-[11px] leading-tight font-medium">{label}</span>
          </button>
        ))}
        {CATEGORIES.slice(0, 6).map((cat) => (
          <CategoryBubble key={cat.id} category={cat} onClick={() => goCategory(cat.id, cat.name)} />
        ))}
      </div>

      {/* Desktop: 9 colunas (8 categorias + ver todas) */}
      <div className="mx-auto hidden w-full max-w-[1440px] px-8 lg:block">
        <div className="grid grid-cols-9 gap-2">
          {CATEGORIES.map((cat) => (
            <CategoryBubble
              key={cat.id}
              category={cat}
              large
              onClick={() => goCategory(cat.id, cat.name)}
            />
          ))}
          <button
            type="button"
            onClick={() => scrollToId("categorias-destaque")}
            className="group flex flex-col items-center gap-2 py-1"
          >
            <span className="grid h-[76px] w-[76px] place-items-center rounded-full bg-soft ring-border transition-all group-hover:bg-warm group-hover:ring-2 group-hover:ring-brand/50">
              <Ellipsis className="h-7 w-7 text-muted-foreground" aria-hidden="true" />
            </span>
            <span className="text-[13px] leading-tight font-semibold text-foreground">
              Ver todas
            </span>
          </button>
        </div>
      </div>
    </section>
  );
}

function CategoryBubble({
  category,
  large = false,
  onClick,
}: {
  category: (typeof CATEGORIES)[number];
  large?: boolean;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="group flex shrink-0 flex-col items-center gap-1.5 py-1 focus-visible:outline-none"
      aria-label={`Ver produtos de ${category.name}`}
    >
      <span
        className={`overflow-hidden rounded-full transition-all duration-300 group-hover:scale-[1.05] group-focus-visible:ring-2 group-focus-visible:ring-brand ${
          large
            ? "h-[76px] w-[76px] ring-border group-hover:ring-2 group-hover:ring-brand/50"
            : "h-[58px] w-[58px]"
        }`}
        style={{ backgroundColor: category.color }}
      >
        <Image
          src={category.image}
          alt=""
          width={152}
          height={152}
          className="h-full w-full object-cover"
        />
      </span>
      <span
        className={`leading-tight font-medium text-foreground ${
          large ? "text-[13px]" : "text-[11px]"
        } text-center`}
      >
        {category.name}
      </span>
    </button>
  );
}
