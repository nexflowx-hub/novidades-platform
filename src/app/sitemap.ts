import type { MetadataRoute } from "next";
import { getPublicCatalog } from "@/lib/commerce-db";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const base = process.env.NEXT_PUBLIC_SITE_URL || "https://novidades.store";
  const catalog = await getPublicCatalog();

  const staticRoutes = [
    "",
    "/sobre",
    "/contato",
    "/ajuda",
    "/conteudos-digitais",
    "/entregas",
    "/pagamentos",
    "/trocas-e-devolucoes",
    "/cancelamentos",
    "/termos",
    "/privacidade",
    "/cookies",
    "/direitos-de-privacidade",
    "/informacoes-legais",
  ];

  const staticEntries: MetadataRoute.Sitemap = staticRoutes.map((path) => ({
    url: base + path,
    lastModified: new Date(),
    changeFrequency: path === "" ? "daily" : "monthly",
    priority: path === "" ? 1 : path === "/conteudos-digitais" ? 0.85 : 0.35,
  }));

  const productEntries: MetadataRoute.Sitemap = catalog
    .filter((item) => item.priceCents !== null)
    .map((item) => ({
      url:
        base +
        "/" +
        encodeURIComponent(item.categorySlug) +
        "/" +
        encodeURIComponent(item.slug),
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: item.featured ? 0.9 : 0.7,
    }));

  return [...staticEntries, ...productEntries];
}
