# Novidades Digital — Architecture

## Public surfaces

- `https://novidades.store/conteudos-digitais` — discovery/category surface.
- `https://novidades.store/conteudos-digitais/{slug}` — canonical product detail.
- `https://digital.novidades.store` — reserved for the digital checkout, entitlement, delivery and heavier interactive tools.

## Why the binaries do not live in Git

PDF, ZIP, XLSX, video and future customer bundles must live in private object storage, not in the source repository.

Recommended storage:
1. Supabase Storage private bucket in the shared Commerce Core, or
2. Cloudflare R2 if download traffic/egress becomes material.

GitHub stores code and manifests only.

## Fulfillment model

Digital products use:
- `products.fulfillment_type = 'digital'`
- `products.requires_shipping = false`
- entitlement created only after XPAYMENTS confirms the order/payment state required by the release policy.
- download URLs generated server-side and time-limited.
- no public permanent Drive link as the customer delivery mechanism.

## First digital SKUs

- `DIGITAL-CCOS-001` — Conversion Content OS — R$ 97.
- `DIGITAL-FINMEI-001` — FinanceOS MEI 2026 — R$ 47.

The catalog may be public before checkout activation, but the UI must not claim that purchase or instant access is available until the checkout/entitlement path is operational.

## Subdomain/repository decision

Keep discovery/catalog code in `novidades-platform`.

Use the same repository for `digital.novidades.store` while the digital surface is mostly checkout + entitlement + downloads. Split to a dedicated repository (suggested future name: `novidades-digital`) only when the subdomain becomes an independently deployable application with one or more of:

- authenticated customer library,
- interactive web tools,
- AI generators,
- usage quotas,
- subscriptions,
- heavy media/course player,
- independent release cadence.

A separate repository is an application boundary, not a file-storage strategy.
