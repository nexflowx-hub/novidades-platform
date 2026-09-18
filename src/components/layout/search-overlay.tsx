"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";
import {
  ArrowUpRight,
  Clock,
  Loader2,
  Search,
  SearchX,
  X,
} from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import {
  CATEGORIES,
  POPULAR_SEARCHES,
  type SearchResults,
} from "@/lib/data";
import { formatBRL } from "@/lib/format";
import { useUI } from "@/lib/store/ui";
import { scrollToId } from "@/lib/scroll";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

const RECENT_KEY = "nv:recent-searches";
const MAX_RECENT = 6;

function readRecent(): string[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = window.localStorage.getItem(RECENT_KEY);
    return raw ? (JSON.parse(raw) as string[]) : [];
  } catch {
    return [];
  }
}

function writeRecent(list: string[]) {
  try {
    window.localStorage.setItem(RECENT_KEY, JSON.stringify(list.slice(0, MAX_RECENT)));
  } catch {
    /* noop */
  }
}

export function SearchOverlay() {
  const open = useUI((s) => s.searchOpen);
  const close = useUI((s) => s.closeSearch);
  const setQuickView = useUI((s) => s.setQuickView);
  const setFilter = useUI((s) => s.setFilter);
  const showInfo = useUI((s) => s.showInfo);

  const inputRef = useRef<HTMLInputElement>(null);
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<SearchResults | null>(null);
  const [loading, setLoading] = useState(false);
  const [recent, setRecent] = useState<string[]>([]);

  // Fecha com Esc + trava scroll + foco inicial
  useEffect(() => {
    if (!open) return;
    setRecent(readRecent());
    document.documentElement.style.overflow = "hidden";
    const t = window.setTimeout(() => inputRef.current?.focus(), 60);
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
    };
    window.addEventListener("keydown", onKey);
    return () => {
      window.removeEventListener("keydown", onKey);
      document.documentElement.style.overflow = "";
      window.clearTimeout(t);
    };
  }, [open, close]);

  // Busca com debounce na Commerce API (Fase 1)
  useEffect(() => {
    const q = query.trim();
    if (!open || q.length < 2) {
      setResults(null);
      setLoading(false);
      return;
    }
    setLoading(true);
    const ctrl = new AbortController();
    const t = window.setTimeout(async () => {
      try {
        const res = await fetch(`/api/search?q=${encodeURIComponent(q)}`, {
          signal: ctrl.signal,
        });
        if (res.ok) setResults((await res.json()) as SearchResults);
      } catch {
        /* abortado */
      } finally {
        setLoading(false);
      }
    }, 220);
    return () => {
      ctrl.abort();
      window.clearTimeout(t);
    };
  }, [query, open]);

  const commitSearch = useCallback(
    (term: string) => {
      const clean = term.trim();
      if (!clean) return;
      setQuery(clean);
      const next = [clean, ...readRecent().filter((r) => r !== clean)].slice(0, MAX_RECENT);
      writeRecent(next);
      setRecent(next);
      inputRef.current?.focus();
    },
    []
  );

  const goProduct = (productId: string) => {
    close();
    setQuery("");
    setQuickView(productId);
  };

  const goCategory = (categoryId: string, label: string) => {
    close();
    setQuery("");
    setFilter({ type: "category", value: categoryId, label });
    scrollToId("destaques");
  };

  return (
    <AnimatePresence>
      {open ? (
        <motion.div
          className="fixed inset-0 z-50"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.18 }}
          role="dialog"
          aria-modal="true"
          aria-label="Busca"
        >
          <div
            className="absolute inset-0 bg-black/45 backdrop-blur-[2px]"
            onClick={close}
            aria-hidden="true"
          />
          <motion.div
            initial={{ opacity: 0, y: -14 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -14 }}
            transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
            className="absolute inset-x-0 top-0 mx-auto flex max-h-[88dvh] w-full max-w-2xl flex-col overflow-hidden rounded-b-2xl bg-white shadow-floating md:top-[7vh] md:rounded-2xl"
          >
            {/* Campo de busca */}
            <div className="flex items-center gap-3 border-b border-border px-4 py-3.5 md:px-5">
              <Search className="h-5 w-5 shrink-0 text-muted-foreground" aria-hidden="true" />
              <Input
                ref={inputRef}
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" && query.trim()) commitSearch(query);
                }}
                placeholder="Buscar produtos, categorias ou marcas..."
                className="h-9 border-0 bg-transparent p-0 text-[15px] shadow-none focus-visible:ring-0 md:text-base"
                aria-label="Termo de busca"
              />
              {loading ? (
                <Loader2 className="h-4.5 w-4.5 shrink-0 animate-spin text-muted-foreground" aria-hidden="true" />
              ) : null}
              <button
                type="button"
                onClick={close}
                aria-label="Fechar busca"
                className="grid h-9 w-9 shrink-0 place-items-center rounded-full text-muted-foreground transition-colors hover:bg-soft hover:text-foreground"
              >
                <X className="h-5 w-5" aria-hidden="true" />
              </button>
            </div>

            {/* Conteúdo */}
            <div className="scrollbar-slim flex-1 overflow-y-auto overscroll-contain p-4 md:p-5">
              {results ? (
                <SearchResultsPanel
                  results={results}
                  onProduct={goProduct}
                  onCategory={goCategory}
                  query={query}
                />
              ) : (
                <div className="space-y-6">
                  {recent.length > 0 ? (
                    <section aria-label="Buscas recentes">
                      <div className="mb-2.5 flex items-center justify-between">
                        <h3 className="text-[11px] font-bold tracking-wider text-muted-foreground uppercase">
                          Buscas recentes
                        </h3>
                        <button
                          type="button"
                          className="text-xs font-medium text-muted-foreground hover:text-coral"
                          onClick={() => {
                            writeRecent([]);
                            setRecent([]);
                          }}
                        >
                          Limpar
                        </button>
                      </div>
                      <ul className="space-y-0.5">
                        {recent.map((r) => (
                          <li key={r}>
                            <button
                              type="button"
                              onClick={() => commitSearch(r)}
                              className="flex w-full items-center gap-3 rounded-lg px-2.5 py-2 text-sm transition-colors hover:bg-soft"
                            >
                              <Clock className="h-4 w-4 text-faint" aria-hidden="true" />
                              {r}
                            </button>
                          </li>
                        ))}
                      </ul>
                    </section>
                  ) : null}

                  <section aria-label="Buscas populares">
                    <h3 className="mb-2.5 text-[11px] font-bold tracking-wider text-muted-foreground uppercase">
                      Buscas populares
                    </h3>
                    <div className="flex flex-wrap gap-2">
                      {POPULAR_SEARCHES.map((term) => (
                        <button
                          key={term}
                          type="button"
                          onClick={() => commitSearch(term)}
                          className="rounded-full border border-border bg-soft px-3.5 py-2 text-[13px] font-medium transition-colors hover:border-brand hover:bg-warm"
                        >
                          {term}
                        </button>
                      ))}
                    </div>
                  </section>

                  <section aria-label="Categorias sugeridas">
                    <h3 className="mb-2.5 text-[11px] font-bold tracking-wider text-muted-foreground uppercase">
                      Categorias
                    </h3>
                    <div className="grid grid-cols-2 gap-1.5">
                      {CATEGORIES.map((cat) => (
                        <button
                          key={cat.id}
                          type="button"
                          onClick={() => goCategory(cat.id, cat.name)}
                          className="flex items-center gap-2.5 rounded-lg px-2.5 py-2 text-left text-[13px] font-medium transition-colors hover:bg-soft"
                        >
                          <span
                            className="h-7 w-7 shrink-0 overflow-hidden rounded-full"
                            style={{ backgroundColor: cat.color }}
                          >
                            <Image
                              src={cat.image}
                              alt=""
                              width={28}
                              height={28}
                              className="h-full w-full object-cover"
                            />
                          </span>
                          <span className="truncate">{cat.name}</span>
                        </button>
                      ))}
                    </div>
                  </section>
                </div>
              )}
            </div>

            <div className="hidden items-center justify-between border-t border-border bg-soft px-5 py-2.5 text-[11px] text-muted-foreground md:flex">
              <span>
                Dica: pressione <kbd className="rounded border border-border bg-white px-1">Esc</kbd> para fechar
              </span>
              <span>Busca em produtos, categorias e marcas</span>
            </div>
          </motion.div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}

