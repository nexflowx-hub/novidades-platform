"use client";

import { useState } from "react";
import { LoaderCircle, LockKeyhole, ShoppingCart } from "lucide-react";

const CHECKOUT_URL =
  "https://eivqvrfsreaopzlvhadu.supabase.co/functions/v1/digital-checkout";

type Props = {
  productSlug: string;
  productTitle: string;
  status: "live" | "preparing";
};

export function EbookCheckout({ productSlug, productTitle, status }: Props) {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  async function startCheckout() {
    if (status !== "live") return;
    const normalizedEmail = email.trim().toLowerCase();
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(normalizedEmail)) {
      setMessage("Informe um e-mail válido para receber e recuperar o acesso.");
      return;
    }

    setLoading(true);
    setMessage("");

    try {
      const response = await fetch(CHECKOUT_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ productSlug, email: normalizedEmail }),
      });
      const data = await response.json();

      if (!response.ok || !data?.checkoutUrl) {
        throw new Error(data?.message || "Não foi possível iniciar o checkout.");
      }

      const access = {
        reference: String(data.reference),
        claim: String(data.claim),
        productSlug,
        createdAt: new Date().toISOString(),
      };

      localStorage.setItem("nv:digital:last-access", JSON.stringify(access));

      try {
        const previous = JSON.parse(
          localStorage.getItem("nv:digital:accesses") || "[]",
        );
        const list = Array.isArray(previous) ? previous : [];
        localStorage.setItem(
          "nv:digital:accesses",
          JSON.stringify([
            access,
            ...list.filter(
              (item) => item && item.reference !== access.reference,
            ),
          ].slice(0, 30)),
        );
      } catch {
        localStorage.setItem("nv:digital:accesses", JSON.stringify([access]));
      }

      window.location.href = String(data.checkoutUrl);
    } catch (error) {
      setMessage(
        error instanceof Error ? error.message : "Falha temporária no checkout.",
      );
      setLoading(false);
    }
  }

  if (status !== "live") {
    return (
      <div className="rounded-2xl border border-amber-200 bg-amber-50 p-4">
        <p className="text-sm font-extrabold text-amber-950">Edição em preparação</p>
        <p className="mt-1 text-xs leading-5 text-amber-900/75">
          O título já faz parte do catálogo, mas o checkout permanece bloqueado
          até a revisão e a entrega digital passarem pelo QA final.
        </p>
      </div>
    );
  }

  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
      <label htmlFor="ebook-email" className="text-xs font-extrabold text-slate-900">
        E-mail para acesso
      </label>
      <input
        id="ebook-email"
        type="email"
        autoComplete="email"
        value={email}
        onChange={(event) => setEmail(event.target.value)}
        placeholder="voce@email.com"
        className="mt-2 h-12 w-full rounded-xl border border-slate-200 px-4 text-sm outline-none transition focus:border-blue-500"
      />
      <button
        type="button"
        onClick={startCheckout}
        disabled={loading}
        className="mt-3 flex h-12 w-full items-center justify-center gap-2 rounded-xl bg-blue-600 px-5 text-sm font-black text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-60"
      >
        {loading ? (
          <LoaderCircle className="h-4 w-4 animate-spin" />
        ) : (
          <ShoppingCart className="h-4 w-4" />
        )}
        {loading ? "A iniciar checkout..." : `Comprar ${productTitle}`}
      </button>
      <div className="mt-3 flex items-center gap-2 text-[11px] text-slate-500">
        <LockKeyhole className="h-3.5 w-3.5" />
        Preço resolvido no servidor · acesso apenas após pagamento confirmado.
      </div>
      {message ? <p className="mt-3 text-xs font-semibold text-red-700">{message}</p> : null}
    </div>
  );
}
