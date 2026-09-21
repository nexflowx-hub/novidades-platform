"use client";

import Image from "next/image";
import Link from "next/link";
import {
  BadgePercent,
  ChevronDown,
  Gem,
  Gift,
  GraduationCap,
  Heart,
  Menu,
  Search,
  ShoppingCart,
  Sparkles,
  UserRound,
  Zap,
} from "lucide-react";
import { useMounted } from "@/hooks/use-mounted";
import { CATEGORIES } from "@/lib/data";
import { useUI, type CatalogFilter } from "@/lib/store/ui";
import { useFavorites } from "@/lib/store/favorites";
import { useCart } from "@/lib/store/cart";
import { scrollToId } from "@/lib/scroll";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { RegionSelector } from "./region-selector";

export function SiteHeader() {
  const mounted = useMounted();
  const openSearch = useUI((state) => state.openSearch);
  const openFavorites = useUI((state) => state.openFavorites);
  const openMobileMenu = useUI((state) => state.openMobileMenu);
  const openCart = useUI((state) => state.openCart);
  const openAccount = useUI((state) => state.openAccount);
  const setFilter = useUI((state) => state.setFilter);
  const favCount = useFavorites((state) => state.ids.length);
  const cartCount = useCart((state) =>
    state.items.reduce((total, item) => total + item.qty, 0),
  );

  const applyFilter = (filter: CatalogFilter) => {
    setFilter(filter);
    scrollToId("destaques");
  };

  return (
    <header className="sticky top-0 z-50 w-full bg-[#021a38] text-white shadow-[0_10px_35px_rgba(0,8,28,.28)]">
      <div className="hidden h-8 border-b border-cyan-200/10 bg-[#01162f] lg:block">
        <div className="mx-auto flex h-full w-full max-w-[1440px] items-center justify-between px-5 text-[10px] text-white/72">
          <p className="flex items-center gap-2">
            <span className="text-white/85">Bem-vindo à Novidades.store</span>
            <span className="text-cyan-300">› Mais do que você procura.</span>
          </p>
          <div className="flex items-center gap-5">
            <Link href="/entregas" className="transition hover:text-cyan-300">
              Acompanhe seus pedidos
            </Link>
            <Link href="/ajuda" className="transition hover:text-cyan-300">
              Ajuda &amp; Suporte
            </Link>
            <RegionSelector />
            <button
              type="button"
              onClick={openAccount}
              className="inline-flex items-center gap-1.5 transition hover:text-cyan-300"
            >
              <UserRound className="h-3.5 w-3.5" />
              Conta
            </button>
          </div>
        </div>
      </div>

      <div className="mx-auto flex min-h-[78px] w-full max-w-[1440px] items-center gap-3 px-3 md:px-5 lg:h-[82px]">
        <button
          type="button"
          onClick={openMobileMenu}
          aria-label="Abrir menu"
          className="grid h-10 w-10 place-items-center rounded-lg border border-cyan-200/12 bg-white/5 lg:hidden"
        >
          <Menu className="h-5 w-5" />
        </button>

        <Link href="/" className="flex shrink-0 items-center gap-2" aria-label="Novidades.store">
          <Image
            src="/brand/novidades-mark.svg"
            alt=""
            width={58}
            height={58}
            priority
            className="h-[52px] w-[52px] drop-shadow-[0_0_13px_rgba(0,216,255,.34)] lg:h-[58px] lg:w-[58px]"
          />
          <div className="leading-none">
            <p className="nv-display text-[26px] font-black tracking-[-.045em] text-white lg:text-[29px]">
              Novidades
            </p>
            <p className="mt-1 text-center text-[9px] font-black tracking-[.48em] text-cyan-300 lg:text-[10px]">
              STORE
            </p>
          </div>
        </Link>

        <button
          type="button"
          onClick={openSearch}
          className="mx-auto hidden h-[48px] w-full max-w-[650px] items-center overflow-hidden rounded-full border border-cyan-300/65 bg-white text-left shadow-[0_0_18px_rgba(0,163,255,.38)] lg:flex"
          aria-label="Pesquisar"
        >
          <span className="flex flex-1 items-center px-5 text-[12px] text-slate-600">
            O que você procura hoje?
          </span>
          <span className="flex h-full min-w-[150px] items-center justify-center gap-2 border-l border-slate-200 bg-[#f9fbfd] px-4 text-[10px] font-semibold text-slate-700">
            Todas as categorias
            <ChevronDown className="h-3.5 w-3.5" />
          </span>
          <span className="grid h-full w-[52px] place-items-center bg-[#087bff] text-white shadow-[0_0_17px_rgba(0,123,255,.45)]">
            <Search className="h-5 w-5" />
          </span>
        </button>

        <div className="ml-auto hidden items-center gap-2 lg:flex">
          <HeaderAction label="Minha conta" icon={UserRound} onClick={openAccount} />
          <HeaderAction
            label="Favoritos"
            icon={Heart}
            onClick={openFavorites}
            badge={mounted ? favCount : 0}
          />
          <HeaderAction
            label="Carrinho"
            icon={ShoppingCart}
            onClick={openCart}
            badge={mounted ? cartCount : 0}
          />
        </div>

        <button
          type="button"
          onClick={openCart}
          aria-label="Abrir carrinho"
          className="relative ml-auto grid h-10 w-10 place-items-center rounded-lg border border-cyan-200/12 bg-white/5 lg:hidden"
        >
          <ShoppingCart className="h-5 w-5" />
          {mounted && cartCount > 0 ? (
            <span className="absolute -right-1 -top-1 grid h-4 min-w-4 place-items-center rounded-full bg-red-500 px-1 text-[9px] font-black">
              {cartCount > 9 ? "9+" : cartCount}
            </span>
          ) : null}
        </button>
      </div>

      <div className="px-3 pb-3 lg:hidden">
        <button
          type="button"
          onClick={openSearch}
          className="flex h-11 w-full items-center gap-2 rounded-full border border-cyan-300/35 bg-white px-4 text-left text-xs text-slate-600"
        >
          <Search className="h-4 w-4 text-slate-500" />
          O que você procura hoje?
        </button>
      </div>

      <nav className="border-t border-cyan-200/10 bg-[#031c3d]" aria-label="Navegação principal">
        <div className="scrollbar-none mx-auto flex h-[48px] w-full max-w-[1440px] items-center gap-1 overflow-x-auto px-3 md:px-5">
          <DropdownMenu>
            <DropdownMenuTrigger className="inline-flex h-9 shrink-0 items-center gap-2 rounded-lg border border-cyan-300/15 bg-[#073465] px-4 text-[11px] font-black text-white outline-none">
              <Menu className="h-4 w-4" />
              Todas as categorias
            </DropdownMenuTrigger>
            <DropdownMenuContent align="start" className="w-72">
              <DropdownMenuLabel>Categorias</DropdownMenuLabel>
              <DropdownMenuSeparator />
              {CATEGORIES.map((category) => (
                <DropdownMenuItem
                  key={category.id}
                  onSelect={() =>
                    applyFilter({
                      type: "category",
                      value: category.id,
                      label: category.name,
                    })
                  }
                >
                  {category.name}
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>

          <NavButton
            icon={BadgePercent}
            label="Ofertas Especiais"
            sale
            onClick={() =>
              applyFilter({
                type: "badge",
                value: "oferta",
                label: "Ofertas Especiais",
              })
            }
          />
          <NavButton
            icon={Sparkles}
            label="Novidades"
            onClick={() =>
              applyFilter({
                type: "badge",
                value: "novo",
                label: "Novidades",
              })
            }
          />
          <NavButton
            icon={Zap}
            label="Mais Vendidos"
            onClick={() =>
              applyFilter({
                type: "badge",
                value: "mais-vendido",
                label: "Mais vendidos",
              })
            }
          />

          <Link
            href="/conteudos-digitais"
            className="inline-flex h-9 shrink-0 items-center gap-2 rounded-lg px-3 text-[11px] font-black text-white/82 transition hover:bg-white/7 hover:text-cyan-300"
          >
            <GraduationCap className="h-4 w-4" />
            Academia Digital
          </Link>

          <button
            type="button"
            onClick={() => scrollToId("colecoes")}
            className="inline-flex h-9 shrink-0 items-center gap-2 rounded-lg px-3 text-[11px] font-black text-white/82 transition hover:bg-white/7 hover:text-cyan-300"
          >
            <Gift className="h-4 w-4" />
            Presentes
          </button>

          <Link
            href="/sobre"
            className="ml-auto inline-flex h-9 shrink-0 items-center gap-2 rounded-lg border border-cyan-300/20 bg-[#04284f] px-4 text-[11px] font-black text-cyan-300"
          >
            <Gem className="h-4 w-4" />
            Nossas Marcas
          </Link>
        </div>
      </nav>
    </header>
  );
}

function HeaderAction({
  label,
  icon: Icon,
  onClick,
  badge = 0,
}: {
  label: string;
  icon: React.ElementType;
  onClick: () => void;
  badge?: number;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="relative flex h-[58px] w-[66px] flex-col items-center justify-center gap-1 rounded-lg text-white/88 transition hover:bg-white/6 hover:text-cyan-300"
    >
      <Icon className="h-5 w-5" />
      <span className="text-[9px] font-semibold">{label}</span>
      {badge > 0 ? (
        <span className="absolute right-2 top-1 grid h-4 min-w-4 place-items-center rounded-full bg-red-500 px-1 text-[8px] font-black text-white">
          {badge > 99 ? "99+" : badge}
        </span>
      ) : null}
    </button>
  );
}

function NavButton({
  icon: Icon,
  label,
  onClick,
  sale = false,
}: {
  icon: React.ElementType;
  label: string;
  onClick: () => void;
  sale?: boolean;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={
        sale
          ? "inline-flex h-9 shrink-0 items-center gap-2 rounded-lg px-3 text-[11px] font-black text-red-300 transition hover:bg-red-500/10"
          : "inline-flex h-9 shrink-0 items-center gap-2 rounded-lg px-3 text-[11px] font-black text-white/82 transition hover:bg-white/7 hover:text-cyan-300"
      }
    >
      <Icon className="h-4 w-4" />
      {label}
    </button>
  );
}
