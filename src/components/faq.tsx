"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";

const FAQS = [
  {
    q: "What software solutions does Pigiecore Solutions offer?",
    a: "We build custom software for real estate management, business and company websites, logistics and fleet management, salon and barber booking, school management, and hospital management — plus tailored dashboards to automate your specific operations.",
  },
  {
    q: "How long does it take to build a custom dashboard or website?",
    a: "A typical business website takes 1–3 weeks, while a full custom dashboard or management system ranges from 3 to 8 weeks depending on the features, integrations, and how quickly we receive your feedback and data.",
  },
  {
    q: "How much does a custom software project cost?",
    a: "Every project is quoted individually based on scope, complexity, and integrations. We give you a clear, fixed quote before we start — no hidden charges. Contact us for a free consultation and we will prepare a tailored estimate.",
  },
  {
    q: "Do you support your business after the software is delivered?",
    a: "Yes. We offer 24/7 after-launch support, training, and maintenance plans. You can report issues, request tweaks, and get help with your system anytime through our support channels.",
  },
  {
    q: "Can you integrate with our existing tools, payments, and SMS?",
    a: "Absolutely. We integrate with payment solutions like M-Pesa (Daraja), online gateways such as Stripe and PayPal, SMS/notification services, email, and other third-party APIs so the system fits how your business already operates.",
  },
  {
    q: "Do you work with clients outside Kenya?",
    a: "Yes. We are based in Kenya but deliver software to clients across Africa and beyond. We work remotely with online meetings, ticketing, and project tracking to keep you involved from start to finish.",
  },
  {
    q: "What do I need to get started with a project?",
    a: "Simply reach us through the contact form or book a demo. We'll walk through your goals, gather your requirements, and share a proposal. All we need to begin is a clear description of the problem you want to solve.",
  },
  {
    q: "Who owns the source code and data after the project and deployment?",
    a: "You own the final source code and all your business data. We retain no rights to your proprietary information, and we follow strict data protection practices to keep your information secure. Licensing terms are defined in our proposal and our agreement.",
  },
];

export default function Faq() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

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

        <div className="space-y-4">
          {FAQS.map((item, i) => {
            const isOpen = openIndex === i;
            return (
              <div
                key={i}
                className={`rounded-2xl border bg-slate-50 dark:bg-slate-900 transition-colors ${
                  isOpen
                    ? "border-sky-300 dark:border-sky-800"
                    : "border-slate-200 dark:border-slate-800"
                }`}
              >
                <button
                  onClick={() => setOpenIndex(isOpen ? null : i)}
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
    </section>
  );
}