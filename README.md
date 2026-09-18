# Novidades.store — Commerce Platform

Production foundation for **Novidades.store**, a multi-storefront discovery-commerce platform.

## Current launch state

- Main storefront: `novidades.store`
- Primary market: Brazil / BRL
- Primary payment rail: XPAYMENTS / PIX S2S
- XPAYMENTS Store: `NOVIDADES-BRL`
- International Store reserved: `NOVIDADES-EURO`
- First dedicated funnel: `signum312.novidades.store`
- Shared Commerce Core: existing AutoHub360 Supabase project
- Supabase project ref: `eivqvrfsreaopzlvhadu`
- Shared DB region: `sa-east-1`
- CI: strict TypeScript + Next.js build on every push to `main`

## Architecture

```text
                    Shared Supabase Commerce Core
                                │
             ┌──────────────────┼──────────────────┐
             │                  │                  │
      novidades.store   signum312...       autohub360.store
             │                  │                  │
             └──────── storefront/listing layer ───┘
                                │
                         orders / inventory
                                │
                            XPAYMENTS
                     ┌──────────┴──────────┐
                     │                     │
               NOVIDADES-BRL        NOVIDADES-EURO
                  BRL / PIX              EUR / preview
```

The canonical `products` table is shared. A product may be published differently through
`product_listings`, `listing_prices` and `product_listing_media` for each storefront.

A dedicated funnel is therefore a sales surface, not a duplicated product database.

## Why reuse the AutoHub360 Supabase project?

The existing project already contained production-oriented tables and RLS for:

- products and variants
- market offers
- inventory
- carts
- orders and order items
- payments
- shipments
- customers
- campaigns and sessions
- CRM / support / automation

The Novidades migration extends this core **additively** with:

- `commerce_organizations`
- `legal_entities`
- `storefronts`
- `storefront_domains`
- `product_listings`
- `listing_prices`
- `product_listing_media`
- storefront/seller/payment-store references on operational records

AutoHub360 remains on the same database and can migrate progressively from its legacy
store-specific catalog access to the generic storefront layer. No destructive database
migration or data copy is required.

## Applied migrations

The shared Supabase project already has these Novidades extensions applied:

- `20260918211728_novidades_multistorefront_core_v1`
- `20260918213200_shared_legal_entity_normalization_v1`

The SQL files are also versioned in this repository and the AutoHub360 repository.

## Seeded storefronts

- `NOVIDADES-BRL` — live / BRL / pt-BR
- `NOVIDADES-EURO` — preview / EUR / en-GB
- `SIGNUM312-BR` — live funnel using `NOVIDADES-BRL`
- `AUTOHUB360-BR` — mapped into the shared storefront model

## Seeded first product

Canonical product:
- SIGNUM 312

Variants:
- `SIGNUM312-PATINA` — R$ 99,90
- `SIGNUM312-GOLD` — R$ 89,90
- `SIGNUM312-DUO` — R$ 169,90

The platform intentionally does not seed fake ratings, fake reviews, fake best-seller badges,
fake stock or unsupported shipping claims.

## Local development

```bash
bun install
cp .env.example .env.local
bun run dev
```

## Production environment

Required for catalog:

```text
NEXT_PUBLIC_SITE_URL=https://novidades.store
NEXT_PUBLIC_SUPABASE_URL=https://eivqvrfsreaopzlvhadu.supabase.co
NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY=<publishable key>
COMMERCE_STOREFRONT_CODE=NOVIDADES-BRL
```

Required server-side for commerce/payment:

```text
SUPABASE_SERVICE_ROLE_KEY=<server only>

XPAYMENTS_API_URL=https://api.xpayments.digital/api/v1
XPAYMENTS_BRL_API_KEY=<NOVIDADES-BRL live key>
XPAYMENTS_EURO_API_KEY=<NOVIDADES-EURO key when enabled>

BRL_SHIPPING_CENTS=<integer cents, 0 means free shipping>
```

Never expose `SUPABASE_SERVICE_ROLE_KEY` or XPAYMENTS private keys using a
`NEXT_PUBLIC_` prefix.

## Public catalog

The homepage reads the shared Commerce Core through the public RLS-protected Supabase surface.

Endpoint:

```text
GET /api/catalog
```

Search:

```text
GET /api/search?q=...
```

A minimal safe fallback contains only SIGNUM 312 so the site can still render if the public
catalog is temporarily unavailable.

## Institutional package

Live routes include:

- `/sobre`
- `/contato`
- `/ajuda`
- `/entregas`
- `/pagamentos`
- `/trocas-e-devolucoes`
- `/cancelamentos`
- `/termos`
- `/privacidade`
- `/cookies`
- `/direitos-de-privacidade`
- `/informacoes-legais`

The site also includes first-party cookie preference handling.

## Seller model

Brazilian seller entity:

```text
69.093.616 MICAELA GOMES DE JESUS
CNPJ 69.093.616/0001-50
```

International entity reserved for eligible international sales:

```text
MGJ EXPERT LTD
Company number 17422467
```

The actual seller must be resolved per storefront/order. A shared database does **not**
mean financial/legal sellers are mixed.

## Visual / conversion rules

The production UI follows these rules:

- mobile-first
- real product imagery for SIGNUM
- no fake ratings/reviews
- no fake scarcity
- no unsupported shipping claims
- product/seller/payment information before checkout
- dedicated funnels remain conversion-first
- main site is discovery/trust/SEO-first

## CI

```bash
bun run typecheck
bun run build
```

Both commands are required by GitHub Actions.

## Before first public traffic

1. Set the Vercel environment variables.
2. Confirm `NOVIDADES-BRL` XPAYMENTS live API key.
3. Decide and configure `BRL_SHIPPING_CENTS`.
4. Deploy the required XPAYMENTS PIX runtime changes.
5. Run one controlled end-to-end PIX order.
6. Verify payment status and fulfillment metadata.
7. Confirm support e-mail aliases are receiving mail.
8. Connect `novidades.store` and `signum312.novidades.store`.
9. Review real mobile/tablet/desktop rendering on the Vercel preview.
10. Only then enable paid traffic.

## Important boundary

Supabase Commerce Core owns:
- product/listing data
- cart/order data
- customer/fulfillment data
- commerce attribution

XPAYMENTS owns:
- payment transaction truth
- provider routing
- financial ledger
- provider fees
- settlement

Do not duplicate the XPAYMENTS financial ledger inside Supabase.
