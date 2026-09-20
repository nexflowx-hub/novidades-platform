-- Safety staging after digital catalog seed.
-- Keep the digital products in Commerce Core but invisible to the current production frontend
-- until the code supporting Conteúdos Digitais is deployed successfully.

update public.product_listings l
set status='draft',
    updated_at=now()
from public.storefronts sf
where sf.id=l.storefront_id
  and sf.code='NOVIDADES-BRL'
  and l.slug in ('conversion-content-os','financeos-mei-2026');

update public.storefront_categories sc
set status='hidden',
    updated_at=now()
from public.storefronts sf
join public.categories c on c.slug='conteudos-digitais'
where sc.storefront_id=sf.id
  and sc.category_id=c.id
  and sf.code='NOVIDADES-BRL';
