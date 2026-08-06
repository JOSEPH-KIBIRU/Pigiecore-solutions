"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { FAQS, FAQ_GROUPS } from "@/lib/faq-data";

export { FAQS };

export default function Faq() {
  const [openKey, setOpenKey] = useState<string | null>(FAQS[0] ? "0" : null);

  let index = 0;

  return (
    <section id="faq" className="py-20 sm:py-28 bg-white dark:bg-slate-950">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <span className="text-sm font-semibold uppercase tracking-wider text-sky-500">
            FAQ
          </span>
          <h2 className="mt-3 text-3xl sm:text-4xl font-bold text-slate-900 dark:text-white">
            Frequently Asked Questions
          </h2>
          <p className="mt-4 text-slate-600 dark:text-slate-400 max-w-2xl mx-auto leading-relaxed">
            Everything you need to know about working with Pigiecore Solutions
            — our products, pricing, timelines, and support.
          </p>
        </div>

        {FAQ_GROUPS.map((group) => {
          const items = FAQS.filter((f) => f.group === group);
          if (!items.length) return null;
          return (
            <div key={group} className="mb-10">
              <h3 className="mb-4 flex items-center gap-3">
                <span className="text-base font-semibold text-slate-900 dark:text-white">
                  {group}
                </span>
                <span className="h-px flex-1 bg-slate-200 dark:bg-slate-800"></span>
              </h3>
              <div className="space-y-4">
                {items.map((item) => {
                  const key = String(index++);
                  const isOpen = openKey === key;
                  return (
                    <div
                      key={key}
                      className={`rounded-2xl border bg-slate-50 dark:bg-slate-900 transition-colors ${
                        isOpen
                          ? "border-sky-300 dark:border-sky-800"
                          : "border-slate-200 dark:border-slate-800"
                      }`}
                    >
                      <button
                        onClick={() => setOpenKey(isOpen ? null : key)}
                        className="w-full flex items-center justify-between gap-4 px-6 py-5 text-left"
                      >
                        <span className="text-base font-semibold text-slate-900 dark:text-white">
                          {item.q}
                        </span>
                        <ChevronDown
                          className={`w-5 h-5 shrink-0 text-sky-500 transition-transform ${isOpen ? "rotate-180" : ""}`}
                        />
                      </button>
                      {isOpen && (
                        <div className="px-6 pb-5 -mt-1">
                          <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
                            {item.a}
                          </p>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}