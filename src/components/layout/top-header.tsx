"use client";

import Image from "next/image";
import Link from "next/link";
import {
  BadgePercent,
  ChevronDown,
  CircleHelp,
  Gift,
  Heart,
  LayoutGrid,
  Menu,
  PackageSearch,
  ShoppingCart,
  Sparkles,
  Star,
  UserRound,
} from "lucide-react";
import { useMounted } from "@/hooks/use-mounted";
import { CATEGORIES } from "@/lib/data";
import { useUI, type CatalogFilter } from "@/lib/store/ui";
import { useFavorites } from "@/lib/store/favorites";
import { useCart } from "@/lib/store/cart";
import { scrollToId } from "@/lib/scroll";
import { cn } from "@/lib/utils";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { RegionSelector } from "./region-selector";

const NAV_FILTERS: Array<{
  id: string;
  label: string;
  icon: React.ElementType;
  filter: CatalogFilter;
  className?: string;
}> = [
  {
    id: "ofertas",
    label: "Ofertas Especiais",
    icon: BadgePercent,
    filter: { type: "badge", value: "oferta", label: "Ofertas Especiais" },
    className: "text-red-300 hover:bg-red-500/10 hover:text-red-200",
  },
  {
    id: "novidades",
    label: "Novidades",
    icon: Sparkles,
    filter: { type: "badge", value: "novo", label: "Novidades" },
  },
  {
    id: "mais-vendidos",
    label: "Mais vendidos",
    icon: Star,
    filter: { type: "badge", value: "mais-vendido", label: "Mais vendidos" },
  },
];

function Brand() {
  return (
    <div className="flex items-center gap-2.5">
      <Image
        src="/brand/novidades-mark.svg"
        alt=""
        width={58}
        height={58}
        priority
        className="h-12 w-12 drop-shadow-[0_0_16px_rgba(0,216,255,.35)] lg:h-14 lg:w-14"
      />
      <div className="hidden leading-none sm:block">
        <p className="text-[22px] font-black tracking-[-.04em] text-white lg:text-[25px]">
          Novidades
        </p>
        <p className="mt-1 text-[10px] font-bold tracking-[.34em] text-cyan-300 uppercase">
          Store
        </p>
      </div>
    </div>
  );
}

