"use client";

import { AnimatePresence, motion } from "framer-motion";
import { PackageSearch, X } from "lucide-react";
import type { Product } from "@/lib/data";
import { useUI } from "@/lib/store/ui";
import { ProductCard } from "@/components/commerce/product-card";

export function FeaturedProducts({ products }: { products: Product[] }) {
  const filter = useUI((state) => state.filter);
  const setFilter = useUI((state) => state.setFilter);

  const filtered = products.filter((product) => {
    if (!filter) return true;
    if (filter.type === "category") return product.categoryId === filter.value;
    return product.badge === filter.value;
  });

  return (
    <section id="destaques" className="nv-shell scroll-mt-36 py-5 md:py-8" aria-label="Produtos e ofertas">
      <div className="mb-5 flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="text-[10px] font-black tracking-[.16em] text-cyan-300 uppercase">
            Seleção Novidades.store
          </p>
          <h2 className="mt-1 text-2xl font-black tracking-[-.035em] text-white md:text-3xl">
            {filter ? filter.label : "Ofertas & Descobertas de Hoje"}
          </h2>
          <p className="mt-1 text-xs text-white/52 md:text-sm">
            {filter
              ? "Produtos publicados nesta seleção."
              : "Produtos reais do catálogo, apresentados sem promoções artificiais."}
          </p>
        </div>

        {filter ? (
          <button
            type="button"
            onClick={() => setFilter(null)}
            className="inline-flex items-center gap-2 rounded-xl border border-white/12 bg-white/6 px-4 py-2 text-xs font-bold text-white/72 transition hover:bg-white/10"
          >
            Limpar filtro
            <X className="h-3.5 w-3.5" aria-hidden="true" />
          </button>
        ) : null}
      </div>

      <AnimatePresence>
        {filter ? (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="mb-4 overflow-hidden"
          >
            <span className="inline-flex items-center gap-2 rounded-full border border-cyan-200/15 bg-cyan-300/8 py-2 pr-3 pl-4 text-[12px] font-semibold text-cyan-100">
              {filter.type === "category" ? "Categoria" : "Seleção"}: {filter.label}
            </span>
          </motion.div>
        ) : null}
      </AnimatePresence>

      {filtered.length === 0 ? (
        <div className="flex flex-col items-center gap-3 rounded-[20px] border border-dashed border-cyan-200/18 bg-white/4 py-14 text-center text-white">
          <PackageSearch className="h-10 w-10 text-cyan-300/70" aria-hidden="true" />
          <div>
            <p className="font-bold">Ainda não há produtos publicados nesta seleção.</p>
            <p className="mt-1 text-sm text-white/48">
              A categoria já faz parte da loja e será preenchida apenas com itens validados.
            </p>
          </div>
          <button
            type="button"
            onClick={() => setFilter(null)}
            className="text-sm font-bold text-cyan-300 hover:underline"
          >
            Ver catálogo publicado
          </button>
        </div>
      ) : (
        <ul className="scrollbar-none flex snap-x snap-mandatory gap-3.5 overflow-x-auto pb-3 sm:grid sm:grid-cols-2 sm:overflow-visible lg:grid-cols-4 xl:grid-cols-5">
          {filtered.map((product) => (
            <li key={product.id} className="min-w-[76%] snap-start sm:min-w-0">
              <ProductCard product={product} className="h-full" />
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}
