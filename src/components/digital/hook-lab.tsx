"use client";

import { useMemo, useState } from "react";
import { Clipboard, Sparkles } from "lucide-react";

type Brief = {
  product: string;
  audience: string;
  outcome: string;
  action: string;
  proof: string;
};

const initial: Brief = {
  product: "Conversion Content OS",
  audience: "criadores, ecommerce e pequenas equipas de marketing",
  outcome: "mensagens mais claras e testáveis",
  action: "avançar para a oferta",
  proof: "",
};

export function HookLab() {
  const [brief, setBrief] = useState(initial);
  const [generated, setGenerated] = useState(false);

  const hooks = useMemo(() => {
    const p = brief.product || "esta solução";
    const a = brief.audience || "o público certo";
    const o = brief.outcome || "um resultado mais claro";
    const n = brief.action || "dar o próximo passo";

    return [
      ["Resultado", "Como usar " + p + " para chegar a " + o + " sem começar do zero."],
      ["Diagnóstico", "Se " + a + " ainda não consegue " + o + ", revise estes pontos primeiro."],
      ["Erro", "O erro que faz " + a + " trabalhar mais e ainda assim se afastar de " + o + "."],
      ["Comparação", p + " ou improviso: o que muda quando o objetivo é " + o + "?"],
      ["Processo", "O processo em etapas para sair de uma ideia e chegar a " + o + " com " + p + "."],
      ["Checklist", "Checklist: o que precisa estar claro antes de tentar " + n + "."],
      ["Objeção", "Você não precisa de mais volume para " + o + "; precisa saber o que testar primeiro."],
      ["Demonstração", "Veja como " + p + " organiza a passagem do briefing para " + o + "."],
      ["Pergunta", "O seu conteúdo deixa " + a + " entender claramente por que deveria " + n + "?"],
      ["Especificidade", p + ": um sistema para definir mensagem, prova e próximo passo antes de publicar."],
      ["Sequência", "Brief -> mensagem -> hook -> CTA -> teste: uma sequência para buscar " + o + " sem depender de palpites."],
      ["Critério", "Antes de escolher uma mensagem para " + a + ", valide relevância, clareza e prova."],
    ];
  }, [brief]);

  function update(key: keyof Brief, value: string) {
    setBrief((current) => ({ ...current, [key]: value }));
  }

  async function copy(value: string) {
    await navigator.clipboard.writeText(value);
  }

  return (
    <div className="grid gap-6 lg:grid-cols-[360px_1fr]">
      <form
        onSubmit={(event) => {
          event.preventDefault();
          setGenerated(true);
        }}
        className="rounded-2xl border border-border bg-white p-5 shadow-card"
      >
        <p className="text-xs font-extrabold tracking-[0.14em] text-brand-dark uppercase">
          Briefing
        </p>

        {[
          ["product", "Produto ou oferta"],
          ["audience", "Público"],
          ["outcome", "Resultado desejado"],
          ["action", "Próxima ação"],
          ["proof", "Prova disponível (opcional)"],
        ].map(([key, label]) => (
          <label key={key} className="mt-4 block text-xs font-bold">
            {label}
            <textarea
              value={brief[key as keyof Brief]}
              onChange={(event) =>
                update(key as keyof Brief, event.target.value)
              }
              className="mt-1 min-h-20 w-full resize-y rounded-xl border border-border bg-white p-3 text-sm font-normal outline-none focus:border-brand"
            />
          </label>
        ))}

        <button
          type="submit"
          className="mt-5 inline-flex h-11 w-full items-center justify-center gap-2 rounded-xl bg-primary px-4 text-sm font-extrabold text-primary-foreground"
        >
          <Sparkles className="h-4 w-4" aria-hidden="true" />
          Gerar estruturas
        </button>
      </form>

      <div>
        {!generated ? (
          <div className="grid min-h-[420px] place-items-center rounded-2xl border border-dashed border-border bg-white/70 p-8 text-center text-sm text-muted-foreground">
            Preencha o briefing e gere uma bateria de hooks por função.
          </div>
        ) : (
          <div className="grid gap-3 md:grid-cols-2">
            {hooks.map(([family, text]) => (
              <article
                key={family}
                className="rounded-2xl border border-border bg-white p-5 shadow-card"
              >
                <div className="flex items-center justify-between gap-3">
                  <span className="rounded-full bg-cyan-50 px-2.5 py-1 text-[10px] font-extrabold tracking-wide text-cyan-800 uppercase">
                    {family}
                  </span>
                  <span className="text-[10px] font-bold text-success">
                    Estrutura segura
                  </span>
                </div>
                <p className="mt-4 text-sm font-semibold leading-6">{text}</p>
                <p className="mt-3 text-[11px] leading-5 text-muted-foreground">
                  {brief.proof
                    ? "Use apenas a prova informada no briefing e mantenha o escopo da afirmação."
                    : "Sem prova específica informada: evite números, testemunhos, autoridade ou resultados inventados."}
                </p>
                <button
                  type="button"
                  onClick={() => copy(text)}
                  className="mt-4 inline-flex items-center gap-2 text-xs font-extrabold text-brand-dark"
                >
                  <Clipboard className="h-3.5 w-3.5" aria-hidden="true" />
                  Copiar
                </button>
              </article>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
