import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Code2 } from "lucide-react";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import { SERVICE_ENTRIES } from "@/lib/service-content";
import { ICONS } from "@/components/service-page";

export const metadata: Metadata = {
  title: "Business Solutions — Software Built for Kenyan Industries",
  description:
    "Industry software solutions by Pigiecore: property management, fleet & logistics, school management, healthcare, office management, and custom business systems.",
  alternates: { canonical: "/solutions" },
  openGraph: {
    title: "Business Solutions | Pigiecore Solutions",
    description:
      "Ready-to-tailor software for real estate, logistics, schools, healthcare, offices and more.",
    type: "website",
    url: "https://pigiecore.co.ke/solutions",
  },
};

export default function SolutionsIndexPage() {
  const solutions = SERVICE_ENTRIES.filter((e) => e.type === "solutions");

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-slate-50 dark:bg-slate-950">
        <div className="bg-gradient-to-br from-teal-600 via-emerald-600 to-green-700">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-24">
            <span className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-teal-100 mb-4">
              Solutions
            </span>
            <h1 className="text-4xl font-bold tracking-tight text-white sm:text-5xl">
              Business Solutions
            </h1>
            <p className="mt-4 text-lg text-teal-100/90 max-w-2xl">
              Purpose-built software systems for the industries we serve across
              Kenya.
            </p>
          </div>
        </div>

        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-14 lg:py-20">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {solutions.map((solution) => {
              const Icon = ICONS[solution.icon] ?? Code2;
              return (
                <Link
                  key={solution.slug}
                  href={`/solutions/${solution.slug}`}
                  className="group rounded-2xl border border-slate-200 bg-white p-6 shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-300 dark:border-slate-800 dark:bg-slate-900"
                >
                  <div className="w-12 h-12 rounded-xl bg-teal-50 flex items-center justify-center text-teal-600 mb-5 group-hover:scale-110 transition-transform dark:bg-teal-950/30 dark:text-teal-400">
                    <Icon className="w-6 h-6" />
                  </div>
                  <h2 className="text-lg font-bold text-slate-900 dark:text-white group-hover:text-teal-600 dark:group-hover:text-teal-400 transition-colors">
                    {solution.name}
                  </h2>
                  <p className="mt-2 text-sm text-slate-500 dark:text-slate-400 leading-relaxed">
                    {solution.tagline}
                  </p>
                  <span className="mt-4 inline-flex items-center gap-1 text-sm font-medium text-teal-600 dark:text-teal-400">
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
