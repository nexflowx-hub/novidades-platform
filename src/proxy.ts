import { NextRequest, NextResponse } from "next/server";

const TREINO_HOST = "treinomilitar.novidades.store";

export function proxy(request: NextRequest) {
  const host = request.headers.get("host")?.split(":")[0].toLowerCase();
  if (host !== TREINO_HOST) return NextResponse.next();

  const pathname = request.nextUrl.pathname;
  const url = request.nextUrl.clone();

  if (pathname === "/") {
    url.pathname = "/treinomilitar";
    return NextResponse.rewrite(url);
  }

  if (pathname === "/coach") {
    url.pathname = "/treinomilitar/coach";
    return NextResponse.rewrite(url);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico|robots.txt|sitemap.xml).*)"],
};
