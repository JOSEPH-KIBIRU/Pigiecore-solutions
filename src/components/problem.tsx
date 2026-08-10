import { ClipboardList, Unplug, Hourglass, EyeOff, Sparkles, ArrowRight, ArrowDown } from "lucide-react";
import Link from "next/link";
import Reveal from "@/components/reveal";

const PROBLEM_STEPS = [
  { icon: ClipboardList, title: "Manual processes" },
  { icon: Unplug, title: "Disconnected information" },
  { icon: Hourglass, title: "Lost time" },
  { icon: EyeOff, title: "Poor visibility" },
];

export default function Problem() {
  return (
    <section id="problem" className="py-20 sm:py-28 bg-slate-50 dark:bg-slate-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <Reveal className="text-center mb-14">
          <span className="inline-flex items-center rounded-full border border-teal-200 bg-teal-50 px-4 py-1.5 text-sm font-medium text-teal-700 dark:border-teal-800 dark:bg-teal-950/30 dark:text-teal-300">
            The Problem
          </span>
          <h2 className="mt-5 text-3xl font-bold tracking-tight text-slate-900 dark:text-white sm:text-4xl">
            Your Business Shouldn&apos;t Be Held Back by Manual Processes
          </h2>
          <p className="mt-4 text-lg text-slate-600 dark:text-slate-400 max-w-3xl mx-auto leading-8">
            Spreadsheets, disconnected systems and repetitive manual work make
            it harder to manage a growing business. Pigiecore builds software
            that brings your operations, data and workflows into one place.
          </p>
        </Reveal>

        <Reveal delay={0.05}>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 items-stretch">
            {PROBLEM_STEPS.map((step, i) => (
              <div
                key={step.title}
                className="relative flex flex-col items-center justify-center rounded-2xl border border-teal-100 bg-white p-6 text-center shadow-sm dark:border-teal-900/40 dark:bg-slate-800"
              >
                <step.icon className="w-8 h-8 text-teal-500 mb-3" />
                <div className="font-semibold text-slate-900 dark:text-white">
                  {step.title}
                </div>
                <span className="mt-4 text-slate-300 dark:text-slate-600">
                  <ArrowRight className="w-5 h-5 hidden lg:block" />
                  <ArrowDown className="w-5 h-5 lg:hidden" />
                </span>
              </div>
            ))}
            <div className="relative flex flex-col items-center justify-center rounded-2xl bg-gradient-to-br from-emerald-500 to-teal-600 p-6 text-center text-white shadow-lg shadow-teal-500/25">
              <Sparkles className="w-8 h-8 mb-3" />
              <div className="font-semibold">Pigiecore solution</div>
              <div className="mt-1 text-sm text-teal-50">
                One connected system
              </div>
            </div>
          </div>
        </Reveal>

        <Reveal delay={0.1} className="text-center mt-10">
          <Link
            href="/#contact"
            className="inline-flex items-center gap-2 rounded-full bg-teal-500 px-8 py-3.5 text-base font-semibold text-white shadow-lg shadow-teal-500/25 transition-all hover:bg-teal-600 hover:shadow-xl"
          >
            Let&apos;s Solve Your Problem
          </Link>
        </Reveal>
      </div>
    </section>
  );
}