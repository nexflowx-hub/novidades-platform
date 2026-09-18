"use client";

import { Headset, ShieldCheck, Sparkles, Zap } from "lucide-react";
import { Reveal } from "@/components/commerce/reveal";

const TRUST_ITEMS = [
  {
    icon: Sparkles,
    title: "Curadoria antes de quantidade",
    description: "Publicamos descobertas quando estão prontas para venda.",
  },
  {
    icon: Zap,
    title: "PIX via XPAYMENTS",
    description: "Pagamento BRL processado na infraestrutura XPAYMENTS.",
  },
  {
    icon: ShieldCheck,
    title: "Operação identificada",
    description: "Dados do vendedor e políticas disponíveis no site.",
  },
  {
    icon: Headset,
    title: "Suporte Novidades.store",
    description: "Canais oficiais para pedidos, entrega e pós-venda.",
  },
];

export function TrustStrip() {
  return (
    <section
      aria-label="Confiança Novidades.store"
      className="mx-auto w-full max-w-[1440px] px-4 pb-10 md:px-6 md:pb-14 lg:px-8"
    >
      <Reveal>
        <ul className="grid grid-cols-1 gap-3.5 rounded-[18px] border border-border bg-soft p-4 sm:grid-cols-2 md:gap-4 lg:grid-cols-4 lg:p-5">
          {TRUST_ITEMS.map(({ icon: Icon, title, description }) => (
            <li key={title} className="flex items-center gap-3.5">
              <span className="grid h-11 w-11 shrink-0 place-items-center rounded-full border border-border bg-white">
                <Icon className="h-5 w-5 text-brand-dark" aria-hidden="true" />
              </span>
              <div>
                <p className="text-[13px] leading-snug font-bold">{title}</p>
                <p className="mt-0.5 text-[11px] text-muted-foreground">{description}</p>
              </div>
            </li>
          ))}
        </ul>
      </Reveal>
    </section>
  );
}
