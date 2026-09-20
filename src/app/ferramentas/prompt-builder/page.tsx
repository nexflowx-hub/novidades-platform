import type { Metadata } from "next";
import { PromptBuilder } from "@/components/digital/prompt-builder";

export const metadata: Metadata = {
  title: "Prompt Builder",
  description: "Monte prompts estruturados com evidence rules e quality checks.",
};

export default function Page() {
  return (
    <main className="bg-[#f7f7f5] px-4 py-10 md:px-6 md:py-14">
      <section className="mx-auto max-w-[1280px]">
        <p className="text-xs font-bold uppercase tracking-[.14em] text-brand-dark">Novidades Digital Tool</p>
        <h1 className="mt-2 text-4xl font-extrabold tracking-[-.04em] md:text-6xl">Prompt Builder</h1>
        <p className="mt-4 max-w-3xl text-sm leading-7 text-muted-foreground md:text-base">
          ROLE → CONTEXT → TASK → CONSTRAINTS → OUTPUT → EVIDENCE RULE → QUALITY CHECK.
        </p>
        <div className="mt-8"><PromptBuilder /></div>
      </section>
    </main>
  );
}
