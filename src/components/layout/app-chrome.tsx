"use client";

import { usePathname } from "next/navigation";
import type { ReactNode } from "react";
import { SiteHeader } from "@/components/layout/top-header";
import { SiteFooter } from "@/components/layout/footer";
import { MobileBottomNav } from "@/components/layout/mobile-bottom-nav";
import { Overlays } from "@/components/layout/overlays";
import { CookieConsent } from "@/components/privacy/cookie-consent";
import { Toaster } from "@/components/ui/sonner";

export function AppChrome({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const standaloneSite = pathname === "/site" || pathname.startsWith("/site/");

  if (standaloneSite) {
    return <>{children}</>;
  }

  return (
    <>
      <SiteHeader />
      <main className="flex-1">{children}</main>
      <SiteFooter />
      <MobileBottomNav />
      <Overlays />
      <CookieConsent />
      <Toaster position="top-center" richColors closeButton />
    </>
  );
}
