import { ArrowRight } from "lucide-react";
import Link from "next/link";
import Reveal from "@/components/reveal";

export default function FinalCta() {
  return (
    <section id="final-cta" className="py-20 sm:py-28 bg-white dark:bg-slate-950">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <Reveal>
          <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-sky-600 via-blue-600 to-indigo-700 px-6 py-16 sm:py-20 text-center shadow-2xl">
            <div className="pointer-events-none absolute -top-24 -right-24 w-72 h-72 rounded-full bg-white/10 blur-3xl" />
            <div className="pointer-events-none absolute -bottom-24 -left-24 w-72 h-72 rounded-full bg-white/10 blur-3xl" />
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-white max-w-3xl mx-auto">
              Have a Business Problem That Software Could Solve?
            </h2>
            <p className="mt-5 text-lg text-sky-100 max-w-2xl mx-auto leading-8">
              Tell us what you&apos;re trying to achieve. We&apos;ll help you
              determine the right technology, approach and next steps.
            </p>
            <div className="mt-9">
              <Link
                href="/#contact"
                className="inline-flex items-center gap-2 rounded-full bg-white px-9 py-4 text-base font-semibold text-sky-600 shadow-lg transition-all hover:bg-sky-50 hover:shadow-xl"
              >
                Start Your Project <ArrowRight className="w-5 h-5" />
              </Link>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}