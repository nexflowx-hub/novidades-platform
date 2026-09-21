"use client";

import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  BadgePercent,
  BrainCircuit,
  Clock3,
  Gem,
  GraduationCap,
  Headphones,
  Heart,
  Laptop2,
  Mail,
  RefreshCcw,
  ShieldCheck,
  ShoppingCart,
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
  { id: "offers", label: "Ofertas\nEspeciais", image: "/brand/reference/category-offers.webp", offer: true },
  { id: "utilidades", label: "Utilidades", image: "/brand/reference/category-utilidades.webp" },
  { id: "auto-tech", label: "Auto &\nRastreador GPS" },
  { id: "arte-vida", label: "Medalhas\n& Terços" },
  { id: "conteudos-digitais", label: "Academia\nDigital" },
  { id: "saude-bem-estar", label: "Saúde &\nBem-Estar" },
  { id: "pets", label: "Pets" },
  { id: "casa-utilidade", label: "Casa &\nJardim" },
  { id: "cosmeticos-perfumes", label: "Cosméticos\n& Perfumes" },
  { id: "roupa-acessorios", label: "Roupa &\nAcessórios" },
] as const;

const BENEFITS = [
  { icon: Gem, title: "PRODUTOS\nSELECIONADOS", subtitle: "com curadoria" },
  { icon: ShieldCheck, title: "PAGAMENTO\nSEGURO", subtitle: "PIX e cartões" },
  { icon: Truck, title: "ENTREGA\nPARA TODO O BRASIL", subtitle: "com rastreamento" },
  { icon: Headphones, title: "SUPORTE\nESPECIALIZADO", subtitle: "sempre com você" },
  { icon: RefreshCcw, title: "TROCA E DEVOLUÇÃO\nSEM COMPLICAÇÃO", subtitle: "conforme política da loja" },
];

const SOCIAL = [
  ["IG", "from-fuchsia-500 via-pink-500 to-orange-400", "Instagram"],
  ["♪", "from-slate-950 to-slate-700", "TikTok"],
  ["▶", "from-red-600 to-red-500", "YouTube"],
  ["f", "from-blue-600 to-blue-500", "Facebook"],
  ["P", "from-red-700 to-red-600", "Pinterest"],
  ["X", "from-slate-950 to-slate-700", "X"],
  ["➤", "from-sky-500 to-blue-500", "Telegram"],
  ["☏", "from-emerald-500 to-green-500", "WhatsApp"],
] as const;

