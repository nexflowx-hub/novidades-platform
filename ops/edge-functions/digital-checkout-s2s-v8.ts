// @ts-nocheck
// Staged source for Supabase Edge Function digital-checkout v8.
// This file is versioned for review; production promotion is performed separately in Supabase.
import { createClient } from "jsr:@supabase/supabase-js@2";

const STOREFRONT_CODE = "NOVIDADES-BRL";
const XPAYMENTS_BASE = "https://api.xpayments.digital/api/v1";
const ALLOWED_ORIGINS = new Set([
  "https://novidades.store",
  "https://www.novidades.store",
  "https://digital.novidades.store",
]);

function cors(req: Request) {
  const origin = req.headers.get("origin");
  const allowed = !origin || ALLOWED_ORIGINS.has(origin);
  return {
    allowed,
    headers: {
      "Access-Control-Allow-Origin":
        origin && ALLOWED_ORIGINS.has(origin) ? origin : "https://novidades.store",
      "Access-Control-Allow-Headers": "content-type",
      "Access-Control-Allow-Methods": "POST, OPTIONS",
      "Content-Type": "application/json",
      "Cache-Control": "no-store",
      Vary: "Origin",
    },
  };
}

function randomHex(bytes: number) {
  const buffer = new Uint8Array(bytes);
  crypto.getRandomValues(buffer);
  return Array.from(buffer, (b) => b.toString(16).padStart(2, "0")).join("");
}

async function sha256(value: string) {
  const digest = await crypto.subtle.digest("SHA-256", new TextEncoder().encode(value));
  return Array.from(new Uint8Array(digest), (b) => b.toString(16).padStart(2, "0")).join("");
}

function digits(value: unknown) {
  return String(value ?? "").replace(/\D/g, "");
}

function normalizeStatus(value: unknown) {
  const status = String(value ?? "").trim().toLowerCase();
  if (["succeeded", "paid", "completed", "complete", "completo"].includes(status)) return "succeeded";
  if (["failed", "failure", "falha"].includes(status)) return "failed";
  if (["canceled", "cancelled", "cancelado"].includes(status)) return "canceled";
  if (["expired", "expirado"].includes(status)) return "expired";
  if (["processing", "pending", "pendente", "requires_action"].includes(status)) return "processing";
  return "pending";
}

async function grantEntitlements(supabase: any, intent: any) {
  const { data: inclusions, error: inclusionError } = await supabase
    .from("digital_product_inclusions")
    .select("included_sku,sort_order")
    .eq("parent_sku", intent.product_sku)
    .eq("active", true)
    .order("sort_order", { ascending: true });
  if (inclusionError) throw inclusionError;

  const skus = [
    intent.product_sku,
    ...(inclusions || []).map((item: any) => String(item.included_sku)),
  ];
  const now = new Date().toISOString();

  const { error } = await supabase.from("digital_entitlements").upsert(
    skus.map((sku: string) => ({
      product_sku: sku,
      customer_email: intent.customer_email,
      xpayments_reference: intent.reference,
      transaction_id: intent.transaction_id,
      status: "active",
      granted_at: now,
      metadata: {
        source: "xpayments-s2s-poll",
        parent_sku: intent.product_sku,
        included: sku !== intent.product_sku,
      },
      updated_at: now,
    })),
    { onConflict: "product_sku,xpayments_reference" },
  );
  if (error) throw error;
}

