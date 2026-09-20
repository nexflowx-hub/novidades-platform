"use client";

import Link from "next/link";
import {
  BadgePercent,
  BookOpenText,
  ChevronDown,
  CircleHelp,
  Flame,
  Gift,
  Heart,
  Home,
  LayoutGrid,
  Menu,
  MoreHorizontal,
  Sparkles,
} from "lucide-react";
import { useMounted } from "@/hooks/use-mounted";
import { CATEGORIES } from "@/lib/data";
import { useUI, type CatalogFilter } from "@/lib/store/ui";
import { useFavorites } from "@/lib/store/favorites";
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
}> = [
  {
    id: "em-alta",
    label: "Em alta",
    icon: Flame,
    filter: { type: "badge", value: "em-alta", label: "Em alta" },
  },
  {
    id: "novidades",
    label: "Novidades",
    icon: Sparkles,
    filter: { type: "badge", value: "novo", label: "Novidades" },
  },
  {
    id: "ofertas",
    label: "Ofertas",
    icon: BadgePercent,
    filter: { type: "badge", value: "oferta", label: "Ofertas" },
  },
];

function Wordmark({ compact = false }: { compact?: boolean }) {
  return (
    <div className="leading-none select-none">
      <p className="text-lg font-extrabold tracking-tight text-white md:text-[21px]">
        NOVIDADES<span className="text-brand">.store</span>
      </p>
      {!compact ? (
        <p className="mt-1 text-[10px] text-white/60 md:text-[11px]">
          Todo dia, uma boa descoberta.
        </p>
      ) : null}
    </div>
  );
}

