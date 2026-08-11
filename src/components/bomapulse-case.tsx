import { BarChart3, CreditCard, Smartphone, Plus, ArrowRight } from "lucide-react";
import Link from "next/link";
import Reveal from "@/components/reveal";

const OUTCOMES = [
  { icon: Smartphone, title: "Rent & M-Pesa Collection", description: "Automated payment matching with reports in real time." },
  { icon: BarChart3, title: "Dashboards & Reports", description: "Occupancy, arrears, and revenue visible at a glance." },
  { icon: CreditCard, title: "Property Listings", description: "Units published instantly with statuses kept live." },
];

export default function BomaPulseCase() {
  return (
    <section id="case-study" className="py-20 sm:py-28 bg-slate-50 dark:bg-slate-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <Reveal>
          <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-slate-900 to-slate-800 p-8 sm:p-12 shadow-2xl dark:from-slate-900 dark:to-slate-950">
            <div className="pointer-events-none absolute -top-24 -right-24 w-72 h-72 rounded-full bg-sky-500/20 blur-3xl" />
            <span className="inline-flex items-center rounded-full border border-sky-500/40 bg-sky-500/10 px-4 py-1.5 text-sm font-medium text-sky-400">
              Case Study
            </span>
            <h2 className="mt-5 text-3xl font-bold tracking-tight text-white sm:text-4xl">
              BomaPulse — Real Estate, Fully Automated
            </h2>
            <p className="mt-4 max-w-2xl text-slate-300 leading-8">
              We designed and built BomaPulse, a property management platform
              that helps landlords and agents collect rent, track units, and
              understand their portfolio — all from one dashboard.
            </p>
            <div className="mt-10 grid grid-cols-1 sm:grid-cols-3 gap-6">
              {OUTCOMES.map((o) => (
                <div
                  key={o.title}
                  className="rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur"
                >
                  <o.icon className="w-6 h-6 text-sky-400 mb-3" />
                  <h3 className="font-bold text-white">{o.title}</h3>
                  <p className="mt-2 text-sm text-slate-300 leading-relaxed">{o.description}</p>
                </div>
              ))}
            </div>
            <div className="mt-10 flex flex-col sm:flex-row items-start gap-4">
              <Link
                href="/#contact"
                className="inline-flex items-center gap-2 rounded-full bg-sky-500 px-6 py-3 text-sm font-semibold text-white transition-all hover:bg-sky-600"
              >
                <Plus className="w-4 h-4" /> Build a Similar Solution
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}