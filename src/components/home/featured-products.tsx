"use client";

import { AnimatePresence, motion } from "framer-motion";
import { ArrowRight, PackageSearch, ShieldCheck, X } from "lucide-react";
import type { Product } from "@/lib/data";
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

export function FeaturedProducts({ products }: { products: Product[] }) {
  const filter = useUI((state) => state.filter);
  const setFilter = useUI((state) => state.setFilter);

  const filtered = products.filter((product) => {
    if (!filter) return true;
    if (filter.type === "category") return product.categoryId === filter.value;
    return product.badge === filter.value;
  });

  return (
    <Section
      id="destaques"
      ariaLabel="Produtos em destaque"
      className="scroll-mt-36 lg:scroll-mt-40"
    >
      <SectionHeader
        title={filter ? filter.label : "Em destaque agora"}
        subtitle={
          filter
            ? "Produtos publicados nesta seleção."
            : "Curadoria ativa: menos produtos, ofertas mais claras."
        }
        action={
          filter
            ? { label: "Limpar filtro", onClick: () => setFilter(null) }
            : undefined
        }
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
                className="grid h-7 w-7 place-items-center rounded-full transition-colors hover:bg-brand/15 hover:text-brand-dark"
              >
                <X className="h-3.5 w-3.5" aria-hidden="true" />
              </button>
            </span>
          </motion.div>
        ) : null}
      </AnimatePresence>

      {filtered.length === 0 ? (
        <div className="flex flex-col items-center gap-3 rounded-[18px] border border-dashed border-border bg-soft py-14 text-center">
          <PackageSearch className="h-10 w-10 text-faint" aria-hidden="true" />
          <div>
            <p className="font-semibold">Nenhuma oferta publicada nesta seleção</p>
            <p className="mt-1 text-sm text-muted-foreground">
              Preferimos não preencher o catálogo com produtos ainda não validados.
            </p>
          </div>
          <button
            type="button"
            onClick={() => setFilter(null)}
            className="text-sm font-semibold text-brand-dark hover:underline"
          >
            Voltar aos destaques
          </button>
        </div>
      ) : filtered.length === 1 && !filter ? (
        <Reveal>
          <div className="grid gap-4 lg:grid-cols-[minmax(280px,360px)_1fr]">
            <ProductCard product={filtered[0]} />

            <div className="flex min-h-[330px] flex-col justify-between rounded-[18px] border border-border bg-gradient-to-br from-soft to-warm p-6 md:p-8">
              <div>
                <span className="inline-flex items-center gap-2 rounded-full bg-white px-3 py-1.5 text-[10px] font-bold tracking-[0.12em] text-brand-dark uppercase shadow-sm">
                  <ShieldCheck className="h-3.5 w-3.5" aria-hidden="true" />
                  Seleção de lançamento
                </span>
                <h3 className="mt-5 max-w-2xl text-3xl leading-[1.05] font-extrabold tracking-[-0.035em] md:text-4xl">
                  A Novidades.store começa com uma regra simples:
                  publicar apenas o que está pronto para ser apresentado.
                </h3>
                <p className="mt-4 max-w-2xl text-sm leading-6 text-muted-foreground md:text-[15px]">
                  Novas categorias já fazem parte da plataforma, mas cada produto
                  só entra na vitrine quando preço, apresentação e operação de
                  compra estiverem definidos.
                </p>
              </div>

              {filtered[0].storefrontUrl ? (
                <a
                  href={filtered[0].storefrontUrl}
                  className="mt-7 inline-flex h-11 w-fit items-center gap-2 rounded-[10px] bg-primary px-5 text-sm font-bold text-white transition hover:bg-brand-dark"
                >
                  Conhecer a primeira descoberta
                  <ArrowRight className="h-4 w-4" aria-hidden="true" />
                </a>
              ) : null}
            </div>
          </div>
        </Reveal>
      ) : (
        <Reveal>
          <ul
            className="flex snap-x snap-mandatory gap-3.5 overflow-x-auto pb-2 scrollbar-none md:gap-4 lg:grid lg:grid-cols-5 lg:overflow-visible lg:pb-0"
            aria-label={
              filter
                ? `Produtos — ${BADGE_FILTER_LABELS[filter.value] ?? filter.label}`
                : "Produtos em destaque"
            }
          >
            {filtered.map((product) => (
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
