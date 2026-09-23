import Link from "next/link";
import Button from "@/components/ui/button";
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
  Briefcase,
  Smartphone,
  Search,
  Check,
  ArrowRight,
} from "lucide-react";
import Reveal from "@/components/reveal";
import { SERVICE_ENTRIES, type ServiceEntry } from "@/lib/service-content";

export const ICONS: Record<string, React.ComponentType<{ className?: string }>> = {
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
  briefcase: Briefcase,
  smartphone: Smartphone,
  search: Search,
};

export default function ServicePage({ entry }: { entry: ServiceEntry }) {
  const Icon = ICONS[entry.icon] ?? Code2;

  return (
    <main className="flex flex-col flex-1 bg-surface-2 pt-20 sm:pt-24">
      <section className="bg-ink-panel">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20 lg:py-24">
          <Reveal>
            <span className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-brand-soft mb-4">
              <Icon className="w-4 h-4" /> {entry.eyebrow}
            </span>
            <h1 className="text-4xl font-bold tracking-tight text-white sm:text-5xl">
              {entry.h1}
            </h1>
            <p className="mt-4 text-lg text-white/70 max-w-2xl leading-relaxed">
              {entry.tagline}
            </p>
            <div className="mt-8 flex flex-wrap gap-4">
              <Button href="/#contact" variant="light" size="md">
                Start Your Project <ArrowRight className="w-4 h-4" />
              </Button>
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
            <div className="space-y-5 text-lg text-text-2 dark:text-text-2 leading-8">
              {entry.intro.map((paragraph, i) => (
                <p key={i}>{paragraph}</p>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

        <section className="py-16 sm:py-20 bg-surface-2">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <Reveal>
            <h2 className="text-3xl font-bold text-text-1 dark:text-white sm:text-4xl">
              What&apos;s Included
            </h2>
          </Reveal>
          <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-6">
            {entry.features.map((feature, i) => (
              <Reveal key={feature.title} delay={(i % 2) * 0.08}>
                <div className="h-full rounded-2xl border border-border-default bg-surface-2 p-6 dark:border-border-default dark:bg-surface-muted">
                  <div className="flex items-start gap-3">
                    <span className="mt-0.5 w-6 h-6 rounded-full bg-brand/15 dark:bg-brand/15 flex items-center justify-center shrink-0">
                      <Check className="w-4 h-4 text-brand dark:text-brand-soft" />
                    </span>
                    <div>
                      <h3 className="text-lg font-semibold text-text-1 dark:text-white">
                        {feature.title}
                      </h3>
                      <p className="mt-1.5 text-sm text-text-2 dark:text-text-3 leading-relaxed">
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
            <h2 className="text-3xl font-bold text-text-1 dark:text-white sm:text-4xl">
              Frequently Asked Questions
            </h2>
          </Reveal>
          <div className="mt-8 space-y-3">
            {entry.faqs.map((faq) => (
              <Reveal key={faq.q}>
                <details className="group rounded-2xl border border-border-default bg-surface-2 open:border-brand/40 open:ring-1 open:ring-brand/20">
                  <summary className="flex cursor-pointer list-none items-center justify-between gap-4 px-6 py-5 text-base font-semibold text-text-1 dark:text-white marker:hidden">
                    {faq.q}
                    <ArrowRight className="w-4 h-4 shrink-0 text-brand transition-transform group-open:rotate-90" />
                  </summary>
                  <div className="px-6 pb-5">
                    <p className="text-sm text-text-2 dark:text-text-3 leading-relaxed">
                      {faq.a}
                    </p>
                  </div>
                </details>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

        <section className="py-16 sm:py-20 bg-surface-2">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <Reveal>
            <h2 className="text-3xl font-bold text-text-1 dark:text-white sm:text-4xl">
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
                  className="inline-flex items-center gap-2 rounded-full border border-border-default bg-surface-2 px-5 py-2.5 text-sm font-medium text-text-2 transition-colors hover:border-brand hover:text-brand dark:bg-surface-muted"
                >
                  {relEntry?.name ?? rel.slug.replace(/-/g, " ")}
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              );
            })}
          </div>

          <Reveal>
            <div className="mt-12 rounded-2xl bg-gradient-to-br from-brand-hover via-brand-hover to-brand-hover p-8 sm:p-10 text-center">
              <h2 className="text-2xl sm:text-3xl font-bold text-white">
                Ready to build this for your business?
              </h2>
              <p className="mt-3 text-white/70 max-w-xl mx-auto">
                Tell us about your project and we&apos;ll respond within 24 hours
                with a plan and a clear quote.
              </p>
              <Button href="/#contact" variant="primary" size="lg" className="mt-6">
                Start Your Project <ArrowRight className="w-5 h-5" />
              </Button>
            </div>
          </Reveal>
        </div>
      </section>
    </main>
  );
}