"use client";

import { useMemo, useState } from "react";
import { Copy, LayoutGrid, Sparkles } from "lucide-react";

const jobs = [
  ["Attract", "Ganhar atenção relevante sem inflar a promessa."],
  ["Educate", "Explicar mecanismo, processo ou critério de decisão."],
  ["Demonstrate", "Mostrar produto, workflow ou evidência visível."],
  ["De-risk", "Responder objeções e reduzir incerteza."],
  ["Convert", "Conectar contexto ao próximo passo comercial."],
  ["Activate", "Ajudar cliente a usar o que já comprou."],
] as const;

export function SocialContentPlanner() {
  const [source, setSource] = useState("Uma ideia verificada do produto ou research");
  const [audience, setAudience] = useState("meu público");
  const [objective, setObjective] = useState("gerar próxima ação qualificada");
  const [channel, setChannel] = useState("Instagram / Reels");
  const [cta, setCta] = useState("ver a oferta completa");

  const plan = useMemo(
    () =>
      jobs.map(([job, purpose], index) => ({
        job,
        purpose,
        angle:
          index === 0
            ? "O que " + audience + " precisa perceber primeiro?"
            : index === 1
              ? "Como funciona: " + source
              : index === 2
                ? "Mostre " + source + " em uso, sem adicionar resultados não comprovados."
                : index === 3
                  ? "Qual dúvida razoável impede " + audience + " de avançar?"
                  : index === 4
                    ? "Por que esta ideia é relevante para " + objective + "?"
                    : "Qual é o primeiro passo depois da compra?",
        format:
          channel.includes("Reels") || channel.includes("TikTok")
            ? index % 2 === 0
              ? "Short video 20–35s"
              : "Carousel / caption"
            : channel.includes("LinkedIn")
              ? "Post + visual / document"
              : channel.includes("YouTube")
                ? "Video / Short"
                : "Post / message",
        cta: index === 5 ? "usar o produto / iniciar ativação" : cta,
      })),
    [audience, channel, cta, objective, source],
  );

  const copyAll = async () => {
    await navigator.clipboard.writeText(
      plan
        .map(
          (item) =>
            item.job +
            "\nAngle: " +
            item.angle +
            "\nFormat: " +
            item.format +
            "\nCTA: " +
            item.cta,
        )
        .join("\n\n"),
    );
  };

  return (
    <div className="grid gap-6 lg:grid-cols-[360px_1fr]">
      <div className="rounded-3xl border border-border bg-white p-5 shadow-card">
        <div className="flex items-center gap-2">
          <LayoutGrid className="h-5 w-5 text-brand-dark" />
          <h2 className="font-extrabold">Content brief</h2>
        </div>

        {[
          ["Source idea / evidence", source, setSource],
          ["Audience", audience, setAudience],
          ["Objective", objective, setObjective],
          ["CTA", cta, setCta],
        ].map(([label, value, setter]) => (
          <label key={String(label)} className="mt-4 block text-sm font-bold">
            {String(label)}
            <textarea
              rows={2}
              value={String(value)}
              onChange={(event) =>
                (setter as React.Dispatch<React.SetStateAction<string>>)(
                  event.target.value,
                )
              }
              className="mt-1.5 w-full resize-none rounded-xl border border-border bg-soft px-3 py-2.5 font-normal"
            />
          </label>
        ))}

        <label className="mt-4 block text-sm font-bold">
          Channel
          <select
            value={channel}
            onChange={(event) => setChannel(event.target.value)}
            className="mt-1.5 h-11 w-full rounded-xl border border-border bg-soft px-3 font-normal"
          >
            <option>Instagram / Reels</option>
            <option>TikTok</option>
            <option>LinkedIn</option>
            <option>YouTube</option>
            <option>Email</option>
            <option>WhatsApp opt-in</option>
          </select>
        </label>
      </div>

      <div>
        <div className="mb-4 flex items-center justify-between gap-3">
          <div>
            <p className="text-xs font-bold uppercase tracking-[.14em] text-brand-dark">
              Content jobs
            </p>
            <h2 className="mt-1 text-2xl font-extrabold">
              6 assets com funções diferentes
            </h2>
          </div>
          <button
            type="button"
            onClick={copyAll}
            className="inline-flex h-10 items-center gap-2 rounded-xl bg-primary px-4 text-xs font-extrabold text-primary-foreground"
          >
            <Copy className="h-4 w-4" /> Copiar plano
          </button>
        </div>

        <div className="grid gap-3 md:grid-cols-2">
          {plan.map((item) => (
            <article
              key={item.job}
              className="rounded-2xl border border-border bg-white p-5 shadow-sm"
            >
              <div className="flex items-center gap-2">
                <Sparkles className="h-4 w-4 text-brand-dark" />
                <strong>{item.job}</strong>
              </div>
              <p className="mt-2 text-xs leading-5 text-muted-foreground">
                {item.purpose}
              </p>
              <p className="mt-4 text-sm font-extrabold">{item.angle}</p>
              <div className="mt-4 flex flex-wrap gap-2 text-[11px] font-bold">
                <span className="rounded-full bg-cyan-50 px-2.5 py-1 text-cyan-800">
                  {item.format}
                </span>
                <span className="rounded-full bg-soft px-2.5 py-1">
                  CTA: {item.cta}
                </span>
              </div>
            </article>
          ))}
        </div>
      </div>
    </div>
  );
}
