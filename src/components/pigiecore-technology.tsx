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
  { name: "Next.js", icon: SiNextdotjs },
  { name: "React", icon: SiReact },
  { name: "TypeScript", icon: SiTypescript },
  { name: "Node.js", icon: SiNodedotjs },
  { name: "PostgreSQL", icon: SiPostgresql },
  { name: "Supabase", icon: SiSupabase },
  { name: "Tailwind CSS", icon: SiTailwindcss },
  { name: "Docker", icon: SiDocker },
  { name: "Vercel", icon: SiVercel },
  { name: "JavaScript", icon: SiJavascript },
  { name: "Express", icon: SiExpress },
  { name: "Prisma", icon: SiPrisma },
  { name: "MongoDB", icon: SiMongodb },
  { name: "Redis", icon: SiRedis },
  { name: "OpenAI", icon: TbBrandOpenai },
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
        group flex items-center gap-4
        rounded-2xl
        border border-white/[0.08]
        bg-white/[0.035]
        px-5 py-4
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
          className="
            h-6 w-6
            text-white/70
            transition-colors duration-300
            group-hover:text-white
          "
        />
      </div>

      <span className="text-[15px] font-medium text-white/70 transition-colors group-hover:text-white">
        {technology.name}
      </span>

      <span className="ml-auto text-white/20 transition-colors group-hover:text-white/50">
        →
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
    <div className="relative h-[520px] overflow-hidden">
      {/* Fade top */}
      <div className="pointer-events-none absolute inset-x-0 top-0 z-10 h-28 bg-gradient-to-b from-[#050505] to-transparent" />

      {/* Fade bottom */}
      <div className="pointer-events-none absolute inset-x-0 bottom-0 z-10 h-28 bg-gradient-to-t from-[#050505] to-transparent" />

      <motion.div
        className="flex flex-col gap-4"
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
    <section className="relative overflow-hidden bg-[#050505] py-28 text-white">
      {/* Background glow */}
      <div className="pointer-events-none absolute left-1/4 top-1/3 h-[400px] w-[400px] rounded-full bg-blue-500/[0.08] blur-[120px]" />

      <div className="relative mx-auto max-w-7xl px-6 lg:px-8">
        {/* Heading */}
        <div className="mx-auto mb-20 max-w-3xl text-center">
          <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.03] px-4 py-2">
            <span className="h-1.5 w-1.5 rounded-full bg-blue-400 shadow-[0_0_12px_rgba(96,165,250,0.8)]" />

            <span className="text-xs font-medium uppercase tracking-[0.2em] text-white/50">
              Our Technology
            </span>
          </div>

          <h2 className="text-4xl font-semibold tracking-tight sm:text-5xl lg:text-6xl">
            Built with the
            <span className="block text-white/40">
              technology of tomorrow.
            </span>
          </h2>

          <p className="mx-auto mt-6 max-w-2xl text-base leading-7 text-white/50 sm:text-lg">
            We combine modern frameworks, powerful cloud infrastructure and
            intelligent APIs to build software that is fast, scalable and
            built around the needs of your business.
          </p>
        </div>

        {/* Technology showcase */}
        <div className="grid items-center gap-6 lg:grid-cols-[1.1fr_0.9fr]">
          {/* LEFT — Animated technologies */}
          <div className="grid grid-cols-3 gap-4">
            <TechColumn items={columnOne} duration={24} />

            <TechColumn items={columnTwo} reverse duration={28} />

            <TechColumn items={columnThree} duration={26} />
          </div>

          {/* RIGHT — Message */}
          <div className="relative lg:pl-12">
            <div className="max-w-xl">
              <span className="text-sm font-medium text-blue-400">
                Technology meets business
              </span>

              <h3 className="mt-5 text-3xl font-semibold tracking-tight sm:text-4xl">
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
                    <span className="h-1.5 w-1.5 rounded-full bg-blue-400" />

                    <span className="text-sm text-white/60">{item}</span>
                  </div>
                ))}
              </div>

              {/* Bottom statement */}
              <div className="mt-10 flex items-center gap-4">
                <div className="h-px w-12 bg-blue-400/60" />

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
