"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import {
  CheckCircle2,
  Copy,
  LoaderCircle,
  LockKeyhole,
  QrCode,
  ShoppingCart,
} from "lucide-react";

const CHECKOUT_URL =
  "https://eivqvrfsreaopzlvhadu.supabase.co/functions/v1/digital-checkout";

type Props = {
  productSlug: string;
  productTitle: string;
  status: "live" | "preparing";
};

type PixState = {
  reference: string;
  claim: string;
  transactionId?: string;
  copyPaste?: string;
  qrImage?: string;
  status: string;
};

function onlyDigits(value: string) {
  return value.replace(/\D/g, "");
}

function normalizeQr(value: unknown) {
  const raw = String(value ?? "").trim();
  if (!raw) return "";
  if (raw.startsWith("data:image/") || raw.startsWith("http://") || raw.startsWith("https://")) {
    return raw;
  }
  return `data:image/png;base64,${raw}`;
}

export function EbookCheckout({ productSlug, productTitle, status }: Props) {
  const [name, setName] = useState("");
  const [document, setDocument] = useState("");
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [pix, setPix] = useState<PixState | null>(null);
  const [copied, setCopied] = useState(false);
  const [paid, setPaid] = useState(false);

  const documentDigits = useMemo(() => onlyDigits(document), [document]);

  function saveAccess(reference: string, claim: string) {
    const access = {
      reference,
      claim,
      productSlug,
      createdAt: new Date().toISOString(),
    };

    localStorage.setItem("nv:digital:last-access", JSON.stringify(access));

    try {
      const previous = JSON.parse(localStorage.getItem("nv:digital:accesses") || "[]");
      const list = Array.isArray(previous) ? previous : [];
      localStorage.setItem(
        "nv:digital:accesses",
        JSON.stringify(
          [
            access,
            ...list.filter(
              (item) => item && item.reference !== access.reference,
            ),
          ].slice(0, 30),
        ),
      );
    } catch {
      localStorage.setItem("nv:digital:accesses", JSON.stringify([access]));
    }
  }

  async function startCheckout() {
    if (status !== "live") return;

    const normalizedEmail = email.trim().toLowerCase();
    const normalizedName = name.trim().replace(/\s+/g, " ");

    if (normalizedName.length < 3) {
      setMessage("Informe o nome do pagador.");
      return;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(normalizedEmail)) {
      setMessage("Informe um e-mail válido para receber e recuperar o acesso.");
      return;
    }
    if (![11, 14].includes(documentDigits.length)) {
      setMessage("Informe um CPF ou CNPJ válido para a cobrança PIX.");
      return;
    }

    setLoading(true);
    setMessage("");
    setPaid(false);

    try {
      const response = await fetch(CHECKOUT_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          productSlug,
          email: normalizedEmail,
          name: normalizedName,
          document: documentDigits,
        }),
      });
      const data = await response.json();

      if (!response.ok || !data?.reference || !data?.claim) {
        throw new Error(data?.message || "Não foi possível iniciar o pagamento.");
      }

      saveAccess(String(data.reference), String(data.claim));

      const action = data?.action || {};
      const copyPaste = String(
        action?.copyPaste ||
          action?.pixString ||
          action?.qr_code ||
          action?.qrCode ||
          "",
      ).trim();
      const qrImage = normalizeQr(
        action?.qrCodeBase64 ||
          action?.qr_code_base64 ||
          action?.qrImageUrl ||
          action?.qrcodeUrl ||
          "",
      );

      if (data?.transactionId && (copyPaste || qrImage)) {
        setPix({
          reference: String(data.reference),
          claim: String(data.claim),
          transactionId: String(data.transactionId),
          copyPaste,
          qrImage,
          status: String(data.status || "pending"),
        });
        setLoading(false);
        return;
      }

      // Compatibilidade temporária com digital-checkout v7:
      // enquanto a Edge S2S não estiver promovida, mantém o hosted checkout.
      if (data?.checkoutUrl) {
        window.location.href = String(data.checkoutUrl);
        return;
      }

      throw new Error("A cobrança PIX foi criada, mas o QR Code não foi recebido.");
    } catch (error) {
      setMessage(
        error instanceof Error ? error.message : "Falha temporária no pagamento.",
      );
      setLoading(false);
    }
  }

  useEffect(() => {
    if (!pix || paid) return;

    let cancelled = false;
    let timer: ReturnType<typeof setTimeout> | undefined;

    const poll = async () => {
      try {
        const response = await fetch(CHECKOUT_URL, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            action: "status",
            reference: pix.reference,
            claim: pix.claim,
          }),
        });
        const data = await response.json();

        if (!cancelled && response.ok) {
          const nextStatus = String(data?.status || "pending");
          setPix((current) => (current ? { ...current, status: nextStatus } : current));

          if (data?.paid || nextStatus === "succeeded") {
            setPaid(true);
            setMessage("");
            return;
          }
        }
      } catch {
        // A confirmação também pode chegar por webhook; mantém polling silencioso.
      }

      if (!cancelled) timer = setTimeout(poll, 4000);
    };

    timer = setTimeout(poll, 2500);
    return () => {
      cancelled = true;
      if (timer) clearTimeout(timer);
    };
  }, [paid, pix?.reference, pix?.claim]);

  async function copyPix() {
    if (!pix?.copyPaste) return;
    await navigator.clipboard.writeText(pix.copyPaste);
    setCopied(true);
    setTimeout(() => setCopied(false), 1800);
  }

  if (status !== "live") {
    return (
      <div className="rounded-2xl border border-amber-200 bg-amber-50 p-4">
        <p className="text-sm font-extrabold text-amber-950">Edição em preparação</p>
        <p className="mt-1 text-xs leading-5 text-amber-900/75">
          O título já faz parte do catálogo, mas o checkout permanece bloqueado
          até a revisão e a entrega digital passarem pelo QA final.
        </p>
      </div>
    );
  }

  if (paid && pix) {
    return (
      <div className="rounded-2xl border border-emerald-200 bg-emerald-50 p-5">
        <CheckCircle2 className="h-8 w-8 text-emerald-600" />
        <p className="mt-3 text-lg font-black text-emerald-950">
          Pagamento confirmado
        </p>
        <p className="mt-1 text-sm leading-6 text-emerald-900/75">
          O acesso digital foi liberado para esta compra.
        </p>
        <Link
          href={`/conteudos-digitais/acesso?reference=${encodeURIComponent(
            pix.reference,
          )}&claim=${encodeURIComponent(pix.claim)}`}
          className="mt-4 inline-flex h-12 items-center justify-center rounded-xl bg-emerald-700 px-5 text-sm font-black text-white"
        >
          Acessar conteúdo
        </Link>
      </div>
    );
  }

  if (pix) {
    return (
      <div className="rounded-2xl border border-blue-200 bg-white p-5 shadow-sm">
        <div className="flex items-start gap-3">
          <div className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-blue-50">
            <QrCode className="h-5 w-5 text-blue-700" />
          </div>
          <div>
            <p className="font-black text-slate-950">PIX gerado nesta página</p>
            <p className="mt-1 text-xs leading-5 text-slate-500">
              Escaneie o QR Code ou copie o código. A confirmação é automática.
            </p>
          </div>
        </div>

        {pix.qrImage ? (
          <div className="mx-auto mt-5 w-fit rounded-2xl border border-slate-200 bg-white p-3">
            {/* Base64/provider URL is returned by the payment API. */}
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={pix.qrImage}
              alt="QR Code PIX"
              className="h-56 w-56 object-contain"
            />
          </div>
        ) : null}

        {pix.copyPaste ? (
          <>
            <div className="mt-5 rounded-xl bg-slate-50 p-3">
              <p className="text-[10px] font-black uppercase tracking-[0.12em] text-slate-500">
                PIX Copia e Cola
              </p>
              <p className="mt-2 break-all font-mono text-[11px] leading-5 text-slate-700">
                {pix.copyPaste}
              </p>
            </div>
            <button
              type="button"
              onClick={copyPix}
              className="mt-3 flex h-11 w-full items-center justify-center gap-2 rounded-xl border border-blue-200 bg-blue-50 text-sm font-black text-blue-800"
            >
              {copied ? <CheckCircle2 className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
              {copied ? "Código copiado" : "Copiar código PIX"}
            </button>
          </>
        ) : null}

        <div className="mt-4 flex items-center gap-2 text-xs font-bold text-slate-500">
          <LoaderCircle className="h-4 w-4 animate-spin text-blue-600" />
          Aguardando confirmação do pagamento...
        </div>
      </div>
    );
  }

  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
      <div className="mb-4 flex items-center gap-2 rounded-xl bg-blue-50 px-3 py-2 text-xs font-extrabold text-blue-900">
        <QrCode className="h-4 w-4" />
        PIX · pagamento único
      </div>

      <label htmlFor="ebook-name" className="text-xs font-extrabold text-slate-900">
        Nome do pagador
      </label>
      <input
        id="ebook-name"
        type="text"
        autoComplete="name"
        value={name}
        onChange={(event) => setName(event.target.value)}
        placeholder="Seu nome completo"
        className="mt-2 h-12 w-full rounded-xl border border-slate-200 px-4 text-sm outline-none transition focus:border-blue-500"
      />

      <label htmlFor="ebook-document" className="mt-4 block text-xs font-extrabold text-slate-900">
        CPF ou CNPJ
      </label>
      <input
        id="ebook-document"
        inputMode="numeric"
        autoComplete="off"
        value={document}
        onChange={(event) => setDocument(event.target.value)}
        placeholder="Somente números"
        className="mt-2 h-12 w-full rounded-xl border border-slate-200 px-4 text-sm outline-none transition focus:border-blue-500"
      />

      <label htmlFor="ebook-email" className="mt-4 block text-xs font-extrabold text-slate-900">
        E-mail para acesso
      </label>
      <input
        id="ebook-email"
        type="email"
        autoComplete="email"
        value={email}
        onChange={(event) => setEmail(event.target.value)}
        placeholder="voce@email.com"
        className="mt-2 h-12 w-full rounded-xl border border-slate-200 px-4 text-sm outline-none transition focus:border-blue-500"
      />

      <button
        type="button"
        onClick={startCheckout}
        disabled={loading}
        className="mt-4 flex h-12 w-full items-center justify-center gap-2 rounded-xl bg-blue-600 px-5 text-sm font-black text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-60"
      >
        {loading ? (
          <LoaderCircle className="h-4 w-4 animate-spin" />
        ) : (
          <ShoppingCart className="h-4 w-4" />
        )}
        {loading ? "Gerando PIX..." : `Comprar ${productTitle} com PIX`}
      </button>

      <div className="mt-3 flex items-center gap-2 text-[11px] text-slate-500">
        <LockKeyhole className="h-3.5 w-3.5" />
        Valor resolvido no servidor · conteúdo liberado apenas após confirmação.
      </div>
      {message ? <p className="mt-3 text-xs font-semibold text-red-700">{message}</p> : null}
    </div>
  );
}
