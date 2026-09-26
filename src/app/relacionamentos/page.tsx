import type { Metadata } from "next";
import { RelationshipFunnel } from "@/components/relationships/relationship-funnel";

export const metadata: Metadata = {
  title: "Relacionamentos | Descubra o guia certo para o seu momento",
  description:
    "Quiz editorial rápido para descobrir qual guia da coleção Relacionamentos combina melhor com o seu objetivo atual — e comparar a opção individual com o pack completo.",
  alternates: { canonical: "https://novidades.store/relacionamentos" },
  openGraph: {
    title: "Qual é o melhor ponto de partida para o seu momento?",
    description:
      "Faça o quiz editorial e receba uma recomendação entre quatro guias modernos sobre encontros, conexão, romance e recomeços.",
    type: "website",
  },
};

export default function RelationshipsPage() {
  return <RelationshipFunnel />;
}
