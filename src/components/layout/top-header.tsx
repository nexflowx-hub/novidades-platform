"use client";

import Image from "next/image";
import Link from "next/link";
import {
  BadgePercent,
  ChevronDown,
  Gem,
  Gift,
  GraduationCap,
  Globe2,
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
    <header className="sticky top-0 z-50 w-full bg-[#021a38] text-white shadow-[0_8px_28px_rgba(0,8,28,.26)]">
      <div className="hidden h-[31px] border-b border-cyan-200/10 bg-[#01162f] lg:block">
        <div className="mx-auto flex h-full w-full max-w-[1440px] items-center justify-between px-[22px] text-[9px] text-white/72">
          <p className="flex items-center gap-[7px]">
            <span className="text-white/88">✦ Bem-vindo à Novidades.store</span>
            <span className="text-cyan-300">› Mais do que você procura.</span>
          </p>
          <div className="flex items-center gap-[17px]">
            <Link href="/entregas" className="transition hover:text-cyan-300">
              ▣ Acompanhe seus pedidos
            </Link>
            <Link href="/ajuda" className="transition hover:text-cyan-300">
              ◌ Ajuda &amp; Suporte
            </Link>
            <RegionSelector />
            <button
              type="button"
              onClick={openAccount}
              className="inline-flex items-center gap-1 transition hover:text-cyan-300"
            >
              <UserRound className="h-[12px] w-[12px]" />
              Conta
              <ChevronDown className="h-[11px] w-[11px]" />
            </button>
          </div>
        </div>
      </div>

      <div className="mx-auto flex h-[84px] w-full max-w-[1440px] items-center gap-[14px] px-[14px] md:px-[20px]">
        <button
          type="button"
          onClick={openMobileMenu}
          aria-label="Abrir menu"
          className="grid h-10 w-10 place-items-center rounded-[7px] border border-cyan-200/12 bg-white/5 lg:hidden"
        >
          <Menu className="h-5 w-5" />
        </button>

        <Link href="/" className="flex shrink-0 items-center gap-[8px]" aria-label="Novidades.store">
          <span className="relative block h-[70px] w-[66px] overflow-hidden rounded-[10px]">
            <Image
              src="/brand/reference/header-logo.webp"
              alt=""
              fill
              priority
              sizes="66px"
              className="object-cover"
            />
          </span>
          <div className="leading-none">
            <p className="nv-display text-[30px] font-black tracking-[-.055em] text-white">
              Novidades
            </p>
            <p className="mt-[5px] text-center text-[10px] font-black tracking-[.48em] text-cyan-300">
              STORE
            </p>
          </div>
        </Link>

        <button
          type="button"
          onClick={openSearch}
          className="mx-auto hidden h-[40px] w-full max-w-[480px] items-center overflow-hidden rounded-full border border-cyan-300/65 bg-white text-left shadow-[0_0_17px_rgba(0,163,255,.42)] lg:flex"
          aria-label="Pesquisar"
        >
          <span className="flex flex-1 items-center px-[20px] text-[11px] text-slate-600">
            O que você procura hoje?
          </span>
          <span className="flex h-full min-w-[145px] items-center justify-center gap-[7px] border-l border-slate-200 bg-[#f9fbfd] px-[12px] text-[9px] font-semibold text-slate-700">
            Todas as categorias
            <ChevronDown className="h-[12px] w-[12px]" />
          </span>
          <span className="grid h-full w-[50px] place-items-center bg-[#087bff] text-white shadow-[0_0_16px_rgba(0,123,255,.45)]">
            <Search className="h-[18px] w-[18px]" />
          </span>
        </button>

        <div className="ml-auto hidden items-center gap-[5px] lg:flex">
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
          className="relative ml-auto grid h-10 w-10 place-items-center rounded-[7px] border border-cyan-200/12 bg-white/5 lg:hidden"
        >
          <ShoppingCart className="h-5 w-5" />
          {mounted && cartCount > 0 ? (
            <span className="absolute -right-1 -top-1 grid h-4 min-w-4 place-items-center rounded-full bg-red-500 px-1 text-[9px] font-black">
              {cartCount > 9 ? "9+" : cartCount}
            </span>
          ) : null}
        </button>
      </div>

      <div className="px-[12px] pb-[10px] lg:hidden">
        <button
          type="button"
          onClick={openSearch}
          className="flex h-[42px] w-full items-center gap-2 rounded-full border border-cyan-300/35 bg-white px-4 text-left text-xs text-slate-600"
        >
          <Search className="h-4 w-4 text-slate-500" />
          O que você procura hoje?
        </button>
      </div>

      <nav className="border-t border-cyan-200/10 bg-[#031c3d]" aria-label="Navegação principal">
        <div className="scrollbar-none mx-auto flex h-[40px] w-full max-w-[1440px] items-center gap-[5px] overflow-x-auto px-[20px]">
          <DropdownMenu>
            <DropdownMenuTrigger className="inline-flex h-[34px] shrink-0 items-center gap-[8px] rounded-[7px] border border-cyan-300/15 bg-[#073465] px-[13px] text-[10px] font-extrabold text-white outline-none">
              <Menu className="h-[16px] w-[16px]" />
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
            className="inline-flex h-[34px] shrink-0 items-center gap-[7px] rounded-[7px] px-[10px] text-[10px] font-extrabold text-white/86 transition hover:bg-white/7 hover:text-cyan-300"
          >
            <GraduationCap className="h-[15px] w-[15px]" />
            Academia Digital
          </Link>

          <Link
            href="/site"
            className="inline-flex h-[34px] shrink-0 items-center gap-[7px] rounded-[7px] px-[10px] text-[10px] font-extrabold text-white/86 transition hover:bg-white/7 hover:text-cyan-300"
          >
            <Globe2 className="h-[15px] w-[15px]" />
            Sites
          </Link>

          <button
            type="button"
            onClick={() => scrollToId("colecoes")}
            className="inline-flex h-[34px] shrink-0 items-center gap-[7px] rounded-[7px] px-[10px] text-[10px] font-extrabold text-white/86 transition hover:bg-white/7 hover:text-cyan-300"
          >
            <Gift className="h-[15px] w-[15px]" />
            Presentes
          </button>

          <Link
            href="/sobre"
            className="ml-auto inline-flex h-[34px] shrink-0 items-center gap-[7px] rounded-[7px] border border-cyan-300/22 bg-[#04284f] px-[17px] text-[10px] font-extrabold text-cyan-300"
          >
            <Gem className="h-[15px] w-[15px]" />
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
      className="relative flex h-[56px] w-[68px] flex-col items-center justify-center gap-[4px] rounded-[7px] text-white/90 transition hover:bg-white/6 hover:text-cyan-300"
    >
      <Icon className="h-[23px] w-[23px]" strokeWidth={1.8} />
      <span className="text-[8px] font-semibold">{label}</span>
      {badge > 0 ? (
        <span className="absolute right-[5px] top-[1px] grid h-[17px] min-w-[17px] place-items-center rounded-full bg-red-500 px-1 text-[8px] font-black text-white">
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
          ? "inline-flex h-[34px] shrink-0 items-center gap-[7px] rounded-[7px] px-[10px] text-[10px] font-extrabold text-red-300 transition hover:bg-red-500/10"
          : "inline-flex h-[34px] shrink-0 items-center gap-[7px] rounded-[7px] px-[10px] text-[10px] font-extrabold text-white/86 transition hover:bg-white/7 hover:text-cyan-300"
      }
    >
      <Icon className="h-[15px] w-[15px]" />
      {label}
    </button>
  );
}
