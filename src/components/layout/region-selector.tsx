"use client";

import { Check, ChevronDown, MapPin } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useUI } from "@/lib/store/ui";

export function RegionSelector({ dark = false }: { dark?: boolean }) {
  const showInfo = useUI((s) => s.showInfo);

  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        className={
          dark
            ? "inline-flex h-9 items-center gap-1.5 rounded-md px-2 text-xs font-medium text-white/85 transition-colors hover:bg-white/10 hover:text-white focus-visible:outline-none"
            : "inline-flex h-9 items-center gap-1.5 rounded-md px-2 text-xs font-medium text-foreground transition-colors hover:bg-soft focus-visible:outline-none"
        }
        aria-label="Selecionar região de entrega"
      >
        <MapPin className="h-3.5 w-3.5" aria-hidden="true" />
        <span className="hidden sm:inline">Entrega para</span>
        <span aria-hidden="true">🇧🇷</span>
        <span className="font-semibold">Brasil (BRL)</span>
        <ChevronDown className="h-3.5 w-3.5 opacity-60" aria-hidden="true" />
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-56">
        <DropdownMenuLabel className="text-xs text-muted-foreground">
          Região de entrega
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem className="gap-2">
          <span aria-hidden="true">🇧🇷</span> Brasil (BRL · PIX)
          <Check className="ml-auto h-4 w-4 text-brand" aria-hidden="true" />
        </DropdownMenuItem>
        <DropdownMenuItem
          disabled
          className="gap-2 opacity-60"
          onSelect={(e) => {
            e.preventDefault();
            showInfo(
              "Europa (EUR) em breve",
              "A experiência de compra em EUR (cartão e MB WAY via XPAYMENTS) será ativada em breve."
            );
          }}
        >
          <span aria-hidden="true">🇪🇺</span> Europa (EUR)
          <span className="ml-auto rounded-full bg-warm px-2 py-0.5 text-[10px] font-semibold text-muted-foreground">
            Em breve
          </span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
