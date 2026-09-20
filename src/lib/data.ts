/**
 * NOVIDADES.store — safe fallback catalog.
 *
 * Production source of truth is the shared Supabase Commerce Core.
 * This file exists only as a resilient fallback for the initial public launch.
 * It intentionally contains ONLY products already approved for public use.
 */

export type BadgeId =
  | "novo"
  | "em-alta"
  | "oferta"
  | "tendencia"
  | "mais-vendido";

export interface Category {
  id: string;
  name: string;
  slug: string;
  description: string;
  color: string;
  image: string;
}

export interface Product {
  id: string;
  slug: string;
  name: string;
  categoryId: string;
  price: number;
  currency: "BRL" | "EUR";
  rating?: number;
  reviewCount?: number;
  badge?: BadgeId;
  freeShipping?: boolean;
  image: string;
  secondaryImage?: string;
  tagline?: string;
  description: string;
  storefrontUrl?: string;
  published: boolean;
  fulfillmentType?: "physical" | "digital" | "service";
  requiresShipping?: boolean;
}

export interface VideoCard {
  productId: string;
  poster: string;
  headline: string;
  videoUrl?: string;
}

export const CATEGORIES: Category[] = [
  {
    id: "arte-vida",
    name: "Arte & Vida",
    slug: "arte-e-vida",
    description: "Símbolos, presentes e objetos com significado.",
    color: "#D8C6A5",
    image: "/images/categories/arte.png",
  },
  {
    id: "casa-utilidade",
    name: "Casa & Utilidade",
    slug: "casa-e-utilidade",
    description: "Soluções práticas e descobertas para o seu lar.",
    color: "#E5DDD1",
    image: "/images/categories/casa.png",
  },
  {
    id: "auto-tech",
    name: "Auto & Tech",
    slug: "auto-tech",
    description: "Mobilidade, acessórios e tecnologia útil.",
    color: "#C7DEE8",
    image: "/images/categories/auto.png",
  },
  {
    id: "conteudos-digitais",
    name: "Conteúdos Digitais",
    slug: "conteudos-digitais",
    description: "Guias, sistemas, templates, planilhas e ferramentas digitais.",
    color: "#D9E7FF",
    image: "/images/categories/digital.svg",
  },
  {
    id: "pets",
    name: "Pets",
    slug: "pets",
    description: "Descobertas para a rotina de quem vive com animais.",
    color: "#F4D4C3",
    image: "/images/categories/pets.png",
  },
  {
    id: "saude-bem-estar",
    name: "Saúde & Bem-estar",
    slug: "saude-bem-estar",
    description: "Produtos de bem-estar avaliados antes da publicação.",
    color: "#D8E9D4",
    image: "/images/categories/saude.png",
  },
  {
    id: "viagem-estilo",
    name: "Viagem & Estilo",
    slug: "viagem-estilo",
    description: "Acessórios e ideias para mobilidade e estilo.",
    color: "#C9DDEA",
    image: "/images/categories/viagem.png",
  },
  {
    id: "trabalho-estudo",
    name: "Trabalho & Estudo",
    slug: "trabalho-estudo",
    description: "Ferramentas para produtividade e organização.",
    color: "#DDD5CD",
    image: "/images/categories/trabalho.png",
  },
  {
    id: "presentes",
    name: "Presentes",
    slug: "presentes",
    description: "Seleções pensadas para presentear.",
    color: "#F1C6C0",
    image: "/images/categories/presentes.png",
  },
];

