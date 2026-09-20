"use client";

import { useEffect, useMemo, useState } from "react";
import { BookMarked, ExternalLink, Trash2 } from "lucide-react";
import { useRouter } from "next/navigation";

type SavedAccess = {
  reference: string;
  claim: string;
  productSlug: string;
  createdAt?: string;
};

const PRODUCTS: Record<string, { name: string; description: string }> = {
  "conversion-content-os": {
    name: "Conversion Content OS",
    description: "Conteúdo, persuasão, hooks, prompts e repurposing.",
  },
  "financeos-mei-2026": {
    name: "FinanceOS MEI 2026",
    description: "Gestão financeira, margem e monitor gerencial do teto.",
  },
  "sales-page-blueprint": {
    name: "Sales Page Blueprint",
    description: "Wireframes, proof governance, checkout continuity e QA.",
  },
};

function parseAccesses(): SavedAccess[] {
  try {
    const value = JSON.parse(
      localStorage.getItem("nv:digital:accesses") || "[]",
    );

    if (!Array.isArray(value)) return [];

    return value.filter(
      (item): item is SavedAccess =>
        Boolean(
          item &&
            typeof item.reference === "string" &&
            typeof item.claim === "string" &&
            typeof item.productSlug === "string",
        ),
    );
  } catch {
    return [];
  }
}

export function DigitalLibrary() {
  const router = useRouter();
  const [items, setItems] = useState<SavedAccess[]>([]);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setItems(parseAccesses());
    setMounted(true);
  }, []);

  const unique = useMemo(() => {
    const seen = new Set<string>();
    return items.filter((item) => {
      if (seen.has(item.reference)) return false;
      seen.add(item.reference);
      return true;
    });
  }, [items]);

  function openAccess(item: SavedAccess) {
    localStorage.setItem("nv:digital:last-access", JSON.stringify(item));
    router.push("/conteudos-digitais/acesso");
  }

  function removeAccess(reference: string) {
    const next = items.filter((item) => item.reference !== reference);
    setItems(next);
    localStorage.setItem("nv:digital:accesses", JSON.stringify(next));
  }

  if (!mounted) {
    return (
      <div className="rounded-2xl border border-border bg-white p-8 text-sm text-muted-foreground shadow-card">
        A carregar a biblioteca deste navegador...
      </div>
    );
  }

  if (!unique.length) {
    return (
      <div className="rounded-[22px] border border-dashed border-border bg-white p-8 text-center shadow-card">
        <BookMarked
          className="mx-auto h-8 w-8 text-brand-dark"
          aria-hidden="true"
        />
        <h2 className="mt-4 text-xl font-extrabold">
          Ainda não há atalhos guardados neste navegador.
        </h2>
        <p className="mx-auto mt-2 max-w-xl text-sm leading-6 text-muted-foreground">
          Quando iniciar um checkout digital, o acesso é guardado localmente
          para poder voltar aos downloads com menos fricção.
        </p>
      </div>
    );
  }

  return (
    <div className="grid gap-4">
      {unique.map((item) => {
        const product = PRODUCTS[item.productSlug] ?? {
          name: item.productSlug,
          description: "Produto digital Novidades.store",
        };

        return (
          <article
            key={item.reference}
            className="rounded-[22px] border border-border bg-white p-5 shadow-card md:p-6"
          >
            <div className="flex flex-col gap-5 md:flex-row md:items-center md:justify-between">
              <div>
                <p className="text-[10px] font-extrabold tracking-[0.14em] text-brand-dark uppercase">
                  Acesso guardado
                </p>
                <h2 className="mt-1 text-xl font-extrabold">
                  {product.name}
                </h2>
                <p className="mt-2 text-sm text-muted-foreground">
                  {product.description}
                </p>
                <p className="mt-3 text-[11px] text-muted-foreground">
                  Referência: {item.reference}
                </p>
              </div>

              <div className="flex flex-wrap gap-2">
                <button
                  type="button"
                  onClick={() => openAccess(item)}
                  className="inline-flex h-11 items-center gap-2 rounded-xl bg-primary px-4 text-sm font-extrabold text-primary-foreground"
                >
                  <ExternalLink className="h-4 w-4" aria-hidden="true" />
                  Abrir acesso
                </button>
                <button
                  type="button"
                  onClick={() => removeAccess(item.reference)}
                  className="inline-flex h-11 items-center gap-2 rounded-xl border border-border bg-white px-4 text-sm font-bold text-muted-foreground hover:text-foreground"
                >
                  <Trash2 className="h-4 w-4" aria-hidden="true" />
                  Remover atalho
                </button>
              </div>
            </div>
          </article>
        );
      })}
    </div>
  );
}
