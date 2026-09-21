import type { Metadata } from "next";
import { SiteCatalog } from "@/components/sites/site-catalog";
import { SITE_TEMPLATES, SITE_TEMPLATE_CATEGORIES } from "@/lib/site-templates";
import { buildSiteModel } from "@/lib/site-templates/profiles";

export const metadata: Metadata = {
  title: "Sites por setor",
  description: "Coleção de sites por setor, com centenas de modelos configuráveis.",
  robots: { index: true, follow: true },
};

export default function SitesPage() {
  const items = SITE_TEMPLATES.map((source) => {
    const site = buildSiteModel(source);
    return {
      slug: site.slug,
      company: site.company,
      category: source.category,
      categorySlug: source.categorySlug,
      sourceTitle: source.sourceTitle,
      palette: site.palette,
      headline: site.headline,
    };
  });

  return (
    <main className="min-h-screen bg-[#07111f] text-white">
      <section className="relative overflow-hidden border-b border-white/10 px-5 py-16 md:py-24">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_10%,rgba(34,211,238,.17),transparent_28rem),radial-gradient(circle_at_85%_40%,rgba(59,130,246,.15),transparent_30rem)]" />
        <div className="relative mx-auto w-full max-w-7xl">
          <p className="text-[10px] font-black uppercase tracking-[.22em] text-cyan-300">
            NOVIDADES · SITES
          </p>
          <h1 className="mt-4 max-w-5xl text-5xl font-black leading-[.94] tracking-[-.055em] md:text-7xl">
            Um catálogo inteiro de presenças digitais, organizado por setor.
          </h1>
          <p className="mt-6 max-w-3xl text-base leading-8 text-white/60">
            {SITE_TEMPLATES.length} modelos estruturados a partir da biblioteca visual original, cada um com identidade, conteúdo e experiência próprios.
          </p>
          <div className="mt-8 flex flex-wrap gap-3 text-xs font-bold">
            <span className="rounded-full border border-white/10 bg-white/[0.05] px-4 py-2">
              {SITE_TEMPLATE_CATEGORIES.length} categorias
            </span>
            <span className="rounded-full border border-white/10 bg-white/[0.05] px-4 py-2">
              Responsivos
            </span>
            <span className="rounded-full border border-white/10 bg-white/[0.05] px-4 py-2">
              Conteúdo configurável
            </span>
          </div>
        </div>
      </section>
      <SiteCatalog items={items} categories={SITE_TEMPLATE_CATEGORIES} />
    </main>
  );
}
