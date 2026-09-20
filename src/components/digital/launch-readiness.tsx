"use client";

import { useMemo, useState } from "react";
import { CheckCircle2, CircleAlert, Rocket } from "lucide-react";

const checks = [
  ["Rights / source gate", true],
  ["Core deliverable fulfills the offer", true],
  ["Price and version are fixed", true],
  ["Terms visible before payment", true],
  ["Checkout resolves price server-side", true],
  ["Successful payment creates entitlement", true],
  ["Unpaid access is blocked", true],
  ["Protected delivery tested", true],
  ["Mobile funnel QA passed", true],
  ["Analytics events visible", false],
  ["Support / incident route ready", true],
] as const;

export function LaunchReadiness() {
  const [values, setValues] = useState<Record<number, boolean>>({});

  const result = useMemo(() => {
    const critical = checks
      .map((item, index) => ({ ...item, index }))
      .filter((item) => item[1]);
    const failedCritical = critical.filter((item) => !values[item.index]).length;
    const done = checks.filter((_, index) => values[index]).length;
    return {
      done,
      percent: Math.round((done / checks.length) * 100),
      ready: failedCritical === 0,
      failedCritical,
    };
  }, [values]);

  return (
    <div className="grid gap-6 lg:grid-cols-[1fr_320px]">
      <div className="rounded-3xl border border-border bg-white p-5 shadow-card">
        <h2 className="text-xl font-extrabold">Release gate</h2>
        <div className="mt-4 grid gap-2">
          {checks.map(([label, critical], index) => (
            <label
              key={label}
              className="flex cursor-pointer items-center justify-between gap-4 rounded-xl border border-border bg-soft/50 px-4 py-3"
            >
              <span className="text-sm font-semibold">
                {label}
                {critical ? (
                  <small className="ml-2 text-[10px] font-black uppercase text-red-600">
                    crítico
                  </small>
                ) : null}
              </span>
              <input
                type="checkbox"
                checked={Boolean(values[index])}
                onChange={(event) =>
                  setValues((current) => ({
                    ...current,
                    [index]: event.target.checked,
                  }))
                }
                className="h-5 w-5"
              />
            </label>
          ))}
        </div>
      </div>

      <aside
        className={
          "rounded-3xl p-6 text-white lg:sticky lg:top-24 lg:self-start " +
          (result.ready ? "bg-emerald-800" : "bg-[#0b1220]")
        }
      >
        <Rocket className="h-7 w-7" />
        <p className="mt-5 text-5xl font-black">{result.percent}%</p>
        <p className="mt-1 text-sm text-white/70">
          {result.done}/{checks.length} gates completos
        </p>
        <div className="mt-6 flex items-start gap-2">
          {result.ready ? (
            <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0" />
          ) : (
            <CircleAlert className="mt-0.5 h-5 w-5 shrink-0 text-amber-300" />
          )}
          <div>
            <strong>{result.ready ? "READY" : "HOLD"}</strong>
            <p className="mt-1 text-xs leading-5 text-white/70">
              {result.ready
                ? "Todos os gates críticos foram confirmados."
                : result.failedCritical +
                  " gate(s) crítico(s) ainda não confirmado(s)."}
            </p>
          </div>
        </div>
      </aside>
    </div>
  );
}
