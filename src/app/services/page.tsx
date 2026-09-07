import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Code2 } from "lucide-react";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import { SERVICE_ENTRIES } from "@/lib/service-content";
import { ICONS } from "@/components/service-page";

export const metadata: Metadata = {
  title: "Software Services — Custom Development, SaaS & Integrations",
  description:
    "Explore Pigiecore's software services: custom software development, SaaS platforms, web applications, business automation, and payment & API integrations in Kenya.",
  alternates: { canonical: "/services" },
  openGraph: {
    title: "Software Services | Pigiecore Solutions",
    description:
      "Custom software development, SaaS, web apps, automation, and integrations.",
    type: "website",
    url: "https://pigiecore.co.ke/services",
  },
};

export default function ServicesIndexPage() {
  const services = SERVICE_ENTRIES.filter((e) => e.type === "services");

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-slate-50 dark:bg-slate-950">
        <div className="bg-gradient-to-br from-sky-600 via-blue-600 to-indigo-700">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-24">
            <span className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-sky-100 mb-4">
              Services
            </span>
            <h1 className="text-4xl font-bold tracking-tight text-white sm:text-5xl">
              Software Services
            </h1>
            <p className="mt-4 text-lg text-sky-100/90 max-w-2xl">
              End-to-end development services — from discovery to deployment and
              long-term support.
            </p>
          </div>
        </div>

        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-14 lg:py-20">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((service) => {
              const Icon = ICONS[service.icon] ?? Code2;
              return (
                <Link
                  key={service.slug}
                  href={`/services/${service.slug}`}
                  className="group rounded-2xl border border-slate-200 bg-white p-6 shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-300 dark:border-slate-800 dark:bg-slate-900"
                >
                  <div className="w-12 h-12 rounded-xl bg-sky-50 flex items-center justify-center text-sky-500 mb-5 group-hover:scale-110 transition-transform dark:bg-sky-950/30 dark:text-sky-400">
                    <Icon className="w-6 h-6" />
                  </div>
                  <h2 className="text-lg font-bold text-slate-900 dark:text-white group-hover:text-sky-600 dark:group-hover:text-sky-400 transition-colors">
                    {service.name}
                  </h2>
                  <p className="mt-2 text-sm text-slate-500 dark:text-slate-400 leading-relaxed">
                    {service.tagline}
                  </p>
                  <span className="mt-4 inline-flex items-center gap-1 text-sm font-medium text-sky-500">
                    Learn more{" "}
                    <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                  </span>
                </Link>
              );
            })}
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
