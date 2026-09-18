# Novidades.store — Multi-Storefront Discovery Commerce Platform

> Todo dia, uma boa descoberta.

Plataforma de **discovery commerce com curadoria** que funciona como marca-mãe de
múltiplos ecossistemas (Novidades.store, AutoHub360.store, MyPets.lat, Arte&Vida e
funnels dedicados), compartilhando um Commerce Core comum.

**Fase atual: Fase 1** — homepage commerce, navegação responsiva, busca global,
categorias, product cards, listagem SIGNUM 312 com link para funil dedicado,
camada de confiança XPAYMENTS e bottom navigation mobile.

---

## Stack

| Camada    | Tecnologia                                      |
| --------- | ----------------------------------------------- |
| Framework | Next.js 16 (App Router) + React 19 + TypeScript |
| Styling   | Tailwind CSS 4 + shadcn/ui (New York)           |
| Estado    | Zustand (persistido: carrinho, favoritos)       |
| Animação  | Framer Motion (respeita `prefers-reduced-motion`) |
| Ícones    | Lucide React                                    |
| Fontes    | Inter (UI) · Playfair Display (editorial)       |
| Banco     | Prisma ORM (SQLite no sandbox; PostgreSQL/Supabase na Fase 2) |

## Arquitetura

```
src/
├─ app/
│  ├─ layout.tsx            # Header, Footer, overlays globais, Toaster
│  ├─ page.tsx              # Home (seções server components + JSON-LD)
│  ├─ icon.svg              # Favicon da marca
│  └─ api/search/route.ts   # GET /api/search?q= (busca produtos+categorias)
├─ components/
│  ├─ layout/               # TopHeader, Footer, MobileBottomNav, SearchOverlay,
│  │                        # CartDrawer, FavoritesDrawer, MobileMenu, dialogs
│  ├─ home/                 # CommerceHero, CategoryShortcuts, FeaturedProducts,
│  │                        # VideoDiscovery, GiftBanner, FeaturedCategories, TrustStrip
│  └─ commerce/             # ProductCard, Price, RatingStars, ProductBadge, Reveal
├─ lib/
│  ├─ data.ts               # Catálogo Fase 1 (categorias, produtos, vídeos, busca)
│  ├─ store/                # zustand: ui, cart, favorites
│  ├─ format.ts             # BRL + parcelamento
│  └─ scroll.ts             # navegação por seções
└─ public/images/           # assets de produto/categoria/vídeo (AI-generated)
```

### Modelo de dados alvo (Commerce Core — Fases 2–3)

`organizations → brands → seller_entities → storefronts → domains → products →
product_variants → listings → listing_media → prices → inventory_items →
warehouses → customers → carts → checkout_sessions → orders → order_items →
payments → shipments → fulfillments → campaigns → attribution_events → reviews`

## Conversão e confiança

- Preço sempre visível; frete e métodos de pagamento explícitos.
- **Zero dados inventados em produção**: ratings/avaliações exibidos são
  placeholders de demonstração (`reviewsAreMock: true` em `src/lib/data.ts`) e
  devem ser substituídos por reviews reais antes de publicar.
- Badges 100% data-driven; sem escassez falsa, sem depoimentos falsos.
- Pagamentos: **XPAYMENTS** — loja `NOVIDADES-BRL` (PIX), `NOVIDADES-EURO`
  (cartão + MB WAY, em breve).
- Funis dedicados (ex.: `signum312.novidades.store`) mantêm a assinatura
  "Uma experiência Novidades.store".

## Rodando

```bash
bun install
bun run dev      # http://localhost:3000
bun run lint
bun run db:push  # (quando o schema Prisma for usado na Fase 2)
```

## Roadmap

- **Fase 2** — catálogo PostgreSQL/Supabase, páginas de produto, carrinho
  server-side, checkout XPAYMENTS, pedidos, inventário.
- **Fase 3** — Commerce Core API (`api.novidades.store`), integrações
  AutoHub360/MyPets, NOVIDADES-EURO, Meta CAPI.
- **Fase 4** — recomendações com AI, feed de vídeo completo, personalização,
  conta cross-store, busca semântica.

## Repositórios relacionados

- `signum312.novidades.store` — funil dedicado (repo próprio, experiência custom).

---

© Novidades.store — projeto privado. Todos os direitos reservados.
