import Link from "next/link";
import {
  ArrowRight,
  CheckCircle2,
  Mail,
  MapPin,
  Phone,
  ShieldCheck,
  Sparkles,
} from "lucide-react";
import type { CSSProperties } from "react";
import type { SiteModel } from "@/lib/site-templates/profiles";
import { SiteLeadForm } from "@/components/sites/site-lead-form";

type Vars = CSSProperties & {
  "--site-bg": string;
  "--site-surface": string;
  "--site-text": string;
  "--site-primary": string;
  "--site-secondary": string;
  "--site-accent": string;
};

function HeroArtwork({ variant }: { variant: number }) {
  const shapes = Array.from({ length: 6 }, (_, index) => index);
  return (
    <div className="relative h-[360px] min-h-[360px] overflow-hidden rounded-[32px] border border-white/10 bg-white/[0.045] shadow-2xl md:h-[520px]">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_35%_28%,color-mix(in_srgb,var(--site-primary)_42%,transparent),transparent_24rem),radial-gradient(circle_at_78%_72%,color-mix(in_srgb,var(--site-secondary)_34%,transparent),transparent_22rem)]" />
      {shapes.map((shape) => (
        <div
          key={shape}
          className="absolute rounded-[28px] border border-white/10 bg-white/[0.055] backdrop-blur-sm"
          style={{
            width: 110 + ((shape * 37 + variant * 29) % 190),
            height: 80 + ((shape * 43 + variant * 17) % 170),
            left: `${8 + ((shape * 17 + variant * 9) % 58)}%`,
            top: `${7 + ((shape * 23 + variant * 13) % 66)}%`,
            transform: `rotate(${((shape * 9 + variant * 7) % 28) - 14}deg)`,
          }}
        />
      ))}
      <div className="absolute left-[12%] top-[14%] w-[76%] rounded-[28px] border border-white/15 bg-black/15 p-5 shadow-2xl backdrop-blur-xl">
        <div className="flex items-center gap-2">
          <span className="h-2.5 w-2.5 rounded-full bg-[var(--site-primary)]" />
          <span className="h-2.5 w-2.5 rounded-full bg-white/25" />
          <span className="h-2.5 w-2.5 rounded-full bg-white/25" />
        </div>
        <div className="mt-5 grid gap-3">
          <div className="h-3 w-2/3 rounded-full bg-white/80" />
          <div className="h-2.5 w-full rounded-full bg-white/15" />
          <div className="h-2.5 w-5/6 rounded-full bg-white/15" />
          <div className="mt-3 grid grid-cols-2 gap-3">
            <div className="h-24 rounded-2xl bg-[color-mix(in_srgb,var(--site-primary)_26%,transparent)]" />
            <div className="h-24 rounded-2xl bg-[color-mix(in_srgb,var(--site-secondary)_22%,transparent)]" />
          </div>
        </div>
      </div>
      <div className="absolute bottom-[8%] right-[8%] rounded-full border border-white/15 bg-[var(--site-primary)] px-4 py-2 text-xs font-black text-slate-950 shadow-xl">
        EXPERIÊNCIA DIGITAL
      </div>
    </div>
  );
}

