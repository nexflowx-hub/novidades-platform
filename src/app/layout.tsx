import type { Metadata, Viewport } from "next";
import { Inter, Montserrat, Playfair_Display } from "next/font/google";
import "./globals.css";
import { AppChrome } from "@/components/layout/app-chrome";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const montserrat = Montserrat({
  variable: "--font-montserrat",
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
    default: "Novidades.store | Produtos, Ofertas e Descobertas Online",
    template: "%s · Novidades.store",
  },
  description:
    "Descubra produtos, ofertas e novidades para utilidades, auto, casa, pets, saúde, beleza, moda e mercado digital. Novidades.store — mais do que você procura.",
  keywords: [
    "novidades.store",
    "loja online",
    "ofertas",
    "utilidades",
    "auto e rastreador GPS",
    "medalhas e terços",
    "academia digital",
    "software",
    "inteligência artificial",
    "produtos digitais",
    "saúde e bem-estar",
    "pets",
    "casa e jardim",
    "cosméticos e perfumes",
    "roupa e acessórios",
  ],
  applicationName: "Novidades.store",
  openGraph: {
    title: "Novidades.store — Mais do que você procura.",
    description:
      "Produtos, descobertas e ofertas selecionadas para o seu dia a dia.",
    url: "https://novidades.store",
    siteName: "Novidades.store",
    locale: "pt_BR",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Novidades.store",
    description: "Mais do que você procura. Todo dia, uma boa descoberta.",
  },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: "#03152f",
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
        className={`${inter.variable} ${montserrat.variable} ${playfair.variable} antialiased bg-background text-foreground min-h-screen flex flex-col`}
      >
        <AppChrome>{children}</AppChrome>
      </body>
    </html>
  );
}
