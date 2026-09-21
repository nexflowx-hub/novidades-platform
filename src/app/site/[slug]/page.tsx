import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { SiteRenderer } from "@/components/sites/site-renderer";
import { getSiteTemplate } from "@/lib/site-templates";
import { getSiteBlueprint } from "@/lib/site-templates/blueprint";
import { buildSiteModel } from "@/lib/site-templates/profiles";

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const source = getSiteTemplate(slug);
  if (!source) return { title: "Site não encontrado" };
  const site = buildSiteModel(source);
  return {
    title: site.company,
    description: site.subheadline,
    robots: { index: false, follow: true },
  };
}

export default async function SitePage({ params }: Props) {
  const { slug } = await params;
  const source = getSiteTemplate(slug);
  if (!source) notFound();

  const [blueprint] = await Promise.all([getSiteBlueprint(slug)]);
  const site = buildSiteModel(source);

  return <SiteRenderer site={site} blueprint={blueprint} />;
}
