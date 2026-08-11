"use client";

import { useRef, useState, useEffect } from "react";
import Link from "next/link";
import {
  Home,
  Globe,
  Truck,
  Scissors,
  GraduationCap,
  Hospital,
  ArrowLeft,
  ArrowRight,
  ImageIcon,
} from "lucide-react";
import Reveal from "@/components/reveal";

const ICON_MAP: Record<string, React.ComponentType<{ className?: string }>> = {
  Home,
  Globe,
  Truck,
  Scissors,
  GraduationCap,
  Hospital,
};

const PAGE_LINKS: Record<string, string> = {
  "real-estate": "/solutions/property-management",
  website: "/services/web-applications",
  logistics: "/solutions/fleet-management",
  salon: "/services/software-development",
  school: "/solutions/school-management",
  hospital: "/solutions/healthcare",
};

const fallbackTemplates = [
  {
    icon: Home,
    title: "Real Estate Dashboard",
    description:
      "Property listings, market analytics, lead tracking, and investment ROI calculators in a single dashboard.",
    gradient: "from-sky-500 to-blue-600",
    preview: "bg-gradient-to-br from-sky-400 via-blue-500 to-indigo-600",
    href: "/solutions/property-management",
  },
  {
    icon: Globe,
    title: "Website Development",
    description:
      "Custom responsive websites with CMS, SEO optimization, analytics, and fast hosting.",
    gradient: "from-violet-500 to-purple-600",
    preview: "bg-gradient-to-br from-violet-400 via-purple-500 to-fuchsia-600",
    href: "/services/web-applications",
  },
  {
    icon: Truck,
    title: "Logistics & Fleet",
    description:
      "Real-time GPS tracking, route optimization, delivery scheduling, and fleet maintenance logs.",
    gradient: "from-emerald-500 to-teal-600",
    preview: "bg-gradient-to-br from-emerald-400 via-teal-500 to-cyan-600",
    href: "/solutions/fleet-management",
  },
  {
    icon: Scissors,
    title: "Salon & Barber Booking",
    description:
      "Online appointments, staff scheduling, payment processing, client profiles, and inventory.",
    gradient: "from-amber-500 to-orange-600",
    preview: "bg-gradient-to-br from-amber-400 via-orange-500 to-red-500",
    href: "/services/software-development",
  },
  {
    icon: GraduationCap,
    title: "School Management",
    description:
      "Student records, class scheduling, attendance tracking, grade books, and parent portals.",
    gradient: "from-rose-500 to-pink-600",
    preview: "bg-gradient-to-br from-rose-400 via-pink-500 to-purple-600",
    href: "/solutions/school-management",
  },
  {
    icon: Hospital,
    title: "Hospital Management",
    description:
      "Patient records, appointment booking, billing, pharmacy, lab reports, and staff scheduling.",
    gradient: "from-teal-500 to-cyan-600",
    preview: "bg-gradient-to-br from-teal-400 via-cyan-500 to-sky-600",
    href: "/solutions/healthcare",
  },
];

interface DbTemplate {
  id: number;
  name: string;
  description: string;
  image_url: string | null;
  url: string | null;
  category: string;
  icon_name: string;
  preview_gradient: string;
  gradient_from: string;
  gradient_to: string;
}

