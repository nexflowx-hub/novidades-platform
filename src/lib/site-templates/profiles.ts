import type { SiteTemplateSource } from "./types";

export interface SiteModel {
  slug: string;
  source: SiteTemplateSource;
  company: string;
  eyebrow: string;
  headline: string;
  subheadline: string;
  primaryCta: string;
  secondaryCta: string;
  services: string[];
  stats: Array<{ value: string; label: string }>;
  palette: { bg: string; surface: string; text: string; primary: string; secondary: string; accent: string };
  variant: number;
  phone: string;
  email: string;
  city: string;
}

const first = ["Aurora","Nexa","Vitta","Orbe","Lume","Vértice","Prisma","Atlas","Mira","Cora","Nobre","Solare","Viva","Brava","Arco","Elo","Urban","Alto","Nova","Prime"];
const second = ["Studio","House","Lab","Group","Center","Works","Co.","Hub","Pro","One","Concept","Solutions","Brasil","Select","360","Plus","Point","Club","Care","Craft"];

const palettes = [
  { bg:"#061426",surface:"#0d223d",text:"#f7fbff",primary:"#22d3ee",secondary:"#0ea5e9",accent:"#fbbf24" },
  { bg:"#0f172a",surface:"#172554",text:"#f8fafc",primary:"#818cf8",secondary:"#38bdf8",accent:"#f472b6" },
  { bg:"#101713",surface:"#18241d",text:"#f7fbf8",primary:"#34d399",secondary:"#84cc16",accent:"#fbbf24" },
  { bg:"#1b1022",surface:"#2a1734",text:"#fff8ff",primary:"#f472b6",secondary:"#c084fc",accent:"#fbbf24" },
  { bg:"#17130f",surface:"#272017",text:"#fffaf3",primary:"#f59e0b",secondary:"#fb7185",accent:"#fde68a" },
  { bg:"#071a1c",surface:"#0e2b2d",text:"#f5ffff",primary:"#2dd4bf",secondary:"#22c55e",accent:"#facc15" },
  { bg:"#f7f4ee",surface:"#ffffff",text:"#1f2937",primary:"#a16207",secondary:"#be123c",accent:"#0f766e" },
  { bg:"#f6f8fb",surface:"#ffffff",text:"#0f172a",primary:"#2563eb",secondary:"#0891b2",accent:"#f59e0b" },
];

