"use client";

import { useMemo, useState } from "react";
import { CheckCircle2, ClipboardCheck } from "lucide-react";

const sections = [
  ["Hero", true],
  ["Problema / Situação", false],
  ["Mecanismo", true],
  ["Prova / Demonstração", true],
  ["Offer Stack", true],
  ["Use Cases", false],
  ["Audience Fit", false],
  ["FAQ / Objeções", false],
  ["Termos", true],
  ["CTA final", true],
  ["Continuidade de checkout", true],
  ["Success / Entrega", true],
] as const;

const gates = [
  "Promessa principal suportada por prova ou demonstração",
  "Preço, cobrança, entrega e limitações visíveis",
  "Checkout preserva produto, versão e preço",
  "Mobile sem falha crítica",
  "Entrega pós-pagamento validada",
] as const;

export function SalesPageAudit() {
  const [scores, setScores] = useState<Record<string, number>>({});
  const [releaseGates, setReleaseGates] = useState<Record<string, boolean>>({});

  const summary = useMemo(() => {
    const max = sections.length * 2;
    const total = sections.reduce(
      (sum, [name]) => sum + (scores[name] ?? 0),
      0,
    );
    const pct = max ? Math.round((total / max) * 100) : 0;
    const criticalFails = sections.filter(
      ([name, critical]) => critical && (scores[name] ?? 0) === 0,
    ).length;
    const gateFails = gates.filter((gate) => !releaseGates[gate]).length;
    const decision =
      criticalFails > 0 || gateFails > 0
        ? "HOLD"
        : pct >= 80
          ? "READY"
          : "REVIEW";

    return { total, max, pct, criticalFails, gateFails, decision };
  }, [releaseGates, scores]);

  function setScore(name: string, value: number) {
    setScores((current) => ({ ...current, [name]: value }));
  }

  async function copyReport() {
    const lines = [
      "Sales Page Audit",
      "Score: " + summary.total + "/" + summary.max + " (" + summary.pct + "%)",
      "Critical fails: " + summary.criticalFails,
      "Release gate fails: " + summary.gateFails,
      "Decision: " + summary.decision,
      "",
      ...sections.map(
        ([name, critical]) =>
          name +
          ": " +
          (scores[name] ?? 0) +
          "/2" +
          (critical ? " [critical]" : ""),
      ),
    ];
    await navigator.clipboard.writeText(lines.join("\n"));
  }

  return (
    <div className="grid gap-6 lg:grid-cols-[1fr_340px]">
      <div className="space-y-3">
        {sections.map(([name, critical]) => (
          <div
            key={name}
            className="flex flex-col gap-3 rounded-2xl border border-border bg-white p-4 shadow-card sm:flex-row sm:items-center sm:justify-between"
          >
            <div>
              <p className="text-sm font-extrabold">{name}</p>
              <p className="text-[11px] text-muted-foreground">
                {critical ? "Gate crítico" : "Gate de qualidade"}
              </p>
            </div>
            <div className="grid grid-cols-3 gap-2">
              {[
                [0, "Falha"],
                [1, "Parcial"],
                [2, "Passa"],
              ].map(([value, label]) => (
                <button
                  key={value}
                  type="button"
                  onClick={() => setScore(name, Number(value))}
                  className={
                    "rounded-xl border px-3 py-2 text-xs font-bold transition " +
                    ((scores[name] ?? 0) === Number(value)
                      ? "border-brand bg-brand text-white"
                      : "border-border bg-soft hover:border-brand")
                  }
                >
                  {label}
                </button>
              ))}
            </div>
          </div>
        ))}

        <div className="rounded-2xl border border-border bg-white p-5 shadow-card">
          <p className="text-sm font-extrabold">Release gates</p>
          <div className="mt-4 grid gap-3">
            {gates.map((gate) => (
              <label key={gate} className="flex items-start gap-3 text-sm">
                <input
                  type="checkbox"
                  checked={Boolean(releaseGates[gate])}
                  onChange={(event) =>
                    setReleaseGates((current) => ({
                      ...current,
                      [gate]: event.target.checked,
                    }))
                  }
                  className="mt-1 h-4 w-4"
                />
                <span>{gate}</span>
              </label>
            ))}
          </div>
        </div>
      </div>

      <aside className="h-fit rounded-2xl bg-[#0b1220] p-6 text-white lg:sticky lg:top-28">
        <div className="flex items-center gap-2">
          <ClipboardCheck className="h-5 w-5 text-cyan-300" aria-hidden="true" />
          <p className="text-xs font-extrabold tracking-[0.14em] text-cyan-300 uppercase">
            Release Score
          </p>
        </div>
        <strong className="mt-4 block text-5xl tracking-tight">
          {summary.pct}%
        </strong>
        <p className="mt-2 text-sm text-slate-300">
          {summary.total}/{summary.max} pontos · {summary.criticalFails} falhas
          críticas · {summary.gateFails} gates pendentes.
        </p>

        <div
          className={
            "mt-5 rounded-xl p-4 text-sm font-extrabold " +
            (summary.decision === "READY"
              ? "bg-emerald-500/20 text-emerald-200"
              : summary.decision === "HOLD"
                ? "bg-red-500/20 text-red-200"
                : "bg-amber-500/20 text-amber-100")
          }
        >
          Decisão: {summary.decision}
        </div>

        <button
          type="button"
          onClick={copyReport}
          className="mt-5 inline-flex h-11 w-full items-center justify-center gap-2 rounded-xl bg-white px-4 text-sm font-extrabold text-[#0b1220]"
        >
          <CheckCircle2 className="h-4 w-4" aria-hidden="true" />
          Copiar relatório
        </button>
      </aside>
    </div>
  );
}
