import type { Metadata } from "next";
import { LaunchReadiness } from "@/components/digital/launch-readiness";

export const metadata: Metadata = {
  title: "Launch Readiness",
  description: "Release gate para produto, checkout, entitlement, delivery, mobile e support.",
};

export default function Page() {
  return (
    <main className="bg-[#f7f7f5] px-4 py-10 md:px-6 md:py-14">
      <section className="mx-auto max-w-[1120px]">
        <p className="text-xs font-bold uppercase tracking-[.14em] text-brand-dark">Novidades Digital Tool</p>
        <h1 className="mt-2 text-4xl font-extrabold tracking-[-.04em] md:text-6xl">Launch Readiness</h1>
        <p className="mt-4 max-w-3xl text-sm leading-7 text-muted-foreground md:text-base">
          Um produto não está pronto porque a página ficou bonita. Confirme os gates críticos de release.
        </p>
        <div className="mt-8"><LaunchReadiness /></div>
      </section>
    </main>
  );
}
