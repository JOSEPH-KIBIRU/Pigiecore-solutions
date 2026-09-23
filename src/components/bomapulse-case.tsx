"use client";

import { useState } from "react";
import { ExternalLink, Plus, ArrowRight } from "lucide-react";
import Link from "next/link";
import Reveal from "@/components/reveal";

const BOMAPULSE_URL = "https://bomapulse.com";
const BOMAPULSE_IMAGE =
  "https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=1200&h=750&fit=crop";

const TABS = [
  {
    label: "Challenge",
    content:
      "Property managers and landlords in Kenya were running units, tenants, and rent across spreadsheets and paper — no real-time view of occupancy or arrears, rent payments lost in reconciliation, and owners waiting days for reports.",
  },
  {
    label: "Solution",
    content:
      "We designed and built BomaPulse as a complete property management platform: live unit and tenant ledgers, rent collection with automatic M-Pesa reconciliation, automated reminders, maintenance tracking, and owner-ready financial reports — all in one dashboard.",
  },
  {
    label: "Architecture",
    content:
      "A modern web stack with a clean separation of concerns: a Next.js and TypeScript frontend, a PostgreSQL backend with row-level security for multi-user access, and a thin API layer. The M-Pesa Daraja integration runs on webhooks so payments reconcile in real time, while scheduled jobs handle reminders and report generation.",
  },
  {
    label: "Features",
    content:
      "Live property and tenant dashboards · M-Pesa STK push rent collection with automatic payment matching · automated rent reminders via SMS and email · unit and tenant ledgers with lease tracking · maintenance request management · owner and agent financial reports.",
  },
  {
    label: "Technology",
    content:
      "Next.js, TypeScript, Tailwind CSS, PostgreSQL, M-Pesa Daraja API, Vercel, and Docker.",
  },
  {
    label: "Outcome",
    content:
      "Landlords now see occupancy, arrears, and revenue in real time. Rent reconciliation is fully automated, and owners receive clear monthly reports without manual effort.",
  },
];

export default function BomaPulseCase() {
  const [active, setActive] = useState(0);

  return (
    <section id="selected-work" className="py-20 sm:py-28 bg-surface-2 dark:bg-slate-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <Reveal className="text-center mb-14">
          <span className="inline-flex items-center rounded-full border border-brand/25 bg-brand/10 px-4 py-1.5 text-sm font-medium text-brand dark:border-brand/30 dark:bg-brand/15 dark:text-brand-soft">
            Our Work
          </span>
            <h2 className="h-section mt-5 text-text-1 dark:text-white">
            Selected Work
          </h2>
          <p className="mt-4 text-lg text-text-2 dark:text-text-3 max-w-2xl mx-auto">
            Real systems we&apos;ve shipped. BomaPulse is our first full case
            study.
          </p>
        </Reveal>

        <Reveal delay={0.05}>
          <div className="overflow-hidden rounded-3xl border border-border-default bg-white shadow-xl dark:border-border-default dark:bg-surface-muted">
            <div className="grid grid-cols-1 lg:grid-cols-2">
              <div className="border-b lg:border-b-0 lg:border-r border-border-default dark:border-border-default">
                <div className="h-9 bg-surface-muted dark:bg-slate-700/50 flex items-center px-4 gap-1.5 border-b border-border-default/50 dark:border-border-default/50">
                  <span className="w-3 h-3 rounded-full bg-red-400"></span>
                  <span className="w-3 h-3 rounded-full bg-amber-400"></span>
                  <span className="w-3 h-3 rounded-full bg-emerald-400"></span>
                  <span className="ml-3 text-[11px] text-text-3 dark:text-text-3 font-mono">
                    bomapulse — live
                  </span>
                </div>
                <div className="relative">
                  <img
                    src={BOMAPULSE_IMAGE}
                    alt="BomaPulse dashboard screenshot"
                    className="w-full aspect-[4/3] object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900/50 to-transparent"></div>
                </div>
              </div>
              <div className="flex flex-col justify-center p-8 sm:p-10">
                <span className="inline-flex items-center rounded-full border border-brand/25 bg-brand/10 px-3 py-1 text-xs font-semibold text-brand dark:border-brand/30 dark:bg-brand/15 dark:text-brand-soft">
                  Case Study
                </span>
                <h3 className="mt-4 text-2xl sm:text-3xl font-bold text-text-1 dark:text-white">
                  BomaPulse — Real Estate, Fully Automated
                </h3>
                <p className="mt-4 text-text-2 dark:text-text-2 leading-8">
                  A property management platform that helps landlords and agents
                  collect rent, track units, and understand their portfolio — all
                  from one dashboard.
                </p>
                <div className="mt-8 flex flex-col sm:flex-row items-start gap-4">
                  <a
                    href={BOMAPULSE_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 rounded-full bg-brand px-6 py-3 text-sm font-semibold text-white transition-all hover:bg-brand-hover"
                  >
                    Visit BomaPulse <ExternalLink className="w-4 h-4" />
                  </a>
                  <Link
                    href="/#contact"
                    className="inline-flex items-center gap-2 rounded-full border border-border-strong dark:border-slate-600 px-6 py-3 text-sm font-semibold text-text-2 dark:text-slate-200 transition-all hover:border-brand hover:text-brand dark:hover:text-sky-400"
                  >
                    <Plus className="w-4 h-4" /> Build a Similar Solution
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              </div>
            </div>

            <div className="border-t border-border-default dark:border-border-default p-6 sm:p-8">
              <div className="flex flex-wrap gap-2 mb-6">
                {TABS.map((tab, i) => (
                  <button
                    key={tab.label}
                    onClick={() => setActive(i)}
                    className={`rounded-full px-4 py-2 text-sm font-medium transition-all ${
                      i === active
                        ? "bg-brand text-white shadow-md shadow-brand/25"
                        : "bg-surface-muted text-text-2 hover:bg-slate-200 dark:bg-slate-700/50 dark:text-text-2 dark:hover:bg-slate-700"
                    }`}
                  >
                    {tab.label}
                  </button>
                ))}
              </div>
              <div className="rounded-2xl bg-surface-2 dark:bg-slate-900 p-6 sm:p-8">
                <p className="text-text-2 dark:text-slate-200 leading-8">
                  {TABS[active].content}
                </p>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}