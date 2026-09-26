"use client";

import { useMemo, useRef, useState } from "react";
import Link from "next/link";
import {
  ArrowRight,
  BadgeCheck,
  BookOpen,
  Check,
  ChevronLeft,
  Heart,
  Layers3,
  LockKeyhole,
  MessageCircleHeart,
  RefreshCcw,
  ShieldCheck,
  Sparkles,
  Target,
} from "lucide-react";
import { EbookCheckout } from "@/components/ebooks/ebook-checkout";
import { getEbook, type EbookItem } from "@/lib/ebooks";

type Track = "dating" | "couple" | "romance" | "breakup";
type Answer = {
  label: string;
  weights: Partial<Record<Track, number>>;
  microcopy: string;
};
type Question = {
  eyebrow: string;
  title: string;
  text: string;
  answers: Answer[];
};

const TRACK_TO_SLUG: Record<Track, string> = {
  dating: "encontros-com-confianca",
  couple: "reavivar-o-romance",
  romance: "romance-intencional",
  breakup: "recomecar-depois-do-fim",
};

const TRACK_LABEL: Record<Track, string> = {
  dating: "Encontros & confiança",
  couple: "Conexão no relacionamento",
  romance: "Romance & experiências",
  breakup: "Recomeços & clareza",
};

const TRACK_REASON: Record<Track, string> = {
  dating:
    "As suas respostas apontam para confiança social, conversas naturais e encontros sem jogos.",
  couple:
    "As suas respostas apontam para reconexão, comunicação e pequenos hábitos que aproximam.",
  romance:
    "As suas respostas apontam para criatividade, presença e experiências românticas com significado.",
  breakup:
    "As suas respostas apontam para clareza pós-término, limites e decisões sem manipulação.",
};

const UPSELL_COPY: Record<Track, string> = {
  dating: "Amplie a parte prática de conhecer pessoas e conduzir encontros com naturalidade.",
  couple: "Aprofunde comunicação, atenção diária e reconexão quando a relação entra no automático.",
  romance: "Adicione ideias concretas para transformar intenção em momentos memoráveis.",
  breakup: "Tenha um roteiro de clareza para limites, reconexão mútua ou seguir em frente.",
};

