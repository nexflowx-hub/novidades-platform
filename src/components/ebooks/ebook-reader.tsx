"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { ArrowLeft, BookOpen, LoaderCircle, ShieldCheck } from "lucide-react";

const READER_URL =
  "https://eivqvrfsreaopzlvhadu.supabase.co/functions/v1/digital-reader";

type Block = {
  moduleNo: number;
  blockNo: number;
  heading: string;
  body: string;
  kind: string;
};

type SavedAccess = {
  reference: string;
  claim: string;
  productSlug?: string;
};

export function EbookReader({
  slug,
  initialReference,
  initialClaim,
}: {
  slug: string;
  initialReference?: string;
  initialClaim?: string;
}) {
  const [reference, setReference] = useState(initialReference ?? "");
  const [claim, setClaim] = useState(initialClaim ?? "");
  const [title, setTitle] = useState("");
  const [blocks, setBlocks] = useState<Block[]>([]);
  const [state, setState] = useState<"loading" | "ready" | "error">("loading");
  const [message, setMessage] = useState("A validar o seu acesso...");

  useEffect(() => {
    if (initialReference && initialClaim) {
      localStorage.setItem(
        "nv:digital:last-access",
        JSON.stringify({
          reference: initialReference,
          claim: initialClaim,
          productSlug: slug,
        }),
      );
      window.history.replaceState({}, document.title, `/ebooks/ler/${slug}`);
      return;
    }

    try {
      const saved = JSON.parse(
        localStorage.getItem("nv:digital:last-access") || "{}",
      ) as SavedAccess;
      if (saved.reference && saved.claim) {
        setReference(saved.reference);
        setClaim(saved.claim);
      }
    } catch {
      setState("error");
      setMessage("Não foi possível recuperar a credencial desta compra.");
    }
  }, [initialClaim, initialReference, slug]);

  useEffect(() => {
    if (!reference || !claim) return;

    let cancelled = false;

    async function load() {
      try {
        const url =
          READER_URL +
          "?reference=" +
          encodeURIComponent(reference) +
          "&claim=" +
          encodeURIComponent(claim) +
          "&slug=" +
          encodeURIComponent(slug);

        const response = await fetch(url, {
          cache: "no-store",
          referrerPolicy: "no-referrer",
        });
        const data = await response.json();

        if (!response.ok) {
          throw new Error(data?.message || "Acesso ao E-Book não autorizado.");
        }
        if (cancelled) return;

        setTitle(String(data.title || slug));
        setBlocks(Array.isArray(data.blocks) ? data.blocks : []);
        setState("ready");
      } catch (error) {
        if (cancelled) return;
        setState("error");
        setMessage(
          error instanceof Error
            ? error.message
            : "Não foi possível abrir este E-Book.",
        );
      }
    }

    void load();
    return () => {
      cancelled = true;
    };
  }, [claim, reference, slug]);

  const modules = useMemo(() => {
    const map = new Map<number, Block[]>();
    for (const block of blocks) {
      const list = map.get(block.moduleNo) ?? [];
      list.push(block);
      map.set(block.moduleNo, list);
    }
    return [...map.entries()].sort(([a], [b]) => a - b);
  }, [blocks]);

  if (state === "loading") {
    return (
      <div className="mx-auto flex min-h-[60vh] max-w-3xl items-center justify-center px-4">
        <div className="text-center">
          <LoaderCircle className="mx-auto h-8 w-8 animate-spin text-blue-600" />
          <p className="mt-4 text-sm font-bold text-slate-600">{message}</p>
        </div>
      </div>
    );
  }

  if (state === "error") {
    return (
      <div className="mx-auto min-h-[60vh] max-w-3xl px-4 py-16 text-center">
        <ShieldCheck className="mx-auto h-10 w-10 text-red-600" />
        <h1 className="mt-4 text-2xl font-black">Acesso não validado</h1>
        <p className="mt-3 text-sm leading-6 text-slate-500">{message}</p>
        <Link
          href="/conteudos-digitais/biblioteca"
          className="mt-6 inline-flex rounded-xl bg-slate-950 px-5 py-3 text-sm font-black text-white"
        >
          Abrir minha biblioteca
        </Link>
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-[#f7f5ef] text-slate-900">
      <header className="sticky top-0 z-20 border-b border-stone-200 bg-[#f7f5ef]/95 backdrop-blur">
        <div className="mx-auto flex max-w-[920px] items-center justify-between gap-4 px-4 py-4 md:px-6">
          <Link
            href="/conteudos-digitais/biblioteca"
            className="inline-flex items-center gap-2 text-xs font-black text-slate-600"
          >
            <ArrowLeft className="h-4 w-4" />
            Biblioteca
          </Link>
          <div className="flex items-center gap-2 text-xs font-bold text-emerald-700">
            <ShieldCheck className="h-4 w-4" />
            Acesso validado
          </div>
        </div>
      </header>

      <article className="mx-auto max-w-[820px] px-4 py-10 md:px-6 md:py-16">
        <div className="border-b border-stone-300 pb-10 text-center">
          <BookOpen className="mx-auto h-8 w-8 text-blue-700" />
          <p className="mt-4 text-[11px] font-black uppercase tracking-[0.18em] text-blue-700">
            Edição Digital Novidades
          </p>
          <h1 className="mx-auto mt-3 max-w-3xl text-4xl font-black tracking-[-0.045em] md:text-5xl">
            {title}
          </h1>
        </div>

        <div className="mt-10 space-y-10">
          {modules.map(([moduleNo, moduleBlocks]) => (
            <section key={moduleNo} className="space-y-7">
              {moduleBlocks.map((block) => (
                <div key={`${block.moduleNo}-${block.blockNo}`}>
                  {block.heading ? (
                    <h2 className="text-2xl font-black tracking-[-0.025em] text-slate-950">
                      {block.heading}
                    </h2>
                  ) : null}
                  <div className="mt-4 whitespace-pre-line text-[16px] leading-8 text-slate-700">
                    {block.body}
                  </div>
                </div>
              ))}
            </section>
          ))}
        </div>

        <footer className="mt-16 border-t border-stone-300 pt-6 text-xs leading-5 text-stone-500">
          Conteúdo disponibilizado exclusivamente para a compra associada a este
          entitlement. O acesso pode ser revogado em caso de estorno ou uso indevido.
        </footer>
      </article>
    </main>
  );
}
