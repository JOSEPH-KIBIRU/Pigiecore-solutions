import Navbar from "@/components/navbar";
import Hero from "@/components/hero";
import Trust from "@/components/trust";
import Problem from "@/components/problem";
import Services from "@/components/services";
import HowWeWork from "@/components/how-we-work";
import Showcase from "@/components/showcase";
import BomaPulseCase from "@/components/bomapulse-case";
import Technology from "@/components/technology";
import About from "@/components/about";
import Testimonials from "@/components/testimonials";
import Faq from "@/components/faq";
import FinalCta from "@/components/final-cta";
import Contact from "@/components/contact";
import Footer from "@/components/footer";
import OfferPopup from "@/components/offer-popup";
import { siteUrl } from "@/lib/site";

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
      email: "info@pigiecore.co.ke",
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
          telephone: "+254708769459",
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
    {
      "@type": "SoftwareApplication",
      name: "SteadyCargo ERP",
      operatingSystem: "Web",
      applicationCategory: "BusinessApplication",
      description:
        "Logistics and fleet management ERP with real-time GPS tracking, route optimization, NTSA compliance, delivery scheduling, and fuel and maintenance analytics.",
      url: `${siteUrl}/#services`,
      publisher: { "@id": `${siteUrl}/#organization` },
    },
    {
      "@type": "SoftwareApplication",
      name: "BomaPulse",
      operatingSystem: "Web",
      applicationCategory: "BusinessApplication",
      description:
        "Real estate management dashboard with property analytics, lead tracking, investment calculators, tenant management, and smart MLS integrations.",
      url: `${siteUrl}/#services`,
      publisher: { "@id": `${siteUrl}/#organization` },
    },
    {
      "@type": "SoftwareApplication",
      name: "Pigiecore Salon & Barber Booking",
      operatingSystem: "Web",
      applicationCategory: "BusinessApplication",
      description:
        "Online appointment scheduling with staff management, payment processing, client history, and inventory tracking for salons and barbershops.",
      url: `${siteUrl}/#services`,
      publisher: { "@id": `${siteUrl}/#organization` },
    },
    {
      "@type": "SoftwareApplication",
      name: "Pigiecore School Management System",
      operatingSystem: "Web",
      applicationCategory: "EducationalApplication",
      description:
        "Complete school operating system with student records, timetables, attendance, grade books, communications, and parent portals.",
      url: `${siteUrl}/#services`,
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
        <Trust />
        <Problem />
        <Services />
        <HowWeWork />
        <Showcase />
        <BomaPulseCase />
        <Technology />
        <About />
        <Testimonials />
        <Faq />
        <FinalCta />
        <Contact />
        <Footer />
      </main>
      <OfferPopup />
    </>
  );
}