export function SiteRenderer({ site }: { site: SiteModel }) {
  const vars: Vars = {
    "--site-bg": site.palette.bg,
    "--site-surface": site.palette.surface,
    "--site-text": site.palette.text,
    "--site-primary": site.palette.primary,
    "--site-secondary": site.palette.secondary,
    "--site-accent": site.palette.accent,
  };

  return (
    <div
      className="partner-site-root min-h-screen bg-[var(--site-bg)] text-[var(--site-text)]"
      style={vars}
    >
      <header className="sticky top-0 z-50 border-b border-white/10 bg-[color-mix(in_srgb,var(--site-bg)_88%,transparent)] backdrop-blur-xl">
        <div className="mx-auto flex h-20 w-full max-w-7xl items-center gap-5 px-5 lg:px-8">
          <Link href={`/site/${site.slug}`} className="flex min-w-0 items-center gap-3">
            <span className="grid h-10 w-10 shrink-0 place-items-center rounded-2xl bg-[var(--site-primary)] text-sm font-black text-slate-950">
              {site.company.slice(0, 1)}
            </span>
            <span className="truncate text-base font-black tracking-[-.03em]">{site.company}</span>
          </Link>
          <nav className="ml-auto hidden items-center gap-7 text-xs font-bold text-[color-mix(in_srgb,var(--site-text)_72%,transparent)] md:flex">
            <a href="#servicos" className="transition hover:text-[var(--site-primary)]">Soluções</a>
            <a href="#sobre" className="transition hover:text-[var(--site-primary)]">Sobre</a>
            <a href="#processo" className="transition hover:text-[var(--site-primary)]">Como funciona</a>
            <a href="#contato" className="transition hover:text-[var(--site-primary)]">Contato</a>
          </nav>
          <a
            href="#contato"
            className="inline-flex min-h-10 shrink-0 items-center justify-center rounded-full bg-[var(--site-primary)] px-4 text-xs font-black text-slate-950"
          >
            {site.primaryCta}
          </a>
        </div>
      </header>

      <main>
        <section className="relative overflow-hidden px-5 pb-16 pt-16 md:pb-24 md:pt-24 lg:px-8">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_15%_10%,color-mix(in_srgb,var(--site-primary)_18%,transparent),transparent_30rem),radial-gradient(circle_at_90%_55%,color-mix(in_srgb,var(--site-secondary)_18%,transparent),transparent_28rem)]" />
          <div className="relative mx-auto grid w-full max-w-7xl gap-12 lg:grid-cols-[1.02fr_.98fr] lg:items-center">
            <div>
              <p className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.05] px-3 py-2 text-[10px] font-black uppercase tracking-[.18em] text-[var(--site-primary)]">
                <Sparkles className="h-3.5 w-3.5" />
                {site.eyebrow}
              </p>
              <h1 className="mt-6 max-w-4xl text-5xl font-black leading-[.94] tracking-[-.055em] md:text-7xl">
                {site.headline}
              </h1>
              <p className="mt-6 max-w-2xl text-base leading-8 text-[color-mix(in_srgb,var(--site-text)_68%,transparent)] md:text-lg">
                {site.subheadline}
              </p>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <a
                  href="#contato"
                  className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-[var(--site-primary)] px-6 text-sm font-black text-slate-950 shadow-lg"
                >
                  {site.primaryCta}
                  <ArrowRight className="h-4 w-4" />
                </a>
                <a
                  href="#servicos"
                  className="inline-flex min-h-12 items-center justify-center rounded-full border border-white/15 bg-white/[0.04] px-6 text-sm font-black"
                >
                  {site.secondaryCta}
                </a>
              </div>
              <div className="mt-10 grid max-w-xl grid-cols-3 gap-3">
                {site.stats.map((stat) => (
                  <div key={stat.label} className="rounded-2xl border border-white/10 bg-white/[0.045] p-4">
                    <strong className="block text-xl font-black text-[var(--site-primary)]">{stat.value}</strong>
                    <span className="mt-1 block text-[10px] leading-4 text-[color-mix(in_srgb,var(--site-text)_58%,transparent)]">{stat.label}</span>
                  </div>
                ))}
              </div>
            </div>
            <HeroArtwork variant={site.variant} />
          </div>
        </section>

        <section id="servicos" className="border-y border-white/10 bg-[var(--site-surface)] px-5 py-20 lg:px-8">
          <div className="mx-auto w-full max-w-7xl">
            <div className="max-w-3xl">
              <p className="text-[10px] font-black uppercase tracking-[.2em] text-[var(--site-primary)]">O que fazemos</p>
              <h2 className="mt-3 text-4xl font-black tracking-[-.045em] md:text-5xl">Soluções organizadas para facilitar a próxima decisão.</h2>
            </div>
            <div className="mt-10 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
              {site.services.map((service, index) => (
                <article key={service} className="group rounded-[26px] border border-white/10 bg-white/[0.035] p-6 transition hover:-translate-y-1 hover:border-[var(--site-primary)]">
                  <span className="grid h-10 w-10 place-items-center rounded-2xl bg-[color-mix(in_srgb,var(--site-primary)_18%,transparent)] text-sm font-black text-[var(--site-primary)]">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <h3 className="mt-5 text-lg font-black">{service}</h3>
                  <p className="mt-3 text-sm leading-6 text-[color-mix(in_srgb,var(--site-text)_62%,transparent)]">
                    Atendimento estruturado, comunicação simples e um caminho claro do primeiro contacto ao próximo passo.
                  </p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section id="sobre" className="px-5 py-20 lg:px-8">
          <div className="mx-auto grid w-full max-w-7xl gap-10 lg:grid-cols-2 lg:items-center">
            <div className="rounded-[32px] border border-white/10 bg-[linear-gradient(145deg,color-mix(in_srgb,var(--site-primary)_16%,transparent),color-mix(in_srgb,var(--site-secondary)_10%,transparent))] p-8 md:p-12">
              <ShieldCheck className="h-10 w-10 text-[var(--site-primary)]" />
              <h2 className="mt-6 text-4xl font-black tracking-[-.045em]">Atendimento começa com contexto.</h2>
              <p className="mt-4 text-sm leading-7 text-[color-mix(in_srgb,var(--site-text)_66%,transparent)]">
                Cada projeto é apresentado com informação objetiva, serviços bem definidos e canais de contacto visíveis. A experiência foi desenhada para reduzir fricção e tornar o próximo passo previsível.
              </p>
            </div>
            <div className="grid gap-4">
              {["Entender a necessidade","Definir a melhor solução","Executar com acompanhamento","Revisar o próximo passo"].map((item,index)=>(
                <div key={item} className="flex gap-4 rounded-2xl border border-white/10 bg-white/[0.03] p-5">
                  <span className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-[var(--site-primary)] text-xs font-black text-slate-950">{index+1}</span>
                  <div>
                    <h3 className="font-black">{item}</h3>
                    <p className="mt-1 text-xs leading-5 text-[color-mix(in_srgb,var(--site-text)_60%,transparent)]">
                      Processo simples, visível e adaptado ao contexto apresentado.
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section id="processo" className="bg-[var(--site-surface)] px-5 py-20 lg:px-8">
          <div className="mx-auto w-full max-w-7xl">
            <div className="grid gap-8 lg:grid-cols-[.8fr_1.2fr] lg:items-end">
              <div>
                <p className="text-[10px] font-black uppercase tracking-[.2em] text-[var(--site-primary)]">Como funciona</p>
                <h2 className="mt-3 text-4xl font-black tracking-[-.045em]">Do contacto à entrega, sem labirinto.</h2>
              </div>
              <p className="text-sm leading-7 text-[color-mix(in_srgb,var(--site-text)_62%,transparent)]">
                O fluxo pode ser adaptado para orçamento, reserva, consulta, venda, serviço ou projeto. A estrutura visual permanece consistente enquanto o conteúdo muda de acordo com o setor.
              </p>
            </div>
            <div className="mt-9 grid gap-3 md:grid-cols-4">
              {["Contato","Diagnóstico","Execução","Acompanhamento"].map((item,index)=>(
                <div key={item} className="rounded-2xl border border-white/10 p-5">
                  <span className="text-[10px] font-black text-[var(--site-primary)]">ETAPA {index+1}</span>
                  <h3 className="mt-2 font-black">{item}</h3>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section id="contato" className="px-5 py-20 lg:px-8">
          <div className="mx-auto grid w-full max-w-7xl overflow-hidden rounded-[34px] border border-white/10 bg-[linear-gradient(135deg,color-mix(in_srgb,var(--site-primary)_20%,var(--site-surface)),var(--site-surface))] lg:grid-cols-[1fr_.85fr]">
            <div className="p-8 md:p-12">
              <p className="text-[10px] font-black uppercase tracking-[.2em] text-[var(--site-primary)]">Vamos conversar</p>
              <h2 className="mt-3 text-4xl font-black tracking-[-.045em]">Conte o que você precisa.</h2>
              <p className="mt-4 max-w-xl text-sm leading-7 text-[color-mix(in_srgb,var(--site-text)_66%,transparent)]">
                Use os canais abaixo para iniciar o atendimento. Esta estrutura pode receber formulário, WhatsApp, agenda, checkout ou CRM conforme a operação.
              </p>
              <div className="mt-7 grid gap-3 text-sm">
                <p className="flex items-center gap-3"><Phone className="h-4 w-4 text-[var(--site-primary)]" /> {site.phone}</p>
                <p className="flex items-center gap-3"><Mail className="h-4 w-4 text-[var(--site-primary)]" /> {site.email}</p>
                <p className="flex items-center gap-3"><MapPin className="h-4 w-4 text-[var(--site-primary)]" /> {site.city}</p>
              </div>
            </div>
            <div className="border-t border-white/10 bg-black/10 p-8 lg:border-l lg:border-t-0">
              <SiteLeadForm slug={site.slug} />
            </div>
          </div>
        </section>
      </main>

      <footer className="border-t border-white/10 px-5 py-8 text-[10px] text-[color-mix(in_srgb,var(--site-text)_45%,transparent)] lg:px-8">
        <div className="mx-auto flex w-full max-w-7xl flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <p>© {new Date().getFullYear()} {site.company}. Projeto de apresentação com conteúdo ilustrativo.</p>
          <div className="flex flex-wrap gap-4">
            <a href="#servicos">Soluções</a>
            <a href="#contato">Contato</a>
            <Link href="/site">Coleção Sites</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
