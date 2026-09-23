"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowLeft, ArrowRight, ExternalLink } from "lucide-react";

const AUTOPLAY_DURATION = 7000;

const CATEGORY_LABELS: Record<string, string> = {
  "real-estate": "Real Estate",
  website: "Website Development",
  logistics: "Logistics & Fleet",
  salon: "Salon & Barber",
  school: "School Management",
  hospital: "Hospital Management",
  "office-manager": "Office Manager",
};

interface Template {
  id: number;
  name: string;
  description: string;
  image_url: string | null;
  url: string | null;
  category: string;
  preview_gradient: string;
  sort_order: number;
}

interface Project {
  id: number | string;
  number: string;
  title: string;
  category: string;
  description: string;
  tags: string[];
  image: string | null;
  gradient: string;
  href: string;
}

const FALLBACK: Project[] = [
  {
    id: "f1",
    number: "01",
    title: "Real Estate Dashboard",
    category: "Real Estate",
    description:
      "Property listings, market analytics, lead tracking and investment ROI in a single live workspace.",
    tags: ["Real Estate", "Dashboard"],
    image: null,
    gradient: "from-sky-500 to-blue-600",
    href: "/solutions/property-management",
  },
  {
    id: "f2",
    number: "02",
    title: "Fleet & Logistics",
    category: "Logistics & Fleet",
    description:
      "Real-time GPS tracking, route optimization, delivery scheduling and fleet maintenance logs.",
    tags: ["Logistics", "Tracking"],
    image: null,
    gradient: "from-emerald-500 to-teal-600",
    href: "/solutions/fleet-management",
  },
  {
    id: "f3",
    number: "03",
    title: "School Management",
    category: "School Management",
    description:
      "Student records, fees, attendance, grading and parent communication in one system.",
    tags: ["Education", "ERP"],
    image: null,
    gradient: "from-violet-500 to-purple-600",
    href: "/solutions/school-management",
  },
];

function toProject(t: Template, index: number): Project {
  const label = CATEGORY_LABELS[t.category] ?? t.category;
  return {
    id: t.id,
    number: String(index + 1).padStart(2, "0"),
    title: t.name,
    category: label,
    description: t.description,
    tags: [label],
    image: t.image_url,
    gradient: t.preview_gradient || "from-sky-500 to-blue-600",
    href: t.url || "#contact",
  };
}

