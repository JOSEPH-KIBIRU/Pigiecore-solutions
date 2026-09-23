"use client";

import { useState, useEffect } from "react";
import { ArrowRight, Target, Puzzle, Layers, MapPin, HeartHandshake } from "lucide-react";
import Link from "next/link";
import Reveal from "@/components/reveal";

const reasons = [
  {
    icon: Target,
    title: "Business-first development",
    description: "We understand the business process before writing the software.",
  },
  {
    icon: Puzzle,
    title: "Custom-built",
    description:
      "Your software is designed around your workflows rather than forcing your business into a generic system.",
  },
  {
    icon: Layers,
    title: "Scalable architecture",
    description: "We build systems that can evolve as your business grows.",
  },
  {
    icon: MapPin,
    title: "Local understanding",
    description:
      "We understand the Kenyan business environment and integrations such as M-Pesa.",
  },
  {
    icon: HeartHandshake,
    title: "Long-term partnership",
    description: "We don't disappear after deployment.",
  },
];

const slides = [
  {
    image:
      "https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=600&h=400&fit=crop",
    title: "Real Estate Dashboards",
    description:
      "Property management platforms with analytics, lead tracking, investment calculators, and smart MLS integrations.",
    gradient: "from-brand to-brand-hover",
  },
  {
    image:
      "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=600&h=400&fit=crop",
    title: "Web Development",
    description:
      "Custom responsive websites with CMS, SEO tooling, analytics dashboards, and blazing-fast hosting infrastructure.",
    gradient: "from-violet-500 to-purple-600",
  },
  {
    image:
      "https://images.unsplash.com/photo-1616432043562-3671ea2e5242?w=600&h=400&fit=crop",
    title: "Logistics & Fleet Systems",
    description:
      "Real-time GPS fleet tracking, route optimization, delivery scheduling, and fuel/maintenance cost analytics.",
    gradient: "from-emerald-500 to-teal-600",
  },
  {
    image:
      "https://images.unsplash.com/photo-1560066984-138dadb4c035?w=600&h=400&fit=crop",
    title: "Salon & Barber Booking",
    description:
      "Online appointment scheduling with staff management, payment processing, client history, and inventory tracking.",
    gradient: "from-amber-500 to-orange-600",
  },
  {
    image:
      "https://images.unsplash.com/photo-1509062522246-3755977927d7?w=600&h=400&fit=crop",
    title: "School Management",
    description:
      "Complete school OS: student records, timetables, attendance, grade books, communications, and parent portals.",
    gradient: "from-rose-500 to-pink-600",
  },
  {
    image:
      "https://images.unsplash.com/photo-1551076805-e1869033e561?w=600&h=400&fit=crop",
    title: "Hospital Management",
    description:
      "Patient records, appointment booking, billing, pharmacy inventory, lab reports, and staff scheduling in one system.",
    gradient: "from-teal-500 to-cyan-600",
  },
];

