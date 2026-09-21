"use client";

import { useState } from "react";
import { ArrowRight, LoaderCircle } from "lucide-react";

const LEAD_URL =
  "https://eivqvrfsreaopzlvhadu.supabase.co/functions/v1/site-lead";

export function SiteLeadForm({ slug }: { slug: string }) {
  const [state, setState] = useState<"idle" | "sending" | "done" | "error">("idle");
  const [message, setMessage] = useState("");

  async function submit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setState("sending");
    setMessage("");

    const form = new FormData(event.currentTarget);
    const payload = {
      slug,
      name: String(form.get("name") || ""),
      email: String(form.get("email") || ""),
      phone: String(form.get("phone") || ""),
      message: String(form.get("message") || ""),
      consent: form.get("consent") === "on",
    };

    try {
      const response = await fetch(LEAD_URL, {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(payload),
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data?.message || "Falha ao enviar.");
      setState("done");
      setMessage("Mensagem recebida. Vamos continuar por um dos canais informados.");
      event.currentTarget.reset();
    } catch (error) {
      setState("error");
      setMessage(
        error instanceof Error ? error.message : "Não foi possível enviar agora.",
      );
    }
  }

  return (
    <form onSubmit={submit} className="grid gap-3">
      <div className="grid gap-3 sm:grid-cols-2">
        <input
          name="name"
          required
          placeholder="Seu nome"
          className="h-12 rounded-xl border border-white/10 bg-white/[0.06] px-4 text-sm outline-none placeholder:text-white/35 focus:border-[var(--site-primary)]"
        />
        <input
          name="email"
          required
          type="email"
          placeholder="Seu email"
          className="h-12 rounded-xl border border-white/10 bg-white/[0.06] px-4 text-sm outline-none placeholder:text-white/35 focus:border-[var(--site-primary)]"
        />
      </div>
      <input
        name="phone"
        placeholder="Telefone / WhatsApp"
        className="h-12 rounded-xl border border-white/10 bg-white/[0.06] px-4 text-sm outline-none placeholder:text-white/35 focus:border-[var(--site-primary)]"
      />
      <textarea
        name="message"
        rows={4}
        placeholder="Como podemos ajudar?"
        className="rounded-xl border border-white/10 bg-white/[0.06] px-4 py-3 text-sm outline-none placeholder:text-white/35 focus:border-[var(--site-primary)]"
      />
      <label className="flex items-start gap-2 text-[10px] leading-4 text-white/45">
        <input name="consent" type="checkbox" required className="mt-0.5" />
        <span>Autorizo o contacto em resposta a esta solicitação.</span>
      </label>
      <button
        type="submit"
        disabled={state === "sending"}
        className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-[var(--site-primary)] px-6 text-sm font-black text-slate-950 disabled:opacity-60"
      >
        {state === "sending" ? (
          <LoaderCircle className="h-4 w-4 animate-spin" />
        ) : (
          <ArrowRight className="h-4 w-4" />
        )}
        {state === "sending" ? "Enviando..." : "Enviar mensagem"}
      </button>
      {message ? (
        <p
          className={
            state === "done"
              ? "text-xs font-semibold text-emerald-300"
              : "text-xs font-semibold text-rose-300"
          }
        >
          {message}
        </p>
      ) : null}
    </form>
  );
}