export function StorefrontReference({ products }: StorefrontReferenceProps) {
  const filter = useUI((state) => state.filter);
  const setFilter = useUI((state) => state.setFilter);

  const visibleProducts = useMemo(() => {
    if (!filter) return products;
    return products.filter((product) =>
      filter.type === "category"
        ? product.categoryId === filter.value
        : product.badge === filter.value,
    );
  }, [filter, products]);

  const chooseCategory = (id: string, label: string) => {
    setFilter({ type: "category", value: id, label: label.replace("\n", " ") });
    scrollToId("destaques");
  };

  const chooseOffers = () => {
    setFilter({ type: "badge", value: "oferta", label: "Ofertas Especiais" });
    scrollToId("destaques");
  };

  return (
    <div className="nv-reference-page">
      <Hero />

      <section id="categorias" className="nv-reference-shell nv-category-section">
        <div className="scrollbar-none flex snap-x snap-mandatory items-start gap-[7px] overflow-x-auto lg:grid lg:grid-cols-10 lg:gap-[7px] lg:overflow-visible">
          {CATEGORY_ORDER.map((item) => {
            const isOffer = "offer" in item && item.offer;
            const category = isOffer ? null : CATEGORIES.find((entry) => entry.id === item.id);
            const source = "image" in item && item.image ? item.image : category?.image;

            return (
              <button
                key={item.id}
                type="button"
                onClick={() =>
                  isOffer ? chooseOffers() : chooseCategory(item.id, item.label)
                }
                className="group flex w-[93px] shrink-0 snap-start flex-col items-center text-center lg:w-auto"
                aria-label={item.label.replace("\n", " ")}
              >
                <span className={cn("nv-reference-medallion", isOffer && "nv-reference-medallion-sale")}>
                  {source ? (
                    <Image
                      src={source}
                      alt=""
                      fill
                      sizes="104px"
                      className={cn(
                        "rounded-full object-cover transition-transform duration-300 group-hover:scale-[1.035]",
                        isOffer ? "p-0" : "p-[4px]",
                      )}
                    />
                  ) : null}
                </span>
                <span className="mt-[7px] whitespace-pre-line text-[11px] font-extrabold leading-[1.02] tracking-[-.018em] text-white">
                  {item.label}
                </span>
              </button>
            );
          })}
        </div>
      </section>

      <PromoTriptych />

      <section id="destaques" className="nv-reference-shell scroll-mt-40">
        <div className="nv-offer-heading">
          <div className="flex min-w-0 items-center gap-[9px]">
            <span className="grid h-[34px] w-[34px] shrink-0 place-items-center rounded-[7px] bg-red-500 text-white shadow-[0_0_16px_rgba(242,31,61,.38)]">
              <BadgePercent className="h-[21px] w-[21px]" />
            </span>
            <div className="min-w-0">
              <h2 className="nv-display truncate text-[22px] font-extrabold leading-none tracking-[-.035em] text-white">
                {filter ? filter.label : "Ofertas de Hoje"}
              </h2>
              <p className="mt-[4px] truncate text-[10px] text-white/64">
                {filter
                  ? "Produtos publicados nesta seleção."
                  : "Produtos e descobertas selecionados para você."}
              </p>
            </div>
          </div>

          <div className="hidden items-center gap-2 rounded-[7px] bg-[#a30d24] px-3 py-[6px] text-white md:flex">
            <Clock3 className="h-4 w-4" />
            <div className="leading-none">
              <p className="text-[10px] font-extrabold">OFERTAS ATIVAS</p>
              <p className="mt-1 text-[8px] text-white/75">condições reais no checkout</p>
            </div>
          </div>

          <button
            type="button"
            onClick={() => setFilter(null)}
            className="hidden text-[10px] font-semibold text-white/85 underline-offset-4 transition hover:text-cyan-300 hover:underline sm:block"
          >
            {filter ? "Ver todos os produtos →" : "Ver todas as ofertas →"}
          </button>
        </div>

        {visibleProducts.length ? (
          <div className="scrollbar-none grid grid-flow-col auto-cols-[168px] gap-[5px] overflow-x-auto pb-[8px] sm:grid-flow-row sm:grid-cols-2 sm:auto-cols-auto sm:overflow-visible md:grid-cols-3 lg:grid-cols-6">
            {visibleProducts.slice(0, 12).map((product) => (
              <ReferenceProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <div className="mb-2 rounded-[9px] border border-cyan-200/18 bg-white/5 px-5 py-10 text-center text-sm text-white/62">
            Ainda não há produtos publicados nesta seleção.
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
    <section className="nv-hero">
      <div className="absolute inset-0">
        <Image
          src="/images/promo/discovery.png"
          alt=""
          fill
          priority
          sizes="100vw"
          className="object-cover object-center opacity-[.82] saturate-[1.24] contrast-[1.05]"
        />
        <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(0,13,34,.98)_0%,rgba(0,18,45,.90)_37%,rgba(0,18,45,.20)_69%,rgba(0,13,34,.24)_100%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_64%_43%,rgba(0,194,255,.20),transparent_28%),radial-gradient(circle_at_88%_78%,rgba(255,41,69,.11),transparent_22%)]" />
      </div>

      <div className="nv-reference-shell relative h-full">
        <div className="nv-hero-copy">
          <p className="nv-display text-[clamp(48px,5.15vw,74px)] font-black leading-[.88] tracking-[-.06em] text-white">
            Novidades<span className="text-cyan-300">.store</span>
          </p>
          <h1 className="nv-display mt-[7px] text-[clamp(29px,3.12vw,44px)] font-extrabold leading-[.98] tracking-[-.052em] text-white">
            Mais do que você procura.
          </h1>
          <p className="mt-[10px] max-w-[410px] text-[clamp(12px,1.15vw,16px)] leading-[1.38] font-medium text-white/84">
            Produtos, descobertas e ofertas selecionadas
            <br className="hidden sm:block" />
            para o seu dia a dia.
          </p>

          <div className="mt-[17px] flex gap-[10px]">
            <button
              type="button"
              onClick={() => scrollToId("categorias")}
              className="inline-flex h-[44px] items-center justify-center gap-2 rounded-[7px] bg-[#087bff] px-[25px] text-[12px] font-extrabold text-white shadow-[0_0_18px_rgba(0,123,255,.26)] transition hover:bg-[#158aff]"
            >
              Explorar a Loja
              <ArrowRight className="h-4 w-4" />
            </button>
            <button
              type="button"
              onClick={showOffers}
              className="inline-flex h-[44px] items-center justify-center gap-2 rounded-[7px] bg-gradient-to-r from-[#d60d2a] to-[#ff2143] px-[22px] text-[12px] font-extrabold text-white shadow-[0_0_19px_rgba(242,31,61,.31)] transition hover:brightness-110"
            >
              <BadgePercent className="h-[18px] w-[18px]" />
              Ofertas de Hoje
            </button>
          </div>

          <div className="mt-[24px] grid max-w-[405px] grid-cols-4 gap-3">
            {[
              [ShieldCheck, "Compra", "segura"],
              [Zap, "PIX", "via XPAYMENTS"],
              [Truck, "Entrega", "para todo o Brasil"],
              [Headphones, "Suporte", "especializado"],
            ].map(([Icon, title, subtitle]) => {
              const IconComponent = Icon as typeof ShieldCheck;
              return (
                <div key={String(title)} className="flex items-center gap-[6px]">
                  <IconComponent className="h-[18px] w-[18px] shrink-0 text-cyan-300" />
                  <div className="leading-[1.02]">
                    <p className="text-[8px] font-bold text-white">{String(title)}</p>
                    <p className="mt-[2px] text-[7px] text-white/64">{String(subtitle)}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <div className="nv-hero-art hidden lg:block" aria-hidden="true">
          <div className="absolute left-[28%] top-[50%] h-[270px] w-[270px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-cyan-400/15 blur-[58px]" />
          <div className="absolute bottom-[18px] left-[5%] h-[74px] w-[54%] rounded-[50%] border border-cyan-200/45 bg-[linear-gradient(180deg,#0a4281,#041933)] shadow-[0_0_34px_rgba(0,183,255,.5),inset_0_0_22px_rgba(0,216,255,.24)]" />
          <div className="absolute bottom-[37px] left-[12%] z-[2] w-[40%] text-center">
            <p className="nv-display text-[24px] font-extrabold leading-none tracking-[-.04em] text-cyan-200 drop-shadow-[0_0_8px_rgba(0,216,255,.5)]">
              Novidades.store
            </p>
            <p className="mt-[5px] text-[8px] font-black tracking-[.15em] text-cyan-300">
              TODO DIA, UMA BOA DESCOBERTA.
            </p>
          </div>
          <Image
            src="/brand/novidades-mark.svg"
            alt=""
            width={430}
            height={430}
            priority
            className="absolute bottom-[54px] left-[3%] z-[3] w-[52%] max-w-[360px] drop-shadow-[0_22px_28px_rgba(0,5,25,.70)]"
          />

          <div className="absolute right-[5%] top-[11%] -rotate-[4deg] text-right">
            <p className="font-editorial text-[24px] italic leading-[1.02] text-cyan-200 drop-shadow-[0_0_11px_rgba(0,216,255,.55)]">
              Grandes ideias
              <br />para uma vida
              <br />melhor!
            </p>
          </div>

          <div className="absolute right-[0%] top-[38%] grid w-[128px] gap-[4px]">
            {["QUALIDADE", "VARIEDADE", "PREÇOS REAIS", "CONFIANÇA", "SEMPRE COM VOCÊ"].map((label) => (
              <span
                key={label}
                className="rounded-[4px] border border-cyan-300/55 bg-[#052a59]/82 px-2 py-[6px] text-center text-[8px] font-bold text-cyan-100 shadow-[0_0_10px_rgba(0,153,255,.16)]"
              >
                {label}
              </span>
            ))}
          </div>

          <ShoppingCart className="absolute bottom-[62px] right-[15%] h-[86px] w-[86px] text-white/78 drop-shadow-[0_0_7px_rgba(255,255,255,.2)]" strokeWidth={1.15} />
          <div className="absolute bottom-[51px] right-[8%] h-[31px] w-[34px] border border-amber-500/50 bg-[#8a4d21]/75" />
          <div className="absolute bottom-[35px] right-[2%] h-[43px] w-[47px] border border-amber-500/45 bg-[#9a5727]/78" />
        </div>
      </div>
    </section>
  );
}

function PromoTriptych() {
  return (
    <section className="nv-reference-shell nv-promo-wrap">
      <div className="grid h-[126px] gap-[12px] lg:grid-cols-[2fr_1fr_1fr]">
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
          className="group relative overflow-hidden rounded-[10px] border border-[#ff5b69] bg-[radial-gradient(circle_at_88%_16%,rgba(255,183,39,.30),transparent_28%),linear-gradient(135deg,#850613,#ee1736_62%,#ff5a22)] px-[25px] text-left text-white shadow-[0_0_16px_rgba(242,31,61,.38)]"
        >
          <div className="absolute -right-8 -top-20 h-60 w-60 rotate-12 rounded-[44%] border border-white/10 bg-white/5" />
          <div className="relative flex h-full items-center gap-[15px]">
            <Zap className="h-[59px] w-[59px] shrink-0 fill-amber-300 text-amber-300 drop-shadow-[0_0_11px_rgba(255,190,40,.55)]" />
            <div>
              <h2 className="nv-display text-[32px] font-extrabold leading-none tracking-[-.043em]">
                OFERTAS ESPECIAIS
              </h2>
              <p className="mt-[6px] text-[9px] font-extrabold tracking-[.03em] text-white/92 uppercase">
                Descontos reais em produtos selecionados
              </p>
              <span className="mt-[10px] inline-flex items-center gap-1 rounded-full bg-[#d8142e] px-[15px] py-[7px] text-[9px] font-extrabold">
                Ver todas as ofertas
                <ArrowRight className="h-3 w-3" />
              </span>
            </div>
          </div>
        </button>

        <Link
          href="/entregas"
          className="relative overflow-hidden rounded-[10px] border border-white/18 bg-[linear-gradient(135deg,#08294d,#06172e)] p-[14px] text-white"
        >
          <Truck className="absolute -bottom-[12px] right-[7px] h-[104px] w-[104px] text-white/23" />
          <div className="relative z-10">
            <p className="nv-display text-[16px] font-extrabold leading-[1.07]">
              FRETE PARA
              <br />TODO O BRASIL
            </p>
            <p className="mt-[17px] text-[8px] font-bold text-white/76 uppercase">
              Entrega rápida
              <br />e segura
            </p>
          </div>
        </Link>

        <Link
          href="/pagamentos"
          className="relative overflow-hidden rounded-[10px] border border-cyan-300/72 bg-[radial-gradient(circle_at_88%_66%,rgba(0,235,255,.25),transparent_34%),linear-gradient(135deg,#071d39,#03152f)] p-[14px] text-white shadow-[0_0_14px_rgba(0,216,255,.14)]"
        >
          <div className="relative z-10">
            <p className="nv-display text-[16px] font-extrabold">PAGUE COM</p>
            <p className="nv-display text-[28px] font-black leading-none text-cyan-300">PIX</p>
            <p className="mt-[2px] text-[10px] font-extrabold">VIA XPAYMENTS</p>
            <p className="mt-[13px] text-[8px] tracking-wide text-cyan-100/80 uppercase">
              Rápido. Seguro. Prático.
            </p>
          </div>
          <div className="absolute right-[17px] top-1/2 grid h-[56px] w-[56px] -translate-y-1/2 rotate-45 place-items-center rounded-[14px] border border-cyan-200/55 bg-cyan-300/9 shadow-[0_0_20px_rgba(0,216,255,.26)]">
            <div className="h-[24px] w-[24px] rounded-[5px] border-[4px] border-cyan-200" />
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
    <article className="group relative flex h-[292px] min-w-[168px] flex-col overflow-hidden rounded-[8px] border border-slate-200 bg-white text-[#07142a] shadow-[0_3px_10px_rgba(0,8,28,.19)] transition hover:-translate-y-[3px] hover:shadow-[0_10px_22px_rgba(0,91,216,.24)]">
      <Link href={href} className="flex h-full flex-col">
        <div className="relative h-[146px] shrink-0 overflow-hidden bg-[#f7f9fb]">
          <Image
            src={product.image}
            alt={product.name}
            fill
            sizes="(max-width: 640px) 46vw, (max-width: 1024px) 30vw, 170px"
            className="object-contain p-[8px] transition-transform duration-300 group-hover:scale-[1.025]"
          />
          {product.badge ? (
            <span
              className={cn(
                "absolute left-[8px] top-[8px] rounded-[4px] px-[7px] py-[4px] text-[9px] font-extrabold text-white",
                product.badge === "oferta" ? "bg-red-500" : "bg-[#087bff]",
              )}
            >
              {product.badge === "oferta"
                ? "OFERTA"
                : product.badge === "novo"
                  ? "NOVO"
                  : product.badge.toUpperCase()}
            </span>
          ) : null}
        </div>

        <div className="flex min-h-0 flex-1 flex-col px-[10px] pb-[10px] pt-[7px]">
          <h3 className="line-clamp-2 min-h-[27px] text-[10px] font-bold leading-[1.22]">
            {product.name}
          </h3>
          <p className="mt-[3px] line-clamp-1 text-[8px] text-slate-500">
            {product.tagline ?? category?.name ?? "Produto selecionado"}
          </p>
          <div className="mt-[6px]">
            <p className="text-[17px] font-black leading-none text-red-600">
              {formatMoney(product.price, product.currency)}
            </p>
            <p className="mt-[3px] text-[8px] font-extrabold text-emerald-600">
              {product.currency === "BRL" ? "PIX no checkout" : "Pagamento no checkout"}
            </p>
          </div>
          <span className="mt-auto flex h-[31px] items-center justify-center gap-[5px] rounded-[5px] bg-[#087bff] px-3 text-[9px] font-extrabold text-white">
            <ShoppingCart className="h-[13px] w-[13px]" />
            Comprar
          </span>
        </div>
      </Link>

      <button
        type="button"
        aria-label={isFavorite ? "Remover dos favoritos" : "Adicionar aos favoritos"}
        onClick={() => toggleFavorite(product.id)}
        className="absolute right-[8px] top-[8px] z-10 grid h-[25px] w-[25px] place-items-center rounded-full bg-white/94 text-slate-700 shadow-sm"
      >
        <Heart className={cn("h-[14px] w-[14px]", isFavorite && "fill-red-500 text-red-500")} />
      </button>
    </article>
  );
}

function BenefitStrip() {
  return (
    <section className="nv-benefit-strip">
      <div className="nv-reference-shell grid h-[82px] grid-cols-2 divide-x divide-cyan-100/15 sm:grid-cols-3 lg:grid-cols-5">
        {BENEFITS.map(({ icon: Icon, title, subtitle }, index) => (
          <div
            key={title}
            className={cn(
              "flex items-center gap-[10px] px-[10px]",
              index > 1 && "hidden sm:flex",
              index > 2 && "sm:hidden lg:flex",
            )}
          >
            <Icon className="h-[36px] w-[36px] shrink-0 text-cyan-300" strokeWidth={1.8} />
            <div>
              <p className="whitespace-pre-line text-[9px] font-extrabold leading-[1.11] text-white">
                {title}
              </p>
              <p className="mt-[5px] text-[8px] text-white/62">{subtitle}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

function FeatureGrid() {
  return (
    <section id="colecoes" className="nv-reference-shell grid gap-[12px] py-[14px] lg:grid-cols-2">
      <Link
        href="/conteudos-digitais"
        className="group relative h-[151px] overflow-hidden rounded-[10px] border border-cyan-300/40 bg-[radial-gradient(circle_at_85%_28%,rgba(0,216,255,.25),transparent_31%),linear-gradient(135deg,#06244a,#0a3b73_65%,#041426)] text-white"
      >
        <div className="absolute inset-y-0 left-0 w-[31%] bg-[linear-gradient(90deg,rgba(3,17,38,.45),transparent)]" />
        <GraduationCap className="absolute left-[24px] top-[23px] h-[45px] w-[45px] text-cyan-100/90" />
        <div className="absolute bottom-[18px] left-[23px] grid grid-cols-3 gap-[5px]">
          {[Laptop2, BrainCircuit, Gem].map((Icon, index) => (
            <span key={index} className="grid h-[28px] w-[28px] place-items-center rounded-[5px] border border-cyan-200/15 bg-white/7">
              <Icon className="h-[14px] w-[14px] text-cyan-200" />
            </span>
          ))}
        </div>

        <div className="absolute left-[21%] top-[24px] z-10 max-w-[72%]">
          <p className="nv-display text-[23px] font-extrabold leading-none tracking-[-.035em]">
            ACADEMIA <span className="text-cyan-300">DIGITAL</span>
          </p>
          <p className="mt-[8px] text-[13px] text-white/92">
            Software, IA e soluções para o mercado digital.
          </p>
          <p className="mt-[3px] text-[10px] font-bold text-white/72">
            Conhecimento e ferramentas para executar melhor.
          </p>
          <span className="mt-[12px] inline-flex items-center gap-1 rounded-full bg-[#087bff] px-[14px] py-[7px] text-[9px] font-extrabold">
            Explorar soluções
            <ArrowRight className="h-3 w-3 transition group-hover:translate-x-0.5" />
          </span>
        </div>
      </Link>

      <a
        href="https://signum312.novidades.store"
        className="group relative h-[151px] overflow-hidden rounded-[10px] border border-amber-300/42 bg-[radial-gradient(circle_at_18%_52%,rgba(246,184,45,.28),transparent_23%),linear-gradient(135deg,#3a060b,#9c1020_46%,#240309)] text-white"
      >
        <Image
          src="/images/products/signum-gold-real.webp"
          alt=""
          width={180}
          height={240}
          className="absolute -left-[4px] bottom-[-64px] w-[168px] rotate-[-5deg] rounded-2xl opacity-95"
        />
        <div className="absolute right-0 top-0 h-full w-[30%] bg-[linear-gradient(110deg,transparent,rgba(246,184,45,.10))]" />
        <div className="absolute left-[37%] top-[22px] z-10 max-w-[60%]">
          <p className="nv-display text-[25px] font-extrabold leading-none text-amber-200">
            SIGNUM 312
          </p>
          <p className="mt-[8px] text-[14px] text-white">Mais que um acessório.</p>
          <p className="text-[14px] font-bold text-white">Um símbolo.</p>
          <span className="mt-[13px] inline-flex items-center gap-1 rounded-full bg-amber-300 px-[14px] py-[7px] text-[9px] font-extrabold text-[#2b1204]">
            Descobrir a coleção
            <ArrowRight className="h-3 w-3 transition group-hover:translate-x-0.5" />
          </span>
        </div>
      </a>
    </section>
  );
}

function NewsletterSocial() {
  return (
    <section className="border-t border-cyan-300/14 bg-[#031a35]">
      <div className="nv-reference-shell grid min-h-[130px] lg:grid-cols-[1.2fr_1fr_.65fr]">
        <div className="border-b border-cyan-300/10 px-[26px] py-[18px] lg:border-b-0 lg:border-r">
          <div className="flex items-start gap-[12px]">
            <Mail className="mt-[2px] h-[26px] w-[26px] text-cyan-300" />
            <div>
              <p className="text-[13px] font-extrabold text-white">Receba nossas novidades</p>
              <p className="mt-[2px] text-[9px] text-cyan-200/82">
                Ofertas, lançamentos e conteúdos exclusivos.
              </p>
            </div>
          </div>
          <form
            className="mt-[11px] flex h-[40px] overflow-hidden rounded-[8px] bg-white"
            onSubmit={(event) => event.preventDefault()}
          >
            <label htmlFor="newsletter-email" className="sr-only">
              Seu melhor e-mail
            </label>
            <input
              id="newsletter-email"
              type="email"
              placeholder="Seu melhor e-mail"
              className="min-w-0 flex-1 bg-white px-4 text-[11px] text-slate-900 outline-none"
            />
            <button type="submit" className="w-[145px] bg-[#087bff] text-[10px] font-extrabold text-white">
              Inscrever
            </button>
          </form>
        </div>

        <div className="border-b border-cyan-300/10 px-[23px] py-[18px] lg:border-b-0 lg:border-r">
          <p className="text-[13px] font-extrabold text-white">
            <span className="text-cyan-300">f</span> Siga a Novidades.store
          </p>
          <p className="mt-[2px] text-[9px] text-cyan-200/82">Inspire-se. Descubra. Aproveite.</p>
          <div className="mt-[16px] flex flex-wrap gap-[7px]">
            {SOCIAL.map(([short, tone, label]) => (
              <button
                key={label}
                type="button"
                aria-label={label}
                className={`grid h-[28px] w-[28px] place-items-center rounded-full bg-gradient-to-br ${tone} text-[8px] font-black text-white shadow-sm`}
              >
                {short}
              </button>
            ))}
          </div>
        </div>

        <div className="flex items-center justify-center px-4 py-3 text-center">
          <div className="-rotate-6">
            <p className="font-editorial text-[24px] italic leading-[1.02] text-white drop-shadow-[0_0_10px_rgba(0,216,255,.35)]">
              Todo dia,
              <br />uma boa
              <br />descoberta!
            </p>
            <span className="mx-auto mt-[7px] block h-[2px] w-[88px] -rotate-[8deg] bg-cyan-300 shadow-[0_0_9px_rgba(0,216,255,.72)]" />
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
