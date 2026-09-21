"use client";

import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  BadgePercent,
  BrainCircuit,
  Gem,
  GraduationCap,
  Headphones,
  Heart,
  Laptop2,
  MessageCircle,
  RefreshCcw,
  Search,
  ShieldCheck,
  ShoppingCart,
  Sparkles,
  Truck,
  Zap,
} from "lucide-react";
import { useMemo } from "react";
import { CATEGORIES, getCategory, type Product } from "@/lib/data";
import { useUI } from "@/lib/store/ui";
import { useFavorites } from "@/lib/store/favorites";
import { scrollToId } from "@/lib/scroll";
import { cn } from "@/lib/utils";

type StorefrontReferenceProps = {
  products: Product[];
};

const CATEGORY_ORDER = [
  { id: "offers", label: "Ofertas Especiais", offer: true },
  { id: "utilidades", label: "Utilidades" },
  { id: "auto-tech", label: "Auto & Rastreador GPS" },
  { id: "arte-vida", label: "Medalhas & Terços" },
  { id: "conteudos-digitais", label: "Academia Digital" },
  { id: "saude-bem-estar", label: "Saúde & Bem-Estar" },
  { id: "pets", label: "Pets" },
  { id: "casa-utilidade", label: "Casa & Jardim" },
  { id: "cosmeticos-perfumes", label: "Cosméticos & Perfumes" },
  { id: "roupa-acessorios", label: "Roupa & Acessórios" },
] as const;

const BENEFITS = [
  {
    icon: Gem,
    title: "PRODUTOS SELECIONADOS",
    subtitle: "com curadoria",
  },
  {
    icon: ShieldCheck,
    title: "PAGAMENTO SEGURO",
    subtitle: "PIX e cartões",
  },
  {
    icon: Truck,
    title: "ENTREGA PARA TODO O BRASIL",
    subtitle: "com rastreamento",
  },
  {
    icon: Headphones,
    title: "SUPORTE ESPECIALIZADO",
    subtitle: "sempre com você",
  },
  {
    icon: RefreshCcw,
    title: "TROCA E DEVOLUÇÃO",
    subtitle: "conforme política da loja",
  },
];

const SOCIAL = [
  { label: "Instagram", short: "IG", tone: "from-fuchsia-500 to-orange-400" },
  { label: "TikTok", short: "TT", tone: "from-slate-900 to-slate-700" },
  { label: "YouTube", short: "YT", tone: "from-red-600 to-red-500" },
  { label: "Facebook", short: "f", tone: "from-blue-600 to-blue-500" },
  { label: "Pinterest", short: "P", tone: "from-red-700 to-red-600" },
  { label: "X", short: "X", tone: "from-slate-950 to-slate-800" },
  { label: "Telegram", short: "TG", tone: "from-sky-500 to-blue-500" },
  { label: "WhatsApp", short: "WA", tone: "from-emerald-500 to-green-500" },
];