export default function Showcase() {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [scrollPos, setScrollPos] = useState(0);
  const [maxScroll, setMaxScroll] = useState(0);
  const [templates, setTemplates] = useState<{
    icon: React.ComponentType<{ className?: string }>;
    title: string;
    description: string;
    gradient: string;
    preview: string;
    image_url: string | null;
    url: string | null;
    href: string;
  }[]>(() => fallbackTemplates.map((t) => ({ ...t, image_url: null, url: null })));

  useEffect(() => {
    fetch("/api/templates")
      .then((r) => (r.ok ? r.json() : []))
      .then((data: DbTemplate[]) => {
        if (data.length > 0) {
          setTemplates(
            data.map((t) => ({
              icon: ICON_MAP[t.icon_name] || Home,
              title: t.name,
              description: t.description,
              gradient: `from-${t.gradient_from} to-${t.gradient_to}`,
              preview: `bg-gradient-to-br ${t.preview_gradient}`,
              image_url: t.image_url,
              url: t.url,
              href: PAGE_LINKS[t.category] ?? "/#contact",
            }))
          );
        }
      })
      .catch(() => {});
  }, []);

  function updateScrollState() {
    const el = scrollRef.current;
    if (!el) return;
    setScrollPos(el.scrollLeft);
    setMaxScroll(el.scrollWidth - el.clientWidth);
  }

  function scroll(amount: number) {
    scrollRef.current?.scrollBy({ left: amount, behavior: "smooth" });
    setTimeout(updateScrollState, 300);
  }

  return (
    <section id="showcase" className="py-20 sm:py-28 lg:py-32 bg-white dark:bg-slate-950">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <Reveal className="text-center mb-12">
          <span className="inline-flex items-center rounded-full border border-sky-200 bg-sky-50 px-4 py-1.5 text-sm font-medium text-sky-700 dark:border-sky-800 dark:bg-sky-950/30 dark:text-sky-300">
            Our Solutions
          </span>
          <h2 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl dark:text-white">
            Solutions We Build
          </h2>
          <p className="mt-4 text-lg text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
            Explore the types of business systems Pigiecore can design and
            develop.
          </p>
        </Reveal>

        <div className="relative">
          {scrollPos > 0 && (
            <button
              onClick={() => scroll(-320)}
              className="absolute left-0 top-1/2 -translate-y-1/2 z-10 -translate-x-4 w-10 h-10 rounded-full bg-white border border-slate-200 shadow-md flex items-center justify-center text-slate-600 hover:text-sky-500 transition-colors hidden md:flex dark:bg-slate-800 dark:border-slate-700 dark:text-slate-400 dark:hover:text-sky-400"
            >
              <ArrowLeft className="w-5 h-5" />
            </button>
          )}
          {scrollPos < maxScroll - 10 && (
            <button
              onClick={() => scroll(320)}
              className="absolute right-0 top-1/2 -translate-y-1/2 z-10 translate-x-4 w-10 h-10 rounded-full bg-white border border-slate-200 shadow-md flex items-center justify-center text-slate-600 hover:text-sky-500 transition-colors hidden md:flex dark:bg-slate-800 dark:border-slate-700 dark:text-slate-400 dark:hover:text-sky-400"
            >
              <ArrowRight className="w-5 h-5" />
            </button>
          )}

          <div
            ref={scrollRef}
            onScroll={updateScrollState}
            className="flex gap-6 overflow-x-auto snap-x snap-mandatory scrollbar-hide pb-4 -mx-4 px-4"
            style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
          >
            {templates.map((template, i) => {
              const Icon = template.icon;
              return (
                <div
                  key={i}
                  className="flex-shrink-0 w-[85vw] sm:w-[380px] snap-start"
                >
                  <div className="rounded-2xl border border-slate-200 bg-white shadow-sm overflow-hidden hover:shadow-lg transition-all duration-300 hover:-translate-y-1 dark:border-slate-800 dark:bg-slate-900">
                    <div
                      className={`${template.preview} p-6 flex items-center justify-center min-h-[200px] relative`}
                    >
                      <div className="absolute top-3 left-3 flex gap-1.5">
                        <span className="w-2.5 h-2.5 rounded-full bg-white/30"></span>
                        <span className="w-2.5 h-2.5 rounded-full bg-white/30"></span>
                        <span className="w-2.5 h-2.5 rounded-full bg-white/30"></span>
                      </div>
                      {template.image_url ? (
                        <img
                          src={template.image_url}
                          alt={template.title}
                          className="w-full h-full object-contain rounded-lg max-h-[170px]"
                        />
                      ) : (
                        <div className="w-16 h-16 rounded-2xl bg-white/20 backdrop-blur-sm flex items-center justify-center">
                          {Icon ? <Icon className="w-8 h-8 text-white" /> : <ImageIcon className="w-8 h-8 text-white" />}
                        </div>
                      )}
                    </div>
                    <div className="p-5">
                      <h3 className="text-lg font-semibold text-slate-900 dark:text-white">
                        {template.title}
                      </h3>
                      <p className="mt-2 text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                        {template.description}
                      </p>
                      {template.url ? (
                        <a
                          href={template.url.startsWith("http") ? template.url : `https://${template.url}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="mt-4 inline-flex items-center gap-1 text-sm font-medium text-sky-500 hover:text-sky-600 transition-colors dark:text-sky-400 dark:hover:text-sky-300"
                        >
                          View Project →
                        </a>
                      ) : (
                        <Link
                          href={template.href}
                          className="mt-4 inline-flex items-center gap-1 text-sm font-medium text-sky-500 hover:text-sky-600 transition-colors dark:text-sky-400 dark:hover:text-sky-300"
                        >
                          Learn More →
                        </Link>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="flex items-center justify-center gap-2 mt-6">
            {templates.map((_, i) => (
              <button
                key={i}
                onClick={() => {
                  scrollRef.current?.children[i]?.scrollIntoView({
                    behavior: "smooth",
                    block: "nearest",
                    inline: "start",
                  });
                  setTimeout(updateScrollState, 300);
                }}
                className={`w-2 h-2 rounded-full transition-all ${
                  Math.round(scrollPos / 320) === i
                    ? "bg-sky-500 w-6"
                    : "bg-slate-300 dark:bg-slate-600"
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