function SearchResultsPanel({
  results,
  onProduct,
  onCategory,
  query,
}: {
  results: SearchResults;
  onProduct: (id: string) => void;
  onCategory: (id: string, label: string) => void;
  query: string;
}) {
  const empty = results.products.length === 0 && results.categories.length === 0;
  const showInfo = useUI((s) => s.showInfo);

  if (empty) {
    return (
      <div className="flex flex-col items-center gap-3 py-14 text-center">
        <SearchX className="h-10 w-10 text-faint" aria-hidden="true" />
        <div>
          <p className="font-semibold">Nada encontrado para “{query}”</p>
          <p className="mt-1 text-sm text-muted-foreground">
            Tente outro termo ou explore as categorias.
          </p>
        </div>
        <button
          type="button"
          onClick={() => {
            showInfo(
              "Catálogo em expansão",
              "Novas descobertas entram no catálogo toda semana. Explore as categorias enquanto isso."
            );
          }}
          className="text-sm font-semibold text-brand-dark hover:underline"
        >
          Ver categorias
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-5">
      {results.products.length > 0 ? (
        <section aria-label="Produtos encontrados">
          <h3 className="mb-2 text-[11px] font-bold tracking-wider text-muted-foreground uppercase">
            Produtos
          </h3>
          <ul className="space-y-1">
            {results.products.map((p) => (
              <li key={p.id}>
                <button
                  type="button"
                  onClick={() => onProduct(p.id)}
                  className="flex w-full items-center gap-3 rounded-xl p-2 text-left transition-colors hover:bg-soft"
                >
                  <span className="relative h-12 w-12 shrink-0 overflow-hidden rounded-lg bg-soft">
                    <Image src={p.image} alt="" fill sizes="48px" className="object-cover" />
                  </span>
                  <span className="min-w-0 flex-1">
                    <span className="block truncate text-sm font-semibold">{p.name}</span>
                    <span className="block text-xs text-muted-foreground">
                      {p.categoryName}
                    </span>
                  </span>
                  <span className="shrink-0 text-sm font-bold">
                    {formatBRL(p.price)}
                  </span>
                  <ArrowUpRight className="h-4 w-4 shrink-0 text-faint" aria-hidden="true" />
                </button>
              </li>
            ))}
          </ul>
        </section>
      ) : null}

      {results.categories.length > 0 ? (
        <section aria-label="Categorias encontradas">
          <h3 className="mb-2 text-[11px] font-bold tracking-wider text-muted-foreground uppercase">
            Categorias
          </h3>
          <div className="flex flex-wrap gap-2">
            {results.categories.map((c) => (
              <button
                key={c.id}
                type="button"
                onClick={() => onCategory(c.id, c.name)}
                className={cn(
                  "inline-flex items-center gap-2 rounded-full border border-border px-3.5 py-2 text-[13px] font-medium transition-colors hover:border-brand hover:bg-warm"
                )}
              >
                <span
                  className="h-2.5 w-2.5 rounded-full"
                  style={{ backgroundColor: c.color }}
                  aria-hidden="true"
                />
                {c.name}
              </button>
            ))}
          </div>
        </section>
      ) : null}
    </div>
  );
}
