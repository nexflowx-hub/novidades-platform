import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowRight,
  BadgeCheck,
  BookOpenCheck,
  Bot,
  BrainCircuit,
  CheckCircle2,
  Dumbbell,
  Flame,
  Gauge,
  Medal,
  ShieldCheck,
  Sparkles,
  Target,
  Zap,
} from "lucide-react";

export const metadata: Metadata = {
  title: "TreinoMilitar | Conteúdo, Disciplina e Personal Trainer IA",
  description:
    "TreinoMilitar é a vertical de performance da Novidades.Store: conteúdos digitais, protocolos de treino e acompanhamento com Personal Trainer IA.",
  alternates: {
    canonical: "https://treinomilitar.novidades.store",
  },
  openGraph: {
    title: "TreinoMilitar — Disciplina que gera resultado",
    description:
      "Conteúdo premium, protocolos práticos e Personal Trainer IA para transformar consistência em evolução.",
    url: "https://treinomilitar.novidades.store",
    siteName: "TreinoMilitar by Novidades.Store",
    locale: "pt_BR",
    type: "website",
  },
};

const protocols = [
  {
    title: "Base Operacional",
    copy: "Rotinas objetivas para condicionamento, força e disciplina sem depender de academia sofisticada.",
    icon: ShieldCheck,
  },
  {
    title: "Missão 30 Dias",
    copy: "Plano progressivo com metas semanais, checkpoints e acompanhamento de execução.",
    icon: Target,
  },
  {
    title: "Performance & Foco",
    copy: "Conteúdo para organizar treino, sono, recuperação, hábitos e consistência.",
    icon: Gauge,
  },
];

const benefits = [
  "Conteúdo digital com acesso imediato",
  "Protocolos organizados por objetivo",
  "Planos ajustáveis ao nível do utilizador",
  "Personal Trainer IA disponível 24/7",
  "Histórico e acompanhamento de progresso",
  "Integração futura com Atendimento.Center",
];

