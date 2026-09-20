"use client";

import { useMemo, useState } from "react";
import { Copy, Mail, Sparkles } from "lucide-react";

type SequenceType =
  | "welcome"
  | "nurture"
  | "recovery"
  | "launch"
  | "activation"
  | "reactivation";

const blueprints: Record<SequenceType, Array<[string, string]>> = {
  welcome: [
    ["Entrega & orientação", "Entregue o recurso/promessa e explique o primeiro passo."],
    ["Primeira vitória", "Ajude a executar uma ação pequena e concreta."],
    ["Mecanismo", "Explique como o processo funciona e o que observar."],
    ["Objeção", "Responda uma dúvida real com prova, demonstração ou limite claro."],
    ["Próximo passo", "Apresente a próxima ação ou oferta apenas se for relevante."],
  ],
  nurture: [
    ["Situação", "Defina o problema sem fabricar medo."],
    ["Critérios", "Ensine como avaliar opções e decisões."],
    ["Demonstração", "Mostre processo, produto ou workflow em uso."],
    ["Objeção", "Reduza incerteza sobre esforço, fit, timing ou compatibilidade."],
    ["Oferta", "Conecte a educação a um próximo passo comercial claro."],
  ],
  recovery: [
    ["Lembrete", "Identifique produto e checkout incompleto sem falsa urgência."],
    ["Decision support", "Recapitule entrega, billing, compatibilidade e termos."],
    ["Close loop", "Último lembrete claro; depois pare a sequência."],
  ],
  launch: [
    ["Contexto", "Explique o que foi lançado e para quem."],
    ["Tour", "Mostre mecanismo, componentes e utilização."],
    ["Prova", "Use demonstração ou evidência verificável."],
    ["FAQ", "Responda fit, entrega, billing e limitações."],
    ["Decisão", "Resumo conciso e CTA; deadline apenas se for real."],
  ],
  activation: [
    ["Acesso", "Mostre onde está o produto e o primeiro passo."],
    ["Ativação", "Proponha um workflow de 10–20 minutos."],
    ["Progresso", "Ajude a chegar a um marco intermediário."],
    ["Next step", "Suporte ou complemento apenas depois do core estar acessível."],
  ],
  reactivation: [
    ["Value reset", "Relembre por que a pessoa entrou e entregue valor."],
    ["Preferência", "Pergunte o que ainda é relevante receber."],
    ["Close loop", "Convide a permanecer ou parar mensagens não essenciais."],
  ],
};

export function EmailSequenceBuilder() {
  const [type, setType] = useState<SequenceType>("welcome");
  const [product, setProduct] = useState("meu produto");
  const [audience, setAudience] = useState("meu público");
  const [goal, setGoal] = useState("ativar o próximo passo");
  const [proof, setProof] = useState("");

  const sequence = useMemo(
    () =>
      blueprints[type].map(([job, purpose], index) => ({
        number: index + 1,
        job,
        subject:
          index === 0
            ? product + ": " + job
            : job + " — " + audience,
        body:
          purpose +
          " Contexto: " +
          audience +
          ". Objetivo: " +
          goal +
          "." +
          (proof ? " Prova disponível: " + proof + "." : " Não presuma prova não informada."),
      })),
    [audience, goal, product, proof, type],
  );

  const copyAll = async () => {
    const text = sequence
      .map(
        (item) =>
          "EMAIL " +
          item.number +
          " — " +
          item.job +
          "\nSubject: " +
          item.subject +
          "\n" +
          item.body,
      )
      .join("\n\n");
    await navigator.clipboard.writeText(text);
  };

  return (
    <div className="grid gap-6 lg:grid-cols-[360px_1fr]">
      <form className="rounded-3xl border border-border bg-white p-5 shadow-card">
        <div className="flex items-center gap-2">
          <Mail className="h-5 w-5 text-brand-dark" />
          <h2 className="font-extrabold">Campaign Brief</h2>
        </div>
        <label className="mt-5 block text-sm font-bold">
          Sequência
          <select
            value={type}
            onChange={(event) => setType(event.target.value as SequenceType)}
            className="mt-1.5 h-11 w-full rounded-xl border border-border bg-soft px-3 font-normal"
          >
            <option value="welcome">Welcome</option>
            <option value="nurture">Lead nurture</option>
            <option value="recovery">Checkout recovery</option>
            <option value="launch">Launch</option>
            <option value="activation">Post-purchase activation</option>
            <option value="reactivation">Reactivation</option>
          </select>
        </label>
        {[
          ["Produto / recurso", product, setProduct],
          ["Público", audience, setAudience],
          ["Objetivo", goal, setGoal],
          ["Prova disponível (opcional)", proof, setProof],
        ].map(([label, value, setter]) => (
          <label key={String(label)} className="mt-4 block text-sm font-bold">
            {String(label)}
            <textarea
              value={String(value)}
              onChange={(event) =>
                (setter as React.Dispatch<React.SetStateAction<string>>)(
                  event.target.value,
                )
              }
              rows={2}
              className="mt-1.5 w-full resize-none rounded-xl border border-border bg-soft px-3 py-2.5 font-normal"
            />
          </label>
        ))}
      </form>

      <div>
        <div className="mb-4 flex items-center justify-between gap-3">
          <div>
            <p className="text-xs font-bold uppercase tracking-[.14em] text-brand-dark">
              Sequence map
            </p>
            <h2 className="mt-1 text-2xl font-extrabold">
              {sequence.length} emails com jobs distintos
            </h2>
          </div>
          <button
            type="button"
            onClick={copyAll}
            className="inline-flex h-10 items-center gap-2 rounded-xl bg-primary px-4 text-xs font-extrabold text-primary-foreground"
          >
            <Copy className="h-4 w-4" /> Copiar tudo
          </button>
        </div>
        <div className="grid gap-3">
          {sequence.map((item) => (
            <article
              key={item.number}
              className="rounded-2xl border border-border bg-white p-5 shadow-sm"
            >
              <div className="flex items-center gap-2">
                <span className="grid h-7 w-7 place-items-center rounded-full bg-cyan-50 text-xs font-black text-cyan-800">
                  {item.number}
                </span>
                <strong>{item.job}</strong>
              </div>
              <p className="mt-3 text-sm font-extrabold">{item.subject}</p>
              <p className="mt-2 text-sm leading-6 text-muted-foreground">
                {item.body}
              </p>
            </article>
          ))}
        </div>
        <div className="mt-4 flex gap-2 rounded-xl bg-soft p-4 text-xs leading-5 text-muted-foreground">
          <Sparkles className="mt-0.5 h-4 w-4 shrink-0 text-brand-dark" />
          Estrutura educativa: não cria prova, urgência, consentimento ou base legal
          que não tenham sido informados.
        </div>
      </div>
    </div>
  );
}
