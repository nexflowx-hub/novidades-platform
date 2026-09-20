"use client";

import Image from "next/image";
import Link from "next/link";
import {
  BadgePercent,
  BrainCircuit,
  CircleHelp,
  FileText,
  Gift,
  Heart,
  Home,
  Mail,
  Sparkles,
  Star,
} from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { Separator } from "@/components/ui/separator";
import { CATEGORIES } from "@/lib/data";
import { useUI, type CatalogFilter } from "@/lib/store/ui";
import { scrollToId } from "@/lib/scroll";
import { RegionSelector } from "./region-selector";

export function MobileMenu() {
  const open = useUI((state) => state.mobileMenuOpen);
  const close = useUI((state) => state.closeMobileMenu);
  const setFilter = useUI((state) => state.setFilter);

  const goWithFilter = (filter: CatalogFilter) => {
    close();
    setFilter(filter);
    scrollToId("destaques");
  };

  const navMain: Array<{
    label: string;
    icon: React.ElementType;
    action: () => void;
    accent?: boolean;
  }> = [
    {
      label: "Início",
      icon: Home,
      action: () => {
        close();
        window.scrollTo({ top: 0, behavior: "smooth" });
      },
    },
    {
      label: "Ofertas Especiais",
      icon: BadgePercent,
      accent: true,
      action: () =>
        goWithFilter({
          type: "badge",
          value: "oferta",
          label: "Ofertas Especiais",
        }),
    },
    {
      label: "Novidades",
      icon: Sparkles,
      action: () =>
        goWithFilter({ type: "badge", value: "novo", label: "Novidades" }),
    },
    {
      label: "Mais vendidos",
      icon: Star,
      action: () =>
        goWithFilter({
          type: "badge",
          value: "mais-vendido",
          label: "Mais vendidos",
        }),
    },
    {
      label: "Academia Digital",
      icon: BrainCircuit,
      action: () => {
        close();
        window.location.assign("/conteudos-digitais");
      },
    },
    {
      label: "Coleções especiais",
      icon: Gift,
      action: () => {
        close();
        scrollToId("colecoes");
      },
    },
  ];

  const supportLinks = [
    { label: "Central de Ajuda", href: "/ajuda", icon: CircleHelp },
    { label: "Contato", href: "/contato", icon: Mail },
    { label: "Informações Legais", href: "/informacoes-legais", icon: FileText },
  ];

  return (
    <Sheet open={open} onOpenChange={(value) => (!value ? close() : undefined)}>
      <SheetContent
        side="left"
        className="flex w-[88%] max-w-[360px] flex-col gap-0 overflow-y-auto border-cyan-200/10 bg-[#03152f] p-0 text-white"
      >
        <SheetHeader className="border-b border-white/8 bg-[#021126] px-5 py-5 text-left">
          <div className="flex items-center gap-3">
            <Image
              src="/brand/novidades-mark.svg"
              alt=""
              width={52}
              height={52}
              className="h-12 w-12 drop-shadow-[0_0_15px_rgba(0,216,255,.3)]"
            />
            <div>
              <SheetTitle className="text-lg font-black tracking-[-.03em] text-white">
                Novidades<span className="text-cyan-300">.store</span>
              </SheetTitle>
              <SheetDescription className="mt-1 text-[10px] text-white/55">
                Mais do que você procura.
              </SheetDescription>
            </div>
          </div>
        </SheetHeader>

        <nav aria-label="Menu mobile" className="flex-1 px-3 py-3">
          <ul className="space-y-0.5">
            {navMain.map(({ label, icon: Icon, action, accent }) => (
              <li key={label}>
                <button
                  type="button"
                  onClick={action}
                  className={
                    accent
                      ? "flex min-h-11 w-full items-center gap-3 rounded-xl bg-red-500/10 px-3 py-3 text-sm font-bold text-red-200 transition hover:bg-red-500/15"
                      : "flex min-h-11 w-full items-center gap-3 rounded-xl px-3 py-3 text-sm font-semibold text-white/82 transition hover:bg-white/7 hover:text-white"
                  }
                >
                  <Icon
                    className={
                      accent
                        ? "h-[18px] w-[18px] text-red-300"
                        : "h-[18px] w-[18px] text-cyan-300"
                    }
                    aria-hidden="true"
                  />
                  {label}
                </button>
              </li>
            ))}
          </ul>

          <Separator className="my-4 bg-white/8" />

          <p className="px-3 pb-2 text-[10px] font-black tracking-[.16em] text-cyan-200/60 uppercase">
            Categorias
          </p>
          <ul className="space-y-0.5">
            {CATEGORIES.map((category) => (
              <li key={category.id}>
                <button
                  type="button"
                  onClick={() =>
                    goWithFilter({
                      type: "category",
                      value: category.id,
                      label: category.name,
                    })
                  }
                  className="flex min-h-11 w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm text-white/76 transition hover:bg-white/7 hover:text-white"
                >
                  <span className="nv-metal-ring grid h-9 w-9 shrink-0 place-items-center rounded-full p-[2px]">
                    <span className="relative h-full w-full overflow-hidden rounded-full bg-[#05285a]">
                      <Image
                        src={category.image}
                        alt=""
                        fill
                        sizes="36px"
                        className="object-cover"
                      />
                    </span>
                  </span>
                  <span className="text-left">{category.name}</span>
                </button>
              </li>
            ))}
          </ul>

          <Separator className="my-4 bg-white/8" />

          <ul className="space-y-0.5">
            <li>
              <button
                type="button"
                onClick={() => {
                  close();
                  useUI.getState().openFavorites();
                }}
                className="flex min-h-11 w-full items-center gap-3 rounded-xl px-3 py-3 text-sm font-semibold text-white/75 transition hover:bg-white/7 hover:text-white"
              >
                <Heart className="h-[18px] w-[18px] text-cyan-300" aria-hidden="true" />
                Favoritos
              </button>
            </li>

            {supportLinks.map(({ label, href, icon: Icon }) => (
              <li key={href}>
                <Link
                  href={href}
                  onClick={close}
                  className="flex min-h-11 w-full items-center gap-3 rounded-xl px-3 py-3 text-sm font-semibold text-white/75 transition hover:bg-white/7 hover:text-white"
                >
                  <Icon className="h-[18px] w-[18px] text-cyan-300" aria-hidden="true" />
                  {label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="border-t border-white/8 bg-[#021126] px-5 py-4">
          <RegionSelector />
        </div>
      </SheetContent>
    </Sheet>
  );
}