export default function TreinoMilitarPage() {
  return (
    <div className="bg-[#050807] text-white">
      <section className="relative overflow-hidden border-b border-lime-300/15">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_75%_18%,rgba(132,204,22,.18),transparent_28rem),radial-gradient(circle_at_15%_70%,rgba(245,158,11,.08),transparent_24rem),linear-gradient(180deg,#07100b_0%,#050807_68%,#030504_100%)]" />
        <div className="absolute inset-0 opacity-25 [background-image:linear-gradient(rgba(163,230,53,.07)_1px,transparent_1px),linear-gradient(90deg,rgba(163,230,53,.07)_1px,transparent_1px)] [background-size:42px_42px]" />

        <div className="relative mx-auto grid min-h-[720px] w-full max-w-[1440px] items-center gap-12 px-5 py-20 lg:grid-cols-[1.08fr_.92fr] lg:px-10">
          <div>
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-lime-300/25 bg-lime-300/8 px-4 py-2 text-xs font-black uppercase tracking-[.22em] text-lime-300">
              <Medal className="h-4 w-4" />
              Novidades.Store Performance
            </div>

            <h1 className="max-w-4xl text-5xl font-black uppercase leading-[.94] tracking-[-.055em] sm:text-6xl lg:text-8xl">
              Disciplina
              <span className="block text-lime-300">que gera resultado.</span>
            </h1>

            <p className="mt-7 max-w-2xl text-base leading-7 text-white/68 sm:text-lg">
              Conteúdo premium, protocolos objetivos e acompanhamento inteligente
              para transformar intenção em execução. Um ambiente construído para
              quem quer treinar com método, constância e clareza.
            </p>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Link
                href="#conteudos"
                className="inline-flex h-13 items-center justify-center gap-2 rounded-xl bg-lime-300 px-6 text-sm font-black uppercase tracking-wide text-[#071007] transition hover:bg-lime-200"
              >
                Explorar conteúdos
                <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                href="https://treinomilitar.novidades.store/coach"
                className="inline-flex h-13 items-center justify-center gap-2 rounded-xl border border-white/15 bg-white/5 px-6 text-sm font-black uppercase tracking-wide text-white transition hover:border-lime-300/40 hover:bg-lime-300/8"
              >
                <Bot className="h-4 w-4 text-lime-300" />
                Personal Trainer IA
              </Link>
            </div>

            <div className="mt-10 grid max-w-2xl grid-cols-3 gap-3">
              <Metric value="24/7" label="IA disponível" />
              <Metric value="100%" label="digital" />
              <Metric value="1" label="plano por missão" />
            </div>
          </div>

          <div className="relative">
            <div className="absolute -inset-10 rounded-full bg-lime-300/8 blur-3xl" />
            <div className="relative overflow-hidden rounded-[32px] border border-white/10 bg-[#0b110d]/90 p-5 shadow-2xl shadow-black/50">
              <div className="rounded-[26px] border border-lime-300/15 bg-[linear-gradient(145deg,#101b13,#080d09)] p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-[11px] font-black uppercase tracking-[.24em] text-lime-300/80">
                      Missão ativa
                    </p>
                    <h2 className="mt-2 text-2xl font-black">Operação Evolução</h2>
                  </div>
                  <div className="grid h-14 w-14 place-items-center rounded-2xl border border-lime-300/20 bg-lime-300/10">
                    <Dumbbell className="h-7 w-7 text-lime-300" />
                  </div>
                </div>

                <div className="mt-8 grid gap-3">
                  <StatusRow label="Treino do dia" value="Força + Core" active />
                  <StatusRow label="Meta semanal" value="4 / 5 sessões" />
                  <StatusRow label="Consistência" value="86%" />
                  <StatusRow label="Coach IA" value="Online" active />
                </div>

                <div className="mt-6 rounded-2xl border border-white/8 bg-black/25 p-4">
                  <div className="flex items-start gap-3">
                    <BrainCircuit className="mt-1 h-5 w-5 shrink-0 text-lime-300" />
                    <div>
                      <p className="text-sm font-bold">Próxima recomendação</p>
                      <p className="mt-1 text-sm leading-6 text-white/55">
                        Ajustar volume de pernas e priorizar recuperação antes da próxima sessão intensa.
                      </p>
                    </div>
                  </div>
                </div>

                <Link
                  href="https://treinomilitar.novidades.store/coach"
                  className="mt-5 flex h-12 items-center justify-center gap-2 rounded-xl bg-white text-sm font-black text-black transition hover:bg-lime-200"
                >
                  Abrir Coach IA
                  <Sparkles className="h-4 w-4" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="conteudos" className="border-b border-white/8 bg-[#070b08] py-20">
        <div className="mx-auto w-full max-w-[1440px] px-5 lg:px-10">
          <div className="max-w-3xl">
            <p className="text-xs font-black uppercase tracking-[.26em] text-lime-300">
              Conteúdo que vira execução
            </p>
            <h2 className="mt-3 text-4xl font-black tracking-[-.04em] sm:text-5xl">
              Menos teoria solta. Mais protocolos utilizáveis.
            </h2>
            <p className="mt-5 max-w-2xl leading-7 text-white/55">
              O TreinoMilitar nasce como uma biblioteca comercial de conteúdos e
              programas práticos. Cada produto deve entregar uma missão clara,
              um plano executável e métricas de progresso.
            </p>
          </div>

          <div className="mt-10 grid gap-4 md:grid-cols-3">
            {protocols.map(({ title, copy, icon: Icon }) => (
              <article
                key={title}
                className="rounded-3xl border border-white/9 bg-white/[.035] p-6 transition hover:-translate-y-1 hover:border-lime-300/25 hover:bg-lime-300/[.045]"
              >
                <div className="grid h-12 w-12 place-items-center rounded-2xl bg-lime-300/10">
                  <Icon className="h-6 w-6 text-lime-300" />
                </div>
                <h3 className="mt-6 text-xl font-black">{title}</h3>
                <p className="mt-3 text-sm leading-6 text-white/52">{copy}</p>
                <div className="mt-6 inline-flex items-center gap-2 text-xs font-black uppercase tracking-wider text-lime-300">
                  Em preparação
                  <ArrowRight className="h-3.5 w-3.5" />
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-[#0a0f0b] py-20">
        <div className="mx-auto grid w-full max-w-[1440px] gap-10 px-5 lg:grid-cols-[.92fr_1.08fr] lg:px-10">
          <div className="rounded-[32px] border border-lime-300/15 bg-[radial-gradient(circle_at_10%_0%,rgba(163,230,53,.11),transparent_19rem),#0c130e] p-7 sm:p-9">
            <div className="inline-flex items-center gap-2 text-lime-300">
              <Bot className="h-5 w-5" />
              <span className="text-xs font-black uppercase tracking-[.22em]">
                Personal Trainer IA
              </span>
            </div>
            <h2 className="mt-5 text-4xl font-black tracking-[-.045em]">
              Um coach conversacional para transformar dados em decisões.
            </h2>
            <p className="mt-5 leading-7 text-white/58">
              O utilizador informa objetivo, disponibilidade, nível, equipamento e
              feedback. A IA devolve orientação contextual e acompanha evolução ao
              longo do tempo.
            </p>

            <Link
              href="https://treinomilitar.novidades.store/coach"
              className="mt-8 inline-flex h-12 items-center gap-2 rounded-xl bg-lime-300 px-5 text-sm font-black text-[#071007]"
            >
              Conhecer o Coach IA
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>

          <div className="grid content-center gap-3 sm:grid-cols-2">
            {benefits.map((benefit) => (
              <div
                key={benefit}
                className="flex items-start gap-3 rounded-2xl border border-white/8 bg-white/[.025] p-4"
              >
                <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-lime-300" />
                <span className="text-sm leading-6 text-white/65">{benefit}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="border-t border-white/8 bg-[#040605] py-16">
        <div className="mx-auto flex w-full max-w-[1200px] flex-col items-center px-5 text-center">
          <Flame className="h-8 w-8 text-lime-300" />
          <h2 className="mt-5 text-3xl font-black sm:text-4xl">
            A primeira missão é começar.
          </h2>
          <p className="mt-4 max-w-2xl text-sm leading-7 text-white/50">
            TreinoMilitar combina conteúdo, venda digital e inteligência
            conversacional dentro do ecossistema Novidades.Store.
          </p>
          <div className="mt-7 flex flex-col gap-3 sm:flex-row">
            <Link
              href="/conteudos-digitais"
              className="inline-flex h-12 items-center gap-2 rounded-xl border border-white/12 px-5 text-sm font-bold"
            >
              <BookOpenCheck className="h-4 w-4 text-lime-300" />
              Ver Academia Digital
            </Link>
            <Link
              href="https://treinomilitar.novidades.store/coach"
              className="inline-flex h-12 items-center gap-2 rounded-xl bg-lime-300 px-5 text-sm font-black text-[#071007]"
            >
              <Zap className="h-4 w-4" />
              Personal Trainer IA
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}

function Metric({ value, label }: { value: string; label: string }) {
  return (
    <div className="rounded-2xl border border-white/9 bg-white/[.035] px-4 py-3">
      <p className="text-lg font-black text-lime-300">{value}</p>
      <p className="mt-1 text-[10px] font-bold uppercase tracking-wider text-white/38">
        {label}
      </p>
    </div>
  );
}

function StatusRow({
  label,
  value,
  active = false,
}: {
  label: string;
  value: string;
  active?: boolean;
}) {
  return (
    <div className="flex items-center justify-between rounded-xl border border-white/8 bg-white/[.035] px-4 py-3">
      <span className="text-xs font-semibold text-white/45">{label}</span>
      <span className="inline-flex items-center gap-2 text-sm font-black">
        {active ? <BadgeCheck className="h-4 w-4 text-lime-300" /> : null}
        {value}
      </span>
    </div>
  );
}
