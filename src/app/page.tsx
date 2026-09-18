import { CommerceHero } from "@/components/home/commerce-hero";
import { CategoryShortcuts } from "@/components/home/category-shortcuts";
import { FeaturedProducts } from "@/components/home/featured-products";
import { VideoDiscovery } from "@/components/home/video-discovery";
import { GiftBanner } from "@/components/home/gift-banner";
import { FeaturedCategories } from "@/components/home/featured-categories";
import { TrustStrip } from "@/components/home/trust-strip";

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": "https://novidades.store/#organization",
      name: "Novidades.store",
      url: "https://novidades.store",
      slogan: "Todo dia, uma boa descoberta.",
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

export default function HomePage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <CommerceHero />
      <CategoryShortcuts />
      <FeaturedProducts />
      <VideoDiscovery />
      <GiftBanner />
      <FeaturedCategories />
      <TrustStrip />
    </>
  );
}
