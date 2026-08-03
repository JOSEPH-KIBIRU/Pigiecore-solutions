import type { Metadata } from "next";
import Script from "next/script";
import "./globals.css";

const siteUrl = "https://pigiecore.vercel.app";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Pigiecore Solutions — Custom Software Development in Kenya",
    template: "%s | Pigiecore Solutions",
  },
  description:
    "Pigiecore Solutions delivers custom software for real estate, logistics, salons, schools, and hospitals — automating your operations with modern dashboards and web applications.",
  applicationName: "Pigiecore Solutions",
  authors: [{ name: "Pigiecore Solutions" }],
  keywords: [
    "software development",
    "custom software",
    "web application development",
    "real estate software",
    "logistics management",
    "salon booking software",
    "school management system",
    "hospital management system",
    "Kenya software company",
    "business automation",
  ],
  creator: "Pigiecore Solutions",
  publisher: "Pigiecore Solutions",
  formatDetection: { telephone: false },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    url: siteUrl,
    siteName: "Pigiecore Solutions",
    title: "Pigiecore Solutions — Custom Software Development in Kenya",
    description:
      "Custom software for real estate, logistics, salons, schools, and hospitals — automating your operations with modern dashboards and web applications.",
    locale: "en_US",
    images: [
      {
        url: "/opengraph-image.png",
        width: 1200,
        height: 630,
        alt: "Pigiecore Solutions — Custom Software Development in Kenya",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Pigiecore Solutions — Custom Software Development in Kenya",
    description:
      "Custom software that automates real estate, logistics, salons, schools, and hospitals with modern dashboards.",
    images: ["/opengraph-image.png"],
  },
  icons: {
    icon: "/icon.svg",
  },
  manifest: "/manifest.webmanifest",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <Script
          id="theme-init"
          strategy="beforeInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                var stored = localStorage.getItem("theme");
                if (stored === "dark" || (!stored && window.matchMedia("(prefers-color-scheme: dark)").matches)) {
                  document.documentElement.classList.add("dark");
                }
              })();
            `,
          }}
        />
      </head>
      <body className="min-h-full flex flex-col text-slate-900 font-sans transition-colors duration-300">
        {children}
        <Script
          id="tawkto"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              var Tawk_API=Tawk_API||{}, Tawk_LoadStart=new Date();
              (function(){
                var s1=document.createElement("script"),s0=document.getElementsByTagName("script")[0];
                s1.async=true;
                s1.src="https://embed.tawk.to/6a6ba3592539311d47e43818/1juq7c6ch";
                s1.charset="UTF-8";
                s1.setAttribute("crossorigin","*");
                s0.parentNode.insertBefore(s1,s0);
              })();
            `,
          }}
        />
      </body>
    </html>
  );
}