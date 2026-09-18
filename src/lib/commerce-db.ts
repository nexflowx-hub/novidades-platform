import "server-only";

import {
  CATEGORIES,
  PRODUCTS,
  searchCatalog as searchFallbackCatalog,
  type SearchResults,
} from "@/lib/data";

const SUPABASE_URL =
  process.env.NEXT_PUBLIC_SUPABASE_URL ||
  "https://eivqvrfsreaopzlvhadu.supabase.co";

const SUPABASE_KEY =
  process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY || "";

const STOREFRONT_CODE =
  process.env.COMMERCE_STOREFRONT_CODE || "NOVIDADES-BRL";

export interface CommerceListing {
  listingId: string;
  productId: string;
  slug: string;
  title: string;
  subtitle: string;
  description: string;
  categorySlug: string;
  categoryName: string;
  brandName: string | null;
  image: string;
  gallery: string[];
  funnelUrl: string | null;
  featured: boolean;
  badges: string[];
  priceCents: number | null;
  currency: "BRL" | "EUR";
}

function headers() {
  return {
    apikey: SUPABASE_KEY,
    Authorization: `Bearer ${SUPABASE_KEY}`,
    Accept: "application/json",
  };
}

function safeProductImage(slug: string, remote?: string | null) {
  if (remote) return remote;
  if (slug === "signum-312") return "/images/products/signum-patina-real.webp";
  return "/images/products/signum-patina-real.webp";
}

async function rest<T>(path: string): Promise<T> {
  if (!SUPABASE_KEY) {
    throw new Error("SUPABASE_PUBLIC_KEY_NOT_CONFIGURED");
  }

  const response = await fetch(`${SUPABASE_URL}/rest/v1/${path}`, {
    headers: headers(),
    next: { revalidate: 60 },
  });

  if (!response.ok) {
    const body = await response.text().catch(() => "");
    throw new Error(`SUPABASE_REST_${response.status}: ${body.slice(0, 300)}`);
  }

  return (await response.json()) as T;
}

export async function getPublicCatalog(): Promise<CommerceListing[]> {
  try {
    const rows = await rest<
      Array<{
        storefront_code: string;
        listing_id: string;
        listing_slug: string;
        title: string;
        subtitle: string;
        description: string;
        external_funnel_url: string | null;
        featured: boolean;
        badges: string[];
        product_id: string;
        image_url: string | null;
        gallery_urls: string[] | null;
        category_slug: string;
        category_name: string;
        brand_name: string | null;
        default_currency: "BRL" | "EUR";
      }>
    >(
      "storefront_catalog?select=storefront_code,listing_id,listing_slug,title,subtitle,description,external_funnel_url,featured,badges,product_id,image_url,gallery_urls,category_slug,category_name,brand_name,default_currency&storefront_code=eq." +
        encodeURIComponent(STOREFRONT_CODE)
    );

    if (rows.length === 0) return [];

    const listingIds = rows.map((row) => row.listing_id);
    const priceFilter = listingIds.map((id) => `"${id}"`).join(",");

    const prices = await rest<
      Array<{
        listing_id: string;
        currency: "BRL" | "EUR";
        amount_cents: number;
        active: boolean;
      }>
    >(
      "listing_prices?select=listing_id,currency,amount_cents,active&active=eq.true&listing_id=in.(" +
        priceFilter +
        ")"
    );

    return rows.map((row) => {
      const rowPrices = prices
        .filter((price) => price.listing_id === row.listing_id)
        .sort((a, b) => a.amount_cents - b.amount_cents);

      return {
        listingId: row.listing_id,
        productId: row.product_id,
        slug: row.listing_slug,
        title: row.title,
        subtitle: row.subtitle,
        description: row.description,
        categorySlug: row.category_slug,
        categoryName: row.category_name,
        brandName: row.brand_name,
        image: safeProductImage(row.listing_slug, row.image_url),
        gallery: row.gallery_urls ?? [],
        funnelUrl: row.external_funnel_url,
        featured: row.featured,
        badges: row.badges ?? [],
        priceCents: rowPrices[0]?.amount_cents ?? null,
        currency: rowPrices[0]?.currency ?? row.default_currency,
      };
    });
  } catch (error) {
    console.error("[commerce-db] catalog fallback", error);

    return PRODUCTS.filter((product) => product.published).map((product) => ({
      listingId: `fallback-${product.id}`,
      productId: product.id,
      slug: product.slug,
      title: product.name,
      subtitle: product.tagline ?? "",
      description: product.description,
      categorySlug:
        CATEGORIES.find((category) => category.id === product.categoryId)?.slug ?? "",
      categoryName:
        CATEGORIES.find((category) => category.id === product.categoryId)?.name ?? "",
      brandName: null,
      image: product.image,
      gallery: product.secondaryImage ? [product.secondaryImage] : [],
      funnelUrl: product.storefrontUrl ?? null,
      featured: true,
      badges: [],
      priceCents: Math.round(product.price * 100),
      currency: product.currency,
    }));
  }
}

export async function searchPublicCatalog(rawQuery: string): Promise<SearchResults> {
  const query = rawQuery.trim();

  if (!query) return { query: rawQuery, products: [], categories: [] };

  try {
    const listings = await getPublicCatalog();
    const normalized = query
      .toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "");

    const includes = (value: string) =>
      value
        .toLowerCase()
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .includes(normalized);

    const products = listings
      .filter(
        (listing) =>
          includes(listing.title) ||
          includes(listing.subtitle) ||
          includes(listing.categoryName)
      )
      .slice(0, 8)
      .map((listing) => ({
        id: listing.productId,
        name: listing.title,
        categoryId: listing.categorySlug,
        categoryName: listing.categoryName,
        price: (listing.priceCents ?? 0) / 100,
        image: listing.image,
        storefrontUrl: listing.funnelUrl ?? undefined,
      }));

    const categories = CATEGORIES.filter((category) => includes(category.name))
      .slice(0, 4)
      .map(({ id, name, image, color }) => ({ id, name, image, color }));

    return { query: rawQuery, products, categories };
  } catch {
    return searchFallbackCatalog(rawQuery);
  }
}
