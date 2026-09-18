import { NextResponse } from "next/server";
import { getPublicCatalog } from "@/lib/commerce-db";

export async function GET() {
  const catalog = await getPublicCatalog();

  return NextResponse.json(
    { success: true, data: catalog },
    {
      headers: {
        "Cache-Control": "public, s-maxage=60, stale-while-revalidate=300",
      },
    }
  );
}
