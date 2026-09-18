import type { Metadata } from "next";
import { InstitutionalPage } from "@/components/institutional/institutional-page";
import { INSTITUTIONAL_DOCS } from "@/lib/institutional-content";

const document = INSTITUTIONAL_DOCS["trocas-e-devolucoes"];

export const metadata: Metadata = {
  title: "Trocas e Devoluções",
  description: document.intro,
};

export default function Page() {
  return <InstitutionalPage document={document} />;
}
