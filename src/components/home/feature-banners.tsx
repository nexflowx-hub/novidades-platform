import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Bot, Code2, Cpu, GraduationCap, Sparkles } from "lucide-react";

export function FeatureBanners() {
  return (
    <section className="nv-shell pb-8 pt-3 md:pb-10" aria-label="Universos em destaque">
      <div className="grid gap-4 lg:grid-cols-2">
        <Link
          href="/conteudos-digitais"
          className="group relative min-h-[255px] overflow-hidden rounded-[22px] border border-cyan-300/25 bg-[radial-gradient(circle_at_82%_18%,rgba(0,216,255,.28),transparent_34%),linear-gradient(135deg,#04152f,#07275a_58%,#031126)] p-6 text-white shadow-[0_20px_70px_rgba(0,117,255,.16)] md:p-8"
        >
          <div className="absolute right-5 top-5 flex gap-2 opacity-80">
            {[Cpu, Bot, Code2].map((Icon, index) => (
              <span key={index} className="grid h-11 w-11 place-items-center rounded-xl border border-cyan-200/20 bg-white/5 backdrop-blur">
                <Icon className="h-5 w-5 text-cyan-200" aria-hidden="true" />
              </span>
            ))}
          </div>
          <span className="inline-flex items-center gap-2 rounded-full border border-cyan-200/20 bg-cyan-300/10 px-3 py-1.5 text-[10px] font-extrabold tracking-[.14em] text-cyan-200 uppercase">
            <GraduationCap className="h-4 w-4" aria-hidden="true" />
            Academia Digital
          </span>
          <h2 className="mt-6 max-w-md text-3xl font-black tracking-[-.04em] md:text-4xl">
            Software, IA e soluções para o mercado digital.
          </h2>
          <p className="mt-3 max-w-xl text-sm leading-6 text-white/65">
            Produtos digitais, ferramentas, sistemas, templates e recursos práticos para criar, operar e crescer online.
          </p>
          <span className="mt-7 inline-flex items-center gap-2 text-sm font-extrabold text-cyan-200">
            Explorar Academia Digital
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" aria-hidden="true" />
          </span>
        </Link>

        <a
          href="https://signum312.novidades.store"
          className="group relative min-h-[255px] overflow-hidden rounded-[22px] border border-amber-300/25 bg-[radial-gradient(circle_at_78%_25%,rgba(245,184,45,.22),transparent_32%),linear-gradient(135deg,#1a0909,#431018_55%,#120508)] p-6 text-white shadow-[0_20px_70px_rgba(180,30,40,.16)] md:p-8"
        >
          <Image
            src="/images/products/signum-gold-real.webp"
            alt="SIGNUM 312"
            width={260}
            height={356}
            className="absolute -right-2 bottom-[-65px] hidden w-[210px] rotate-[7deg] rounded-2xl opacity-90 shadow-2xl sm:block"
          />
          <span className="inline-flex items-center gap-2 rounded-full border border-amber-200/20 bg-amber-300/10 px-3 py-1.5 text-[10px] font-extrabold tracking-[.14em] text-amber-200 uppercase">
            <Sparkles className="h-4 w-4" aria-hidden="true" />
            Coleção especial
          </span>
          <h2 className="mt-6 text-4xl font-black tracking-[-.045em] text-amber-100">SIGNUM 312</h2>
          <p className="mt-2 text-lg font-semibold text-amber-200">Mais que um acessório. Um símbolo.</p>
          <p className="mt-3 max-w-sm text-sm leading-6 text-white/65">
            Fé, coragem e propósito em uma coleção inspirada em simbolismo histórico.
          </p>
          <span className="mt-7 inline-flex items-center gap-2 rounded-xl bg-amber-300 px-5 py-3 text-sm font-black text-[#221005]">
            Descobrir a coleção
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" aria-hidden="true" />
          </span>
        </a>
      </div>
    </section>
  );
}
