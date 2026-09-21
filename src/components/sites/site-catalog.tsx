"use client";

import Link from "next/link";
import { Search, ArrowUpRight } from "lucide-react";
import { useMemo, useState } from "react";

export interface CatalogItem {
  slug: string;
  company: string;
  category: string;
  categorySlug: string;
  sourceTitle: string;
  palette: { bg: string; surface: string; text: string; primary: string; secondary: string; accent: string };
  headline: string;
}

export function SiteCatalog({
  items,
  categories,
}: {
  items: CatalogItem[];
  categories: Array<{ name: string; slug: string; count: number }>;
}) {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("all");

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return items.filter((item) => {
      const byCategory = category === "all" || item.categorySlug === category;
      const byQuery =
        !q ||
        item.company.toLowerCase().includes(q) ||
        item.category.toLowerCase().includes(q) ||
        item.sourceTitle.toLowerCase().includes(q);
      return byCategory && byQuery;
    });
  }, [items, query, category]);

  return (
    <div>
      <div className="sticky top-0 z-40 border-b border-white/10 bg-[#07111f]/90 px-4 py-4 backdrop-blur-xl">
        <div className="mx-auto flex w-full max-w-7xl flex-col gap-3 md:flex-row">
          <label className="flex h-11 flex-1 items-center gap-2 rounded-full border border-white/10 bg-white/[0.06] px-4">
            <Search className="h-4 w-4 text-cyan-300" />
            <input
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Pesquisar setor, empresa ou modelo..."
              className="w-full bg-transparent text-sm text-white outline-none placeholder:text-white/35"
            />
          </label>
          <select
            value={category}
            onChange={(event) => setCategory(event.target.value)}
            className="h-11 rounded-full border border-white/10 bg-[#0b1b31] px-4 text-sm text-white outline-none"
          >
            <option value="all">Todos os setores ({items.length})</option>
            {categories.map((item) => (
              <option key={item.name} value={item.slug}>
                {item.name.replace(/^\d+\s*-\s*/, "")} ({item.count})
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="mx-auto w-full max-w-7xl px-4 py-10 md:px-6">
        <p className="mb-5 text-xs font-bold text-white/45">
          {filtered.length} modelos encontrados
        </p>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {filtered.map((item) => (
            <Link
              key={item.slug}
              href={`/site/${item.slug}`}
              className="group overflow-hidden rounded-[24px] border border-white/10 bg-white/[0.04] transition hover:-translate-y-1 hover:border-cyan-300/40"
            >
              <div
                className="relative h-44 overflow-hidden"
                style={{
                  background: `radial-gradient(circle at 28% 24%, ${item.palette.primary}66, transparent 40%), radial-gradient(circle at 80% 82%, ${item.palette.secondary}55, transparent 38%), ${item.palette.bg}`,
                }}
              >
                <div className="absolute left-5 top-5 h-20 w-[72%] rounded-[20px] border border-white/10 bg-white/[0.08] backdrop-blur-sm" />
                <div className="absolute bottom-5 right-5 h-16 w-1/2 rounded-[18px] border border-white/10 bg-white/[0.06] backdrop-blur-sm" />
                <div className="absolute right-4 top-4 grid h-9 w-9 place-items-center rounded-full border border-white/15 bg-black/15 text-white transition group-hover:bg-white group-hover:text-slate-950">
                  <ArrowUpRight className="h-4 w-4" />
                </div>
              </div>
              <div className="p-5">
                <p className="text-[9px] font-black uppercase tracking-[.16em] text-cyan-300">
                  {item.category.replace(/^\d+\s*-\s*/, "")}
                </p>
                <h2 className="mt-2 text-lg font-black tracking-[-.03em] text-white">
                  {item.company}
                </h2>
                <p className="mt-2 line-clamp-2 text-xs leading-5 text-white/52">
                  {item.headline}
                </p>
                <p className="mt-4 truncate text-[9px] text-white/28">
                  Base: {item.sourceTitle}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
