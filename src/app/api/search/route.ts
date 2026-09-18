import { NextRequest, NextResponse } from "next/server";
import { searchPublicCatalog } from "@/lib/commerce-db";

export async function GET(req: NextRequest) {
  const q = (req.nextUrl.searchParams.get("q") ?? "").slice(0, 120);
  const results = await searchPublicCatalog(q);

  return NextResponse.json(results, {
    headers: {
      "Cache-Control": "private, max-age=0, must-revalidate",
    },
  });
}
