"use client";

import { AnimatePresence, motion } from "framer-motion";
import { PackageSearch, X } from "lucide-react";
import { PRODUCTS, getProduct, type Product } from "@/lib/data";
import { useUI } from "@/lib/store/ui";
import { ProductCard } from "@/components/commerce/product-card";
import { Reveal } from "@/components/commerce/reveal";
import { Section, SectionHeader } from "@/components/commerce/section-header";

const BADGE_FILTER_LABELS: Record<string, string> = {
  "mais-vendido": "Mais vendidos",
  novo: "Novidades",
  "em-alta": "Em alta",
  oferta: "Ofertas",
  tendencia: "Tendências",
};

export function FeaturedProducts() {
  const filter = useUI((s) => s.filter);
  const setFilter = useUI((s) => s.setFilter);

  const filtered = PRODUCTS.filter((p) => {
    if (!filter) return true;
    if (filter.type === "category") return p.categoryId === filter.value;
    return p.badge === filter.value;
  });

  return (
    <Section ariaLabel="Produtos em destaque" className="scroll-mt-36 lg:scroll-mt-40">
      <SectionHeader
        title={filter ? filter.label : "Em destaque hoje"}
        subtitle={
          filter
            ? "Seleção filtrada do catálogo Novidades.store."
            : "Selecionamos os melhores produtos para você."
        }
        action={{
          label: filter ? "Limpar filtro" : "Ver todas",
          onClick: () => setFilter(null),
        }}
      />

      <AnimatePresence>
        {filter ? (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="mb-4 overflow-hidden"
          >
            <span className="inline-flex items-center gap-2 rounded-full bg-warm py-2 pr-3 pl-4 text-[13px] font-semibold">
              {filter.type === "category" ? "Categoria" : "Seleção"}: {filter.label}
              <button
                type="button"
                aria-label="Remover filtro"
                onClick={() => setFilter(null)}
                className="grid h-6 w-6 place-items-center rounded-full transition-colors hover:bg-brand/15 hover:text-brand-dark"
              >
                <X className="h-3.5 w-3.5" aria-hidden="true" />
              </button>
            </span>
          </motion.div>
        ) : null}
      </AnimatePresence>

      {filtered.length === 0 ? (
        <div className="flex flex-col items-center gap-3 rounded-[18px] border border-dashed border-border bg-soft py-16 text-center">
          <PackageSearch className="h-10 w-10 text-faint" aria-hidden="true" />
          <div>
            <p className="font-semibold">Nenhum produto nesta seleção ainda</p>
            <p className="mt-1 text-sm text-muted-foreground">
              Novas descobertas entram no catálogo em breve.
            </p>
          </div>
          <button
            type="button"
            onClick={() => setFilter(null)}
            className="text-sm font-semibold text-brand-dark hover:underline"
          >
            Ver todos os produtos
          </button>
        </div>
      ) : (
        <Reveal>
          <ul
            className={productListClasses}
            aria-label={
              filter ? `Produtos — ${BADGE_FILTER_LABELS[filter.value] ?? filter.label}` : "Produtos em destaque"
            }
          >
            {filtered.map((product: Product) => (
              <li
                key={product.id}
                className="min-w-[46%] snap-start sm:min-w-[38%] lg:min-w-0"
              >
                <ProductCard product={product} className="h-full" />
              </li>
            ))}
          </ul>
        </Reveal>
      )}
    </Section>
  );
}

const productListClasses =
  "flex snap-x snap-mandatory gap-3.5 overflow-x-auto pb-2 scrollbar-none md:gap-4 lg:grid lg:grid-cols-5 lg:overflow-visible lg:pb-0";
