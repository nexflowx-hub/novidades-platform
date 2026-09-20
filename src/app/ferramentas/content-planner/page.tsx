import type { Metadata } from "next";
import { SocialContentPlanner } from "@/components/digital/social-content-planner";

export const metadata: Metadata = {
  title: "Content Planner",
  description:
    "Transforme uma ideia verificada em assets de attract, educate, demonstrate, de-risk, convert e activate.",
};

export default function Page() {
  return (
    <main className="bg-[#f7f7f5] px-4 py-10 md:px-6 md:py-14">
      <section className="mx-auto max-w-[1280px]">
        <p className="text-xs font-bold uppercase tracking-[.14em] text-brand-dark">
          Novidades Digital Tool
        </p>
        <h1 className="mt-2 text-4xl font-extrabold tracking-[-.04em] md:text-6xl">
          Content Planner
        </h1>
        <p className="mt-4 max-w-3xl text-sm leading-7 text-muted-foreground md:text-base">
          Comece por uma ideia verificável e distribua funções de conteúdo antes
          de escolher formatos. O planner preserva a claim em vez de transformar
          repurposing em copy-paste.
        </p>
        <div className="mt-8">
          <SocialContentPlanner />
        </div>
      </section>
    </main>
  );
}
