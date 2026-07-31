"use client";

import { useState, useEffect } from "react";
import { ArrowRight } from "lucide-react";

const slides = [
  {
    image:
      "https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=600&h=400&fit=crop",
    title: "Real Estate Dashboards",
    description:
      "Property management platforms with analytics, lead tracking, investment calculators, and smart MLS integrations.",
    gradient: "from-sky-500 to-blue-600",
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

  const slide = slides[current];

  return (
    <section
      id="about"
      className="py-20 sm:py-28 lg:py-32 bg-slate-50 dark:bg-slate-900"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          <div>
            <h2 className="text-3xl font-bold tracking-tight text-slate-900 dark:text-white sm:text-4xl">
              Built by Engineers.
              <br />
              <span className="text-sky-500">Designed for Businesses.</span>
            </h2>
            <p className="mt-6 text-lg text-slate-600 dark:text-slate-300 leading-8">
              Pigiecore Solutions was founded with a simple belief: great
              software should be accessible to every business regardless of size.
              We work closely with our clients to understand their challenges and
              deliver solutions that actually move the needle.
            </p>
            <div className="mt-8 grid grid-cols-2 gap-4">
              <div className="p-4 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
                <div className="text-3xl font-bold text-sky-500">6</div>
                <div className="text-sm text-slate-500 dark:text-slate-400 mt-1">
                  Product Lines
                </div>
              </div>
              <div className="p-4 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
                <div className="text-3xl font-bold text-sky-500">100%</div>
                <div className="text-sm text-slate-500 dark:text-slate-400 mt-1">
                  Custom Built
                </div>
              </div>
              <div className="p-4 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
                <div className="text-3xl font-bold text-sky-500">24/7</div>
                <div className="text-sm text-slate-500 dark:text-slate-400 mt-1">
                  Support
                </div>
              </div>
              <div className="p-4 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
                <div className="text-3xl font-bold text-sky-500">&lt;24h</div>
                <div className="text-sm text-slate-500 dark:text-slate-400 mt-1">
                  Response Time
                </div>
              </div>
            </div>
          </div>

          <div className="relative">
            <div
              className="aspect-[4/3] rounded-2xl border border-slate-200 dark:border-slate-700 overflow-hidden bg-white dark:bg-slate-800 shadow-sm"
              onMouseEnter={() => setIsPaused(true)}
              onMouseLeave={() => setIsPaused(false)}
            >
              <div className="h-full flex flex-col">
                <div className="h-9 bg-slate-100 dark:bg-slate-700/50 flex items-center px-4 gap-1.5 border-b border-slate-200/50 dark:border-slate-700/50">
                  <span className="w-3 h-3 rounded-full bg-red-400"></span>
                  <span className="w-3 h-3 rounded-full bg-amber-400"></span>
                  <span className="w-3 h-3 rounded-full bg-emerald-400"></span>
                  <span className="ml-3 text-[11px] text-slate-400 dark:text-slate-500 font-mono">
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
                <div className="h-9 px-4 bg-slate-100 dark:bg-slate-700/50 border-t border-slate-200/50 dark:border-slate-700/50 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    {slides.map((_, i) => (
                      <button
                        key={i}
                        onClick={() => setCurrent(i)}
                        className={`h-1.5 rounded-full transition-all duration-500 ${
                          i === current
                            ? "w-6 bg-sky-500"
                            : "w-1.5 bg-slate-300 dark:bg-slate-600 hover:bg-slate-400"
                        }`}
                      />
                    ))}
                  </div>
                  <span className="text-[11px] text-slate-400 dark:text-slate-500 font-mono">
                    {String(current + 1).padStart(2, "0")} /{" "}
                    {String(slides.length).padStart(2, "0")}
                  </span>
                </div>
              </div>
            </div>

            <div className="absolute -bottom-4 -right-4 w-32 h-32 bg-gradient-to-br from-sky-200 to-blue-200 rounded-2xl -z-10 dark:from-sky-500/10 dark:to-blue-500/10"></div>
            <div className="absolute -top-4 -left-4 w-24 h-24 bg-gradient-to-br from-violet-200 to-purple-200 rounded-xl -z-10 dark:from-violet-500/10 dark:to-purple-500/10"></div>
          </div>
        </div>
      </div>
    </section>
  );
}
