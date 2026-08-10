import Link from "next/link";
import {
  Code2,
  Cloud,
  Globe,
  Zap,
  CreditCard,
  Building2,
  Truck,
  GraduationCap,
  HeartPulse,
  Settings,
  Check,
  ArrowRight,
} from "lucide-react";
import Reveal from "@/components/reveal";
import { SERVICE_ENTRIES, type ServiceEntry } from "@/lib/service-content";

const ICONS: Record<string, React.ComponentType<{ className?: string }>> = {
  code: Code2,
  cloud: Cloud,
  globe: Globe,
  zap: Zap,
  creditcard: CreditCard,
  building: Building2,
  truck: Truck,
  graduationcap: GraduationCap,
  heartpulse: HeartPulse,
  settings: Settings,
};

export default function ServicePage({ entry }: { entry: ServiceEntry }) {
  const Icon = ICONS[entry.icon] ?? Code2;

  return (
    <main className="flex flex-col flex-1 bg-slate-50 dark:bg-slate-950 pt-20 sm:pt-24">
      <section className="bg-gradient-to-br from-sky-600 via-blue-600 to-indigo-700">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20 lg:py-24">
          <Reveal>
            <span className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-sky-100 mb-4">
              <Icon className="w-4 h-4" /> {entry.eyebrow}
            </span>
            <h1 className="text-4xl font-bold tracking-tight text-white sm:text-5xl">
              {entry.h1}
            </h1>
            <p className="mt-4 text-lg text-sky-100/90 max-w-2xl leading-relaxed">
              {entry.tagline}
            </p>
            <div className="mt-8 flex flex-wrap gap-4">
              <Link
                href="/#contact"
                className="inline-flex items-center gap-2 rounded-full bg-white px-7 py-3 text-sm font-semibold text-slate-900 shadow-lg transition-all hover:bg-sky-50 hover:scale-[1.02]"
              >
                Start Your Project <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                href="/solutions/custom-business-systems"
                className="inline-flex items-center gap-2 rounded-full border border-white/40 px-7 py-3 text-sm font-medium text-white transition-all hover:bg-white/10"
              >
                Explore Custom Systems
              </Link>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="py-16 sm:py-20">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <Reveal>
            <div className="space-y-5 text-lg text-slate-600 dark:text-slate-300 leading-8">
              {entry.intro.map((paragraph, i) => (
                <p key={i}>{paragraph}</p>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      <section className="py-16 sm:py-20 bg-white dark:bg-slate-900">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <Reveal>
            <h2 className="text-3xl font-bold text-slate-900 dark:text-white sm:text-4xl">
              What&apos;s Included
            </h2>
          </Reveal>
          <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-6">
            {entry.features.map((feature, i) => (
              <Reveal key={feature.title} delay={(i % 2) * 0.08}>
                <div className="h-full rounded-2xl border border-slate-200 bg-slate-50 p-6 dark:border-slate-700 dark:bg-slate-800">
                  <div className="flex items-start gap-3">
                    <span className="mt-0.5 w-6 h-6 rounded-full bg-sky-100 dark:bg-sky-950/40 flex items-center justify-center shrink-0">
                      <Check className="w-4 h-4 text-sky-600 dark:text-sky-400" />
                    </span>
                    <div>
                      <h3 className="text-lg font-semibold text-slate-900 dark:text-white">
                        {feature.title}
                      </h3>
                      <p className="mt-1.5 text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                        {feature.description}
                      </p>
                    </div>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 sm:py-20">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <Reveal>
            <h2 className="text-3xl font-bold text-slate-900 dark:text-white sm:text-4xl">
              Frequently Asked Questions
            </h2>
          </Reveal>
          <div className="mt-8 space-y-3">
            {entry.faqs.map((faq) => (
              <Reveal key={faq.q}>
                <details className="group rounded-2xl border border-slate-200 bg-white dark:border-slate-700 dark:bg-slate-800 open:ring-1 open:ring-sky-500/20">
                  <summary className="flex cursor-pointer list-none items-center justify-between gap-4 px-6 py-5 text-base font-semibold text-slate-900 dark:text-white marker:hidden">
                    {faq.q}
                    <ArrowRight className="w-4 h-4 shrink-0 text-sky-500 transition-transform group-open:rotate-90" />
                  </summary>
                  <div className="px-6 pb-5">
                    <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                      {faq.a}
                    </p>
                  </div>
                </details>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 sm:py-20 bg-white dark:bg-slate-900">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <Reveal>
            <h2 className="text-3xl font-bold text-slate-900 dark:text-white sm:text-4xl">
              Related Solutions
            </h2>
          </Reveal>
          <div className="mt-8 flex flex-wrap gap-3">
            {entry.related.map((rel) => {
              const relEntry = SERVICE_ENTRIES.find(
                (e) => e.type === rel.type && e.slug === rel.slug
              );
              return (
                <Link
                  key={`${rel.type}/${rel.slug}`}
                  href={`/${rel.type}/${rel.slug}`}
                  className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-slate-50 px-5 py-2.5 text-sm font-medium text-slate-700 transition-colors hover:border-sky-400 hover:text-sky-600 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-300 dark:hover:text-sky-400"
                >
                  {relEntry?.name ?? rel.slug.replace(/-/g, " ")}
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              );
            })}
          </div>

          <Reveal>
            <div className="mt-12 rounded-2xl bg-gradient-to-br from-sky-600 via-blue-600 to-indigo-700 p-8 sm:p-10 text-center">
              <h2 className="text-2xl sm:text-3xl font-bold text-white">
                Ready to build this for your business?
              </h2>
              <p className="mt-3 text-sky-100/90 max-w-xl mx-auto">
                Tell us about your project and we&apos;ll respond within 24 hours
                with a plan and a clear quote.
              </p>
              <Link
                href="/#contact"
                className="mt-6 inline-flex items-center gap-2 rounded-full bg-white px-8 py-3.5 text-base font-semibold text-slate-900 shadow-lg transition-all hover:bg-sky-50 hover:scale-[1.02]"
              >
                Start Your Project <ArrowRight className="w-5 h-5" />
              </Link>
            </div>
          </Reveal>
        </div>
      </section>
    </main>
  );
}