export function SiteHeader() {
  const mounted = useMounted();
  const openSearch = useUI((state) => state.openSearch);
  const openFavorites = useUI((state) => state.openFavorites);
  const openMobileMenu = useUI((state) => state.openMobileMenu);
  const setFilter = useUI((state) => state.setFilter);
  const activeFilter = useUI((state) => state.filter);
  const favCount = useFavorites((state) => state.ids.length);

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
    <header className="sticky top-0 z-40 w-full">
      <div className="bg-header shadow-header">
        <div className="relative mx-auto flex h-[62px] w-full max-w-[1440px] items-center gap-3 px-4 md:px-6 lg:h-[74px] lg:px-8">
          <button
            type="button"
            aria-label="Abrir menu"
            onClick={openMobileMenu}
            className="grid h-11 w-11 shrink-0 place-items-center rounded-lg text-white transition-colors hover:bg-white/10 lg:hidden"
          >
            <Menu className="h-6 w-6" aria-hidden="true" />
          </button>

          <Link
            href="/"
            aria-label="Novidades.store — início"
            className="absolute left-1/2 shrink-0 -translate-x-1/2 focus-visible:outline-none lg:static lg:translate-x-0"
          >
            <div className="hidden lg:block">
              <Wordmark />
            </div>
            <div className="text-center lg:hidden">
              <Wordmark compact />
              <p className="mt-0.5 text-[9px] text-white/60">
                Todo dia, uma boa descoberta.
              </p>
            </div>
          </Link>

          <div className="hidden flex-1 justify-center px-6 lg:flex">
            <button
              type="button"
              onClick={openSearch}
              aria-label="Buscar produtos, categorias ou marcas"
              className="group flex h-11 w-full max-w-[640px] items-center gap-3 rounded-[10px] bg-white px-4 text-left shadow-sm transition-shadow hover:shadow-md"
            >
              <SearchPlaceholder />
            </button>
          </div>

          <div className="ml-auto hidden items-center gap-1 lg:flex">
            <Link
              href="/ajuda"
              className="flex h-[52px] w-[68px] flex-col items-center justify-center gap-1 rounded-lg text-white/85 transition-colors hover:bg-white/10 hover:text-white"
            >
              <CircleHelp className="h-[21px] w-[21px]" aria-hidden="true" />
              <span className="text-[11px] font-medium">Ajuda</span>
            </Link>

            <button
              type="button"
              onClick={openFavorites}
              aria-label="Favoritos"
              className="relative flex h-[52px] w-[68px] flex-col items-center justify-center gap-1 rounded-lg text-white/85 transition-colors hover:bg-white/10 hover:text-white"
            >
              <Heart className="h-[21px] w-[21px]" aria-hidden="true" />
              <span className="text-[11px] font-medium">Favoritos</span>
              {mounted && favCount > 0 ? (
                <span className="absolute top-1 right-3 grid h-[17px] min-w-[17px] place-items-center rounded-full bg-coral px-1 text-[10px] font-bold text-white">
                  {favCount > 99 ? "99+" : favCount}
                </span>
              ) : null}
            </button>
          </div>

          <button
            type="button"
            aria-label="Abrir favoritos"
            onClick={openFavorites}
            className="relative z-10 ml-auto grid h-11 w-11 shrink-0 place-items-center rounded-lg text-white transition-colors hover:bg-white/10 lg:hidden"
          >
            <Heart className="h-[22px] w-[22px]" aria-hidden="true" />
            {mounted && favCount > 0 ? (
              <span className="absolute top-0.5 right-0.5 grid h-[16px] min-w-[16px] place-items-center rounded-full bg-coral px-0.5 text-[9px] font-bold text-white">
                {favCount > 9 ? "9+" : favCount}
              </span>
            ) : null}
          </button>
        </div>

        <div className="px-4 pb-3 lg:hidden">
          <button
            type="button"
            onClick={openSearch}
            aria-label="Buscar produtos e categorias"
            className="flex h-[42px] w-full items-center gap-2.5 rounded-full bg-white px-4 text-left"
          >
            <SearchPlaceholder />
          </button>
        </div>
      </div>

      <nav
        aria-label="Navegação principal"
        className="hidden border-b border-border bg-background lg:block"
      >
        <div className="mx-auto flex h-[50px] w-full max-w-[1440px] items-center gap-1 px-6 xl:px-8">
          <Link
            href="/"
            className={cn(
              "inline-flex h-9 items-center gap-1.5 rounded-full px-3.5 text-[13px] font-semibold transition-colors",
              !activeFilter
                ? "bg-soft text-foreground"
                : "text-muted-foreground hover:bg-soft hover:text-foreground"
            )}
          >
            <Home className="h-4 w-4" aria-hidden="true" />
            Início
          </Link>

          <DropdownMenu>
            <DropdownMenuTrigger className="inline-flex h-9 items-center gap-1.5 rounded-full px-3.5 text-[13px] font-medium text-muted-foreground transition-colors hover:bg-soft hover:text-foreground focus-visible:outline-none">
              <LayoutGrid className="h-4 w-4" aria-hidden="true" />
              Categorias
              <ChevronDown className="h-3.5 w-3.5 opacity-60" aria-hidden="true" />
            </DropdownMenuTrigger>
            <DropdownMenuContent align="start" className="w-64">
              <DropdownMenuLabel className="text-xs text-muted-foreground">
                Categorias
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              {CATEGORIES.map((category) => (
                <DropdownMenuItem
                  key={category.id}
                  className="gap-2.5"
                  onSelect={() => goCategory(category.id)}
                >
                  <span
                    className="h-2.5 w-2.5 rounded-full"
                    style={{ backgroundColor: category.color }}
                    aria-hidden="true"
                  />
                  {category.name}
                </DropdownMenuItem>
              ))}
              <DropdownMenuSeparator />
              <DropdownMenuItem
                onSelect={() => scrollToId("categorias-destaque")}
              >
                <MoreHorizontal className="h-4 w-4" aria-hidden="true" />
                Ver todas as categorias
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          <Link
            href="/conteudos-digitais"
            className="inline-flex h-9 items-center gap-1.5 rounded-full px-3.5 text-[13px] font-semibold text-brand-dark transition-colors hover:bg-brand/10"
          >
            <BookOpenText className="h-4 w-4" aria-hidden="true" />
            Conteúdos Digitais
          </Link>

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
                  "inline-flex h-9 items-center gap-1.5 rounded-full px-3.5 text-[13px] font-medium transition-colors",
                  isActive
                    ? "bg-warm text-foreground"
                    : "text-muted-foreground hover:bg-soft hover:text-foreground"
                )}
              >
                <Icon className="h-4 w-4" aria-hidden="true" />
                {item.label}
              </button>
            );
          })}

          <button
            type="button"
            onClick={() => scrollToId("presentes")}
            className="inline-flex h-9 items-center gap-1.5 rounded-full px-3.5 text-[13px] font-medium text-muted-foreground transition-colors hover:bg-soft hover:text-foreground"
          >
            <Gift className="h-4 w-4" aria-hidden="true" />
            Presentes
          </button>

          <InfoMenu />

          <div className="ml-auto">
            <RegionSelector />
          </div>
        </div>
      </nav>
    </header>
  );
}

function SearchPlaceholder() {
  return (
    <>
      <svg
        className="h-4.5 w-4.5 shrink-0 text-faint"
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
      <span className="flex-1 truncate text-[13px] text-faint md:text-sm">
        Buscar produtos, categorias ou marcas...
      </span>
      <kbd className="hidden rounded border border-border bg-soft px-1.5 py-0.5 text-[10px] font-medium text-muted-foreground md:inline">
        /
      </kbd>
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
    { label: "Privacidade", href: "/privacidade" },
    { label: "Termos", href: "/termos" },
    { label: "Cookies", href: "/cookies" },
  ];

  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="inline-flex h-9 items-center gap-1 rounded-full px-3.5 text-[13px] font-medium text-muted-foreground transition-colors hover:bg-soft hover:text-foreground focus-visible:outline-none">
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
