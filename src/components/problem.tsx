import { AlertCircle, XCircle } from "lucide-react";
import Link from "next/link";
import Reveal from "@/components/reveal";

const PROBLEMS = [
  "Recording everything in spreadsheets and paper journals",
  "Repeating data entry across different tools that don't talk to each other",
  "Chasing payments, tenants, or clients manually",
  "Making decisions without clear, up-to-date reports",
  "Losing hours of staff time to repetitive admin work",
];

export default function Problem() {
  return (
    <section id="problem" className="py-20 sm:py-28 bg-slate-50 dark:bg-slate-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          <Reveal>
            <span className="inline-flex items-center gap-1.5 rounded-full border border-rose-200 bg-rose-50 px-4 py-1.5 text-sm font-medium text-rose-600 dark:border-rose-800 dark:bg-rose-950/30 dark:text-rose-400">
              <AlertCircle className="w-4 h-4" /> The Problem
            </span>
            <h2 className="mt-5 text-3xl font-bold tracking-tight text-slate-900 dark:text-white sm:text-4xl">
              Manual work is quietly costing your business money
            </h2>
            <p className="mt-4 text-lg text-slate-600 dark:text-slate-300 leading-8">
              When your operations run on disconnected spreadsheets and manual
              hand-offs, errors slip in, time is lost, and you can't see what's
              really happening until it's too late.
            </p>
          </Reveal>
          <Reveal delay={0.1}>
            <div className="rounded-2xl border border-slate-200 bg-white p-8 shadow-sm dark:border-slate-700 dark:bg-slate-800">
              <ul className="space-y-5">
                {PROBLEMS.map((problem) => (
                  <li key={problem} className="flex items-start gap-3">
                    <XCircle className="w-5 h-5 shrink-0 mt-0.5 text-rose-400" />
                    <span className="text-slate-700 dark:text-slate-200 leading-relaxed">
                      {problem}
                    </span>
                  </li>
                ))}
              </ul>
              <Link
                href="/#contact"
                className="mt-8 inline-flex items-center gap-2 rounded-full bg-sky-500 px-6 py-3 text-sm font-semibold text-white transition-all hover:bg-sky-600"
              >
                Talk to an Engineer
              </Link>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}