import type { Metadata } from "next";
import Navbar from "@/components/navbar";
import Faq from "@/components/faq";
import Footer from "@/components/footer";

export const metadata: Metadata = {
  title: "FAQ",
  description:
    "Frequently asked questions about Pigiecore Solutions' products, pricing, timelines, integrations, support, and project process.",
  alternates: { canonical: "/faq" },
  openGraph: {
    title: "FAQ | Pigiecore Solutions",
    description:
      "Everything you need to know about working with Pigiecore Solutions — our products, pricing, timelines, and support.",
  },
};

export default function FaqPage() {
  return (
    <>
      <Navbar />
      <main className="flex flex-col flex-1">
        <div className="pt-20 sm:pt-24">
          <Faq />
        </div>
      </main>
      <Footer />
    </>
  );
}