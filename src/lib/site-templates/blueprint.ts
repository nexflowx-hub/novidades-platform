export interface SiteWidgetCount {
  type: string;
  count: number;
}

export interface SiteBlueprintSection {
  elType?: string | null;
  contentWidth?: string | number | null;
  height?: string | null;
  minHeight?: string | number | null;
  background?: string | null;
  colors?: string[];
  widgetSequence?: string[];
  widgetCount?: number;
}

export interface SiteBlueprintPayload {
  slug: string;
  category: string;
  categorySlug: string;
  sourceTitle: string;
  elementorVersion?: string | null;
  sectionCount?: number | null;
  widgetCount?: number | null;
  widgetTypes?: SiteWidgetCount[];
  blueprint?: {
    title?: string | null;
    type?: string | null;
    colors?: string[];
    dominantWidgets?: SiteWidgetCount[];
    sequence?: string[];
    sections?: SiteBlueprintSection[];
  };
}

const BLUEPRINT_URL =
  "https://eivqvrfsreaopzlvhadu.supabase.co/functions/v1/site-blueprint";

export async function getSiteBlueprint(
  slug: string,
): Promise<SiteBlueprintPayload | null> {
  try {
    const response = await fetch(
      BLUEPRINT_URL + "?slug=" + encodeURIComponent(slug),
      {
        next: { revalidate: 600 },
      },
    );

    if (!response.ok) return null;
    return (await response.json()) as SiteBlueprintPayload;
  } catch {
    return null;
  }
}

export function blueprintHas(
  blueprint: SiteBlueprintPayload | null | undefined,
  ...types: string[]
) {
  if (!blueprint) return false;
  const wanted = new Set(types);
  return Boolean(
    blueprint.widgetTypes?.some((item) => wanted.has(item.type)) ||
      blueprint.blueprint?.sequence?.some((item) => wanted.has(item)),
  );
}

export function blueprintCount(
  blueprint: SiteBlueprintPayload | null | undefined,
  type: string,
) {
  return (
    blueprint?.widgetTypes?.find((item) => item.type === type)?.count ?? 0
  );
}
