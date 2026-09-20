"use client";

import { useMemo, useState } from "react";
import { Copy, WandSparkles } from "lucide-react";

export function PromptBuilder() {
  const [role, setRole] = useState("Act as a precise operator.");
  const [context, setContext] = useState("");
  const [task, setTask] = useState("");
  const [constraints, setConstraints] = useState(
    "Do not invent facts, metrics, testimonials, prices, legal conclusions or source support.",
  );
  const [output, setOutput] = useState(
    "1) result; 2) evidence/assumption notes; 3) risks/gaps; 4) next action.",
  );
  const [evidence, setEvidence] = useState(
    "Use supplied authoritative context for factual claims. Mark missing facts as TBD.",
  );
  const [qa, setQa] = useState(
    "Verify that facts are supported and distinguish facts, assumptions and recommendations.",
  );

  const compiled = useMemo(
    () =>
      [
        ["ROLE", role],
        ["CONTEXT", context],
        ["TASK", task],
        ["CONSTRAINTS", constraints],
        ["OUTPUT", output],
        ["EVIDENCE RULE", evidence],
        ["QUALITY CHECK", qa],
      ]
        .map(([label, value]) => label + ": " + value.trim())
        .join("\n\n"),
    [constraints, context, evidence, output, qa, role, task],
  );

  const fields: Array<
    [string, string, React.Dispatch<React.SetStateAction<string>>]
  > = [
    ["ROLE", role, setRole],
    ["CONTEXT", context, setContext],
    ["TASK", task, setTask],
    ["CONSTRAINTS", constraints, setConstraints],
    ["OUTPUT", output, setOutput],
    ["EVIDENCE RULE", evidence, setEvidence],
    ["QUALITY CHECK", qa, setQa],
  ];

  return (
    <div className="grid gap-6 lg:grid-cols-[1fr_.9fr]">
      <div className="rounded-3xl border border-border bg-white p-5 shadow-card">
        <div className="flex items-center gap-2">
          <WandSparkles className="h-5 w-5 text-brand-dark" />
          <h2 className="font-extrabold">Prompt blocks</h2>
        </div>
        {fields.map(([label, value, setter]) => (
          <label key={label} className="mt-4 block text-xs font-extrabold">
            {label}
            <textarea
              rows={label === "CONTEXT" || label === "TASK" ? 4 : 3}
              value={value}
              onChange={(event) => setter(event.target.value)}
              className="mt-1.5 w-full resize-y rounded-xl border border-border bg-soft px-3 py-2.5 text-sm font-normal leading-6"
            />
          </label>
        ))}
      </div>

      <div className="lg:sticky lg:top-24 lg:self-start">
        <div className="rounded-3xl bg-[#0b1220] p-5 text-white shadow-card">
          <div className="flex items-center justify-between gap-3">
            <h2 className="font-extrabold">Compiled prompt</h2>
            <button
              type="button"
              onClick={() => navigator.clipboard.writeText(compiled)}
              className="inline-flex h-9 items-center gap-2 rounded-lg bg-cyan-300 px-3 text-xs font-extrabold text-slate-950"
            >
              <Copy className="h-3.5 w-3.5" /> Copiar
            </button>
          </div>
          <pre className="mt-4 whitespace-pre-wrap break-words text-xs leading-6 text-slate-300">
            {compiled}
          </pre>
        </div>
      </div>
    </div>
  );
}
