import type { Metadata } from "next";
import Link from "next/link";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import { Zap, Code2, Compass, LifeBuoy, ArrowRight } from "lucide-react";

export const metadata: Metadata = {
  title: "About Us — Meet the Team",
  description:
    "Pigiecore Solutions is a team of 5 Kenyan engineers building 100% custom software for real estate, logistics, salons, schools, and hospitals — with <24hr response and deep local industry knowledge.",
  keywords: [
    "Pigiecore about",
    "Kenyan software engineers",
    "custom software team",
    "software development Kenya",
  ],
  alternates: { canonical: "/about" },
  openGraph: {
    title: "About Us | Pigiecore Solutions",
    description:
      "Meet the team building custom software that grows Kenyan businesses.",
    type: "profile",
  },
};

const STATS = [
  { value: "5", label: "Kenyan Engineers" },
  { value: "6", label: "Product Lines" },
  { value: "100%", label: "Custom Built" },
  { value: "<24h", label: "Response Time" },
];

const DIFFERENTIATORS = [
  {
    icon: Zap,
    title: "Sub-24 Hour Response",
    description:
      "When you reach out or report an issue, a real engineer responds within a day — no ticket queues, no waiting weeks for answers.",
  },
  {
    icon: Code2,
    title: "100% Custom Approach",
    description:
      "We don't force generic templates onto your business. Every dashboard, workflow, and report is built around how you actually operate.",
  },
  {
    icon: Compass,
    title: "Deep Local Industry Knowledge",
    description:
      "We understand the realities of Kenyan logistics, real estate, and services — NTSA compliance, M-Pesa, fuel costs, tenant management — because we build for them daily.",
  },
  {
    icon: LifeBuoy,
    title: "End-to-End Support",
    description:
      "From the first consultation to design, development, training, and 24/7 maintenance — we stay with you long after launch.",
  },
];

export default function AboutPage() {
  return (
    <>
      <Navbar />
      <main className="flex flex-col flex-1 bg-slate-50 dark:bg-slate-950">
        <section className="bg-gradient-to-br from-sky-600 via-blue-600 to-indigo-700">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-28 text-center">
            <span className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-sky-100 mb-4">
              About Us
            </span>
            <h1 className="text-4xl font-bold tracking-tight text-white sm:text-5xl">
              Built by Engineers.
              <br />
              Designed for Business.
            </h1>
            <p className="mt-4 text-lg text-sky-100/90 max-w-2xl mx-auto">
              We're a team of 5 Kenyan engineers passionate about solving local
              business problems with software that actually works.
            </p>
          </div>
        </section>

        <section className="py-16 sm:py-20 bg-white dark:bg-slate-900">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              {STATS.map((s) => (
                <div
                  key={s.label}
                  className="p-5 rounded-2xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-center"
                >
                  <div className="text-3xl font-bold text-sky-500">{s.value}</div>
                  <div className="mt-1 text-sm text-slate-500 dark:text-slate-400">
                    {s.label}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="py-16 sm:py-20">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold text-slate-900 dark:text-white sm:text-4xl">
              Who We Are
            </h2>
            <div className="mt-6 space-y-5 text-lg text-slate-600 dark:text-slate-300 leading-8">
              <p>
                Pigiecore Solutions is a team of <strong>5 Kenyan engineers</strong>{" "}
                passionate about solving local business problems. We live where our
                clients live — we've seen property managers juggling tenants across
                spreadsheets, salons turning clients away because of double-booked
                slots, and fleet owners tracking trucks on paper.
              </p>
              <p>
                That's why we build software the way we do: focused on the problems
                real Kenyan businesses face every day, not on tech for tech's sake.
              </p>
            </div>

            <h2 className="mt-12 text-3xl font-bold text-slate-900 dark:text-white sm:text-4xl">
              Why We Do This
            </h2>
            <div className="mt-6 space-y-5 text-lg text-slate-600 dark:text-slate-300 leading-8">
              <p>
                Pigiecore was founded on a simple belief: <strong>great software
                should be accessible to every business, regardless of size.</strong>{" "}
                Too often, powerful tools are priced and designed for large
                corporations, leaving small and growing businesses to rely on
                disconnected spreadsheets and manual work.
              </p>
              <p>
                Our mission is to close that gap — to give every Kenyan business the
                same automation and insight the big players enjoy, at a price they
                can afford, in a system they can actually use.
              </p>
            </div>

            <h2 className="mt-12 text-3xl font-bold text-slate-900 dark:text-white sm:text-4xl">
              What Makes Us Different
            </h2>
            <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-6">
              {DIFFERENTIATORS.map((item) => (
                <div
                  key={item.title}
                  className="p-6 rounded-2xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-300"
                >
                  <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-sky-500 to-blue-600 flex items-center justify-center mb-4">
                    <item.icon className="w-5 h-5 text-white" />
                  </div>
                  <h3 className="text-lg font-bold text-slate-900 dark:text-white">
                    {item.title}
                  </h3>
                  <p className="mt-2 text-slate-600 dark:text-slate-400 leading-relaxed">
                    {item.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="py-16 sm:py-20 bg-white dark:bg-slate-900">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl font-bold text-slate-900 dark:text-white sm:text-4xl">
              Ready to build with us?
            </h2>
            <p className="mt-4 text-lg text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
              Tell us about your business and we'll show you what custom software
              could do for it — with a response within 24 hours.
            </p>
            <Link
              href="/#contact"
              className="mt-8 inline-flex items-center gap-2 rounded-full bg-sky-500 px-8 py-3.5 text-base font-semibold text-white shadow-lg shadow-sky-500/25 transition-all hover:bg-sky-600"
            >
              Start a Project <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}