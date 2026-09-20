import type { Metadata } from "next";
import { EmailSequenceBuilder } from "@/components/digital/email-sequence-builder";

export const metadata: Metadata = {
  title: "Email Sequence Builder",
  description: "Construa mapas de welcome, nurture, recovery, launch, activation e reactivation.",
};

export default function Page() {
  return (
    <main className="bg-[#f7f7f5] px-4 py-10 md:px-6 md:py-14">
      <section className="mx-auto max-w-[1280px]">
        <p className="text-xs font-bold uppercase tracking-[.14em] text-brand-dark">Novidades Digital Tool</p>
        <h1 className="mt-2 text-4xl font-extrabold tracking-[-.04em] md:text-6xl">Email Sequence Builder</h1>
        <p className="mt-4 max-w-3xl text-sm leading-7 text-muted-foreground md:text-base">
          Estruture a função de cada email antes de escrever copy. O builder não inventa prova, urgência ou consentimento.
        </p>
        <div className="mt-8"><EmailSequenceBuilder /></div>
      </section>
    </main>
  );
}
