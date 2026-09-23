import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, Bot, BrainCircuit, ShieldAlert } from "lucide-react";

export const metadata: Metadata = {
  title: "Personal Trainer IA | TreinoMilitar",
  description:
    "Ambiente conversacional do Personal Trainer IA do TreinoMilitar.",
  robots: { index: false, follow: false },
};

export default function TreinoMilitarCoachPage() {
  return (
    <div className="min-h-[760px] bg-[#050807] px-4 py-8 text-white sm:px-6">
      <div className="mx-auto w-full max-w-[1200px]">
        <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
          <div>
            <Link
              href="https://treinomilitar.novidades.store"
              className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-white/45 hover:text-lime-300"
            >
              <ArrowLeft className="h-4 w-4" />
              TreinoMilitar
            </Link>
            <h1 className="mt-3 flex items-center gap-3 text-3xl font-black tracking-[-.04em]">
              <BrainCircuit className="h-7 w-7 text-lime-300" />
              Personal Trainer IA
            </h1>
          </div>

          <div className="inline-flex items-center gap-2 rounded-full border border-lime-300/20 bg-lime-300/8 px-4 py-2 text-xs font-black uppercase tracking-wider text-lime-300">
            <Bot className="h-4 w-4" />
            Coach conversacional
          </div>
        </div>

        <div className="mb-5 flex items-start gap-3 rounded-2xl border border-amber-300/15 bg-amber-300/[.055] p-4 text-sm leading-6 text-amber-50/70">
          <ShieldAlert className="mt-0.5 h-5 w-5 shrink-0 text-amber-300" />
          <p>
            Este assistente é destinado a orientação geral de treino e hábitos.
            Não substitui avaliação médica, fisioterapêutica ou acompanhamento
            profissional quando houver dor, lesão, condição clínica ou limitação
            relevante.
          </p>
        </div>

        <div className="overflow-hidden rounded-[28px] border border-white/10 bg-[#0a100c] shadow-2xl shadow-black/40">
          <iframe
            title="Personal Trainer IA TreinoMilitar"
            src="https://bot.atendimento.center/treinomilitar-coach"
            className="h-[720px] w-full border-0 bg-white"
            allow="microphone; camera"
          />
        </div>
      </div>
    </div>
  );
}