export function SiteHeader() {
  const mounted = useMounted();
  const openSearch = useUI((state) => state.openSearch);
  const openFavorites = useUI((state) => state.openFavorites);
  const openMobileMenu = useUI((state) => state.openMobileMenu);
  const openCart = useUI((state) => state.openCart);
  const openAccount = useUI((state) => state.openAccount);
  const setFilter = useUI((state) => state.setFilter);
  const activeFilter = useUI((state) => state.filter);
  const favCount = useFavorites((state) => state.ids.length);
  const cartCount = useCart((state) =>
    state.items.reduce((total, item) => total + item.qty, 0)
  );

  const goFeaturedWithFilter = (filter: CatalogFilter | null) => {
    setFilter(filter);
    scrollToId("destaques");
  };

  const goCategory = (categoryId: string) => {
    const category = CATEGORIES.find((item) => item.id === categoryId);
    if (!category) return;
    goFeaturedWithFilter({
      type: "category",
      value: category.id,
      label: category.name,
    });
  };

  return (
    <header className="sticky top-0 z-50 w-full bg-[#03152f] text-white shadow-[0_12px_35px_rgba(0,12,40,.26)]">
      <div className="hidden border-b border-white/7 bg-[#021126] lg:block">
        <div className="mx-auto flex h-8 w-full max-w-[1440px] items-center justify-between px-8 text-[10px] text-white/65">
          <p>
            Bem-vindo à Novidades.store
            <span className="ml-2 font-semibold text-cyan-300">Mais do que você procura.</span>
          </p>
          <div className="flex items-center gap-5">
            <Link href="/entregas" className="hover:text-white">Acompanhe seus pedidos</Link>
            <Link href="/ajuda" className="hover:text-white">Ajuda &amp; Suporte</Link>
            <RegionSelector />
          </div>
        </div>
      </div>

      <div className="mx-auto flex h-[68px] w-full max-w-[1440px] items-center gap-3 px-4 md:px-6 lg:h-[82px] lg:px-8">
        <button
          type="button"
          aria-label="Abrir menu"
          onClick={openMobileMenu}
          className="grid h-11 w-11 shrink-0 place-items-center rounded-xl text-white transition hover:bg-white/8 lg:hidden"
        >
          <Menu className="h-6 w-6" aria-hidden="true" />
        </button>

        <Link href="/" aria-label="Novidades.store — início" className="shrink-0">
          <Brand />
        </Link>

        <div className="hidden flex-1 justify-center px-5 lg:flex">
          <button
            type="button"
            onClick={openSearch}
            aria-label="Buscar produtos, categorias ou marcas"
            className="group flex h-[50px] w-full max-w-[690px] items-center overflow-hidden rounded-[14px] border border-cyan-300/55 bg-white text-left shadow-[0_0_26px_rgba(0,157,255,.22)] transition hover:shadow-[0_0_34px_rgba(0,184,255,.32)]"
          >
            <SearchPlaceholder />
            <span className="grid h-full w-14 place-items-center bg-gradient-to-br from-[#0b8cff] to-[#0451c7] text-white">
              <PackageSearch className="h-5 w-5" aria-hidden="true" />
            </span>
          </button>
        </div>

        <div className="ml-auto hidden items-center gap-1 lg:flex">
          <HeaderAction label="Minha conta" onClick={openAccount} icon={UserRound} />
          <HeaderAction
            label="Favoritos"
            onClick={openFavorites}
            icon={Heart}
            badge={mounted ? favCount : 0}
          />
          <HeaderAction
            label="Carrinho"
            onClick={openCart}
            icon={ShoppingCart}
            badge={mounted ? cartCount : 0}
          />
        </div>

        <button
          type="button"
          aria-label="Abrir carrinho"
          onClick={openCart}
          className="relative z-10 ml-auto grid h-11 w-11 shrink-0 place-items-center rounded-xl text-white transition hover:bg-white/8 lg:hidden"
        >
          <ShoppingCart className="h-[22px] w-[22px]" aria-hidden="true" />
          {mounted && cartCount > 0 ? (
            <span className="absolute right-0 top-0 grid h-4 min-w-4 place-items-center rounded-full bg-red-500 px-1 text-[9px] font-black text-white">
              {cartCount > 9 ? "9+" : cartCount}
            </span>
          ) : null}
        </button>
      </div>

      <div className="px-4 pb-3 lg:hidden">
        <button
          type="button"
          onClick={openSearch}
          aria-label="Buscar produtos e categorias"
          className="flex h-[44px] w-full items-center gap-2.5 rounded-xl border border-cyan-300/35 bg-white px-4 text-left shadow-[0_0_20px_rgba(0,157,255,.16)]"
        >
          <SearchPlaceholder />
        </button>
      </div>

      <nav aria-label="Navegação principal" className="hidden border-t border-white/7 bg-[#041a38] lg:block">
        <div className="mx-auto flex h-[50px] w-full max-w-[1440px] items-center gap-1 px-8">
          <DropdownMenu>
            <DropdownMenuTrigger className="inline-flex h-9 items-center gap-2 rounded-lg bg-[#082c5d] px-4 text-[12px] font-bold text-white transition hover:bg-[#0a3978] focus-visible:outline-none">
              <LayoutGrid className="h-4 w-4" aria-hidden="true" />
              Todas as categorias
              <ChevronDown className="h-3.5 w-3.5 text-white/60" aria-hidden="true" />
            </DropdownMenuTrigger>
            <DropdownMenuContent align="start" className="w-72">
              <DropdownMenuLabel className="text-xs text-muted-foreground">
                Explore por categoria
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              {CATEGORIES.map((category) => (
                <DropdownMenuItem key={category.id} onSelect={() => goCategory(category.id)}>
                  {category.name}
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>

          {NAV_FILTERS.map((item) => {
            const Icon = item.icon;
            const isActive =
              activeFilter?.type === "badge" &&
              activeFilter.value === item.filter.value;

            return (
              <button
                key={item.id}
                type="button"
                onClick={() => goFeaturedWithFilter(item.filter)}
                className={cn(
                  "inline-flex h-9 items-center gap-1.5 rounded-lg px-3 text-[12px] font-semibold text-white/75 transition hover:bg-white/7 hover:text-white",
                  item.className,
                  isActive && "bg-white/10 text-white"
                )}
              >
                <Icon className="h-4 w-4" aria-hidden="true" />
                {item.label}
              </button>
            );
          })}

          <Link
            href="/conteudos-digitais"
            className="inline-flex h-9 items-center gap-1.5 rounded-lg px-3 text-[12px] font-extrabold text-cyan-300 transition hover:bg-cyan-300/10"
          >
            <Sparkles className="h-4 w-4" aria-hidden="true" />
            Academia Digital
          </Link>

          <button
            type="button"
            onClick={() => scrollToId("colecoes")}
            className="inline-flex h-9 items-center gap-1.5 rounded-lg px-3 text-[12px] font-semibold text-white/75 transition hover:bg-white/7 hover:text-white"
          >
            <Gift className="h-4 w-4" aria-hidden="true" />
            Coleções
          </button>

          <InfoMenu />

          <Link
            href="/sobre"
            className="ml-auto inline-flex h-9 items-center gap-1.5 rounded-lg border border-cyan-300/20 bg-cyan-300/7 px-3 text-[12px] font-bold text-cyan-200"
          >
            Nossas marcas
          </Link>
        </div>
      </nav>
    </header>
  );
}

function HeaderAction({
  label,
  onClick,
  icon: Icon,
  badge = 0,
}: {
  label: string;
  onClick: () => void;
  icon: React.ElementType;
  badge?: number;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="relative flex h-[58px] w-[78px] flex-col items-center justify-center gap-1 rounded-xl text-white/80 transition hover:bg-white/7 hover:text-white"
    >
      <Icon className="h-[22px] w-[22px]" aria-hidden="true" />
      <span className="text-[10px] font-semibold">{label}</span>
      {badge > 0 ? (
        <span className="absolute right-2 top-1 grid h-[17px] min-w-[17px] place-items-center rounded-full bg-red-500 px-1 text-[9px] font-black text-white">
          {badge > 99 ? "99+" : badge}
        </span>
      ) : null}
    </button>
  );
}

function SearchPlaceholder() {
  return (
    <>
      <svg
        className="h-4.5 w-4.5 shrink-0 text-[#74849c]"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        aria-hidden="true"
      >
        <circle cx="11" cy="11" r="7" />
        <path d="m20 20-3.5-3.5" />
      </svg>
      <span className="flex-1 truncate text-[13px] text-[#718096] md:text-sm">
        O que você procura hoje?
      </span>
    </>
  );
}

function InfoMenu() {
  const links = [
    { label: "Sobre", href: "/sobre" },
    { label: "Contato", href: "/contato" },
    { label: "Central de Ajuda", href: "/ajuda" },
    { label: "Entregas", href: "/entregas" },
    { label: "Pagamentos", href: "/pagamentos" },
    { label: "Trocas e Devoluções", href: "/trocas-e-devolucoes" },
    { label: "Informações Legais", href: "/informacoes-legais" },
  ];

  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="inline-flex h-9 items-center gap-1 rounded-lg px-3 text-[12px] font-semibold text-white/65 transition hover:bg-white/7 hover:text-white focus-visible:outline-none">
        Mais
        <ChevronDown className="h-3.5 w-3.5 opacity-60" aria-hidden="true" />
      </DropdownMenuTrigger>
      <DropdownMenuContent align="start" className="w-60">
        <DropdownMenuLabel className="text-xs text-muted-foreground">
          Institucional
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        {links.map((link) => (
          <DropdownMenuItem key={link.href} asChild>
            <Link href={link.href}>{link.label}</Link>
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