Deno.serve(async (req: Request) => {
  const c = cors(req);
  const json = (body: unknown, status = 200) =>
    new Response(JSON.stringify(body), { status, headers: c.headers });

  if (req.method === "OPTIONS") {
    return new Response(null, { status: c.allowed ? 204 : 403, headers: c.headers });
  }
  if (!c.allowed) return json({ message: "origin_not_allowed" }, 403);
  if (req.method !== "POST") return json({ message: "method_not_allowed" }, 405);

  try {
    const body = await req.json();
    const supabase = createClient(
      Deno.env.get("SUPABASE_URL")!,
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!,
      { auth: { persistSession: false, autoRefreshToken: false } },
    );

    const { data: secret } = await supabase
      .from("digital_runtime_secrets")
      .select("secret_value")
      .eq("name", "xpayments_api_key")
      .single();
    if (!secret?.secret_value) return json({ message: "Pagamento indisponível." }, 503);

    if (String(body?.action || "create").toLowerCase() === "status") {
      const reference = String(body?.reference || "").trim();
      const claim = String(body?.claim || "").trim();
      if (!reference || !claim) return json({ message: "Credenciais inválidas." }, 400);

      const claimHash = await sha256(claim);
      const { data: intent } = await supabase
        .from("digital_checkout_intents")
        .select("*")
        .eq("reference", reference)
        .eq("claim_token_hash", claimHash)
        .maybeSingle();
      if (!intent) return json({ message: "Compra não encontrada." }, 404);

      if (intent.status === "succeeded") {
        return json({ status: "succeeded", paid: true, reference, productSlug: intent.product_slug });
      }
      if (!intent.transaction_id) {
        return json({ status: normalizeStatus(intent.status), paid: false, reference });
      }

      const response = await fetch(
        `${XPAYMENTS_BASE}/payments/transactions/${encodeURIComponent(intent.transaction_id)}`,
        { headers: { Authorization: `Bearer ${secret.secret_value}`, Accept: "application/json" } },
      );
      const payload = await response.json().catch(() => ({}));
      const status = response.ok && payload?.success
        ? normalizeStatus(payload?.data?.status)
        : normalizeStatus(intent.status);

      await supabase.from("digital_checkout_intents").update({
        status,
        updated_at: new Date().toISOString(),
      }).eq("reference", reference);

      if (status === "succeeded") {
        intent.status = status;
        await grantEntitlements(supabase, intent);
      }

      return json({
        status,
        paid: status === "succeeded",
        reference,
        transactionId: intent.transaction_id,
        productSlug: intent.product_slug,
      });
    }

    const slug = String(body?.productSlug || "").trim().toLowerCase();
    const email = String(body?.email || "").trim().toLowerCase();
    const name = String(body?.name || "").trim().replace(/\s+/g, " ");
    const document = digits(body?.document);

    if (
      !/^[a-z0-9][a-z0-9-]{1,100}$/.test(slug) ||
      !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) ||
      name.length < 3 ||
      ![11, 14].includes(document.length)
    ) {
      return json({ message: "Informe nome, e-mail e CPF/CNPJ válidos." }, 400);
    }

    const { data: storefront } = await supabase
      .from("storefronts")
      .select("id")
      .eq("code", STOREFRONT_CODE)
      .eq("status", "live")
      .maybeSingle();
    if (!storefront?.id) return json({ message: "Loja indisponível." }, 503);

    const { data: listing } = await supabase
      .from("product_listings")
      .select("id,product_id,metadata")
      .eq("storefront_id", storefront.id)
      .eq("slug", slug)
      .eq("status", "published")
      .maybeSingle();
    if (!listing?.id) return json({ message: "Produto indisponível." }, 404);

    const { data: product } = await supabase
      .from("products")
      .select("sku,slug,title,published,fulfillment_type,requires_shipping")
      .eq("id", listing.product_id)
      .maybeSingle();
    if (
      !product?.sku || !product.published ||
      product.fulfillment_type !== "digital" || product.requires_shipping
    ) {
      return json({ message: "Produto digital indisponível." }, 409);
    }

    const { data: price } = await supabase
      .from("listing_prices")
      .select("currency,amount_cents")
      .eq("listing_id", listing.id)
      .eq("active", true)
      .order("amount_cents", { ascending: true })
      .limit(1)
      .maybeSingle();
    if (!price?.amount_cents || String(price.currency).trim() !== "BRL") {
      return json({ message: "Preço PIX indisponível." }, 409);
    }

    const { count: assetCount } = await supabase
      .from("digital_assets")
      .select("id", { count: "exact", head: true })
      .eq("product_sku", product.sku)
      .eq("active", true);
    const { count: readerBlocks } = await supabase
      .from("digital_content_blocks")
      .select("id", { count: "exact", head: true })
      .eq("product_slug", product.slug)
      .eq("active", true);

    if (!(assetCount || 0) && !(readerBlocks || 0)) {
      return json({ message: "Entrega digital ainda não está pronta." }, 409);
    }

    const reference = `NVD-${product.sku}-${Date.now()}-${randomHex(4)}`;
    const claim = randomHex(32);
    const claimHash = await sha256(claim);

    await supabase.from("digital_checkout_intents").insert({
      reference,
      product_sku: product.sku,
      product_slug: product.slug,
      customer_email: email,
      amount_minor: price.amount_cents,
      currency: "BRL",
      status: "creating",
      claim_token_hash: claimHash,
      claim_expires_at: new Date(Date.now() + 30 * 86400000).toISOString(),
      metadata: {
        source: "novidades-store",
        checkout_mode: "embedded_pix_s2s",
        listing_id: listing.id,
        payer_document_last4: document.slice(-4),
      },
    });

    const xpay = await fetch(`${XPAYMENTS_BASE}/payments/charge`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${secret.secret_value}`,
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({
        amount: Number(price.amount_cents),
        currency: "BRL",
        payment_method_types: ["pix"],
        reference,
        customer: {
          name,
          email,
          cpf: document.length === 11 ? document : undefined,
          cnpj: document.length === 14 ? document : undefined,
          document,
          taxId: document,
        },
        metadata: {
          source: "novidades-store",
          order_id: reference,
          reference,
          productSlug: product.slug,
          sku: product.sku,
          storefront: STOREFRONT_CODE,
          fulfillment: "digital",
        },
      }),
    });
    const payload = await xpay.json().catch(() => ({}));

    if (!xpay.ok || !payload?.success || !payload?.transactionId) {
      await supabase.from("digital_checkout_intents").update({
        status: "failed",
        updated_at: new Date().toISOString(),
      }).eq("reference", reference);
      return json({ message: payload?.error?.message || payload?.message || "Não foi possível gerar o PIX." }, 502);
    }

    const paymentStatus = normalizeStatus(payload?.status);
    await supabase.from("digital_checkout_intents").update({
      transaction_id: String(payload.transactionId),
      status: paymentStatus,
      updated_at: new Date().toISOString(),
    }).eq("reference", reference);

    return json({
      reference,
      claim,
      transactionId: String(payload.transactionId),
      status: paymentStatus,
      paymentMethod: "pix",
      action: payload?.action || null,
      product: {
        slug: product.slug,
        sku: product.sku,
        title: product.title,
        amountMinor: Number(price.amount_cents),
        currency: "BRL",
      },
    });
  } catch (error) {
    console.error("[DIGITAL_CHECKOUT_S2S]", error);
    return json({ message: "Falha ao processar a cobrança PIX." }, 500);
  }
});
