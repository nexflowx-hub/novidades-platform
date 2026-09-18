"use client";

import { ShieldCheck, Zap } from "lucide-react";
import { useUI } from "@/lib/store/ui";

const LINK_GROUPS: Array<{
  title: string;
  links: string[];
}> = [
  { title: "Institucional", links: ["Sobre nós", "Contato"] },
  { title: "Ajuda", links: ["Central de Ajuda", "Entregas", "Trocas e Devoluções"] },
  { title: "Legal", links: ["Privacidade", "Termos de Uso", "Cookies"] },
];

export function SiteFooter() {
  const showInfo = useUI((s) => s.showInfo);

  const openPage = (label: string) =>
    showInfo(
      label,
      "Esta página estará disponível em breve na Novidades.store. Enquanto isso, explore o catálogo e as descobertas da semana."
    );

  return (
    <footer className="mt-auto bg-header pb-24 text-white lg:pb-0">
      <div className="mx-auto w-full max-w-[1440px] px-4 pt-12 md:px-6 lg:px-8">
        <div className="grid gap-10 md:grid-cols-[1.6fr_1fr_1fr_1fr]">
          {/* Marca */}
          <div>
            <p className="text-xl font-extrabold tracking-tight">
              NOVIDADES<span className="text-brand">.store</span>
            </p>
            <p className="mt-1.5 text-[13px] text-white/60">
              Todo dia, uma boa descoberta.
            </p>
            <div className="mt-5 space-y-2 text-xs text-white/55">
              <p className="flex items-center gap-2">
                <ShieldCheck className="h-4 w-4 shrink-0 text-success" aria-hidden="true" />
                Compra protegida em todos os storefronts
              </p>
              <p className="flex items-center gap-2">
                <Zap className="h-4 w-4 shrink-0 text-brand" aria-hidden="true" />
                Pagamentos via XPAYMENTS · PIX (BRL)
              </p>
            </div>
          </div>

          {/* Colunas de links */}
          {LINK_GROUPS.map((group) => (
            <nav key={group.title} aria-label={group.title}>
              <h3 className="text-[11px] font-bold tracking-wider text-white/40 uppercase">
                {group.title}
              </h3>
              <ul className="mt-3.5 space-y-2.5">
                {group.links.map((label) => (
                  <li key={label}>
                    <button
                      type="button"
                      onClick={() => openPage(label)}
                      className="text-[13px] text-white/75 transition-colors hover:text-brand"
                    >
                      {label}
                    </button>
                  </li>
                ))}
              </ul>
            </nav>
          ))}
        </div>

        <div className="mt-10 flex flex-col gap-2 border-t border-white/10 py-6 text-[11px] text-white/45 md:flex-row md:items-center md:justify-between">
          <p>© {new Date().getFullYear()} Novidades.store. Todos os direitos reservados.</p>
          <p>Brasil (BRL) · Europa (EUR) em breve</p>
        </div>
      </div>
    </footer>
  );
}
