import type { Metadata } from "next";
import Navbar from "@/components/navbar";
import Faq from "@/components/faq";
import Footer from "@/components/footer";
import { FAQS } from "@/lib/faq-data";

export const metadata: Metadata = {
  title: "Frequently Asked Questions — Pricing, Support & Process",
  description:
    "Frequently asked questions about Pigiecore Solutions' products, pricing, timelines, integrations, support, and project process.",
  alternates: { canonical: "/faq" },
  openGraph: {
    title: "Frequently Asked Questions | Pigiecore Solutions",
    description:
      "Everything you need to know about working with Pigiecore Solutions — our products, pricing, timelines, and support.",
  },
};

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: FAQS.map((f) => ({
    "@type": "Question",
    name: f.q,
    acceptedAnswer: {
      "@type": "Answer",
      text: f.a,
    },
  })),
};

export default function FaqPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
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