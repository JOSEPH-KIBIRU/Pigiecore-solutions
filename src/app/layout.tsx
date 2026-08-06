import type { Metadata } from "next";
import Script from "next/script";
import { Inter } from "next/font/google";
import "./globals.css";
import { siteUrl } from "@/lib/site";
import BackToTop from "@/components/back-to-top";
import ThemeProvider from "@/lib/theme-context";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
});

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Custom Software Development & ERP Solutions | Pigiecore",
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
    title: "Custom Software Development & ERP Solutions | Pigiecore",
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
    title: "Custom Software Development & ERP Solutions | Pigiecore",
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
    <html lang="en" suppressHydrationWarning className={inter.variable}>
      <head>
        <Script
          id="theme-init"
          strategy="beforeInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                try {
                  var stored = localStorage.getItem("theme");
                  var dark;
                  if (stored === "dark") dark = true;
                  else if (stored === "light") dark = false;
                  else dark = window.matchMedia("(prefers-color-scheme: dark)").matches;
                  if (dark) document.documentElement.classList.add("dark");
                } catch (e) {}
              })();
            `,
          }}
        />
      </head>
      <body className="min-h-full flex flex-col text-slate-900 font-sans transition-colors duration-300">
        <ThemeProvider>
          {children}
        </ThemeProvider>
        <BackToTop />
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