import { NextRequest, NextResponse } from "next/server";
import { searchCatalog } from "@/lib/data";

/**
 * GET /api/search?q=termo
 * Busca global do commerce (Fase 1): produtos + categorias.
 * Futuro (Fase 3+): Commerce Core API com busca semântica / AI.
 */
export async function GET(req: NextRequest) {
  const q = req.nextUrl.searchParams.get("q") ?? "";
  const results = searchCatalog(q);
  return NextResponse.json(results, {
    headers: { "Cache-Control": "no-store" },
  });
}
