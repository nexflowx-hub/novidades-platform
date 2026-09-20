-- Novidades.store — Digital Content Market v1
-- Adds a dedicated public digital-content category and stages the first two digital SKUs.
-- Digital fulfillment is explicitly non-shipping and remains decoupled from binary storage.

insert into public.categories(slug,name,universe,description,icon,sort_order)
values (
  'conteudos-digitais',
  'Conteúdos Digitais',
  'digital',
  'Guias, sistemas, templates, planilhas e ferramentas digitais produzidos e curados pela Novidades.store.',
  'book-open',
  175
)
on conflict (slug) do update set
  name=excluded.name,
  universe=excluded.universe,
  description=excluded.description,
  icon=excluded.icon,
  sort_order=excluded.sort_order,
  updated_at=now();

insert into public.storefront_categories(
  storefront_id,category_id,label_override,status,sort_order,metadata
)
select
  sf.id,c.id,'Conteúdos Digitais','active',c.sort_order,
  jsonb_build_object('surface','digital-content','launch','2026-09')
from public.storefronts sf
join public.categories c on c.slug='conteudos-digitais'
where sf.code='NOVIDADES-BRL'
on conflict (storefront_id,category_id) do update set
  label_override='Conteúdos Digitais',
  status='active',
  sort_order=excluded.sort_order,
  metadata=excluded.metadata,
  updated_at=now();

insert into public.brands(slug,name)
values ('novidades-digital','Novidades Digital')
on conflict (slug) do update set name=excluded.name;

insert into public.products(
  slug,sku,category_id,brand_id,title,subtitle,description,specs,image_key,
  currency,price_cents,compare_at_cents,stock,weight_grams,warranty_months,
  universal,installable,featured,best_seller,rating,review_count,badges,published
)
select
  'conversion-content-os','DIGITAL-CCOS-001',c.id,b.id,
  'Conversion Content OS',
  'Sistema prático de conteúdo, persuasão e conversão.',
  'Guia + workbook + 300 estruturas de hooks + prompts + swipe files + matriz de reaproveitamento.',
  '[]'::jsonb,'conversion-content-os','BRL',9700,null,0,0,0,
  true,false,true,false,0,0,array['novo']::text[],true
from public.categories c
join public.brands b on b.slug='novidades-digital'
where c.slug='conteudos-digitais'
on conflict (slug) do update set
  category_id=excluded.category_id,
  brand_id=excluded.brand_id,
  title=excluded.title,
  subtitle=excluded.subtitle,
  description=excluded.description,
  currency=excluded.currency,
  price_cents=excluded.price_cents,
  featured=true,
  best_seller=false,
  rating=0,
  review_count=0,
  badges=array['novo']::text[],
  published=true,
  updated_at=now();

update public.products
set fulfillment_type='digital',
    requires_shipping=false,
    image_url='/images/products/conversion-content-os.svg',
    updated_at=now()
where slug='conversion-content-os';

insert into public.products(
  slug,sku,category_id,brand_id,title,subtitle,description,specs,image_key,
  currency,price_cents,compare_at_cents,stock,weight_grams,warranty_months,
  universal,installable,featured,best_seller,rating,review_count,badges,published
)
select
  'financeos-mei-2026','DIGITAL-FINMEI-001',c.id,b.id,
  'FinanceOS MEI 2026',
  'Controle financeiro e monitor gerencial para MEI.',
  'Workbook operacional com dashboard, transações, resumo mensal, monitor do teto, compromissos, precificação e fontes.',
  '[]'::jsonb,'financeos-mei-2026','BRL',4700,null,0,0,0,
  true,false,true,false,0,0,array['novo']::text[],true
from public.categories c
join public.brands b on b.slug='novidades-digital'
where c.slug='conteudos-digitais'
on conflict (slug) do update set
  category_id=excluded.category_id,
  brand_id=excluded.brand_id,
  title=excluded.title,
  subtitle=excluded.subtitle,
  description=excluded.description,
  currency=excluded.currency,
  price_cents=excluded.price_cents,
  featured=true,
  best_seller=false,
  rating=0,
  review_count=0,
  badges=array['novo']::text[],
  published=true,
  updated_at=now();

update public.products
set fulfillment_type='digital',
    requires_shipping=false,
    image_url='/images/products/financeos-mei-2026.svg',
    updated_at=now()
where slug='financeos-mei-2026';

