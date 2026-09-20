"use client";

import { useEffect, useState } from "react";
import { CheckCircle2, Download, LoaderCircle, ShieldCheck } from "lucide-react";

const ACCESS_URL =
  "https://eivqvrfsreaopzlvhadu.supabase.co/functions/v1/digital-access";

type DownloadFile = {
  id: string;
  name: string;
  version: string;
  url: string;
  expiresIn: number;
};

export function DigitalAccessPanel({
  reference: initialReference,
  claim: initialClaim,
}: {
  reference?: string;
  claim?: string;
}) {
  const [reference, setReference] = useState(initialReference ?? "");
  const [claim, setClaim] = useState(initialClaim ?? "");
  const [state, setState] = useState<
    "checking" | "pending" | "ready" | "preparing" | "error"
  >("checking");
  const [files, setFiles] = useState<DownloadFile[]>([]);
  const [message, setMessage] = useState("Validando o pagamento...");

  useEffect(() => {
    if (reference && claim) return;

    try {
      const saved = JSON.parse(
        localStorage.getItem("nv:digital:last-access") || "{}",
      );
      if (saved.reference && saved.claim) {
        setReference(saved.reference);
        setClaim(saved.claim);
      }
    } catch {
      // Ignore malformed local state.
    }
  }, [claim, reference]);

  useEffect(() => {
    if (!reference || !claim) {
      setState("error");
      setMessage(
        "Não encontramos a credencial desta compra neste navegador. Use o mesmo navegador usado no checkout ou contacte o suporte.",
      );
      return;
    }

    let cancelled = false;
    let timer: ReturnType<typeof setTimeout> | undefined;
    let attempts = 0;

    async function check() {
      attempts += 1;

      try {
        const url =
          ACCESS_URL +
          "?reference=" +
          encodeURIComponent(reference) +
          "&claim=" +
          encodeURIComponent(claim);

        const response = await fetch(url, { cache: "no-store" });
        const data = await response.json();

        if (cancelled) return;

        if (response.status === 202) {
          setState("pending");
          setMessage(
            "Pagamento ainda pendente. A página atualiza automaticamente.",
          );
          if (attempts < 80) {
            timer = setTimeout(check, 3000);
          }
          return;
        }

        if (!response.ok) {
          throw new Error(data?.message || "Não foi possível validar o acesso.");
        }

        if (data.paid && !data.deliveryReady) {
          setState("preparing");
          setMessage(
            "Pagamento confirmado. O pacote está a ser preparado para download.",
          );
          return;
        }

        setFiles(data.files ?? []);
        setState("ready");
        setMessage(
          "Acesso liberado. Os links são privados e expiram em poucos minutos.",
        );
      } catch (err) {
        if (!cancelled) {
          setState("error");
          setMessage(
            err instanceof Error
              ? err.message
              : "Falha temporária ao validar o acesso.",
          );
        }
      }
    }

    void check();

    return () => {
      cancelled = true;
      if (timer) clearTimeout(timer);
    };
  }, [claim, reference]);

  return (
    <div className="mt-7">
      <div
        className={
          state === "error"
            ? "rounded-2xl bg-red-50 p-5 text-left"
            : "rounded-2xl bg-soft p-5 text-left"
        }
      >
        <div className="flex items-start gap-3">
          {state === "checking" || state === "pending" ? (
            <LoaderCircle
              className="mt-0.5 h-5 w-5 shrink-0 animate-spin text-brand-dark"
              aria-hidden="true"
            />
          ) : state === "ready" || state === "preparing" ? (
            <CheckCircle2
              className="mt-0.5 h-5 w-5 shrink-0 text-success"
              aria-hidden="true"
            />
          ) : (
            <ShieldCheck
              className="mt-0.5 h-5 w-5 shrink-0 text-red-700"
              aria-hidden="true"
            />
          )}

          <div>
            <p className="text-sm font-extrabold">
              {state === "ready"
                ? "Acesso liberado"
                : state === "error"
                  ? "Acesso não validado"
                  : "Validando compra"}
            </p>
            <p className="mt-1 text-xs leading-5 text-muted-foreground">
              {message}
            </p>
          </div>
        </div>
      </div>

      {state === "ready" ? (
        <div className="mt-4 grid gap-2">
          {files.map((file) => (
            <a
              key={file.id}
              href={file.url}
              className="flex items-center justify-between gap-3 rounded-xl border border-border bg-white px-4 py-3 text-sm font-semibold transition hover:border-brand"
            >
              <span>{file.name}</span>
              <Download
                className="h-4 w-4 shrink-0 text-brand-dark"
                aria-hidden="true"
              />
            </a>
          ))}
        </div>
      ) : null}
    </div>
  );
}
