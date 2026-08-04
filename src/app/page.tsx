import Navbar from "@/components/navbar";
import Hero from "@/components/hero";
import Services from "@/components/services";
import About from "@/components/about";
import Showcase from "@/components/showcase";
import Testimonials from "@/components/testimonials";
import Contact from "@/components/contact";
import Footer from "@/components/footer";

const siteUrl = "https://pigiecore.vercel.app";

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": ["Organization", "ProfessionalService"],
      "@id": `${siteUrl}/#organization`,
      name: "Pigiecore Solutions",
      url: siteUrl,
      logo: `${siteUrl}/icon.svg`,
      image: `${siteUrl}/opengraph-image`,
      description:
        "Custom software development agency in Kenya building dashboards and web applications for real estate, logistics, salons, schools, and hospitals.",
      email: "hello@pigiecoresolutions.com",
      telephone: "+254798118515",
      areaServed: "Kenya",
      contactPoint: [
        {
          "@type": "ContactPoint",
          telephone: "+254798118515",
          contactType: "sales",
          areaServed: "KE",
        },
        {
          "@type": "ContactPoint",
          telephone: "+254708469769",
          contactType: "customer support",
          areaServed: "KE",
        },
      ],
      hasOfferCatalog: {
        "@type": "OfferCatalog",
        name: "Software Services",
        itemListElement: [
          {
            "@type": "Offer",
            itemOffered: {
              "@type": "Service",
              name: "Real Estate Management Software",
              description: "Property management dashboard for landlords and property managers.",
            },
          },
          {
            "@type": "Offer",
            itemOffered: {
              "@type": "Service",
              name: "Website Development",
              description: "Custom business and company websites.",
            },
          },
          {
            "@type": "Offer",
            itemOffered: {
              "@type": "Service",
              name: "Logistics & Fleet Management",
              description: "Fleet tracking, NTSA compliance, and booking systems.",
            },
          },
          {
            "@type": "Offer",
            itemOffered: {
              "@type": "Service",
              name: "Salon & Barber Booking",
              description: "Online booking and client management for salons.",
            },
          },
          {
            "@type": "Offer",
            itemOffered: {
              "@type": "Service",
              name: "School Management System",
              description: "Student records, fees, and staff management for schools.",
            },
          },
          {
            "@type": "Offer",
            itemOffered: {
              "@type": "Service",
              name: "Hospital Management System",
              description: "Patient records, appointments, billing, and pharmacy tracking.",
            },
          },
        ],
      },
    },
    {
      "@type": "WebSite",
      "@id": `${siteUrl}/#website`,
      url: siteUrl,
      name: "Pigiecore Solutions",
      description:
        "Custom software development for real estate, logistics, salons, schools, and hospitals.",
      inLanguage: "en",
      publisher: { "@id": `${siteUrl}/#organization` },
    },
  ],
};

export default function Home() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <main className="flex flex-col flex-1">
        <Navbar />
        <Hero />
        <Services />
        <About />
        <Showcase />
        <Testimonials />
        <Contact />
        <Footer />
      </main>
    </>
  );
}