export default function About() {
  const [current, setCurrent] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    if (isPaused) return;
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % slides.length);
    }, 4000);
    return () => clearInterval(interval);
  }, [isPaused]);

  return (
    <section
      id="about"
      className="py-20 sm:py-28 lg:py-32 bg-surface-2 dark:bg-slate-900"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          <Reveal>
            <span className="inline-flex items-center rounded-full border border-brand/25 bg-brand/10 px-4 py-1.5 text-sm font-medium text-brand dark:border-brand/30 dark:bg-brand/15 dark:text-brand-soft">
              Why Pigiecore
            </span>
            <h2 className="mt-5 text-3xl font-bold tracking-tight text-text-1 dark:text-white sm:text-4xl lg:text-5xl">
              Why Businesses Choose Pigiecore
            </h2>
            <div className="mt-8 space-y-6">
              {reasons.map((reason) => {
                const Icon = reason.icon;
                return (
                  <div key={reason.title} className="flex items-start gap-4">
                    <div className="w-11 h-11 shrink-0 rounded-xl bg-brand/15 dark:bg-brand/20 flex items-center justify-center">
                      <Icon className="w-5 h-5 text-brand dark:text-sky-400" />
                    </div>
                    <div>
                      <div className="font-bold text-text-1 dark:text-white">
                        {reason.title}
                      </div>
                      <div className="mt-1 text-text-2 dark:text-text-3 leading-relaxed">
                        {reason.description}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
            <Link
              href="/#contact"
              className="mt-9 inline-flex items-center gap-2 rounded-full bg-brand px-8 py-3.5 text-base font-semibold text-white shadow-lg shadow-brand/25 transition-all hover:bg-brand-hover hover:shadow-xl"
            >
              Talk to Our Team <ArrowRight className="w-5 h-5" />
            </Link>
          </Reveal>

          <Reveal delay={0.15}>
            <div className="relative">
            <div
              className="aspect-[4/3] rounded-2xl border border-border-default dark:border-border-default overflow-hidden bg-white dark:bg-surface-muted shadow-sm"
              onMouseEnter={() => setIsPaused(true)}
              onMouseLeave={() => setIsPaused(false)}
            >
              <div className="h-full flex flex-col">
                <div className="h-9 bg-surface-muted dark:bg-slate-700/50 flex items-center px-4 gap-1.5 border-b border-border-default/50 dark:border-border-default/50">
                  <span className="w-3 h-3 rounded-full bg-red-400"></span>
                  <span className="w-3 h-3 rounded-full bg-amber-400"></span>
                  <span className="w-3 h-3 rounded-full bg-emerald-400"></span>
                  <span className="ml-3 text-[11px] text-text-3 dark:text-text-3 font-mono">
                    what-we-do — Pigiecore Solutions
                  </span>
                </div>
                <div className="flex-1 relative overflow-hidden">
                  {slides.map((s, i) => (
                    <div
                      key={i}
                      className={`absolute inset-0 transition-all duration-700 ${
                        i === current
                          ? "opacity-100 scale-100"
                          : "opacity-0 scale-105"
                      }`}
                    >
                      <img
                        src={s.image}
                        alt={s.title}
                        loading="lazy"
                        decoding="async"
                        className="absolute inset-0 w-full h-full object-cover"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-slate-900/90 via-slate-900/30 to-transparent"></div>
                      <div className="absolute bottom-0 left-0 right-0 p-5 sm:p-6">
                        <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${s.gradient} flex items-center justify-center mb-3 shadow-lg`}>
                          <span className="text-white font-bold text-lg">
                            {s.title.charAt(0)}
                          </span>
                        </div>
                        <h3 className="text-lg font-bold text-white mb-1.5 drop-shadow-sm">
                          {s.title}
                        </h3>
                        <p className="text-sm text-white/80 leading-relaxed max-w-md drop-shadow-sm">
                          {s.description}
                        </p>
                        <div className="mt-3 flex items-center gap-1.5 text-sm font-medium text-white/90">
                          Learn more <ArrowRight className="w-4 h-4" />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="h-9 px-4 bg-surface-muted dark:bg-slate-700/50 border-t border-border-default/50 dark:border-border-default/50 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    {slides.map((_, i) => (
                      <button
                        key={i}
                        onClick={() => setCurrent(i)}
                        className={`h-1.5 rounded-full transition-all duration-500 ${
                          i === current
                            ? "w-6 bg-brand"
                            : "w-1.5 bg-slate-300 dark:bg-slate-600 hover:bg-slate-400"
                        }`}
                      />
                    ))}
                  </div>
                  <span className="text-[11px] text-text-3 dark:text-text-3 font-mono">
                    {String(current + 1).padStart(2, "0")} /{" "}
                    {String(slides.length).padStart(2, "0")}
                  </span>
                </div>
              </div>
            </div>

            <div className="absolute -bottom-4 -right-4 w-32 h-32 bg-gradient-to-br from-sky-200 to-blue-200 rounded-2xl -z-10 dark:from-brand/10 dark:to-blue-500/10"></div>
            <div className="absolute -top-4 -left-4 w-24 h-24 bg-gradient-to-br from-violet-200 to-purple-200 rounded-xl -z-10 dark:from-violet-500/10 dark:to-purple-500/10"></div>
          </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
