"use client";

import Link from "next/link";
import { BadgePercent, ShieldCheck, Truck, Zap } from "lucide-react";
import { useUI } from "@/lib/store/ui";
import { scrollToId } from "@/lib/scroll";

export function PromoHighlights() {
  const setFilter = useUI((state) => state.setFilter);

  const showOffers = () => {
    setFilter({ type: "badge", value: "oferta", label: "Ofertas Especiais" });
    scrollToId("destaques");
  };

  return (
    <section className="nv-shell py-3 md:py-4" aria-label="Destaques comerciais">
      <div className="grid gap-3 lg:grid-cols-[1.6fr_.8fr_.8fr]">
        <button
          type="button"
          onClick={showOffers}
          className="nv-offer-panel group min-h-[150px] overflow-hidden rounded-[20px] border border-red-400/45 p-5 text-left text-white shadow-[0_18px_60px_rgba(255,34,62,.2)] md:p-6"
        >
          <div className="flex h-full items-center gap-5">
            <span className="grid h-16 w-16 shrink-0 place-items-center rounded-2xl bg-white/10 ring-1 ring-white/20 backdrop-blur">
              <Zap className="h-9 w-9 fill-amber-300 text-amber-300" aria-hidden="true" />
            </span>
            <div>
              <p className="text-[11px] font-extrabold tracking-[.16em] text-red-100 uppercase">
                Seleção do dia
              </p>
              <h2 className="mt-1 text-3xl font-black tracking-[-.035em] md:text-4xl">
                OFERTAS ESPECIAIS
              </h2>
              <p className="mt-1 text-sm text-white/76">
                Oportunidades reais em produtos publicados.
              </p>
              <span className="mt-4 inline-flex items-center gap-2 text-xs font-extrabold text-white">
                Ver ofertas
                <BadgePercent className="h-4 w-4" aria-hidden="true" />
              </span>
            </div>
          </div>
        </button>

        <Link
          href="/entregas"
          className="nv-glass-card flex min-h-[150px] items-center gap-4 rounded-[20px] p-5 text-white"
        >
          <span className="grid h-14 w-14 shrink-0 place-items-center rounded-2xl bg-cyan-400/10 ring-1 ring-cyan-300/25">
            <Truck className="h-7 w-7 text-cyan-300" aria-hidden="true" />
          </span>
          <div>
            <p className="text-xl font-extrabold leading-tight">Entrega acompanhada</p>
            <p className="mt-2 text-xs leading-5 text-white/60">
              Condições, prazo e rastreio informados conforme cada produto.
            </p>
          </div>
        </Link>

        <Link
          href="/pagamentos"
          className="nv-glass-card flex min-h-[150px] items-center gap-4 rounded-[20px] p-5 text-white"
        >
          <span className="grid h-14 w-14 shrink-0 place-items-center rounded-2xl bg-cyan-400/10 ring-1 ring-cyan-300/25">
            <ShieldCheck className="h-7 w-7 text-cyan-300" aria-hidden="true" />
          </span>
          <div>
            <p className="text-sm font-bold text-white/65">Pague com</p>
            <p className="text-3xl font-black text-cyan-300">PIX</p>
            <p className="mt-1 inline-flex items-center gap-1 text-xs text-white/60">
              <Zap className="h-3.5 w-3.5" aria-hidden="true" />
              via XPAYMENTS
            </p>
          </div>
        </Link>
      </div>
    </section>
  );
}
