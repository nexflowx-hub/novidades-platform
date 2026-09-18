import type { Metadata, Viewport } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/sonner";
import { SiteHeader } from "@/components/layout/top-header";
import { SiteFooter } from "@/components/layout/footer";
import { MobileBottomNav } from "@/components/layout/mobile-bottom-nav";
import { Overlays } from "@/components/layout/overlays";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://novidades.store"),
  title: {
    default: "Novidades.store — Todo dia, uma boa descoberta.",
    template: "%s · Novidades.store",
  },
  description:
    "Plataforma de discovery commerce com curadoria: produtos de múltiplos ecossistemas, ofertas selecionadas e descobertas para o seu dia a dia. Pagamento seguro via XPAYMENTS.",
  keywords: [
    "novidades.store",
    "discovery commerce",
    "ofertas",
    "curadoria",
    "presentes",
    "casa e utilidade",
    "pets",
    "auto tech",
    "arte e vida",
  ],
  applicationName: "Novidades.store",
  openGraph: {
    title: "Novidades.store — Todo dia, uma boa descoberta.",
    description:
      "Descobertas curadas para o seu dia a dia. Pagamento seguro via XPAYMENTS.",
    url: "https://novidades.store",
    siteName: "Novidades.store",
    locale: "pt_BR",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Novidades.store",
    description: "Todo dia, uma boa descoberta.",
  },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: "#151918",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR" suppressHydrationWarning>
      <body
        className={`${inter.variable} ${playfair.variable} antialiased bg-background text-foreground min-h-screen flex flex-col`}
      >
        <SiteHeader />
        <main className="flex-1">{children}</main>
        <SiteFooter />
        <MobileBottomNav />
        <Overlays />
        <Toaster position="top-center" richColors closeButton />
      </body>
    </html>
  );
}