export default function FeaturedProjects() {
  const [projects, setProjects] = useState<Project[]>(FALLBACK);
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const res = await fetch("/api/templates");
        if (!res.ok) return;
        const data: Template[] = await res.json();
        if (cancelled || !Array.isArray(data) || data.length === 0) return;
        setProjects(data.map(toProject));
        setActiveIndex(0);
      } catch {
        /* keep fallback */
      }
    })();
    return () => {
      cancelled = true;
    };
  }, []);

  const project = projects[activeIndex] ?? projects[0];

  const nextProject = () =>
    setActiveIndex((current) => (current + 1) % projects.length);
  const previousProject = () =>
    setActiveIndex(
      (current) => (current - 1 + projects.length) % projects.length
    );

  useEffect(() => {
    if (typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      return;
    }
    const timer = setInterval(() => {
      setActiveIndex((current) => (current + 1) % projects.length);
    }, AUTOPLAY_DURATION);
    return () => clearInterval(timer);
  }, [projects.length]);

  if (!project) return null;

  return (
    <section id="showcase" className="relative overflow-hidden bg-[#101114] py-24 text-white">
      <div className="pointer-events-none absolute left-1/3 top-1/4 h-[420px] w-[420px] rounded-full bg-[#6b5cff]/[0.08] blur-[120px]" />

      <div className="relative mx-auto max-w-7xl px-6 lg:px-8">
        {/* Header */}
        <div className="mb-14 flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <div>
            <div className="mb-5 flex items-center gap-3">
              <span className="h-px w-10 bg-[#9d95ff]" />
              <span className="text-xs font-medium uppercase tracking-[0.2em] text-[#9d95ff]">
                Featured Projects
              </span>
            </div>

            <h2 className="h-section max-w-3xl">
              Software built for
              <span className="block text-white/40">real-world businesses.</span>
            </h2>
          </div>

          <p className="max-w-md text-sm leading-7 text-white/40">
            Explore some of the digital products and platforms we&apos;ve
            designed and engineered at Pigiecore.
          </p>
        </div>

        {/* Main carousel */}
        <div className="grid min-h-[520px] items-center gap-12 lg:grid-cols-[0.8fr_1.2fr]">
          {/* LEFT */}
          <div className="relative">
            <AnimatePresence mode="wait">
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 25 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -25 }}
                transition={{ duration: 0.5, ease: "easeOut" }}
              >
                <div className="mb-8 flex items-center gap-4">
                  <span className="text-sm font-medium text-[#9d95ff]">
                    {project.number}
                  </span>
                  <div className="h-px w-16 bg-white/10" />
                  <span className="text-xs uppercase tracking-widest text-white/30">
                    Case Study
                  </span>
                </div>

                <h3 className="text-4xl font-semibold tracking-tight sm:text-5xl">
                  {project.title}
                </h3>

                <p className="mt-4 text-lg text-white/40">{project.category}</p>

                <p className="mt-7 max-w-xl text-base leading-8 text-white/55">
                  {project.description}
                </p>

                {project.tags.length > 0 && (
                  <div className="mt-8 flex flex-wrap gap-2">
                    {project.tags.map((tag) => (
                      <span
                        key={tag}
                        className="rounded-full border border-white/10 bg-white/[0.03] px-4 py-2 text-xs text-white/50"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                )}

                <a
                  href={project.href}
                  className="mt-10 inline-flex items-center gap-3 rounded-full bg-[#6b5cff] px-6 py-3 text-sm font-medium text-white transition hover:bg-[#5b4de0]"
                >
                  View Project
                  <ExternalLink className="h-4 w-4" />
                </a>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* RIGHT — PROJECT IMAGE */}
          <div className="relative">
            <div className="pointer-events-none absolute inset-0 -z-10 rounded-[40px] bg-[#6b5cff]/[0.08] blur-[100px]" />

            <div className="relative overflow-hidden rounded-[28px] border border-white/10 bg-white/[0.025] p-3 shadow-2xl">
              <AnimatePresence mode="wait">
                <motion.div
                  key={project.id}
                  initial={{ opacity: 0, x: 80, scale: 0.97 }}
                  animate={{ opacity: 1, x: 0, scale: 1 }}
                  exit={{ opacity: 0, x: -80, scale: 0.97 }}
                  transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
                >
                  {project.image ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      src={project.image}
                      alt={`${project.title} project`}
                      loading="lazy"
                      decoding="async"
                      className="block aspect-[16/10] w-full rounded-[20px] object-cover"
                    />
                  ) : (
                    <div
                      className={`flex aspect-[16/10] w-full items-center justify-center rounded-[20px] bg-gradient-to-br ${project.gradient}`}
                    >
                      <span className="text-5xl font-bold text-white/90">
                        {project.title.charAt(0)}
                      </span>
                    </div>
                  )}
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </div>

        {/* Bottom navigation */}
        <div className="mt-12 flex items-center justify-between border-t border-white/[0.08] pt-7">
          <div className="flex items-center gap-3">
            {projects.map((item, index) => (
              <button
                key={item.id}
                onClick={() => setActiveIndex(index)}
                aria-label={`Show ${item.title}`}
                className="group"
              >
                <span
                  className={`block h-1 rounded-full transition-all duration-500 ${
                    index === activeIndex
                      ? "w-14 bg-[#9d95ff]"
                      : "w-7 bg-white/15 group-hover:bg-white/30"
                  }`}
                />
              </button>
            ))}
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={previousProject}
              aria-label="Previous project"
              className="flex h-11 w-11 items-center justify-center rounded-full border border-white/10 bg-white/[0.03] text-white/60 transition hover:border-white/20 hover:bg-white/[0.08] hover:text-white"
            >
              <ArrowLeft className="h-4 w-4" />
            </button>
            <button
              onClick={nextProject}
              aria-label="Next project"
              className="flex h-11 w-11 items-center justify-center rounded-full border border-white/10 bg-white/[0.03] text-white/60 transition hover:border-white/20 hover:bg-white/[0.08] hover:text-white"
            >
              <ArrowRight className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
