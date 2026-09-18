import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Novidades.store",
    short_name: "Novidades",
    description: "Todo dia, uma boa descoberta.",
    start_url: "/",
    display: "standalone",
    background_color: "#FFFFFF",
    theme_color: "#151918",
    icons: [
      {
        src: "/icon.svg",
        sizes: "any",
        type: "image/svg+xml",
      },
    ],
  };
}
