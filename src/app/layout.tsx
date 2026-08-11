import type { Metadata } from "next";
import Script from "next/script";
import { Inter } from "next/font/google";
import "./globals.css";
import { siteUrl } from "@/lib/site";
import BackToTop from "@/components/back-to-top";
import HashScroll from "@/components/hash-scroll";
import Navbar from "@/components/navbar"; // Ensure Navbar is imported if not already

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
});

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Custom Software & SaaS Development in Kenya | Pigiecore",
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
    title: "Custom Software & SaaS Development in Kenya | Pigiecore",
    description:
      "Custom software for real estate, logistics, salons, schools, and hospitals — automating your operations with modern dashboards and web applications.",
    locale: "en_US",
    images: [
      {
        url: "/opengraph-image",
        width: 1200,
        height: 630,
        alt: "Pigiecore Solutions — Custom Software Development in Kenya",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Custom Software & SaaS Development in Kenya | Pigiecore",
    description:
      "Custom software that automates real estate, logistics, salons, schools, and hospitals with modern dashboards.",
    images: ["/opengraph-image"],
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
    // UPDATED: Added scroll-smooth and scroll-pt-[80px] (80px offset for your 64px navbar)
    <html lang="en" suppressHydrationWarning className={`${inter.variable} scroll-smooth scroll-pt-[80px]`}>
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
        <BackToTop />
        <HashScroll />
        <Script
          id="botpress-webchat"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              (function(){
                var s1=document.createElement("script"),s0=document.getElementsByTagName("script")[0];
                s1.async=true;
                s1.src="https://cdn.botpress.cloud/webchat/v5.0/inject.js";
                var s2=document.createElement("script");
                s2.async=true;
                s2.src="https://files.bpcontent.cloud/2026/08/11/17/20260811170458-KNDJ0DR9.js";
                s0.parentNode.insertBefore(s1,s0);
                s0.parentNode.insertBefore(s2,s0);
              })();
            `,
          }}
        />
      </body>
    </html>
  );
}