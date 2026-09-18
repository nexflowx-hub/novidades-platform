/**
 * NOVIDADES.store — Catálogo central (Fase 1)
 *
 * Fonte da verdade: especificação técnica do projeto.
 * IMPORTANTE (spec.critical_notes): ratings e contagens de avaliações são
 * PLACEHOLDERS de demonstração (`reviewsAreMock: true`) e devem ser
 * substituídos por avaliações reais antes da produção. Badges são data-driven.
 */

export type BadgeId =
  | "mais-vendido"
  | "novo"
  | "em-alta"
  | "oferta"
  | "tendencia";

export interface Category {
  id: string;
  name: string;
  slug: string;
  description: string;
  /** Cor de destaque da categoria (spec.category_colors) */
  color: string;
  image: string;
}

export interface Product {
  id: string;
  slug: string;
  name: string;
  categoryId: string;
  price: number;
  originalPrice?: number;
  currency: "BRL";
  /** MOCK: placeholder até existirem avaliações reais */
  rating: number;
  reviewCount: number;
  reviewsAreMock: true;
  badge?: BadgeId;
  freeShipping: boolean;
  image: string;
  tagline?: string;
  description: string;
  /** Funil dedicado (ex.: signum312.novidades.store) */
  storefrontUrl?: string;
}

export interface VideoCard {
  productId: string;
  poster: string;
  headline: string;
}

export const CATEGORIES: Category[] = [
  {
    id: "arte-vida",
    name: "Arte & Vida",
    slug: "arte-e-vida",
    description: "Símbolos, decoração, presentes e produtos com significado.",
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
    description: "Tecnologia e acessórios para o seu veículo.",
    color: "#C7DEE8",
    image: "/images/categories/auto.png",
  },
  {
    id: "pets",
    name: "Pets",
    slug: "pets",
    description: "Produtos para cuidar de quem você ama.",
    color: "#F4D4C3",
    image: "/images/categories/pets.png",
  },
  {
    id: "saude-bem-estar",
    name: "Saúde & Bem-estar",
    slug: "saude-bem-estar",
    description: "Equilíbrio e qualidade de vida no dia a dia.",
    color: "#D8E9D4",
    image: "/images/categories/saude.png",
  },
  {
    id: "viagem-estilo",
    name: "Viagem & Estilo",
    slug: "viagem-estilo",
    description: "Acessórios para o próximo destino.",
    color: "#C9DDEA",
    image: "/images/categories/viagem.png",
  },
  {
    id: "trabalho-estudo",
    name: "Trabalho & Estudo",
    slug: "trabalho-estudo",
    description: "Produtividade e organização para a rotina.",
    color: "#DDD5CD",
    image: "/images/categories/trabalho.png",
  },
  {
    id: "presentes",
    name: "Presentes",
    slug: "presentes",
    description: "Sugestões para marcar momentos especiais.",
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
    rating: 4.9,
    reviewCount: 128,
    reviewsAreMock: true,
    badge: "mais-vendido",
    freeShipping: true,
    image: "/images/products/signum.png",
    tagline: "Fé. Coragem. Propósito.",
    description: "Mais que um colar. Um símbolo que atravessa o tempo.",
    storefrontUrl: "https://signum312.novidades.store",
  },
  {
    id: "pet-tracker-x1",
    slug: "rastreador-pet-x1",
    name: "Rastreador Pet X1",
    categoryId: "pets",
    price: 149.9,
    currency: "BRL",
    rating: 4.8,
    reviewCount: 64,
    reviewsAreMock: true,
    badge: "novo",
    freeShipping: true,
    image: "/images/products/pet-tracker.png",
    tagline: "Segurança para quem você ama.",
    description: "Acompanhe seu pet e ganhe mais tranquilidade no dia a dia.",
  },
  {
    id: "mini-projector-hd",
    slug: "mini-projetor-hd",
    name: "Mini Projetor HD",
    categoryId: "casa-utilidade",
    price: 299.9,
    currency: "BRL",
    rating: 4.7,
    reviewCount: 92,
    reviewsAreMock: true,
    badge: "em-alta",
    freeShipping: true,
    image: "/images/products/projector.png",
    tagline: "Cinema em qualquer lugar.",
    description: "Transforme qualquer ambiente em uma sala de cinema.",
  },
  {
    id: "magnetic-support",
    slug: "suporte-magnetico-3-em-1",
    name: "Suporte Magnético 3 em 1",
    categoryId: "auto-tech",
    price: 89.9,
    originalPrice: 119.9,
    currency: "BRL",
    rating: 4.6,
    reviewCount: 203,
    reviewsAreMock: true,
    badge: "oferta",
    freeShipping: true,
    image: "/images/products/car-mount.png",
    tagline: "Tecnologia ao seu alcance.",
    description: "Seu smartphone sempre ao alcance, com fixação magnética prática.",
  },
  {
    id: "explorer-backpack",
    slug: "mochila-explorer",
    name: "Mochila Explorer",
    categoryId: "viagem-estilo",
    price: 259.9,
    currency: "BRL",
    rating: 4.8,
    reviewCount: 47,
    reviewsAreMock: true,
    badge: "tendencia",
    freeShipping: false,
    image: "/images/products/backpack.png",
    tagline: "Pronto para o próximo destino.",
    description: "Companheira ideal para viagens, trilhas e o dia a dia.",
  },
];

export const VIDEO_CARDS: VideoCard[] = [
  { productId: "signum312", poster: "/images/videos/signum.png", headline: "Um símbolo que inspira." },
  { productId: "pet-tracker-x1", poster: "/images/videos/pet.png", headline: "Segurança para quem você ama." },
  { productId: "mini-projector-hd", poster: "/images/videos/projector.png", headline: "Cinema em qualquer lugar." },
  { productId: "magnetic-support", poster: "/images/videos/mount.png", headline: "Tecnologia ao seu alcance." },
  { productId: "explorer-backpack", poster: "/images/videos/backpack.png", headline: "Pronto para o próximo destino." },
];

export const POPULAR_SEARCHES = [
  "SIGNUM 312",
  "Projetor",
  "Rastreador pet",
  "Mochila",
  "Suporte veicular",
  "Presentes",
];

export function getProduct(id: string): Product | undefined {
  return PRODUCTS.find((p) => p.id === id);
}

export function getCategory(id: string): Category | undefined {
  return CATEGORIES.find((c) => c.id === id);
}

export interface SearchResults {
  query: string;
  products: Array<{
    id: string;
    name: string;
    categoryId: string;
    categoryName: string;
    price: number;
    image: string;
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
    (p) => match(p.name) || match(getCategory(p.categoryId)?.name ?? "") || match(p.tagline ?? "")
  )
    .slice(0, 6)
    .map(({ id, name, categoryId, price, image }) => ({
      id,
      name,
      categoryId,
      categoryName: getCategory(categoryId)?.name ?? "",
      price,
      image,
    }));

  const categories = CATEGORIES.filter((c) => match(c.name))
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
