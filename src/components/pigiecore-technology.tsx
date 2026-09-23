"use client";

import { motion } from "framer-motion";
import {
  SiNextdotjs,
  SiReact,
  SiTypescript,
  SiNodedotjs,
  SiPostgresql,
  SiSupabase,
  SiTailwindcss,
  SiDocker,
  SiVercel,
  SiJavascript,
  SiExpress,
  SiPrisma,
  SiMongodb,
  SiRedis,
} from "react-icons/si";
import { TbBrandOpenai } from "react-icons/tb";

const technologies = [
  { name: "Next.js", icon: SiNextdotjs, color: "#ffffff" },
  { name: "React", icon: SiReact, color: "#61DAFB" },
  { name: "TypeScript", icon: SiTypescript, color: "#3178C6" },
  { name: "Node.js", icon: SiNodedotjs, color: "#5FA04E" },
  { name: "PostgreSQL", icon: SiPostgresql, color: "#4169E1" },
  { name: "Supabase", icon: SiSupabase, color: "#3FCF8E" },
  { name: "Tailwind CSS", icon: SiTailwindcss, color: "#06B6D4" },
  { name: "Docker", icon: SiDocker, color: "#2496ED" },
  { name: "Vercel", icon: SiVercel, color: "#ffffff" },
  { name: "JavaScript", icon: SiJavascript, color: "#F7DF1E" },
  { name: "Express", icon: SiExpress, color: "#ffffff" },
  { name: "Prisma", icon: SiPrisma, color: "#5A67D8" },
  { name: "MongoDB", icon: SiMongodb, color: "#47A248" },
  { name: "Redis", icon: SiRedis, color: "#FF4438" },
  { name: "OpenAI", icon: TbBrandOpenai, color: "#10A37F" },
];

const columnOne = technologies.slice(0, 5);
const columnTwo = technologies.slice(5, 10);
const columnThree = technologies.slice(10, 15);

function TechCard({
  technology,
}: {
  technology: (typeof technologies)[number];
}) {
  const Icon = technology.icon;

  return (
    <div
      className="
        group flex items-center gap-3
        rounded-2xl
        border border-white/[0.08]
        bg-white/[0.035]
        px-4 py-3.5
        backdrop-blur-xl
        transition-all duration-300
        hover:-translate-y-1
        hover:border-white/[0.16]
        hover:bg-white/[0.07]
      "
    >
      <div
        className="
          flex h-11 w-11 shrink-0
          items-center justify-center
          rounded-xl
          border border-white/[0.08]
          bg-white/[0.05]
          transition-all duration-300
          group-hover:bg-white/[0.1]
        "
      >
        <Icon
          className="h-6 w-6 transition-transform duration-300 group-hover:scale-110"
          style={{ color: technology.color }}
        />
      </div>

      <span className="ml-auto text-[14px] font-medium text-white/0 opacity-0 transition-opacity duration-300 group-hover:opacity-100 group-hover:text-white/80">
        {technology.name}
      </span>
    </div>
  );
}

function TechColumn({
  items,
  reverse = false,
  duration = 22,
}: {
  items: typeof technologies;
  reverse?: boolean;
  duration?: number;
}) {
  const duplicated = [...items, ...items];

  return (
    <div className="relative h-[320px] overflow-hidden sm:h-[400px]">
      {/* Fade top */}
      <div className="pointer-events-none absolute inset-x-0 top-0 z-10 h-24 bg-gradient-to-b from-[#101114] to-transparent" />

      {/* Fade bottom */}
      <div className="pointer-events-none absolute inset-x-0 bottom-0 z-10 h-24 bg-gradient-to-t from-[#101114] to-transparent" />

      <motion.div
        className="flex flex-col gap-3.5"
        animate={{
          y: reverse ? ["-50%", "0%"] : ["0%", "-50%"],
        }}
        transition={{
          duration,
          repeat: Infinity,
          ease: "linear",
        }}
      >
        {duplicated.map((technology, index) => (
          <TechCard
            key={`${technology.name}-${index}`}
            technology={technology}
          />
        ))}
      </motion.div>
    </div>
  );
}

export default function PigiecoreTechnology() {
  return (
    <section className="relative overflow-hidden bg-[#101114] py-20 text-white">
      {/* Background glow */}
      <div className="pointer-events-none absolute left-1/4 top-1/3 h-[380px] w-[380px] rounded-full bg-[#6b5cff]/[0.1] blur-[120px]" />

      <div className="relative mx-auto max-w-7xl px-6 lg:px-8">
        {/* Heading */}
        <div className="mx-auto mb-12 max-w-3xl text-center">
          <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.03] px-4 py-2">
            <span className="h-1.5 w-1.5 rounded-full bg-[#9d95ff] shadow-[0_0_12px_rgba(107,92,255,0.8)]" />

            <span className="text-xs font-medium uppercase tracking-[0.2em] text-white/50">
              Built with
            </span>
          </div>

          <h2 className="h-section">
            A modern stack,
            <span className="block text-white/40">chosen for the job.</span>
          </h2>

          <p className="mx-auto mt-5 max-w-2xl text-base leading-7 text-white/50">
            No technology theatre. The right tools, used deliberately.
          </p>
        </div>

        {/* Technology showcase */}
        <div className="grid items-center gap-8 lg:grid-cols-[0.9fr_1.1fr]">
          {/* Animated technologies — right */}
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:order-2">
            <TechColumn items={columnOne} duration={24} />

            <TechColumn items={columnTwo} reverse duration={28} />

            <TechColumn items={columnThree} duration={26} />
          </div>

          {/* Message — left */}
          <div className="relative lg:order-1 lg:pr-12">
            <div className="max-w-xl">
              <span className="text-sm font-medium text-[#9d95ff]">
                Technology meets business
              </span>

              <h3 className="h-card mt-5">
                We don&apos;t just build software.
                <span className="block text-white/40">
                  We build digital infrastructure.
                </span>
              </h3>

              <p className="mt-6 text-base leading-8 text-white/50">
                From business management systems and SaaS platforms to
                payment integrations and custom enterprise applications,
                Pigiecore uses proven technologies to turn complex business
                processes into simple digital experiences.
              </p>

              {/* Technology capabilities */}
              <div className="mt-10 grid grid-cols-2 gap-3">
                {[
                  "Custom Software",
                  "SaaS Platforms",
                  "Business Automation",
                  "Payment Systems",
                  "Cloud Applications",
                  "API Integrations",
                ].map((item) => (
                  <div
                    key={item}
                    className="
                      flex items-center gap-3
                      rounded-xl
                      border border-white/[0.07]
                      bg-white/[0.025]
                      px-4 py-3
                    "
                  >
                    <span className="h-1.5 w-1.5 rounded-full bg-[#9d95ff]" />

                    <span className="text-sm text-white/60">{item}</span>
                  </div>
                ))}
              </div>

              {/* Bottom statement */}
              <div className="mt-10 flex items-center gap-4">
                <div className="h-px w-12 bg-[#6b5cff]/60" />

                <span className="text-sm text-white/35">
                  Powered by Pigiecore
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
