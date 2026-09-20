"use client";

import { Headset, PackageCheck, ShieldCheck, Sparkles, Zap } from "lucide-react";

const TRUST_ITEMS = [
  {
    icon: Sparkles,
    title: "Produtos selecionados",
    description: "Curadoria e informação clara antes da publicação.",
  },
  {
    icon: ShieldCheck,
    title: "Pagamento seguro",
    description: "Condições identificadas antes da confirmação.",
  },
  {
    icon: Zap,
    title: "PIX via XPAYMENTS",
    description: "Pagamento BRL pela infraestrutura XPAYMENTS.",
  },
  {
    icon: PackageCheck,
    title: "Entrega acompanhada",
    description: "Prazo e modalidade conforme cada produto.",
  },
  {
    icon: Headset,
    title: "Suporte especializado",
    description: "Canais oficiais para compra e pós-venda.",
  },
];

export function TrustStrip() {
  return (
    <section aria-label="Confiança Novidades.store" className="nv-shell py-4 md:py-6">
      <ul className="grid gap-2 rounded-[20px] border border-cyan-200/14 bg-[#051c3c]/72 p-3 backdrop-blur sm:grid-cols-2 lg:grid-cols-5">
        {TRUST_ITEMS.map(({ icon: Icon, title, description }) => (
          <li key={title} className="flex items-center gap-3 rounded-xl px-3 py-3">
            <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl border border-cyan-200/15 bg-cyan-300/7">
              <Icon className="h-5 w-5 text-cyan-300" aria-hidden="true" />
            </span>
            <div>
              <p className="text-[11px] leading-snug font-black text-white">{title}</p>
              <p className="mt-0.5 text-[9px] leading-4 text-white/46">{description}</p>
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
}
