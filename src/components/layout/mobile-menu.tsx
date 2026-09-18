"use client";

import Link from "next/link";
import Image from "next/image";
import {
  BadgePercent,
  CircleHelp,
  FileText,
  Flame,
  Gift,
  Heart,
  Home,
  Mail,
  Sparkles,
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
  const open = useUI((s) => s.mobileMenuOpen);
  const close = useUI((s) => s.closeMobileMenu);
  const setFilter = useUI((s) => s.setFilter);

  const goWithFilter = (filter: CatalogFilter) => {
    close();
    setFilter(filter);
    scrollToId("destaques");
  };

  const navMain: Array<{
    label: string;
    icon: React.ElementType;
    action: () => void;
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
      label: "Em alta",
      icon: Flame,
      action: () => goWithFilter({ type: "badge", value: "em-alta", label: "Em alta" }),
    },
    {
      label: "Novidades",
      icon: Sparkles,
      action: () => goWithFilter({ type: "badge", value: "novo", label: "Novidades" }),
    },
    {
      label: "Ofertas",
      icon: BadgePercent,
      action: () => goWithFilter({ type: "badge", value: "oferta", label: "Ofertas" }),
    },
    {
      label: "Presentes",
      icon: Gift,
      action: () => {
        close();
        scrollToId("presentes");
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
        className="flex w-[86%] max-w-[340px] flex-col gap-0 overflow-y-auto p-0"
      >
        <SheetHeader className="bg-header px-5 py-5 text-left">
          <SheetTitle className="text-lg font-extrabold text-white">
            NOVIDADES<span className="text-brand">.store</span>
          </SheetTitle>
          <SheetDescription className="text-[11px] text-white/60">
            Todo dia, uma boa descoberta.
          </SheetDescription>
        </SheetHeader>

        <nav aria-label="Menu mobile" className="flex-1 px-3 py-3">
          <ul className="space-y-0.5">
            {navMain.map(({ label, icon: Icon, action }) => (
              <li key={label}>
                <button
                  type="button"
                  onClick={action}
                  className="flex min-h-11 w-full items-center gap-3 rounded-lg px-3 py-3 text-sm font-semibold transition-colors hover:bg-soft"
                >
                  <Icon className="h-[18px] w-[18px] text-brand-dark" aria-hidden="true" />
                  {label}
                </button>
              </li>
            ))}
          </ul>

          <Separator className="my-3" />

          <p className="px-3 pb-1.5 text-[11px] font-bold tracking-wider text-muted-foreground uppercase">
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
                  className="flex min-h-11 w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm transition-colors hover:bg-soft"
                >
                  <span
                    className="h-8 w-8 shrink-0 overflow-hidden rounded-full"
                    style={{ backgroundColor: category.color }}
                  >
                    <Image
                      src={category.image}
                      alt=""
                      width={32}
                      height={32}
                      className="h-full w-full object-cover"
                    />
                  </span>
                  {category.name}
                </button>
              </li>
            ))}
          </ul>

          <Separator className="my-3" />

          <ul className="space-y-0.5">
            <li>
              <button
                type="button"
                onClick={() => {
                  close();
                  useUI.getState().openFavorites();
                }}
                className="flex min-h-11 w-full items-center gap-3 rounded-lg px-3 py-3 text-sm font-semibold transition-colors hover:bg-soft"
              >
                <Heart className="h-[18px] w-[18px] text-brand-dark" aria-hidden="true" />
                Favoritos
              </button>
            </li>

            {supportLinks.map(({ label, href, icon: Icon }) => (
              <li key={href}>
                <Link
                  href={href}
                  onClick={close}
                  className="flex min-h-11 w-full items-center gap-3 rounded-lg px-3 py-3 text-sm font-semibold transition-colors hover:bg-soft"
                >
                  <Icon className="h-[18px] w-[18px] text-brand-dark" aria-hidden="true" />
                  {label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="border-t border-border px-5 py-4">
          <RegionSelector />
        </div>
      </SheetContent>
    </Sheet>
  );
}
