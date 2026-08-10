import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import ServicePage from "@/components/service-page";
import { getEntry, getAllSlugs } from "@/lib/service-content";
import { siteUrl } from "@/lib/site";

type Params = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return getAllSlugs("services").map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { slug } = await params;
  const entry = getEntry("services", slug);
  if (!entry) return { title: "Service Not Found" };
  const url = `${siteUrl}/services/${entry.slug}`;
  return {
    title: entry.h1,
    description: entry.tagline,
    keywords: [
      entry.name.toLowerCase(),
      "custom software Kenya",
      "software development Kenya",
      "Pigiecore",
      entry.slug.replace(/-/g, " "),
    ],
    alternates: { canonical: `/services/${entry.slug}` },
    openGraph: {
      title: entry.h1,
      description: entry.tagline,
      type: "website",
      url,
      siteName: "Pigiecore Solutions",
    },
  };
}

export default async function ServiceDetailPage({ params }: Params) {
  const { slug } = await params;
  const entry = getEntry("services", slug);
  if (!entry) notFound();

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Service",
        name: entry.name,
        serviceType: entry.h1,
        description: entry.tagline,
        url: `${siteUrl}/services/${entry.slug}`,
        provider: {
          "@type": "Organization",
          name: "Pigiecore Solutions",
          url: siteUrl,
        },
        areaServed: "KE",
      },
      {
        "@type": "FAQPage",
        mainEntity: entry.faqs.map((f) => ({
          "@type": "Question",
          name: f.q,
          acceptedAnswer: { "@type": "Answer", text: f.a },
        })),
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: siteUrl },
          { "@type": "ListItem", position: 2, name: "Services", item: `${siteUrl}/#services` },
          { "@type": "ListItem", position: 3, name: entry.name, item: `${siteUrl}/services/${entry.slug}` },
        ],
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Navbar />
      <ServicePage entry={entry} />
      <Footer />
    </>
  );
}