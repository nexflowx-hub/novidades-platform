import { SITE_TEMPLATE_BATCH_01 } from "./batch-01";
import { SITE_TEMPLATE_BATCH_02 } from "./batch-02";
import { SITE_TEMPLATE_BATCH_03 } from "./batch-03";
import { SITE_TEMPLATE_BATCH_04 } from "./batch-04";
import { SITE_TEMPLATE_BATCH_04B } from "./batch-04b";
import { SITE_TEMPLATE_BATCH_05 } from "./batch-05";
import { SITE_TEMPLATE_BATCH_06 } from "./batch-06";
import { SITE_TEMPLATE_BATCH_07 } from "./batch-07";
import { SITE_TEMPLATE_BATCH_08 } from "./batch-08";
import type { SiteTemplateSource } from "./types";

const RAW_SITE_TEMPLATES: SiteTemplateSource[] = [
  ...SITE_TEMPLATE_BATCH_01,
  ...SITE_TEMPLATE_BATCH_02,
  ...SITE_TEMPLATE_BATCH_03,
  ...SITE_TEMPLATE_BATCH_04,
  ...SITE_TEMPLATE_BATCH_04B,
  ...SITE_TEMPLATE_BATCH_05,
  ...SITE_TEMPLATE_BATCH_06,
  ...SITE_TEMPLATE_BATCH_07,
  ...SITE_TEMPLATE_BATCH_08,
];

function uniqueSlugs(items: SiteTemplateSource[]) {
  const seen = new Map<string, number>();
  return items.map((item) => {
    const count = seen.get(item.slug) ?? 0;
    seen.set(item.slug, count + 1);
    if (count === 0) return item;
    const suffix = item.sourceId.replace(/[^a-zA-Z0-9]/g, "").slice(-6).toLowerCase();
    return { ...item, slug: `${item.slug}-${suffix || count + 1}` };
  });
}

export const SITE_TEMPLATES = uniqueSlugs(RAW_SITE_TEMPLATES);

export const SITE_TEMPLATE_CATEGORIES = Array.from(
  SITE_TEMPLATES.reduce((map, item) => {
    const current = map.get(item.category) ?? {
      name: item.category,
      slug: item.categorySlug,
      count: 0,
    };
    current.count += 1;
    map.set(item.category, current);
    return map;
  }, new Map<string, { name: string; slug: string; count: number }>())
    .values(),
).sort((a, b) => a.name.localeCompare(b.name, "pt-BR"));

export function getSiteTemplate(slug: string) {
  return SITE_TEMPLATES.find((item) => item.slug === slug);
}

export function getTemplatesByCategory(categorySlug: string) {
  return SITE_TEMPLATES.filter((item) => item.categorySlug === categorySlug);
}
