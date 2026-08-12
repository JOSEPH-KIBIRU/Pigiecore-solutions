"use client";

import * as Accordion from "@radix-ui/react-accordion";
import { ChevronDown } from "lucide-react";
import { FAQS, FAQ_GROUPS } from "@/lib/faq-data";
import Reveal from "@/components/reveal";

export { FAQS };

export default function Faq() {
  return (
    <section id="faq" className="py-20 sm:py-28 bg-white dark:bg-slate-950">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <Reveal className="text-center mb-12">
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
        </Reveal>

        {FAQ_GROUPS.map((group, groupIndex) => {
          const items = FAQS.filter((f) => f.group === group);
          if (!items.length) return null;
          return (
            <Reveal key={group} delay={groupIndex * 0.05} className="mb-10">
              <h3 className="mb-4 flex items-center gap-3">
                <span className="text-base font-semibold text-slate-900 dark:text-white">
                  {group}
                </span>
                <span className="h-px flex-1 bg-slate-200 dark:bg-slate-800"></span>
              </h3>
              <Accordion.Root
                type="multiple"
                defaultValue={items.map((_, i) => String(i))}
                className="space-y-4"
              >
                {items.map((item, i) => (
                  <Accordion.Item
                    key={i}
                    value={String(i)}
                    className="group rounded-2xl border border-slate-200 bg-slate-50 transition-colors data-[state=open]:border-sky-300 dark:border-slate-800 dark:bg-slate-900 dark:data-[state=open]:border-sky-800"
                  >
                    <Accordion.Header>
                      <Accordion.Trigger className="flex w-full items-center justify-between gap-4 px-6 py-5 text-left outline-none">
                        <span className="text-base font-semibold text-slate-900 dark:text-white">
                          {item.q}
                        </span>
                        <ChevronDown className="w-5 h-5 shrink-0 text-sky-500 transition-transform duration-300 group-data-[state=open]:rotate-180" />
                      </Accordion.Trigger>
                    </Accordion.Header>
                    <Accordion.Content className="overflow-hidden text-sm data-[state=open]:animate-accordion-down data-[state=closed]:animate-accordion-up">
                      <div className="px-6 pb-5">
                        <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
                          {item.a}
                        </p>
                      </div>
                    </Accordion.Content>
                  </Accordion.Item>
                ))}
              </Accordion.Root>
            </Reveal>
          );
        })}
      </div>
    </section>
  );
}