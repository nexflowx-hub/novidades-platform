export type EbookStatus = "live" | "preparing";

export type EbookItem = {
  slug: string;
  sku: string;
  title: string;
  subtitle: string;
  description: string;
  category: string;
  categorySlug: string;
  price: number;
  compareAt?: number;
  kind: "ebook" | "pack";
  status: EbookStatus;
  coverTone: string;
  coverImage?: string;
  coverAlt?: string;
  highlights: string[];
  chapters: string[];
  includedSlugs?: string[];
};

export const EBOOK_CATEGORIES = [
  { slug: "culinaria", name: "Culinária & Receitas" },
  { slug: "pets", name: "Pets" },
  { slug: "relacionamentos", name: "Relacionamentos" },
  { slug: "carreira", name: "Carreira & Produtividade" },
  { slug: "casa-jardim", name: "Casa, Jardim & DIY" },
  { slug: "viagens", name: "Viagens" },
  { slug: "hobbies", name: "Hobbies" },
  { slug: "negocios", name: "Marketing & Negócios" },
] as const;

export const EBOOKS: EbookItem[] = [
  {
    slug: "101-dicas-cozinhar-como-chef",
    sku: "EBOOK-COOK-001",
    title: "101 Dicas para Cozinhar como um Chef",
    subtitle: "Técnicas práticas para melhorar organização, preparo e execução na cozinha.",
    description:
      "Edição digital em português com 101 dicas de cozinha organizadas para consulta rápida. Produto PLR com licença verificada e conteúdo selecionado para a biblioteca Novidades.",
    category: "Culinária & Receitas",
    categorySlug: "culinaria",
    price: 24.9,
    kind: "ebook",
    status: "preparing",
    coverTone: "from-amber-500 via-orange-600 to-rose-700",
    highlights: ["Leitura online protegida", "Acesso após confirmação do pagamento", "Compra única"],
    chapters: ["Preparação e organização", "Técnicas de cocção", "Ingredientes e temperos", "Apresentação e eficiência"],
  },
  {
    slug: "fazendo-chocolate-101",
    sku: "EBOOK-CHOCO-001",
    title: "Fazendo Chocolate 101",
    subtitle: "Um guia introdutório para trabalhar chocolate em casa.",
    description:
      "Guia digital com fundamentos, técnicas e ideias para quem quer explorar o preparo artesanal de chocolate.",
    category: "Culinária & Receitas",
    categorySlug: "culinaria",
    price: 19.9,
    kind: "ebook",
    status: "preparing",
    coverTone: "from-stone-700 via-amber-900 to-stone-950",
    highlights: ["Leitura online protegida", "Conteúdo em português", "Compra única"],
    chapters: ["Fundamentos do chocolate", "Preparação", "Técnicas e utensílios", "Ideias e variações"],
  },
  {
    slug: "reavivar-o-romance",
    sku: "EBOOK-ROMANCE-001",
    title: "Reavivar o Romance",
    subtitle: "Ideias práticas para cultivar atenção, comunicação e proximidade no relacionamento.",
    description:
      "Guia de relacionamento para casais com sugestões de comunicação, tempo de qualidade e pequenos gestos no dia a dia.",
    category: "Relacionamentos",
    categorySlug: "relacionamentos",
    price: 19.9,
    kind: "ebook",
    status: "live",
    coverTone: "from-rose-500 via-pink-700 to-purple-950",
    coverImage: "/images/ebooks/romance.webp",
    coverAlt: "Casal num momento de proximidade ao pôr do sol",
    highlights: ["Leitura privada", "Acesso imediato após pagamento confirmado", "Compra única"],
    chapters: ["Reconexão", "Comunicação", "Tempo de qualidade", "Gestos e hábitos"],
  },
  {
    slug: "jardinagem-de-verao",
    sku: "EBOOK-GARDEN-001",
    title: "Jardinagem de Verão",
    subtitle: "Planeamento e cuidados para aproveitar melhor o jardim nos meses mais quentes.",
    description:
      "Guia prático para organização, manutenção e cuidados gerais com o jardim durante o verão.",
    category: "Casa, Jardim & DIY",
    categorySlug: "casa-jardim",
    price: 19.9,
    kind: "ebook",
    status: "live",
    coverTone: "from-emerald-500 via-green-700 to-teal-950",
    coverImage: "/images/ebooks/garden.webp",
    coverAlt: "Jardineira cuidando de flores num jardim de verão",
    highlights: ["Leitura online protegida", "Guia prático", "Compra única"],
    chapters: ["Planeamento", "Manutenção", "Água e calor", "Rotina do jardim"],
  },
  {
    slug: "primeiro-filhote-90-dias",
    sku: "DIGITAL-PUPPY90-001",
    title: "Primeiro Filhote — 90 Dias",
    subtitle: "Um sistema prático para organizar os primeiros 90 dias com rotina, treino e socialização segura.",
    description:
      "Guia e toolkit educativo integralmente reescrito, com treino baseado em recompensa, planner de 90 dias, checklists, trackers e critérios claros para procurar veterinário ou profissional de comportamento.",
    category: "Pets",
    categorySlug: "pets",
    price: 57,
    kind: "ebook",
    status: "live",
    coverTone: "from-sky-500 via-blue-700 to-indigo-950",
    coverImage: "/images/ebooks/pets.webp",
    coverAlt: "Tutora treinando um cão ao ar livre",
    highlights: ["Release revisada", "2 arquivos privados incluídos", "Compra única"],
    chapters: ["Primeiras 72 horas", "Rotina e house training", "Treino baseado em recompensa", "Socialização gradual", "Quando pedir ajuda"],
  },
  {
    slug: "pack-culinaria-essencial",
    sku: "PACK-COOK-001",
    title: "Pack Culinária Essencial",
    subtitle: "Dois guias digitais para evoluir técnica e criatividade na cozinha.",
    description:
      "Pack com 101 Dicas para Cozinhar como um Chef + Fazendo Chocolate 101, numa única compra.",
    category: "Culinária & Receitas",
    categorySlug: "culinaria",
    price: 34.9,
    compareAt: 44.8,
    kind: "pack",
    status: "preparing",
    coverTone: "from-orange-500 via-red-700 to-stone-950",
    highlights: ["2 E-Books", "Acesso aos dois títulos", "Valor de pack"],
    chapters: ["101 Dicas para Cozinhar como um Chef", "Fazendo Chocolate 101"],
    includedSlugs: ["101-dicas-cozinhar-como-chef", "fazendo-chocolate-101"],
  },


  {
    slug: "guia-entrevista-emprego",
    sku: "EBOOK-CAREER-001",
    title: "Guia Prático para Entrevistas de Emprego",
    subtitle: "Preparação, apresentação e respostas para processos seletivos.",
    description:
      "Edição original reconstruída para 2026, com preparação, respostas estruturadas, presença profissional, situações difíceis e follow-up.",
    category: "Carreira & Produtividade",
    categorySlug: "carreira",
    price: 24.9,
    kind: "ebook",
    status: "live",
    coverTone: "from-blue-500 via-indigo-700 to-slate-950",
    coverImage: "/images/ebooks/career.webp",
    coverAlt: "Entrevista profissional com cumprimento entre recrutador e candidata",
    highlights: ["Edição atualizada 2026", "Leitura protegida", "Compra única"],
    chapters: ["Preparação antes da entrevista", "Respostas fortes", "Comunicação e presença", "Perguntas difíceis", "Follow-up e decisão"],
  },
  {
    slug: "decoracao-com-orcamento",
    sku: "EBOOK-HOME-001",
    title: "Decoração com Orçamento",
    subtitle: "Ideias para renovar ambientes com decisões simples e controlando gastos.",
    description:
      "Edição original prática para renovar ambientes por etapas, controlando orçamento e priorizando função, proporção, luz e reaproveitamento.",
    category: "Casa, Jardim & DIY",
    categorySlug: "casa-jardim",
    price: 19.9,
    kind: "ebook",
    status: "live",
    coverTone: "from-teal-400 via-cyan-700 to-slate-950",
    coverImage: "/images/ebooks/home.webp",
    coverAlt: "Sala acolhedora decorada em tons naturais",
    highlights: ["Guia prático", "Leitura protegida", "Compra única"],
    chapters: ["Prioridades", "Cor e luz", "Compras inteligentes", "Projeto por etapas", "Checklist de orçamento"],
  },
  {
    slug: "dicas-para-melhorar-sua-casa",
    sku: "EBOOK-HOME-002",
    title: "Dicas para Melhorar sua Casa",
    subtitle: "Pequenas melhorias e organização do espaço doméstico.",
    description:
      "Manual original de melhorias domésticas de baixo risco, com organização, conforto, manutenção preventiva e um plano de 30 dias.",
    category: "Casa, Jardim & DIY",
    categorySlug: "casa-jardim",
    price: 19.9,
    kind: "ebook",
    status: "live",
    coverTone: "from-cyan-500 via-sky-700 to-blue-950",
    coverImage: "/images/ebooks/home.webp",
    coverAlt: "Interior residencial acolhedor e bem organizado",
    highlights: ["Melhorias de baixo risco", "Leitura protegida", "Compra única"],
    chapters: ["Melhorias sem obra", "Organização", "Conforto", "Manutenção preventiva", "Plano de 30 dias"],
  },
  {
    slug: "viaje-com-estilo",
    sku: "EBOOK-TRAVEL-001",
    title: "Viaje com Estilo",
    subtitle: "Organização e decisões para aproveitar melhor cada viagem.",
    description:
      "Guia original de organização de viagens, com planejamento, bagagem, dinheiro, conectividade, experiência no destino e fechamento.",
    category: "Viagens",
    categorySlug: "viagens",
    price: 19.9,
    kind: "ebook",
    status: "live",
    coverTone: "from-sky-400 via-blue-700 to-violet-950",
    coverImage: "/images/ebooks/travel.webp",
    coverAlt: "Viajante elegante num aeroporto ao pôr do sol",
    highlights: ["Planejamento prático", "Leitura protegida", "Compra única"],
    chapters: ["Planejamento", "Bagagem inteligente", "Dinheiro e conectividade", "Experiência no destino", "Fechamento"],
  },
  {
    slug: "erros-de-viagem-a-evitar",
    sku: "EBOOK-TRAVEL-002",
    title: "Erros de Viagem a Evitar",
    subtitle: "Checklist de falhas comuns de planeamento e execução.",
    description:
      "Checklist original e atualizado para reduzir erros comuns de documentação, bagagem, dinheiro, conectividade e roteiro.",
    category: "Viagens",
    categorySlug: "viagens",
    price: 14.9,
    kind: "ebook",
    status: "live",
    coverTone: "from-indigo-500 via-blue-800 to-slate-950",
    coverImage: "/images/ebooks/travel.webp",
    coverAlt: "Viajante com mala num terminal de aeroporto",
    highlights: ["Formato rápido", "Checklist prático", "Compra única"],
    chapters: ["Documentos e reservas", "Bagagem", "Dinheiro e conectividade", "Roteiro", "Checklist de 24 horas"],
  },
  {
    slug: "cuidados-com-a-guitarra",
    sku: "EBOOK-HOBBY-001",
    title: "Cuidados com a Guitarra para Iniciantes",
    subtitle: "Manutenção básica e boas práticas para conservar o instrumento.",
    description:
      "Guia original para iniciantes sobre limpeza, cordas, armazenamento, transporte e sinais de quando procurar um luthier.",
    category: "Hobbies",
    categorySlug: "hobbies",
    price: 14.9,
    kind: "ebook",
    status: "live",
    coverTone: "from-amber-400 via-red-800 to-neutral-950",
    highlights: ["Conteúdo evergreen", "Leitura protegida", "Compra única"],
    chapters: ["Limpeza", "Cordas", "Armazenamento", "Transporte", "Quando procurar um luthier"],
  },
  {
    slug: "compostagem-organica",
    sku: "EBOOK-GARDEN-002",
    title: "Compostagem Orgânica para Iniciantes",
    subtitle: "Princípios para transformar resíduos orgânicos em composto.",
    description:
      "Guia original de compostagem doméstica com materiais, equilíbrio, umidade, aeração, problemas comuns e maturação.",
    category: "Casa, Jardim & DIY",
    categorySlug: "casa-jardim",
    price: 19.9,
    kind: "ebook",
    status: "live",
    coverTone: "from-lime-500 via-green-800 to-stone-950",
    coverImage: "/images/ebooks/garden.webp",
    coverAlt: "Jardineira cuidando de plantas e flores",
    highlights: ["Conteúdo evergreen", "Leitura protegida", "Compra única"],
    chapters: ["Fundamentos", "Materiais", "Umidade e ar", "Problemas comuns", "Uso do composto"],
  },
];

export function getEbook(slug: string) {
  return EBOOKS.find((item) => item.slug === slug);
}

export function getLiveEbooks() {
  return EBOOKS.filter((item) => item.status === "live");
}