function hash(input: string) {
  let h = 2166136261;
  for (let i = 0; i < input.length; i++) {
    h ^= input.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  return h >>> 0;
}

function cleanCategory(category: string) {
  return category.replace(/^\d+\s*-\s*/, "").trim();
}

function profile(category: string) {
  const c = cleanCategory(category).toLowerCase();
  if (/pet|veterin|zool/.test(c)) return {
    eyebrow:"Cuidado que aproxima",
    headline:"Bem-estar, rotina e atenção para quem faz parte da família.",
    subheadline:"Uma experiência pensada para tutores que procuram cuidado próximo, serviços claros e acompanhamento com carinho.",
    cta:"Conhecer serviços",
    services:["Cuidados & rotina","Higiene & bem-estar","Orientação ao tutor","Atendimento personalizado"],
  };
  if (/garagem|mec[aâ]nica|eletr[oô]nico/.test(c)) return {
    eyebrow:"Performance & confiança",
    headline:"Tecnologia, manutenção e cuidado para seguir em frente.",
    subheadline:"Serviços organizados, atendimento transparente e soluções para manter mobilidade, segurança e performance.",
    cta:"Solicitar avaliação",
    services:["Diagnóstico","Manutenção preventiva","Elétrica & eletrônica","Instalações & upgrades"],
  };
  if (/ciber|tecnologia|rede|software|ag[eê]ncia de sites/.test(c)) return {
    eyebrow:"Tecnologia aplicada",
    headline:"Infraestrutura digital para negócios que precisam evoluir.",
    subheadline:"Projetos, suporte, automação e experiências digitais desenhadas para operação, segurança e crescimento.",
    cta:"Falar com especialista",
    services:["Projetos digitais","Cloud & infraestrutura","Segurança","Automação & suporte"],
  };
  if (/marketing|produtor|aceleradora|ag[eê]ncia moderna|neg[oó]cios|consultoria/.test(c)) return {
    eyebrow:"Estratégia & crescimento",
    headline:"Transformamos ideias em presença, oferta e execução.",
    subheadline:"Estratégia, comunicação e sistemas digitais para marcas que querem operar com mais clareza e consistência.",
    cta:"Construir projeto",
    services:["Estratégia","Conteúdo & campanhas","Funis & páginas","Métricas & otimização"],
  };
  if (/contabil|advoc|corretor/.test(c)) return {
    eyebrow:"Confiança profissional",
    headline:"Decisões importantes pedem clareza, método e proximidade.",
    subheadline:"Atendimento consultivo, informação organizada e acompanhamento para pessoas e empresas.",
    cta:"Agendar conversa",
    services:["Atendimento consultivo","Planejamento","Documentação","Acompanhamento"],
  };
  if (/barbear|sal[aã]o|maqui|cosm[eé]tico/.test(c)) return {
    eyebrow:"Estilo & cuidado",
    headline:"Uma experiência criada para valorizar o seu estilo.",
    subheadline:"Atendimento cuidadoso, serviços personalizados e uma atmosfera feita para você se sentir bem.",
    cta:"Reservar horário",
    services:["Atendimento personalizado","Tratamentos","Produção especial","Experiência premium"],
  };
  if (/m[eé]dic|terapeut/.test(c)) return {
    eyebrow:"Cuidado humano",
    headline:"Acolhimento, escuta e cuidado em cada etapa.",
    subheadline:"Uma experiência de atendimento organizada para facilitar informação, agendamento e acompanhamento.",
    cta:"Agendar atendimento",
    services:["Avaliação inicial","Acompanhamento","Orientações","Atendimento programado"],
  };
  if (/hamburg|sushi|sorvet|cervej|receita|papinha/.test(c)) return {
    eyebrow:"Sabor & experiência",
    headline:"Ingredientes, cuidado e sabor em uma experiência memorável.",
    subheadline:"Um espaço pensado para descobrir sabores, compartilhar bons momentos e encontrar seus favoritos.",
    cta:"Ver opções",
    services:["Seleção da casa","Pedidos especiais","Experiências","Atendimento"],
  };
  if (/escola|curso|ingl[eê]s|concurso|dan[cç]a|m[uú]sica|voo/.test(c)) return {
    eyebrow:"Aprender transforma",
    headline:"Conhecimento prático para avançar com confiança.",
    subheadline:"Uma jornada de aprendizagem clara, progressiva e orientada a competências que você consegue aplicar.",
    cta:"Conhecer programa",
    services:["Programa estruturado","Aulas práticas","Materiais de apoio","Acompanhamento"],
  };
  if (/foto|casamento|v[ií]deo|vlog|evento|designer/.test(c)) return {
    eyebrow:"Criatividade em movimento",
    headline:"Ideias ganham forma quando estratégia e expressão trabalham juntas.",
    subheadline:"Projetos visuais e experiências criativas pensadas para comunicar, emocionar e permanecer.",
    cta:"Ver projetos",
    services:["Direção criativa","Produção","Pós-produção","Projetos especiais"],
  };
  if (/viagem/.test(c)) return {
    eyebrow:"Viva o próximo destino",
    headline:"Experiências de viagem desenhadas ao seu ritmo.",
    subheadline:"Planejamento, roteiros e suporte para transformar destinos em boas histórias.",
    cta:"Planejar viagem",
    services:["Roteiros","Reservas","Experiências","Suporte"],
  };
  if (/igreja/.test(c)) return {
    eyebrow:"Comunidade & propósito",
    headline:"Um espaço de fé, encontro e cuidado com pessoas.",
    subheadline:"Conteúdo, programação e caminhos para participar de uma comunidade que caminha junta.",
    cta:"Conhecer comunidade",
    services:["Celebrações","Grupos","Ações sociais","Conteúdos"],
  };
  return {
    eyebrow:"Uma experiência feita para você",
    headline:"Soluções claras, atendimento próximo e uma presença que inspira confiança.",
    subheadline:"Um projeto digital completo para apresentar serviços, diferenciais, contacto e próximos passos.",
    cta:"Começar agora",
    services:["Soluções","Atendimento","Experiência","Suporte"],
  };
}

export function buildSiteModel(source: SiteTemplateSource): SiteModel {
  const h = hash(source.sourceId || source.slug);
  const p = profile(source.category);
  const categoryName = cleanCategory(source.category);
  const company = `${first[h % first.length]} ${second[(h >>> 5) % second.length]}`;
  const palette = palettes[(h >>> 9) % palettes.length];
  const variant = (h % 6) + 1;
  const n = String((h % 9000) + 1000);
  return {
    slug: source.slug,
    source,
    company,
    eyebrow: p.eyebrow,
    headline: p.headline,
    subheadline: p.subheadline,
    primaryCta: p.cta,
    secondaryCta: "Conhecer mais",
    services: p.services,
    stats: [
      { value: `${(h % 18) + 7}+`, label: "anos de experiência" },
      { value: `${(h % 89) + 11}%`, label: "foco em atendimento" },
      { value: `${(h % 12) + 4}`, label: "soluções principais" },
    ],
    palette,
    variant,
    phone: `(62) 9${n.slice(0,4)}-${n.slice(-4)}`,
    email: `contato@${source.slug.slice(0,24)}.com.br`,
    city: "Anápolis · GO",
  };
}
