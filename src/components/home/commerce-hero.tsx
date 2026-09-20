"use client";

import Image from "next/image";
import {
  ArrowRight,
  Headset,
  PackageCheck,
  ShieldCheck,
  ShoppingCart,
  Zap,
} from "lucide-react";
import { scrollToId } from "@/lib/scroll";
import { useUI } from "@/lib/store/ui";

export function CommerceHero() {
  const setFilter = useUI((state) => state.setFilter);

  const showOffers = () => {
    setFilter({ type: "badge", value: "oferta", label: "Ofertas Especiais" });
    scrollToId("destaques");
  };

  return (
    <section className="nv-shell pt-4 md:pt-5" aria-label="Novidades.store">
      <div className="relative min-h-[510px] overflow-hidden rounded-[26px] border border-cyan-300/20 bg-[#03152f] shadow-[0_30px_100px_rgba(0,35,90,.35)] lg:min-h-[525px]">
        <Image
          src="/images/promo/discovery.png"
          alt=""
          fill
          priority
          sizes="100vw"
          className="object-cover opacity-[.26] saturate-[1.25]"
        />
        <div
          className="absolute inset-0 bg-[radial-gradient(circle_at_69%_43%,rgba(0,171,255,.22),transparent_27%),radial-gradient(circle_at_88%_78%,rgba(255,36,62,.16),transparent_24%),linear-gradient(90deg,rgba(2,13,34,.98)_0%,rgba(3,21,49,.9)_46%,rgba(3,21,49,.6)_100%)]"
          aria-hidden="true"
        />
        <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-cyan-300/70 to-transparent nv-neon-line" />

        <div className="relative grid min-h-[510px] items-center gap-8 p-6 md:p-9 lg:min-h-[525px] lg:grid-cols-[1fr_.95fr] lg:p-11 xl:p-14">
          <div className="z-10 max-w-[650px]">
            <span className="inline-flex items-center gap-2 rounded-full border border-cyan-200/20 bg-cyan-300/8 px-3 py-1.5 text-[10px] font-black tracking-[.16em] text-cyan-200 uppercase backdrop-blur">
              <Zap className="h-3.5 w-3.5 fill-cyan-300 text-cyan-300" aria-hidden="true" />
              Todo dia, uma boa descoberta
            </span>

            <h1 className="mt-5 text-[46px] leading-[.94] font-black tracking-[-.055em] text-white sm:text-[58px] lg:text-[70px]">
              Novidades<span className="text-cyan-300">.store</span>
            </h1>
            <p className="mt-3 text-2xl font-black tracking-[-.035em] text-white md:text-3xl">
              Mais do que você procura.
            </p>
            <p className="mt-4 max-w-xl text-sm leading-6 text-white/65 md:text-[16px] md:leading-7">
              Produtos, descobertas e ofertas selecionadas para deixar o seu dia a dia mais prático, interessante e completo.
            </p>

            <div className="mt-7 flex flex-col gap-3 sm:flex-row">
              <button
                type="button"
                onClick={() => scrollToId("categorias")}
                className="inline-flex h-12 items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-[#0797ff] to-[#075bd8] px-6 text-sm font-black text-white shadow-[0_0_26px_rgba(0,157,255,.25)] transition hover:brightness-110"
              >
                Explorar a loja
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </button>
              <button
                type="button"
                onClick={showOffers}
                className="inline-flex h-12 items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-[#d9162f] to-[#ff3148] px-6 text-sm font-black text-white shadow-[0_0_24px_rgba(255,38,64,.24)] transition hover:brightness-110"
              >
                <Zap className="h-4 w-4 fill-white" aria-hidden="true" />
                Ofertas de hoje
              </button>
            </div>

            <div className="mt-8 grid max-w-2xl grid-cols-2 gap-2 sm:grid-cols-4">
              {[
                [ShieldCheck, "Compra segura"],
                [Zap, "PIX via XPAYMENTS"],
                [PackageCheck, "Entrega acompanhada"],
                [Headset, "Suporte oficial"],
              ].map(([Icon, label]) => {
                const IconComponent = Icon as typeof ShieldCheck;
                return (
                  <div key={String(label)} className="flex items-center gap-2 rounded-xl border border-white/8 bg-white/4 px-3 py-2.5 text-[10px] font-semibold text-white/70 backdrop-blur">
                    <IconComponent className="h-4 w-4 shrink-0 text-cyan-300" aria-hidden="true" />
                    <span>{String(label)}</span>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="relative hidden min-h-[410px] lg:block" aria-hidden="true">
            <div className="absolute left-1/2 top-1/2 h-[330px] w-[330px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-cyan-400/14 blur-[55px]" />
            <div className="absolute left-1/2 top-[52%] h-[82px] w-[390px] -translate-x-1/2 rounded-[50%] border border-cyan-300/50 bg-[#06214a] shadow-[0_0_65px_rgba(0,174,255,.45),inset_0_0_28px_rgba(0,216,255,.2)]" />
            <Image
              src="/brand/novidades-mark.svg"
              alt=""
              width={430}
              height={430}
              priority
              className="absolute left-1/2 top-[47%] w-[390px] -translate-x-1/2 -translate-y-1/2 drop-shadow-[0_28px_35px_rgba(0,10,35,.72)]"
            />

            <div className="absolute right-0 top-8 w-[190px] rounded-2xl border border-cyan-200/20 bg-[#05214a]/84 p-4 text-xs text-white/75 shadow-2xl backdrop-blur">
              <p className="font-black text-cyan-200">QUALIDADE</p>
              <p className="mt-2">Variedade, confiança e informação clara antes da compra.</p>
            </div>

            <div className="absolute bottom-4 right-1 flex items-center gap-3 rounded-2xl border border-red-300/25 bg-red-500/12 px-4 py-3 text-white shadow-[0_0_28px_rgba(255,38,64,.18)] backdrop-blur">
              <ShoppingCart className="h-7 w-7 text-red-300" />
              <div>
                <p className="text-[10px] font-bold tracking-[.12em] text-red-200 uppercase">Descubra</p>
                <p className="text-sm font-black">Ofertas especiais</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