const QUESTIONS: Question[] = [
  {
    eyebrow: "Pergunta 1 de 4",
    title: "Qual descreve melhor o seu momento agora?",
    text: "Escolha o cenário que mais se aproxima da sua realidade atual.",
    answers: [
      {
        label: "Quero conhecer alguém e sentir-me mais confiante em encontros.",
        weights: { dating: 5, romance: 1 },
        microcopy: "Conhecer pessoas, conversar melhor e lidar com rejeição.",
      },
      {
        label: "Estou numa relação e quero recuperar proximidade e conexão.",
        weights: { couple: 5, romance: 2 },
        microcopy: "Comunicação, atenção e hábitos que aproximam.",
      },
      {
        label: "Quero trazer mais romance, criatividade e experiências a dois.",
        weights: { romance: 5, couple: 2 },
        microcopy: "Ideias modernas, presença e momentos especiais.",
      },
      {
        label: "Estou a lidar com um término ou pensando numa reconexão.",
        weights: { breakup: 5, couple: 1 },
        microcopy: "Clareza, limites e recomeço sem jogos.",
      },
    ],
  },
  {
    eyebrow: "Pergunta 2 de 4",
    title: "O que mais trava o próximo passo?",
    text: "Não existe resposta certa. Use o que pesa mais hoje.",
    answers: [
      {
        label: "Insegurança para iniciar conversas ou convidar alguém para sair.",
        weights: { dating: 4 },
        microcopy: "Quero agir com mais naturalidade e menos ansiedade social.",
      },
      {
        label: "Rotina, distância emocional ou conversas que viraram logística.",
        weights: { couple: 4, romance: 1 },
        microcopy: "Quero voltar a sentir parceria e presença.",
      },
      {
        label: "Falta de ideias para demonstrar carinho sem cair em clichês.",
        weights: { romance: 4, couple: 1 },
        microcopy: "Quero criar momentos que combinem com a pessoa real.",
      },
      {
        label: "Saudade, impulso de contactar ou dúvida entre voltar e seguir.",
        weights: { breakup: 4 },
        microcopy: "Quero decidir com mais clareza e respeito pelos limites.",
      },
    ],
  },
  {
    eyebrow: "Pergunta 3 de 4",
    title: "Qual resultado faria mais diferença nas próximas semanas?",
    text: "Escolha o benefício mais concreto para o seu momento.",
    answers: [
      {
        label: "Ter um roteiro simples para conhecer pessoas e marcar bons encontros.",
        weights: { dating: 3, romance: 1 },
        microcopy: "Quero passos aplicáveis, sem scripts de sedução.",
      },
      {
        label: "Criar uma rotina pequena de reconexão que seja sustentável.",
        weights: { couple: 3 },
        microcopy: "Quero menos teoria e mais hábitos repetíveis.",
      },
      {
        label: "Ter ideias prontas por orçamento para surpreender com intenção.",
        weights: { romance: 3 },
        microcopy: "Quero experiências que caibam na vida real.",
      },
      {
        label: "Organizar emoções e decidir se existe base real para recomeçar.",
        weights: { breakup: 3 },
        microcopy: "Quero critérios, não promessas de 'recuperar' alguém.",
      },
    ],
  },
  {
    eyebrow: "Pergunta 4 de 4",
    title: "Que tipo de guia você tende a colocar em prática?",
    text: "A resposta ajuda a desempatar a recomendação sem tentar 'diagnosticar' você.",
    answers: [
      {
        label: "Desafios sociais, exemplos de conversa e decisões de encontro.",
        weights: { dating: 2 },
        microcopy: "Aprendo melhor experimentando situações reais.",
      },
      {
        label: "Conversas guiadas, pequenos rituais e hábitos de casal.",
        weights: { couple: 2 },
        microcopy: "Prefiro mudanças pequenas e consistentes.",
      },
      {
        label: "Listas de ideias, experiências e planos criativos.",
        weights: { romance: 2 },
        microcopy: "Gosto de inspiração prática e visual.",
      },
      {
        label: "Perguntas de reflexão, limites e critérios para decidir.",
        weights: { breakup: 2 },
        microcopy: "Quero organizar o pensamento antes de agir.",
      },
    ],
  },
];

function money(value: number) {
  return new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
  }).format(value);
}

function productFor(track: Track) {
  return getEbook(TRACK_TO_SLUG[track]);
}

function trackForSlug(slug: string): Track | undefined {
  return (Object.entries(TRACK_TO_SLUG) as [Track, string][])
    .find(([, value]) => value === slug)?.[0];
}

function Cover({ item, compact = false }: { item: EbookItem; compact?: boolean }) {
  return (
    <div
      className={`relative overflow-hidden rounded-[22px] bg-gradient-to-br ${item.coverTone} text-white shadow-[0_22px_60px_rgba(15,23,42,.2)] ${compact ? "aspect-[4/5]" : "aspect-[4/5] min-h-[420px]"}`}
    >
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_10%,rgba(255,255,255,.24),transparent_28%),linear-gradient(to_top,rgba(2,6,23,.92),rgba(2,6,23,.08))]" />
      <div className="absolute left-6 top-6 rounded-full border border-white/20 bg-black/15 px-3 py-1.5 text-[9px] font-black uppercase tracking-[0.16em] backdrop-blur">
        Edição 2026
      </div>
      <div className="absolute inset-x-0 bottom-0 p-6">
        <p className="text-[10px] font-black uppercase tracking-[0.18em] text-white/60">
          Novidades · Relacionamentos
        </p>
        <p className={`mt-3 font-black leading-[.96] tracking-[-0.05em] ${compact ? "text-2xl" : "text-4xl"}`}>
          {item.title}
        </p>
        {!compact ? (
          <p className="mt-4 max-w-[90%] text-sm leading-6 text-white/75">
            {item.subtitle}
          </p>
        ) : null}
      </div>
    </div>
  );
}

