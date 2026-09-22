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
    slug: "como-treinar-seu-cachorro",
    sku: "EBOOK-PETS-001",
    title: "Como Treinar seu Cachorro",
    subtitle: "Fundamentos de rotina e treino para tutores iniciantes.",
    description:
      "Título identificado no acervo PLR. A edição está em revisão comportamental antes de ativar a venda.",
    category: "Pets",
    categorySlug: "pets",
    price: 19.9,
    kind: "ebook",
    status: "preparing",
    coverTone: "from-sky-500 via-blue-700 to-indigo-950",
    coverImage: "/images/ebooks/pets.webp",
    coverAlt: "Tutora treinando um cão ao ar livre",
    highlights: ["Licença PLR verificada", "Revisão editorial em curso", "Sem checkout até QA final"],
    chapters: ["Rotina do filhote", "Treino doméstico", "Reforço positivo", "Passeios e comportamento"],
  },
  {
    slug: "cuidados-com-o-cao-para-iniciantes",
    sku: "EBOOK-PETS-002",
    title: "Cuidados com o Cão para Iniciantes",
    subtitle: "Guia introdutório para novos tutores.",
    description:
      "Produto identificado e licenciado; permanece em revisão técnica antes da publicação comercial.",
    category: "Pets",
    categorySlug: "pets",
    price: 19.9,
    kind: "ebook",
    status: "preparing",
    coverTone: "from-cyan-500 via-blue-700 to-slate-950",
    coverImage: "/images/ebooks/pets.webp",
    coverAlt: "Tutora com cão num ambiente ao ar livre",
    highlights: ["Licença verificada", "QA veterinário pendente", "Venda ainda bloqueada"],
    chapters: ["Primeiros cuidados", "Rotina", "Ambiente", "Acompanhamento profissional"],
  },
  {
    slug: "guia-entrevista-emprego",
    sku: "EBOOK-CAREER-001",
    title: "Guia Prático para Entrevistas de Emprego",
    subtitle: "Preparação, apresentação e respostas para processos seletivos.",
    description:
      "Versão em atualização do material PLR sobre entrevistas, com remoção de referências de recrutamento ultrapassadas.",
    category: "Carreira & Produtividade",
    categorySlug: "carreira",
    price: 19.9,
    kind: "ebook",
    status: "preparing",
    coverTone: "from-blue-500 via-indigo-700 to-slate-950",
    coverImage: "/images/ebooks/career.webp",
    coverAlt: "Entrevista profissional com cumprimento entre recrutador e candidata",
    highlights: ["Licença verificada", "Atualização 2026 em curso", "Venda após QA"],
    chapters: ["Preparação", "Currículo e candidatura", "Entrevista", "Follow-up"],
  },
  {
    slug: "decoracao-com-orcamento",
    sku: "EBOOK-HOME-001",
    title: "Decoração com Orçamento",
    subtitle: "Ideias para renovar ambientes com decisões simples e controlando gastos.",
    description:
      "Guia evergreen de decoração doméstica em preparação para edição brasileira.",
    category: "Casa, Jardim & DIY",
    categorySlug: "casa-jardim",
    price: 19.9,
    kind: "ebook",
    status: "preparing",
    coverTone: "from-teal-400 via-cyan-700 to-slate-950",
    coverImage: "/images/ebooks/home.webp",
    coverAlt: "Sala acolhedora decorada em tons naturais",
    highlights: ["Licença verificada", "Edição visual em preparação", "Venda após QA"],
    chapters: ["Planeamento", "Cores e composição", "Reaproveitamento", "Orçamento"],
  },
  {
    slug: "dicas-para-melhorar-sua-casa",
    sku: "EBOOK-HOME-002",
    title: "Dicas para Melhorar sua Casa",
    subtitle: "Pequenas melhorias e organização do espaço doméstico.",
    description:
      "Título do acervo selecionado para revisão e nova apresentação visual.",
    category: "Casa, Jardim & DIY",
    categorySlug: "casa-jardim",
    price: 19.9,
    kind: "ebook",
    status: "preparing",
    coverTone: "from-cyan-500 via-sky-700 to-blue-950",
    coverImage: "/images/ebooks/home.webp",
    coverAlt: "Interior residencial acolhedor e bem organizado",
    highlights: ["Produto selecionado", "Revisão editorial em curso", "Venda após QA"],
    chapters: ["Organização", "Ambientes", "Manutenção", "Melhorias de baixo custo"],
  },
  {
    slug: "viaje-com-estilo",
    sku: "EBOOK-TRAVEL-001",
    title: "Viaje com Estilo",
    subtitle: "Organização e decisões para aproveitar melhor cada viagem.",
    description:
      "Material PLR licenciado em atualização para remover referências antigas e adaptar ao contexto atual.",
    category: "Viagens",
    categorySlug: "viagens",
    price: 19.9,
    kind: "ebook",
    status: "preparing",
    coverTone: "from-sky-400 via-blue-700 to-violet-950",
    coverImage: "/images/ebooks/travel.webp",
    coverAlt: "Viajante elegante num aeroporto ao pôr do sol",
    highlights: ["Licença verificada", "Atualização editorial pendente", "Venda após QA"],
    chapters: ["Planeamento", "Preparação", "Tempo no destino", "Experiência de viagem"],
  },
  {
    slug: "erros-de-viagem-a-evitar",
    sku: "EBOOK-TRAVEL-002",
    title: "Erros de Viagem a Evitar",
    subtitle: "Checklist de falhas comuns de planeamento e execução.",
    description:
      "Relatório PLR selecionado para uma edição curta, atualizada e orientada a checklist.",
    category: "Viagens",
    categorySlug: "viagens",
    price: 14.9,
    kind: "ebook",
    status: "preparing",
    coverTone: "from-indigo-500 via-blue-800 to-slate-950",
    coverImage: "/images/ebooks/travel.webp",
    coverAlt: "Viajante com mala num terminal de aeroporto",
    highlights: ["Formato rápido", "Atualização pendente", "Venda após QA"],
    chapters: ["Antes de partir", "Bagagem", "Deslocamentos", "No destino"],
  },
  {
    slug: "cuidados-com-a-guitarra",
    sku: "EBOOK-HOBBY-001",
    title: "Cuidados com a Guitarra para Iniciantes",
    subtitle: "Manutenção básica e boas práticas para conservar o instrumento.",
    description:
      "Guia do acervo musical selecionado pela natureza evergreen e utilidade prática.",
    category: "Hobbies",
    categorySlug: "hobbies",
    price: 14.9,
    kind: "ebook",
    status: "preparing",
    coverTone: "from-amber-400 via-red-800 to-neutral-950",
    highlights: ["Conteúdo evergreen", "Edição PT-BR em preparação", "Venda após QA"],
    chapters: ["Limpeza", "Cordas", "Armazenamento", "Cuidados recorrentes"],
  },
  {
    slug: "compostagem-organica",
    sku: "EBOOK-GARDEN-002",
    title: "Compostagem Orgânica para Iniciantes",
    subtitle: "Princípios para transformar resíduos orgânicos em composto.",
    description:
      "Guia selecionado do acervo de jardinagem, em revisão para publicação.",
    category: "Casa, Jardim & DIY",
    categorySlug: "casa-jardim",
    price: 19.9,
    kind: "ebook",
    status: "preparing",
    coverTone: "from-lime-500 via-green-800 to-stone-950",
    coverImage: "/images/ebooks/garden.webp",
    coverAlt: "Jardineira cuidando de plantas e flores",
    highlights: ["Licença verificada", "Conteúdo evergreen", "Venda após QA"],
    chapters: ["Materiais", "Montagem", "Equilíbrio", "Uso do composto"],
  },
];

export function getEbook(slug: string) {
  return EBOOKS.find((item) => item.slug === slug);
}

export function getLiveEbooks() {
  return EBOOKS.filter((item) => item.status === "live");
}
