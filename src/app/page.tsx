import { StorefrontReference } from "@/components/home/storefront-reference";
import { getPublicCatalog } from "@/lib/commerce-db";
import { CATEGORIES, type BadgeId, type Product } from "@/lib/data";

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": "https://novidades.store/#organization",
      name: "Novidades.store",
      url: "https://novidades.store",
      slogan: "Mais do que você procura.",
    },
    {
      "@type": "WebSite",
      "@id": "https://novidades.store/#website",
      url: "https://novidades.store",
      name: "Novidades.store",
      inLanguage: "pt-BR",
      publisher: { "@id": "https://novidades.store/#organization" },
      potentialAction: {
        "@type": "SearchAction",
        target: "https://novidades.store/buscar?q={search_term_string}",
        "query-input": "required name=search_term_string",
      },
    },
  ],
};

const validBadges = new Set<BadgeId>([
  "novo",
  "em-alta",
  "oferta",
  "tendencia",
  "mais-vendido",
]);

export default async function HomePage() {
  const catalog = await getPublicCatalog();

  const products: Product[] = catalog
    .filter((listing) => listing.priceCents !== null)
    .map((listing) => {
      const category =
        CATEGORIES.find((item) => item.slug === listing.categorySlug) ??
        CATEGORIES.find((item) => item.id === listing.categorySlug) ??
        CATEGORIES[0];

      const firstBadge = listing.badges.find((badge): badge is BadgeId =>
        validBadges.has(badge as BadgeId),
      );

      return {
        id: listing.productId,
        slug: listing.slug,
        name: listing.title,
        categoryId: category.id,
        price: (listing.priceCents ?? 0) / 100,
        currency: listing.currency,
        badge: firstBadge,
        image: listing.image,
        tagline: listing.subtitle,
        description: listing.description,
        storefrontUrl: listing.funnelUrl ?? undefined,
        published: true,
        fulfillmentType: listing.fulfillmentType,
        requiresShipping: listing.requiresShipping,
      };
    });

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <StorefrontReference products={products} />
    </>
  );
}