insert into public.product_listings(
  storefront_id,product_id,display_category_id,slug,locale,title,subtitle,description,
  seo_title,seo_description,external_funnel_url,status,featured,badges,metadata
)
select
  sf.id,p.id,c.id,p.slug,'pt-BR',
  'Conversion Content OS',
  'Sistema prático de conteúdo, persuasão e conversão.',
  'Pacote digital com guia, workbook, Hook Library, Prompt Library, CTA & Offer Swipe File e Content Repurposing Matrix.',
  'Conversion Content OS | Conteúdos Digitais — Novidades.store',
  'Sistema prático para estruturar mensagens, hooks, conteúdos, CTAs e testes com um workflow consistente.',
  null,'published',true,array['novo']::text[],
  jsonb_build_object(
    'fulfillment','digital',
    'release','1.0',
    'delivery','secure-entitlement',
    'checkout_state','pending-activation'
  )
from public.storefronts sf
join public.products p on p.slug='conversion-content-os'
join public.categories c on c.slug='conteudos-digitais'
where sf.code='NOVIDADES-BRL'
on conflict (storefront_id,slug,locale) do update set
  display_category_id=excluded.display_category_id,
  title=excluded.title,
  subtitle=excluded.subtitle,
  description=excluded.description,
  seo_title=excluded.seo_title,
  seo_description=excluded.seo_description,
  external_funnel_url=null,
  status='published',
  featured=true,
  badges=excluded.badges,
  metadata=excluded.metadata,
  updated_at=now();

insert into public.product_listings(
  storefront_id,product_id,display_category_id,slug,locale,title,subtitle,description,
  seo_title,seo_description,external_funnel_url,status,featured,badges,metadata
)
select
  sf.id,p.id,c.id,p.slug,'pt-BR',
  'FinanceOS MEI 2026',
  'Controle financeiro e monitor gerencial para MEI.',
  'Planilha digital com dashboard, transações, resumo mensal, monitor do teto, compromissos, precificação e fontes.',
  'FinanceOS MEI 2026 | Conteúdos Digitais — Novidades.store',
  'Ferramenta gerencial para organizar receitas, despesas, margem, compromissos e monitorar o teto configurado do MEI.',
  null,'published',true,array['novo']::text[],
  jsonb_build_object(
    'fulfillment','digital',
    'release','1.0',
    'delivery','secure-entitlement',
    'checkout_state','pending-activation'
  )
from public.storefronts sf
join public.products p on p.slug='financeos-mei-2026'
join public.categories c on c.slug='conteudos-digitais'
where sf.code='NOVIDADES-BRL'
on conflict (storefront_id,slug,locale) do update set
  display_category_id=excluded.display_category_id,
  title=excluded.title,
  subtitle=excluded.subtitle,
  description=excluded.description,
  seo_title=excluded.seo_title,
  seo_description=excluded.seo_description,
  external_funnel_url=null,
  status='published',
  featured=true,
  badges=excluded.badges,
  metadata=excluded.metadata,
  updated_at=now();

insert into public.listing_prices(listing_id,variant_id,currency,amount_cents,active)
select l.id,null,'BRL',9700,true
from public.product_listings l
join public.storefronts sf on sf.id=l.storefront_id and sf.code='NOVIDADES-BRL'
where l.slug='conversion-content-os'
on conflict do nothing;

update public.listing_prices lp
set amount_cents=9700, active=true, updated_at=now()
from public.product_listings l
join public.storefronts sf on sf.id=l.storefront_id and sf.code='NOVIDADES-BRL'
where lp.listing_id=l.id
  and lp.variant_id is null
  and lp.currency='BRL'
  and l.slug='conversion-content-os';

insert into public.listing_prices(listing_id,variant_id,currency,amount_cents,active)
select l.id,null,'BRL',4700,true
from public.product_listings l
join public.storefronts sf on sf.id=l.storefront_id and sf.code='NOVIDADES-BRL'
where l.slug='financeos-mei-2026'
on conflict do nothing;

update public.listing_prices lp
set amount_cents=4700, active=true, updated_at=now()
from public.product_listings l
join public.storefronts sf on sf.id=l.storefront_id and sf.code='NOVIDADES-BRL'
where lp.listing_id=l.id
  and lp.variant_id is null
  and lp.currency='BRL'
  and l.slug='financeos-mei-2026';