export function RelationshipFunnel() {
  const quizRef = useRef<HTMLDivElement>(null);
  const [started, setStarted] = useState(false);
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<number[]>([]);
  const [selectedSlug, setSelectedSlug] = useState<string | null>(null);

  const pack = getEbook("pack-relacionamentos-modernos");

  const scored = useMemo(() => {
    const scores: Record<Track, number> = {
      dating: 0,
      couple: 0,
      romance: 0,
      breakup: 0,
    };

    answers.forEach((answerIndex, questionIndex) => {
      const answer = QUESTIONS[questionIndex]?.answers[answerIndex];
      if (!answer) return;
      (Object.entries(answer.weights) as [Track, number][]).forEach(([track, weight]) => {
        scores[track] += weight;
      });
    });

    return (Object.entries(scores) as [Track, number][])
      .sort((a, b) => b[1] - a[1])
      .map(([track, score]) => ({ track, score, item: productFor(track) }))
      .filter((entry): entry is { track: Track; score: number; item: EbookItem } => Boolean(entry.item));
  }, [answers]);

  const completed = answers.length === QUESTIONS.length;
  const recommended = completed ? scored[0]?.item : undefined;
  const recommendedTrack = recommended ? trackForSlug(recommended.slug) : undefined;
  const purchase = selectedSlug ? getEbook(selectedSlug) : recommended;

  const packSavings =
    pack && recommended
      ? ["reavivar-o-romance", "encontros-com-confianca", "romance-intencional", "recomecar-depois-do-fim"]
          .map((slug) => getEbook(slug)?.price ?? 0)
          .reduce((sum, price) => sum + price, 0) - pack.price
      : 0;

  function beginQuiz() {
    setStarted(true);
    setStep(0);
    setAnswers([]);
    setSelectedSlug(null);
    requestAnimationFrame(() => quizRef.current?.scrollIntoView({ behavior: "smooth", block: "start" }));
  }

  function choose(index: number) {
    const next = [...answers.slice(0, step), index];
    setAnswers(next);
    if (step < QUESTIONS.length - 1) {
      setStep((current) => current + 1);
    } else {
      setSelectedSlug(null);
    }
  }

  function back() {
    if (step === 0) return;
    setAnswers((current) => current.slice(0, -1));
    setStep((current) => current - 1);
    setSelectedSlug(null);
  }

  function restart() {
    setAnswers([]);
    setStep(0);
    setSelectedSlug(null);
    setStarted(true);
  }

  return (
    <main className="min-h-screen bg-[#f6f2ed] text-[#191919]">
      <section className="overflow-hidden bg-[#151211] text-white">
        <div className="mx-auto grid max-w-[1240px] gap-12 px-4 py-14 md:px-6 md:py-20 lg:grid-cols-[1.08fr_.92fr] lg:px-8 lg:py-24">
          <div>
            <div className="flex flex-wrap gap-2">
              <span className="rounded-full border border-rose-200/20 bg-white/5 px-3 py-1.5 text-[10px] font-black uppercase tracking-[0.16em] text-rose-200">
                Coleção Relacionamentos 2026
              </span>
              <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-[10px] font-bold uppercase tracking-[0.14em] text-white/65">
                4 caminhos · 1 quiz
              </span>
            </div>

            <h1 className="mt-7 max-w-4xl text-5xl font-black leading-[.94] tracking-[-0.06em] md:text-7xl">
              Não compre o guia errado para o momento que você está vivendo.
            </h1>
            <p className="mt-6 max-w-2xl text-base leading-8 text-white/70 md:text-lg">
              Responda quatro perguntas e descubra por onde começar entre encontros,
              reconexão, romance e recomeços. Sem “técnicas secretas”, sem leitura de mente
              e sem promessas de controlar outra pessoa.
            </p>

            <div className="mt-8 flex flex-wrap gap-3">
              <button
                type="button"
                onClick={beginQuiz}
                className="inline-flex h-14 items-center gap-2 rounded-2xl bg-[#f1b7c0] px-6 text-sm font-black text-[#201214] transition hover:scale-[1.02]"
              >
                Descobrir meu guia
                <ArrowRight className="h-4 w-4" />
              </button>
              <a
                href="#metodo"
                className="inline-flex h-14 items-center rounded-2xl border border-white/15 bg-white/5 px-6 text-sm font-bold text-white"
              >
                Ver como funciona
              </a>
            </div>

            <div className="mt-9 grid max-w-3xl gap-3 sm:grid-cols-3">
              {[
                ["90 segundos", "Quiz curto, sem cadastro"],
                ["100% privado", "Respostas ficam nesta sessão"],
                ["Compra única", "Sem assinatura escondida"],
              ].map(([title, text]) => (
                <div key={title} className="rounded-2xl border border-white/10 bg-white/[.04] p-4">
                  <p className="text-sm font-black">{title}</p>
                  <p className="mt-1 text-xs leading-5 text-white/50">{text}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="relative min-h-[470px]">
            <div className="absolute left-[8%] top-[8%] w-[54%] -rotate-6">
              {productFor("dating") ? <Cover item={productFor("dating")!} compact /> : null}
            </div>
            <div className="absolute right-[5%] top-[2%] w-[52%] rotate-6">
              {productFor("couple") ? <Cover item={productFor("couple")!} compact /> : null}
            </div>
            <div className="absolute bottom-[1%] left-[20%] w-[54%] rotate-2">
              {productFor("romance") ? <Cover item={productFor("romance")!} compact /> : null}
            </div>
            <div className="absolute bottom-[5%] right-0 w-[46%] -rotate-3 opacity-90">
              {productFor("breakup") ? <Cover item={productFor("breakup")!} compact /> : null}
            </div>
          </div>
        </div>
      </section>

      <section id="metodo" className="border-b border-[#e6ddd5] bg-white">
        <div className="mx-auto grid max-w-[1240px] gap-4 px-4 py-8 md:grid-cols-3 md:px-6 lg:px-8">
          {[
            [Target, "1. Contexto", "Você diz em que fase está e qual resultado procura agora."],
            [Sparkles, "2. Match editorial", "O quiz cruza as respostas com o foco real de cada edição."],
            [Layers3, "3. Escolha", "Comece pelo guia recomendado ou faça upgrade para a coleção completa."],
          ].map(([Icon, title, text]) => {
            const IconComponent = Icon as typeof Target;
            return (
              <div key={String(title)} className="flex gap-4 rounded-2xl bg-[#faf7f4] p-5">
                <div className="grid h-11 w-11 shrink-0 place-items-center rounded-2xl bg-[#201817] text-[#f3c0c7]">
                  <IconComponent className="h-5 w-5" />
                </div>
                <div>
                  <p className="font-black">{String(title)}</p>
                  <p className="mt-1 text-sm leading-6 text-[#6e625d]">{String(text)}</p>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      <section ref={quizRef} id="quiz" className="scroll-mt-4 px-4 py-12 md:px-6 md:py-16">
        <div className="mx-auto max-w-[1040px]">
          {!started ? (
            <div className="grid overflow-hidden rounded-[32px] border border-[#e4d8cf] bg-white shadow-[0_30px_80px_rgba(61,43,34,.10)] lg:grid-cols-[.85fr_1.15fr]">
              <div className="bg-[#241b19] p-8 text-white md:p-10">
                <MessageCircleHeart className="h-9 w-9 text-[#efb2bc]" />
                <p className="mt-8 text-xs font-black uppercase tracking-[0.16em] text-[#efb2bc]">
                  Quiz editorial
                </p>
                <h2 className="mt-3 text-4xl font-black leading-tight tracking-[-0.045em]">
                  Qual guia faz mais sentido para você agora?
                </h2>
                <p className="mt-4 text-sm leading-7 text-white/65">
                  Quatro perguntas. Nenhum e-mail. Nenhum dado pessoal. A recomendação existe
                  apenas para organizar o catálogo em torno do objetivo que você declarou.
                </p>
              </div>
              <div className="p-8 md:p-10">
                <div className="space-y-4">
                  {[
                    "Encontros com Confiança",
                    "Reavivar o Romance",
                    "Romance Intencional",
                    "Recomeçar Depois do Fim",
                  ].map((title) => (
                    <div key={title} className="flex items-center gap-3 text-sm font-bold text-[#4e4541]">
                      <Check className="h-4 w-4 text-emerald-600" />
                      {title}
                    </div>
                  ))}
                </div>
                <button
                  type="button"
                  onClick={beginQuiz}
                  className="mt-8 flex h-14 w-full items-center justify-center gap-2 rounded-2xl bg-[#191312] px-6 text-sm font-black text-white transition hover:bg-black"
                >
                  Começar o quiz
                  <ArrowRight className="h-4 w-4" />
                </button>
                <p className="mt-3 text-center text-[11px] leading-5 text-[#8a7e78]">
                  Não é teste psicológico, terapia ou diagnóstico. É apenas recomendação editorial.
                </p>
              </div>
            </div>
          ) : !completed ? (
            <div className="overflow-hidden rounded-[32px] border border-[#e4d8cf] bg-white shadow-[0_30px_80px_rgba(61,43,34,.10)]">
              <div className="border-b border-[#eee5df] px-6 py-5 md:px-9">
                <div className="flex items-center justify-between gap-4">
                  <span className="text-[10px] font-black uppercase tracking-[0.16em] text-[#a05e67]">
                    {QUESTIONS[step].eyebrow}
                  </span>
                  <span className="text-xs font-bold text-[#8a7e78]">{step + 1}/{QUESTIONS.length}</span>
                </div>
                <div className="mt-3 h-1.5 overflow-hidden rounded-full bg-[#f0e7e2]">
                  <div
                    className="h-full rounded-full bg-[#b96d78] transition-all duration-500"
                    style={{ width: `${((step + 1) / QUESTIONS.length) * 100}%` }}
                  />
                </div>
              </div>

              <div className="p-6 md:p-9">
                <h2 className="max-w-3xl text-3xl font-black tracking-[-0.04em] md:text-4xl">
                  {QUESTIONS[step].title}
                </h2>
                <p className="mt-3 text-sm leading-6 text-[#786b65]">{QUESTIONS[step].text}</p>

                <div className="mt-7 grid gap-3">
                  {QUESTIONS[step].answers.map((answer, index) => (
                    <button
                      key={answer.label}
                      type="button"
                      onClick={() => choose(index)}
                      className="group flex w-full items-start justify-between gap-5 rounded-2xl border border-[#e9dfd8] bg-[#fffdfb] p-5 text-left transition hover:-translate-y-0.5 hover:border-[#d69aa4] hover:bg-[#fff8f8] hover:shadow-[0_12px_30px_rgba(91,53,58,.08)]"
                    >
                      <div>
                        <p className="text-sm font-black leading-6 text-[#2a2220]">{answer.label}</p>
                        <p className="mt-1 text-xs leading-5 text-[#887b75]">{answer.microcopy}</p>
                      </div>
                      <ArrowRight className="mt-1 h-4 w-4 shrink-0 text-[#b0737b] transition group-hover:translate-x-1" />
                    </button>
                  ))}
                </div>

                {step > 0 ? (
                  <button
                    type="button"
                    onClick={back}
                    className="mt-6 inline-flex items-center gap-2 text-xs font-black text-[#786b65]"
                  >
                    <ChevronLeft className="h-4 w-4" />
                    Voltar
                  </button>
                ) : null}
              </div>
            </div>
          ) : recommended && recommendedTrack ? (
            <div className="space-y-8">
              <div className="grid gap-7 rounded-[32px] border border-[#e4d8cf] bg-white p-6 shadow-[0_30px_80px_rgba(61,43,34,.10)] md:p-8 lg:grid-cols-[.78fr_1.22fr]">
                <Cover item={recommended} />

                <div className="lg:py-3">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="rounded-full bg-[#f9e6e9] px-3 py-1.5 text-[10px] font-black uppercase tracking-[0.14em] text-[#8b4450]">
                      Seu melhor ponto de partida
                    </span>
                    <span className="rounded-full bg-[#f2eee9] px-3 py-1.5 text-[10px] font-bold uppercase tracking-[0.12em] text-[#6f625c]">
                      {TRACK_LABEL[recommendedTrack]}
                    </span>
                  </div>

                  <h2 className="mt-5 text-4xl font-black tracking-[-0.055em] md:text-5xl">
                    {recommended.title}
                  </h2>
                  <p className="mt-4 text-base leading-7 text-[#675b55]">
                    {TRACK_REASON[recommendedTrack]}
                  </p>

                  <div className="mt-6 rounded-2xl bg-[#faf6f2] p-5">
                    <p className="text-[10px] font-black uppercase tracking-[0.14em] text-[#9b636b]">
                      O que você vai encontrar
                    </p>
                    <div className="mt-3 grid gap-2">
                      {recommended.chapters.slice(0, 5).map((chapter) => (
                        <div key={chapter} className="flex items-center gap-3 text-sm font-bold text-[#514744]">
                          <BadgeCheck className="h-4 w-4 text-emerald-600" />
                          {chapter}
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="mt-6 flex items-end gap-3">
                    <span className="text-4xl font-black">{money(recommended.price)}</span>
                    <span className="pb-1 text-xs font-bold text-[#8a7e78]">pagamento único</span>
                  </div>

                  <div className="mt-6 grid gap-3 sm:grid-cols-2">
                    <button
                      type="button"
                      onClick={() => setSelectedSlug(recommended.slug)}
                      className="flex min-h-14 items-center justify-center gap-2 rounded-2xl bg-[#191312] px-5 text-sm font-black text-white transition hover:bg-black"
                    >
                      Quero começar por este
                      <ArrowRight className="h-4 w-4" />
                    </button>
                    {pack ? (
                      <button
                        type="button"
                        onClick={() => setSelectedSlug(pack.slug)}
                        className="flex min-h-14 items-center justify-center gap-2 rounded-2xl border border-[#d4a0a8] bg-[#fff5f6] px-5 text-sm font-black text-[#7f3f49] transition hover:bg-[#ffecee]"
                      >
                        Levar os 4 por {money(pack.price)}
                        <Layers3 className="h-4 w-4" />
                      </button>
                    ) : null}
                  </div>

                  <button
                    type="button"
                    onClick={restart}
                    className="mt-5 inline-flex items-center gap-2 text-xs font-bold text-[#84766f]"
                  >
                    <RefreshCcw className="h-3.5 w-3.5" />
                    Refazer quiz
                  </button>
                </div>
              </div>

              {pack ? (
                <div className="overflow-hidden rounded-[28px] bg-[#211a18] text-white">
                  <div className="grid gap-6 p-7 md:grid-cols-[1.2fr_.8fr] md:p-9">
                    <div>
                      <p className="text-[10px] font-black uppercase tracking-[0.16em] text-[#efb2bc]">
                        Upgrade recomendado
                      </p>
                      <h3 className="mt-3 text-3xl font-black tracking-[-0.04em]">
                        Em vez de escolher só um caminho, desbloqueie os quatro.
                      </h3>
                      <p className="mt-3 max-w-2xl text-sm leading-7 text-white/65">
                        O pack reúne Encontros com Confiança, Reavivar o Romance,
                        Romance Intencional e Recomeçar Depois do Fim. Você pode começar
                        pelo resultado do quiz e manter os restantes na biblioteca para quando fizerem sentido.
                      </p>
                    </div>
                    <div className="rounded-2xl border border-white/10 bg-white/[.05] p-5">
                      <p className="text-xs text-white/50">Separados</p>
                      <p className="mt-1 text-lg font-bold text-white/45 line-through">
                        {money(pack.price + packSavings)}
                      </p>
                      <p className="mt-3 text-xs text-[#efb2bc]">Pack completo</p>
                      <p className="mt-1 text-4xl font-black">{money(pack.price)}</p>
                      <p className="mt-2 text-xs font-bold text-emerald-300">
                        Economize {money(packSavings)}
                      </p>
                      <button
                        type="button"
                        onClick={() => setSelectedSlug(pack.slug)}
                        className="mt-5 flex h-12 w-full items-center justify-center rounded-xl bg-[#f1b7c0] text-sm font-black text-[#231416]"
                      >
                        Fazer upgrade para o pack
                      </button>
                    </div>
                  </div>
                </div>
              ) : null}

              {purchase ? (
                <div id="checkout" className="scroll-mt-6 rounded-[28px] border border-[#e4d8cf] bg-white p-6 md:p-8">
                  <div className="grid gap-7 lg:grid-cols-[.85fr_1.15fr]">
                    <div>
                      <p className="text-[10px] font-black uppercase tracking-[0.16em] text-[#9b636b]">
                        Finalizar compra
                      </p>
                      <h3 className="mt-3 text-3xl font-black tracking-[-0.04em]">
                        {purchase.title}
                      </h3>
                      <p className="mt-3 text-sm leading-6 text-[#756861]">
                        PIX com confirmação automática. O acesso digital é liberado
                        somente depois da confirmação do pagamento.
                      </p>
                      <div className="mt-5 flex items-center gap-2 text-xs font-bold text-[#6e625d]">
                        <LockKeyhole className="h-4 w-4 text-emerald-600" />
                        Valor resolvido no servidor
                      </div>
                    </div>
                    <EbookCheckout
                      productSlug={purchase.slug}
                      productTitle={purchase.kind === "pack" ? "o pack completo" : "o guia recomendado"}
                      status={purchase.status}
                    />
                  </div>
                </div>
              ) : null}

              <div>
                <p className="text-[10px] font-black uppercase tracking-[0.16em] text-[#9b636b]">
                  Upsells editoriais
                </p>
                <h3 className="mt-2 text-3xl font-black tracking-[-0.04em]">
                  Os outros caminhos continuam disponíveis.
                </h3>
                <p className="mt-3 max-w-3xl text-sm leading-6 text-[#786b65]">
                  O quiz escolhe apenas o melhor ponto de partida. Os restantes títulos
                  aparecem abaixo como complementos — você decide se e quando fazem sentido.
                </p>

                <div className="mt-6 grid gap-4 md:grid-cols-3">
                  {scored
                    .filter((entry) => entry.item.slug !== recommended.slug)
                    .map(({ track, item }) => (
                      <div key={item.slug} className="rounded-[22px] border border-[#e7ddd6] bg-white p-5">
                        <p className="text-[10px] font-black uppercase tracking-[0.12em] text-[#a05e67]">
                          {TRACK_LABEL[track]}
                        </p>
                        <h4 className="mt-2 text-xl font-black">{item.title}</h4>
                        <p className="mt-2 text-xs leading-5 text-[#796c66]">{UPSELL_COPY[track]}</p>
                        <div className="mt-5 flex items-center justify-between">
                          <span className="text-lg font-black">{money(item.price)}</span>
                          <Link
                            href={`/ebooks/${item.slug}`}
                            className="inline-flex items-center gap-1 text-xs font-black text-[#8c4e58]"
                          >
                            Ver guia <ArrowRight className="h-3.5 w-3.5" />
                          </Link>
                        </div>
                      </div>
                    ))}
                </div>
              </div>
            </div>
          ) : null}
        </div>
      </section>

      <section className="bg-white px-4 py-14 md:px-6">
        <div className="mx-auto max-w-[1120px]">
          <div className="grid gap-8 lg:grid-cols-[.9fr_1.1fr]">
            <div>
              <p className="text-[10px] font-black uppercase tracking-[0.16em] text-[#9b636b]">
                O que mudou nesta coleção
              </p>
              <h2 className="mt-3 text-4xl font-black tracking-[-0.05em]">
                Conteúdo moderno sem herdar os vícios dos antigos manuais de sedução.
              </h2>
            </div>
            <div className="grid gap-3 sm:grid-cols-2">
              {[
                [ShieldCheck, "Sem manipulação", "Nada de ciúme calculado, pressão, insistência ou técnicas para controlar a resposta de outra pessoa."],
                [MessageCircleHeart, "Comunicação explícita", "Menos adivinhação de sinais; mais conversa, reciprocidade e clareza."],
                [Heart, "Consentimento", "Intimidade e romance aparecem com escolha, limites e respeito."],
                [BookOpen, "Prática", "Cada edição foi reconstruída para decisões e exercícios que cabem na vida real."],
              ].map(([Icon, title, text]) => {
                const IconComponent = Icon as typeof ShieldCheck;
                return (
                  <div key={String(title)} className="rounded-2xl bg-[#f8f4f1] p-5">
                    <IconComponent className="h-5 w-5 text-[#a55d68]" />
                    <p className="mt-3 font-black">{String(title)}</p>
                    <p className="mt-2 text-xs leading-5 text-[#756861]">{String(text)}</p>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      <section className="px-4 py-14 md:px-6">
        <div className="mx-auto max-w-[900px]">
          <p className="text-center text-[10px] font-black uppercase tracking-[0.16em] text-[#9b636b]">
            Perguntas frequentes
          </p>
          <h2 className="mt-3 text-center text-4xl font-black tracking-[-0.05em]">
            Antes de escolher
          </h2>
          <div className="mt-8 space-y-3">
            {[
              ["O quiz guarda as minhas respostas?", "Não. A recomendação é calculada no navegador durante esta sessão; não pedimos nome, e-mail ou telefone para responder."],
              ["O resultado do quiz é um diagnóstico?", "Não. É apenas uma recomendação editorial baseada no objetivo que você escolheu. Os livros não substituem terapia, aconselhamento jurídico ou cuidado profissional."],
              ["Posso comprar só um e-book?", "Sim. Cada título pode ser comprado separadamente. O pack existe para quem prefere ter os quatro disponíveis na biblioteca."],
              ["Como recebo o conteúdo?", "Depois da confirmação do PIX, a compra libera o acesso digital protegido. O valor do produto é resolvido no servidor, não pelo navegador."],
              ["E se eu mudar de fase depois?", "Os outros títulos continuam disponíveis individualmente; quem escolhe o pack mantém os quatro na biblioteca para usar quando fizer sentido."],
            ].map(([question, answer]) => (
              <details key={question} className="group rounded-2xl border border-[#e5dbd4] bg-white p-5">
                <summary className="cursor-pointer list-none pr-8 text-sm font-black">
                  {question}
                </summary>
                <p className="mt-3 text-sm leading-6 text-[#776a64]">{answer}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-[#171210] px-4 py-14 text-white md:px-6">
        <div className="mx-auto max-w-[900px] text-center">
          <Sparkles className="mx-auto h-7 w-7 text-[#efb2bc]" />
          <h2 className="mt-5 text-4xl font-black tracking-[-0.05em] md:text-5xl">
            Comece pelo que faz sentido agora.
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-sm leading-7 text-white/60">
            Quatro perguntas separam um catálogo genérico de uma recomendação realmente útil.
          </p>
          <button
            type="button"
            onClick={beginQuiz}
            className="mt-7 inline-flex h-14 items-center gap-2 rounded-2xl bg-[#f1b7c0] px-7 text-sm font-black text-[#201214]"
          >
            Fazer o quiz
            <ArrowRight className="h-4 w-4" />
          </button>
        </div>
      </section>
    </main>
  );
}
