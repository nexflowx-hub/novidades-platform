/**
 * NOVIDADES.store — safe fallback catalog.
 *
 * Production source of truth is the shared Supabase Commerce Core.
 * This file is a resilient fallback and storefront taxonomy.
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
    id: "utilidades",
    name: "Utilidades",
    slug: "utilidades",
    description: "Soluções práticas, acessórios e itens úteis para o dia a dia.",
    color: "#0B5DC2",
    image: "/images/categories/casa.png",
  },
  {
    id: "auto-tech",
    name: "Auto & Rastreador GPS",
    slug: "auto-tech",
    description: "Mobilidade, rastreamento, segurança e tecnologia automotiva.",
    color: "#0754A6",
    image: "/images/categories/auto.png",
  },
  {
    id: "arte-vida",
    name: "Medalhas & Terços",
    slug: "arte-e-vida",
    description: "Fé, espiritualidade, história, símbolos e presentes com significado.",
    color: "#A57425",
    image: "/images/categories/arte.png",
  },
  {
    id: "conteudos-digitais",
    name: "Academia Digital",
    slug: "conteudos-digitais",
    description: "Software, IA, ferramentas, produtos digitais e soluções para o mercado online.",
    color: "#087FE8",
    image: "/images/categories/digital.svg",
  },
  {
    id: "saude-bem-estar",
    name: "Saúde & Bem-Estar",
    slug: "saude-bem-estar",
    description: "Suplementos, chás, acessórios e produtos de cuidado e bem-estar.",
    color: "#0D8F7A",
    image: "/images/categories/saude.png",
  },
  {
    id: "pets",
    name: "Pets",
    slug: "pets",
    description: "Alimentação, cuidados, acessórios e descobertas para animais.",
    color: "#1475BE",
    image: "/images/categories/pets.png",
  },
  {
    id: "casa-utilidade",
    name: "Casa & Jardim",
    slug: "casa-e-utilidade",
    description: "Decoração, plantas, cozinha, utensílios e organização.",
    color: "#0A6A93",
    image: "/images/categories/casa.png",
  },
  {
    id: "cosmeticos-perfumes",
    name: "Cosméticos & Perfumes",
    slug: "cosmeticos-perfumes",
    description: "Perfumes, maquilhagem, cremes, beleza e cuidado pessoal.",
    color: "#A54275",
    image: "/images/categories/presentes.png",
  },
  {
    id: "roupa-acessorios",
    name: "Roupa & Acessórios",
    slug: "roupa-acessorios",
    description: "Roupa, calçado, relógios, joias e acessórios de estilo.",
    color: "#7C4C91",
    image: "/images/categories/viagem.png",
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
  {
    id: "email-conversion-kit",
    slug: "email-conversion-kit",
    name: "Email Conversion Kit",
    categoryId: "conteudos-digitais",
    price: 47,
    currency: "BRL",
    badge: "novo",
    image: "/images/products/email-conversion-kit.svg",
    tagline: "Welcome, nurture, recovery, launch e post-purchase.",
    description:
      "Lifecycle email playbook, Subject & CTA Library e Campaign Planner XLSX.",
    storefrontUrl:
      "https://novidades.store/conteudos-digitais/email-conversion-kit",
    published: true,
    fulfillmentType: "digital",
    requiresShipping: false,
  },
  {
    id: "digital-product-launch-kit",
    slug: "digital-product-launch-kit",
    name: "Digital Product Launch Kit",
    categoryId: "conteudos-digitais",
    price: 67,
    currency: "BRL",
    badge: "novo",
    image: "/images/products/digital-product-launch-kit.svg",
    tagline: "Validate, package, prove, publish, sell, deliver and learn.",
    description:
      "Playbook, Funnel Map & Release Gates e Launch Workspace XLSX.",
    storefrontUrl:
      "https://novidades.store/conteudos-digitais/digital-product-launch-kit",
    published: true,
    fulfillmentType: "digital",
    requiresShipping: false,
  },
  {
    id: "creator-prompt-library",
    slug: "creator-prompt-library",
    name: "Creator Prompt Library",
    categoryId: "conteudos-digitais",
    price: 37,
    currency: "BRL",
    badge: "novo",
    image: "/images/products/creator-prompt-library.svg",
    tagline: "50 prompts estruturados + Prompt Builder.",
    description:
      "Prompts para research, copy, pages, email, social, ecommerce, operations, analytics e AI workflows.",
    storefrontUrl:
      "https://novidades.store/conteudos-digitais/creator-prompt-library",
    published: true,
    fulfillmentType: "digital",
    requiresShipping: false,
  },
  {
    id: "creator-growth-suite",
    slug: "creator-growth-suite",
    name: "Creator Growth Suite",
    categoryId: "conteudos-digitais",
    price: 219,
    currency: "BRL",
    badge: "oferta",
    image: "/images/products/creator-growth-suite.svg",
    tagline: "5 sistemas para conteúdo, conversão e lançamento.",
    description:
      "CCOS + Sales Page Blueprint + Email Conversion Kit + Launch Kit + Creator Prompt Library.",
    storefrontUrl:
      "https://novidades.store/conteudos-digitais/creator-growth-suite",
    published: true,
    fulfillmentType: "digital",
    requiresShipping: false,
  },
];

export const VIDEO_CARDS: VideoCard[] = [];

export const POPULAR_SEARCHES = [
  "Ofertas Especiais",
  "SIGNUM 312",
  "Medalhas & Terços",
  "Utilidades",
  "Auto & Rastreador GPS",
  "Academia Digital",
  "Software",
  "IA",
  "Produtos Digitais",
  "Conversion Content OS",
  "Creator Growth Suite",
  "FinanceOS MEI",
  "Pets",
  "Casa & Jardim",
  "Saúde & Bem-Estar",
  "Cosméticos & Perfumes",
  "Roupa & Acessórios",
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
