import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Pigiecore Solutions",
    short_name: "Pigiecore",
    description:
      "Custom software development in Kenya for real estate, logistics, salons, schools, and hospitals.",
    start_url: "/",
    display: "standalone",
    background_color: "#0b0c0e",
    theme_color: "#6b5cff",
    icons: [
      {
        src: "/icon.svg",
        sizes: "any",
        type: "image/svg+xml",
      },
    ],
  };
}