export const PRODUCTS: Product[] = [
  {
    id: "signum312",
    slug: "signum-312",
    name: "SIGNUM 312",
    categoryId: "arte-vida",
    price: 99.9,
    currency: "BRL",
    image: "/images/products/signum-patina-real.webp",
    secondaryImage: "/images/products/signum-gold-real.webp",
    tagline: "Fé. Coragem. Propósito.",
    description:
      "Coleção contemporânea inspirada em simbolismo histórico e cristão.",
    storefrontUrl: "https://signum312.novidades.store",
    published: true,
    fulfillmentType: "physical",
    requiresShipping: true,
  },
  {
    id: "conversion-growth-suite",
    slug: "conversion-growth-suite",
    name: "Conversion Growth Suite",
    categoryId: "conteudos-digitais",
    price: 139,
    currency: "BRL",
    badge: "oferta",
    image: "/images/products/conversion-growth-suite.svg",
    tagline: "Conversion Content OS + Sales Page Blueprint.",
    description:
      "Bundle com mensagem, hooks, conteúdo, wireframes, proof governance, checkout continuity e release QA.",
    storefrontUrl:
      "https://novidades.store/conteudos-digitais/conversion-growth-suite",
    published: true,
    fulfillmentType: "digital",
    requiresShipping: false,
  },
  {
    id: "conversion-content-os",
    slug: "conversion-content-os",
    name: "Conversion Content OS",
    categoryId: "conteudos-digitais",
    price: 97,
    currency: "BRL",
    badge: "novo",
    image: "/images/products/conversion-content-os.svg",
    tagline: "Sistema prático de conteúdo, persuasão e conversão.",
    description:
      "Guia, workbook, Hook Library, Prompt Library, swipe files e matriz de reaproveitamento.",
    storefrontUrl: "https://novidades.store/conteudos-digitais/conversion-content-os",
    published: true,
    fulfillmentType: "digital",
    requiresShipping: false,
  },
  {
    id: "sales-page-blueprint",
    slug: "sales-page-blueprint",
    name: "Sales Page Blueprint",
    categoryId: "conteudos-digitais",
    price: 67,
    currency: "BRL",
    badge: "novo",
    image: "/images/products/sales-page-blueprint.svg",
    tagline: "Wireframes, proof governance, checkout continuity e QA.",
    description:
      "Guia, wireframes, auditoria de claims e prova, QA mobile e de funil, spec para developers e scorecard.",
    storefrontUrl:
      "https://novidades.store/conteudos-digitais/sales-page-blueprint",
    published: true,
    fulfillmentType: "digital",
    requiresShipping: false,
  },
  {
    id: "financeos-mei-2026",
    slug: "financeos-mei-2026",
    name: "FinanceOS MEI 2026",
    categoryId: "conteudos-digitais",
    price: 47,
    currency: "BRL",
    badge: "novo",
    image: "/images/products/financeos-mei-2026.svg",
    tagline: "Controle financeiro e monitor gerencial para MEI.",
    description:
      "Dashboard, transações, resumo mensal, monitor do teto, compromissos, precificação e fontes.",
    storefrontUrl: "https://novidades.store/conteudos-digitais/financeos-mei-2026",
    published: true,
    fulfillmentType: "digital",
    requiresShipping: false,
  },
];

export const VIDEO_CARDS: VideoCard[] = [];

export const POPULAR_SEARCHES = [
  "SIGNUM 312",
  "Arte & Vida",
  "Presentes",
  "Auto & Tech",
  "Conteúdos Digitais",
  "Conversion Content OS",
  "Conversion Growth Suite",
  "FinanceOS MEI",
  "Sales Page Blueprint",
  "Hook Lab",
  "Pets",
  "Casa",
];

export function getProduct(id: string): Product | undefined {
  return PRODUCTS.find((product) => product.id === id && product.published);
}

export function getCategory(id: string): Category | undefined {
  return CATEGORIES.find((category) => category.id === id);
}

export interface SearchResults {
  query: string;
  products: Array<{
    id: string;
    name: string;
    categoryId: string;
    categoryName: string;
    categorySlug: string;
    slug: string;
    price: number;
    currency: "BRL" | "EUR";
    image: string;
    storefrontUrl?: string;
  }>;
  categories: Array<{
    id: string;
    name: string;
    image: string;
    color: string;
  }>;
}

export function searchCatalog(rawQuery: string): SearchResults {
  const query = rawQuery.trim().toLowerCase();

  if (!query) {
    return { query: rawQuery, products: [], categories: [] };
  }

  const normalized = query
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "");

  const match = (text: string) =>
    text
      .toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .includes(normalized);

  const products = PRODUCTS.filter(
    (product) =>
      product.published &&
      (match(product.name) ||
        match(getCategory(product.categoryId)?.name ?? "") ||
        match(product.tagline ?? ""))
  )
    .slice(0, 6)
    .map(({ id, slug, name, categoryId, price, currency, image, storefrontUrl }) => ({
      id,
      slug,
      name,
      categoryId,
      categoryName: getCategory(categoryId)?.name ?? "",
      categorySlug: getCategory(categoryId)?.slug ?? "",
      price,
      currency,
      image,
      storefrontUrl,
    }));

  const categories = CATEGORIES.filter((category) => match(category.name))
    .slice(0, 4)
    .map(({ id, name, image, color }) => ({ id, name, image, color }));

  return { query: rawQuery, products, categories };
}

export const BADGE_LABELS: Record<BadgeId, string> = {
  "mais-vendido": "Mais vendido",
  novo: "Novo",
  "em-alta": "Em alta",
  oferta: "Oferta",
  tendencia: "Tendência",
};
