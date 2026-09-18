"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { Settings2, X } from "lucide-react";

type Consent = {
  essential: true;
  functional: boolean;
  analytics: boolean;
  marketing: boolean;
  version: string;
  updatedAt: string;
};

const STORAGE_KEY = "nv:cookie-consent-v1";
const VERSION = "2026-09-18";

function saveConsent(value: Omit<Consent, "essential" | "version" | "updatedAt">) {
  const consent: Consent = {
    essential: true,
    functional: value.functional,
    analytics: value.analytics,
    marketing: value.marketing,
    version: VERSION,
    updatedAt: new Date().toISOString(),
  };

  localStorage.setItem(STORAGE_KEY, JSON.stringify(consent));
  window.dispatchEvent(new CustomEvent("novidades:consent", { detail: consent }));
}

export function CookieConsent() {
  const [visible, setVisible] = useState(false);
  const [manage, setManage] = useState(false);
  const [functional, setFunctional] = useState(false);
  const [analytics, setAnalytics] = useState(false);
  const [marketing, setMarketing] = useState(false);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (!raw) {
        setVisible(true);
        return;
      }

      const existing = JSON.parse(raw) as Consent;
      if (existing.version !== VERSION) {
        setVisible(true);
        return;
      }

      setFunctional(Boolean(existing.functional));
      setAnalytics(Boolean(existing.analytics));
      setMarketing(Boolean(existing.marketing));
    } catch {
      setVisible(true);
    }

    const open = () => {
      setManage(true);
      setVisible(true);
    };

    window.addEventListener("novidades:open-cookie-settings", open);
    return () => window.removeEventListener("novidades:open-cookie-settings", open);
  }, []);

  if (!visible) return null;

  const persist = (
    next: Omit<Consent, "essential" | "version" | "updatedAt">
  ) => {
    saveConsent(next);
    setFunctional(next.functional);
    setAnalytics(next.analytics);
    setMarketing(next.marketing);
    setVisible(false);
    setManage(false);
  };

  return (
    <section
      aria-label="Preferências de cookies"
      className="fixed right-3 bottom-[82px] left-3 z-[100] mx-auto max-w-[760px] rounded-[18px] border border-black/10 bg-white p-4 shadow-[0_24px_80px_rgba(0,0,0,.22)] md:right-5 md:bottom-5 md:left-auto md:w-[560px] md:p-5"
    >
      <div className="flex items-start gap-3">
        <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-warm text-brand-dark">
          <Settings2 className="h-4.5 w-4.5" aria-hidden="true" />
        </span>
        <div className="min-w-0 flex-1">
          <h2 className="text-sm font-extrabold">Privacidade e cookies</h2>
          <p className="mt-1 text-[12px] leading-5 text-muted-foreground">
            Usamos tecnologias essenciais para operar o site. Funcionais,
            analytics e marketing só são ativados conforme a preferência
            registrada e a configuração aplicável.{" "}
            <Link href="/cookies" className="font-semibold text-brand-dark hover:underline">
              Saiba mais
            </Link>
            .
          </p>
        </div>

        {manage ? (
          <button
            type="button"
            aria-label="Fechar preferências"
            onClick={() => setManage(false)}
            className="grid h-9 w-9 shrink-0 place-items-center rounded-full hover:bg-soft"
          >
            <X className="h-4 w-4" aria-hidden="true" />
          </button>
        ) : null}
      </div>

      {manage ? (
        <div className="mt-4 grid gap-2 border-t border-border pt-4">
          <ConsentRow
            label="Essenciais"
            description="Segurança, sessão e funcionamento básico."
            checked
            disabled
            onChange={() => undefined}
          />
          <ConsentRow
            label="Funcionais"
            description="Preferências de experiência, idioma e região."
            checked={functional}
            onChange={setFunctional}
          />
          <ConsentRow
            label="Analytics"
            description="Medição de uso e desempenho."
            checked={analytics}
            onChange={setAnalytics}
          />
          <ConsentRow
            label="Marketing"
            description="Atribuição e medição de campanhas."
            checked={marketing}
            onChange={setMarketing}
          />
        </div>
      ) : null}

      <div className="mt-4 grid gap-2 sm:grid-cols-3">
        <button
          type="button"
          onClick={() =>
            persist({ functional: false, analytics: false, marketing: false })
          }
          className="h-10 rounded-[10px] border border-border px-3 text-xs font-bold transition hover:bg-soft"
        >
          Rejeitar não essenciais
        </button>

        {manage ? (
          <button
            type="button"
            onClick={() => persist({ functional, analytics, marketing })}
            className="h-10 rounded-[10px] border border-border px-3 text-xs font-bold transition hover:bg-soft"
          >
            Guardar escolhas
          </button>
        ) : (
          <button
            type="button"
            onClick={() => setManage(true)}
            className="h-10 rounded-[10px] border border-border px-3 text-xs font-bold transition hover:bg-soft"
          >
            Gerir preferências
          </button>
        )}

        <button
          type="button"
          onClick={() =>
            persist({ functional: true, analytics: true, marketing: true })
          }
          className="h-10 rounded-[10px] bg-primary px-3 text-xs font-bold text-white transition hover:bg-brand-dark"
        >
          Aceitar todos
        </button>
      </div>
    </section>
  );
}

function ConsentRow({
  label,
  description,
  checked,
  disabled = false,
  onChange,
}: {
  label: string;
  description: string;
  checked: boolean;
  disabled?: boolean;
  onChange: (value: boolean) => void;
}) {
  return (
    <label className="flex items-center justify-between gap-4 rounded-xl bg-soft p-3">
      <span>
        <strong className="block text-xs">{label}</strong>
        <small className="mt-0.5 block text-[10px] text-muted-foreground">
          {description}
        </small>
      </span>
      <input
        type="checkbox"
        checked={checked}
        disabled={disabled}
        onChange={(event) => onChange(event.target.checked)}
        className="h-4 w-4 accent-[#151918]"
      />
    </label>
  );
}

export function openCookieSettings() {
  window.dispatchEvent(new CustomEvent("novidades:open-cookie-settings"));
}