export function StorefrontReference({ products }: StorefrontReferenceProps) {
  const filter = useUI((state) => state.filter);
  const setFilter = useUI((state) => state.setFilter);

  const visibleProducts = useMemo(() => {
    if (!filter) return products;
    return products.filter((product) => {
      if (filter.type === "category") return product.categoryId === filter.value;
      return product.badge === filter.value;
    });
  }, [filter, products]);

  const chooseCategory = (id: string, label: string) => {
    setFilter({ type: "category", value: id, label });
    scrollToId("destaques");
  };

  const chooseOffers = () => {
    setFilter({ type: "badge", value: "oferta", label: "Ofertas Especiais" });
    scrollToId("destaques");
  };

  return (
    <div className="nv-reference-page">
      <Hero />

      <section id="categorias" className="nv-reference-shell py-3 md:py-4">
        <div className="scrollbar-none flex snap-x snap-mandatory gap-2.5 overflow-x-auto pb-1 lg:grid lg:grid-cols-10 lg:gap-2.5 lg:overflow-visible">
          {CATEGORY_ORDER.map((item) => {
            if ("offer" in item && item.offer) {
              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={chooseOffers}
                  className="group flex w-[88px] shrink-0 snap-start flex-col items-center text-center lg:w-auto"
                >
                  <span className="nv-reference-medallion nv-reference-medallion-sale">
                    <BadgePercent className="h-10 w-10 text-amber-200 drop-shadow-[0_0_9px_rgba(255,188,44,.8)]" />
                  </span>
                  <span className="mt-1.5 max-w-[96px] text-[10px] font-black leading-[1.08] text-white md:text-[11px]">
                    {item.label}
                  </span>
                </button>
              );
            }

            const category = CATEGORIES.find((category) => category.id === item.id);
            if (!category) return null;

            return (
              <button
                key={item.id}
                type="button"
                onClick={() => chooseCategory(item.id, item.label)}
                className="group flex w-[88px] shrink-0 snap-start flex-col items-center text-center lg:w-auto"
              >
                <span className="nv-reference-medallion">
                  <span className="absolute inset-[5px] overflow-hidden rounded-full bg-[#06234b]">
                    <Image
                      src={category.image}
                      alt=""
                      fill
                      sizes="104px"
                      className="object-cover transition duration-300 group-hover:scale-110"
                    />
                    <span className="absolute inset-0 bg-[linear-gradient(145deg,rgba(255,255,255,.17),transparent_42%,rgba(0,20,55,.24))]" />
                  </span>
                </span>
                <span className="mt-1.5 max-w-[102px] text-[10px] font-black leading-[1.08] text-white md:text-[11px]">
                  {item.label}
                </span>
              </button>
            );
          })}
        </div>
      </section>

      <PromoTriptych />

      <section id="destaques" className="nv-reference-shell scroll-mt-40 pb-3 pt-1 md:pb-4">
        <div className="mb-2.5 flex items-end justify-between gap-4">
          <div className="flex items-center gap-2.5">
            <span className="grid h-8 w-8 place-items-center rounded-lg bg-red-500 text-white shadow-[0_0_18px_rgba(242,31,61,.35)]">
              <BadgePercent className="h-5 w-5" />
            </span>
            <div>
              <h2 className="nv-display text-[20px] font-black leading-none tracking-[-.03em] text-white md:text-[24px]">
                {filter ? filter.label : "Ofertas de Hoje"}
              </h2>
              <p className="mt-1 text-[10px] text-white/56 md:text-xs">
                {filter
                  ? "Produtos publicados nesta seleção."
                  : "Produtos e descobertas publicados no catálogo da Novidades.store."}
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={() => setFilter(null)}
            className="hidden text-[10px] font-bold text-white/76 underline-offset-4 hover:text-cyan-300 hover:underline sm:block md:text-xs"
          >
            {filter ? "Ver todos os produtos" : "Ver todas as ofertas"}
          </button>
        </div>

        {visibleProducts.length ? (
          <div className="scrollbar-none flex snap-x snap-mandatory gap-1.5 overflow-x-auto pb-2 sm:grid sm:grid-cols-2 sm:overflow-visible md:grid-cols-3 lg:grid-cols-6">
            {visibleProducts.slice(0, 12).map((product) => (
              <ReferenceProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <div className="rounded-xl border border-cyan-200/15 bg-white/5 px-5 py-10 text-center text-sm text-white/62">
            Não há produtos publicados nesta seleção neste momento.
          </div>
        )}
      </section>

      <BenefitStrip />
      <FeatureGrid />
      <NewsletterSocial />
    </div>
  );
}

function Hero() {
  const setFilter = useUI((state) => state.setFilter);

  const showOffers = () => {
    setFilter({ type: "badge", value: "oferta", label: "Ofertas Especiais" });
    scrollToId("destaques");
  };

  return (
    <section className="relative overflow-hidden border-b border-cyan-300/18 bg-[#021630]">
      <div className="absolute inset-0">
        <Image
          src="/images/promo/discovery.png"
          alt=""
          fill
          priority
          sizes="100vw"
          className="object-cover opacity-55 saturate-125"
        />
        <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(0,16,40,.98)_0%,rgba(0,18,45,.93)_36%,rgba(0,18,45,.36)_68%,rgba(0,13,34,.28)_100%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_65%_44%,rgba(0,185,255,.22),transparent_27%),radial-gradient(circle_at_88%_80%,rgba(240,31,61,.13),transparent_24%)]" />
      </div>

      <div className="nv-reference-shell relative h-[clamp(330px,32.2vw,460px)] min-h-[330px]">
        <div className="absolute inset-y-0 left-0 z-10 flex w-[47%] min-w-[405px] flex-col justify-center py-5 pr-4 lg:min-w-0">
          <p className="nv-display text-[clamp(42px,4.8vw,68px)] font-black leading-[.92] tracking-[-.055em] text-white">
            Novidades<span className="text-cyan-300">.store</span>
          </p>
          <h1 className="nv-display mt-2 text-[clamp(26px,2.8vw,38px)] font-black leading-[1.02] tracking-[-.045em] text-white">
            Mais do que você procura.
          </h1>
          <p className="mt-3 max-w-[430px] text-[clamp(12px,1.15vw,16px)] leading-[1.45] text-white/78">
            Produtos, descobertas e ofertas selecionadas para o seu dia a dia.
          </p>

          <div className="mt-4 flex gap-2.5">
            <button
              type="button"
              onClick={() => scrollToId("categorias")}
              className="inline-flex h-11 items-center justify-center gap-2 rounded-lg bg-[#087bff] px-5 text-[12px] font-black text-white shadow-[0_0_20px_rgba(0,123,255,.28)] transition hover:bg-[#168cff]"
            >
              Explorar a Loja
              <ArrowRight className="h-4 w-4" />
            </button>
            <button
              type="button"
              onClick={showOffers}
              className="inline-flex h-11 items-center justify-center gap-2 rounded-lg bg-gradient-to-r from-[#d80f2c] to-[#ff2745] px-5 text-[12px] font-black text-white shadow-[0_0_20px_rgba(242,31,61,.32)] transition hover:brightness-110"
            >
              <BadgePercent className="h-4 w-4" />
              Ofertas de Hoje
            </button>
          </div>

          <div className="mt-5 grid max-w-[485px] grid-cols-4 gap-2">
            {[
              [ShieldCheck, "Compra", "segura"],
              [Zap, "PIX", "via XPAYMENTS"],
              [Truck, "Entrega", "para todo o Brasil"],
              [Headphones, "Suporte", "especializado"],
            ].map(([Icon, title, subtitle]) => {
              const IconComponent = Icon as typeof ShieldCheck;
              return (
                <div key={String(title)} className="flex items-center gap-1.5">
                  <IconComponent className="h-4 w-4 shrink-0 text-cyan-300" />
                  <div className="leading-tight">
                    <p className="text-[8px] font-bold text-white">{String(title)}</p>
                    <p className="text-[7px] text-white/60">{String(subtitle)}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <div className="absolute inset-y-0 right-0 hidden w-[61%] lg:block">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_52%_54%,rgba(0,216,255,.23),transparent_30rem)]" />
          <Image
            src="/brand/novidades-mark.svg"
            alt=""
            width={470}
            height={470}
            priority
            className="absolute left-[18%] top-[47%] w-[43%] max-w-[420px] -translate-y-1/2 drop-shadow-[0_28px_35px_rgba(0,7,30,.72)]"
          />
          <div className="absolute bottom-[10%] left-[12%] h-[55px] w-[48%] rounded-[50%] border border-cyan-300/45 bg-[#05265a]/75 shadow-[0_0_45px_rgba(0,184,255,.38),inset_0_0_24px_rgba(0,216,255,.16)]" />
          <div className="absolute right-[3%] top-[14%] rotate-[-4deg] text-right">
            <p className="font-editorial text-[clamp(18px,2vw,30px)] italic leading-tight text-cyan-200 drop-shadow-[0_0_12px_rgba(0,216,255,.5)]">
              Grandes ideias
              <br />
              para uma vida
              <br />
              melhor!
            </p>
          </div>
          <div className="absolute right-[1%] top-[40%] grid w-[150px] gap-1">
            {["QUALIDADE", "VARIEDADE", "PREÇOS REAIS", "CONFIANÇA", "SEMPRE COM VOCÊ"].map((label) => (
              <span
                key={label}
                className="rounded-md border border-cyan-300/45 bg-[#05285a]/76 px-3 py-1.5 text-center text-[9px] font-bold text-cyan-100 shadow-[0_0_12px_rgba(0,153,255,.14)]"
              >
                {label}
              </span>
            ))}
          </div>
          <div className="absolute bottom-[12%] right-[19%] h-[92px] w-[120px] rounded-b-[42px] border-[3px] border-white/70 border-t-0 opacity-75">
            <div className="absolute -top-3 left-[-10px] h-[3px] w-[145px] rotate-[-3deg] bg-white/70" />
            <div className="absolute -bottom-5 left-4 h-8 w-8 rounded-full border-[3px] border-white/70" />
            <div className="absolute -bottom-5 right-4 h-8 w-8 rounded-full border-[3px] border-white/70" />
          </div>
        </div>
      </div>
    </section>
  );
}

function PromoTriptych() {
  return (
    <section className="nv-reference-shell py-2.5">
      <div className="grid min-h-[128px] gap-3 lg:grid-cols-[2fr_1fr_1fr]">
        <button
          type="button"
          onClick={() => {
            useUI.getState().setFilter({
              type: "badge",
              value: "oferta",
              label: "Ofertas Especiais",
            });
            scrollToId("destaques");
          }}
          className="group relative overflow-hidden rounded-xl border border-red-400/65 bg-[radial-gradient(circle_at_88%_16%,rgba(255,176,31,.28),transparent_27%),linear-gradient(135deg,#8b0617,#f21f3d_62%,#ff5a22)] p-5 text-left text-white shadow-[0_0_22px_rgba(242,31,61,.30)]"
        >
          <div className="absolute -right-4 -top-16 h-52 w-52 rotate-12 rounded-[44%] border border-white/10 bg-white/5" />
          <div className="relative flex h-full items-center gap-4">
            <Zap className="h-14 w-14 shrink-0 fill-amber-300 text-amber-300 drop-shadow-[0_0_12px_rgba(255,190,40,.55)]" />
            <div>
              <h2 className="nv-display text-[clamp(26px,3vw,40px)] font-black leading-none tracking-[-.04em]">
                OFERTAS ESPECIAIS
              </h2>
              <p className="mt-1 text-[10px] font-bold tracking-[.05em] text-white/88 uppercase">
                Descontos reais em produtos selecionados
              </p>
              <span className="mt-3 inline-flex items-center gap-1 rounded-full bg-red-600/95 px-4 py-2 text-[10px] font-black">
                Ver todas as ofertas
                <ArrowRight className="h-3.5 w-3.5" />
              </span>
            </div>
          </div>
        </button>

        <Link
          href="/entregas"
          className="relative overflow-hidden rounded-xl border border-cyan-300/32 bg-[linear-gradient(135deg,#092a4d,#06172e)] p-4 text-white shadow-[0_0_18px_rgba(0,130,255,.12)]"
        >
          <div className="absolute -right-3 bottom-[-18px] opacity-25">
            <Truck className="h-28 w-28 text-white" />
          </div>
          <div className="relative z-10">
            <p className="nv-display text-[17px] font-black leading-[1.05]">
              FRETE PARA
              <br />
              TODO O BRASIL
            </p>
            <p className="mt-4 text-[9px] font-bold text-white/72 uppercase">
              Entrega rápida
              <br />
              e segura
            </p>
          </div>
        </Link>

        <Link
          href="/pagamentos"
          className="relative overflow-hidden rounded-xl border border-cyan-300/70 bg-[radial-gradient(circle_at_88%_70%,rgba(0,235,255,.24),transparent_34%),linear-gradient(135deg,#071d39,#03152f)] p-4 text-white shadow-[0_0_18px_rgba(0,216,255,.16)]"
        >
          <div className="relative z-10">
            <p className="nv-display text-[16px] font-black">PAGUE COM</p>
            <p className="nv-display text-[30px] font-black leading-none text-cyan-300">PIX</p>
            <p className="mt-1 text-[10px] font-black">VIA XPAYMENTS</p>
            <p className="mt-4 text-[8px] tracking-wide text-cyan-100/78 uppercase">
              Rápido. Seguro. Prático.
            </p>
          </div>
          <div className="absolute right-4 top-1/2 grid h-16 w-16 -translate-y-1/2 rotate-45 place-items-center rounded-[18px] border border-cyan-200/55 bg-cyan-300/10 shadow-[0_0_22px_rgba(0,216,255,.28)]">
            <div className="h-7 w-7 rounded-md border-4 border-cyan-200" />
          </div>
        </Link>
      </div>
    </section>
  );
}

function ReferenceProductCard({ product }: { product: Product }) {
  const favoriteIds = useFavorites((state) => state.ids);
  const toggleFavorite = useFavorites((state) => state.toggle);
  const category = getCategory(product.categoryId);
  const isFavorite = favoriteIds.includes(product.id);
  const href = `/${category?.slug ?? "produto"}/${product.slug}`;

  return (
    <article className="group relative flex min-w-[168px] snap-start flex-col overflow-hidden rounded-[9px] border border-slate-200 bg-white text-[#07142a] shadow-[0_4px_12px_rgba(0,10,30,.18)] transition hover:-translate-y-1 hover:shadow-[0_12px_24px_rgba(0,91,216,.22)]">
      <Link href={href} className="flex flex-1 flex-col">
        <div className="relative aspect-square overflow-hidden bg-[#f7f9fb]">
          <Image
            src={product.image}
            alt={product.name}
            fill
            sizes="(max-width: 640px) 44vw, (max-width: 1024px) 30vw, 180px"
            className="object-contain p-2.5 transition duration-300 group-hover:scale-[1.03]"
          />
          {product.badge === "oferta" ? (
            <span className="absolute left-2 top-2 rounded bg-red-500 px-2 py-1 text-[9px] font-black text-white">
              OFERTA
            </span>
          ) : product.badge ? (
            <span className="absolute left-2 top-2 rounded bg-[#087bff] px-2 py-1 text-[9px] font-black text-white">
              {product.badge === "novo" ? "NOVO" : product.badge.toUpperCase()}
            </span>
          ) : null}
        </div>

        <div className="flex flex-1 flex-col p-2.5">
          <h3 className="line-clamp-2 min-h-[2.4em] text-[11px] font-bold leading-[1.2]">
            {product.name}
          </h3>
          <p className="mt-1 line-clamp-1 text-[9px] text-slate-500">
            {product.tagline ?? category?.name ?? "Produto selecionado"}
          </p>
          <p className="mt-2 text-[17px] font-black leading-none text-red-600">
            {formatMoney(product.price, product.currency)}
          </p>
          <p className="mt-1 text-[9px] font-extrabold text-emerald-600">
            {product.currency === "BRL" ? "PIX disponível no checkout" : "Pagamento no checkout"}
          </p>
          <span className="mt-auto flex h-9 items-center justify-center gap-1.5 rounded-md bg-[#087bff] px-3 text-[10px] font-black text-white">
            <ShoppingCart className="h-3.5 w-3.5" />
            Comprar
          </span>
        </div>
      </Link>

      <button
        type="button"
        aria-label={isFavorite ? "Remover dos favoritos" : "Adicionar aos favoritos"}
        onClick={() => toggleFavorite(product.id)}
        className="absolute right-2 top-2 z-10 grid h-7 w-7 place-items-center rounded-full bg-white/92 text-slate-700 shadow-sm"
      >
        <Heart className={cn("h-4 w-4", isFavorite && "fill-red-500 text-red-500")} />
      </button>
    </article>
  );
}

function BenefitStrip() {
  return (
    <section className="border-y border-cyan-300/12 bg-[#031c37]">
      <div className="nv-reference-shell grid grid-cols-2 divide-x divide-white/10 py-3 sm:grid-cols-3 lg:grid-cols-5">
        {BENEFITS.map(({ icon: Icon, title, subtitle }, index) => (
          <div
            key={title}
            className={cn(
              "flex min-h-[70px] items-center gap-3 px-3 py-2",
              index > 1 && "hidden sm:flex",
              index > 2 && "sm:hidden lg:flex",
            )}
          >
            <Icon className="h-9 w-9 shrink-0 text-cyan-300" strokeWidth={1.8} />
            <div>
              <p className="text-[10px] font-black leading-[1.08] text-white">{title}</p>
              <p className="mt-1 text-[9px] text-white/54">{subtitle}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

function FeatureGrid() {
  return (
    <section id="colecoes" className="nv-reference-shell grid gap-3 py-4 lg:grid-cols-2">
      <Link
        href="/conteudos-digitais"
        className="group relative min-h-[150px] overflow-hidden rounded-xl border border-cyan-300/35 bg-[radial-gradient(circle_at_86%_20%,rgba(0,216,255,.30),transparent_30%),linear-gradient(135deg,#06244a,#0a3b73_64%,#041426)] p-5 text-white shadow-[0_0_18px_rgba(0,133,255,.12)]"
      >
        <div className="absolute right-5 top-5 grid grid-cols-2 gap-2 opacity-80">
          <span className="grid h-12 w-12 place-items-center rounded-xl border border-cyan-300/20 bg-white/6">
            <GraduationCap className="h-6 w-6 text-cyan-200" />
          </span>
          <span className="grid h-12 w-12 place-items-center rounded-xl border border-cyan-300/20 bg-white/6">
            <Laptop2 className="h-6 w-6 text-cyan-200" />
          </span>
          <span className="col-span-2 ml-auto grid h-12 w-12 place-items-center rounded-xl border border-cyan-300/20 bg-white/6">
            <BrainCircuit className="h-6 w-6 text-cyan-200" />
          </span>
        </div>
        <div className="relative z-10 max-w-[64%]">
          <p className="nv-display text-[23px] font-black leading-none">
            ACADEMIA <span className="text-cyan-300">DIGITAL</span>
          </p>
          <p className="mt-2 text-[13px] text-white/88">
            Software, IA e soluções para o mercado digital.
          </p>
          <p className="mt-1 text-[11px] font-bold text-white">
            Mais possibilidades amanhã.
          </p>
          <span className="mt-4 inline-flex items-center gap-1.5 rounded-full bg-[#087bff] px-4 py-2 text-[10px] font-black">
            Explorar soluções
            <ArrowRight className="h-3.5 w-3.5 transition group-hover:translate-x-0.5" />
          </span>
        </div>
      </Link>

      <a
        href="https://signum312.novidades.store"
        className="group relative min-h-[150px] overflow-hidden rounded-xl border border-amber-300/40 bg-[radial-gradient(circle_at_25%_52%,rgba(246,184,45,.28),transparent_24%),linear-gradient(135deg,#3a060b,#9c1020_46%,#240309)] p-5 text-white shadow-[0_0_18px_rgba(200,25,39,.16)]"
      >
        <Image
          src="/images/products/signum-gold-real.webp"
          alt=""
          width={200}
          height={260}
          className="absolute -left-1 bottom-[-68px] w-[180px] rotate-[-6deg] rounded-2xl opacity-90"
        />
        <div className="relative z-10 ml-[36%] max-w-[60%]">
          <p className="nv-display text-[26px] font-black leading-none text-amber-200">
            SIGNUM 312
          </p>
          <p className="mt-2 text-[14px] text-white">Mais que um acessório.</p>
          <p className="text-[14px] font-bold text-white">Um símbolo.</p>
          <span className="mt-4 inline-flex items-center gap-1.5 rounded-full bg-amber-300 px-4 py-2 text-[10px] font-black text-[#2b1204]">
            Descobrir a coleção
            <ArrowRight className="h-3.5 w-3.5 transition group-hover:translate-x-0.5" />
          </span>
        </div>
      </a>
    </section>
  );
}

function NewsletterSocial() {
  return (
    <section className="border-t border-cyan-300/14 bg-[#031a35]">
      <div className="nv-reference-shell grid gap-0 lg:grid-cols-[1.2fr_1fr_.65fr]">
        <div className="border-b border-cyan-300/10 px-4 py-4 lg:border-r lg:border-b-0">
          <div className="flex items-start gap-3">
            <MessageCircle className="mt-0.5 h-7 w-7 text-cyan-300" />
            <div>
              <p className="text-sm font-black text-white">Receba nossas novidades</p>
              <p className="text-[10px] text-cyan-200/80">
                Ofertas, lançamentos e conteúdos exclusivos.
              </p>
            </div>
          </div>
          <form
            className="mt-3 flex overflow-hidden rounded-lg bg-white"
            onSubmit={(event) => event.preventDefault()}
          >
            <label htmlFor="newsletter-email" className="sr-only">
              Seu melhor e-mail
            </label>
            <input
              id="newsletter-email"
              type="email"
              placeholder="Seu melhor e-mail"
              className="h-10 min-w-0 flex-1 bg-white px-4 text-xs text-slate-900 outline-none"
            />
            <button
              type="submit"
              className="h-10 bg-[#087bff] px-6 text-[11px] font-black text-white"
            >
              Inscrever
            </button>
          </form>
        </div>

        <div className="border-b border-cyan-300/10 px-4 py-4 lg:border-r lg:border-b-0">
          <p className="text-sm font-black text-white">
            <span className="text-cyan-300">f</span> Siga a Novidades.store
          </p>
          <p className="mt-0.5 text-[10px] text-cyan-200/80">
            Inspire-se. Descubra. Aproveite.
          </p>
          <div className="mt-4 flex flex-wrap gap-2">
            {SOCIAL.map((item) => (
              <button
                key={item.label}
                type="button"
                aria-label={item.label}
                className={`grid h-8 w-8 place-items-center rounded-full bg-gradient-to-br ${item.tone} text-[8px] font-black text-white shadow-sm`}
              >
                {item.short}
              </button>
            ))}
          </div>
        </div>

        <div className="flex min-h-[130px] items-center justify-center px-4 py-4 text-center">
          <div className="-rotate-6">
            <p className="font-editorial text-[25px] italic leading-[1.02] text-white drop-shadow-[0_0_12px_rgba(0,216,255,.3)]">
              Todo dia,
              <br />
              uma boa
              <br />
              descoberta!
            </p>
            <span className="mx-auto mt-2 block h-[2px] w-24 rotate-[-8deg] bg-cyan-300 shadow-[0_0_10px_rgba(0,216,255,.75)]" />
          </div>
        </div>
      </div>
    </section>
  );
}

function formatMoney(value: number, currency: "BRL" | "EUR") {
  return new Intl.NumberFormat(currency === "BRL" ? "pt-BR" : "pt-PT", {
    style: "currency",
    currency,
    minimumFractionDigits: 2,
  }).format(value);
}
