import Reveal from "@/components/reveal";

const TECH = [
  "Next.js",
  "TypeScript",
  "React",
  "Tailwind CSS",
  "Node.js",
  "PostgreSQL",
  "M-Pesa API",
  "Vercel",
  "Docker",
];

export default function Technology() {
  return (
    <section id="technology" className="py-20 sm:py-28 bg-white dark:bg-slate-950">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <Reveal className="text-center mb-12">
          <span className="inline-flex items-center rounded-full border border-brand/25 bg-brand/10 px-4 py-1.5 text-sm font-medium text-brand dark:border-brand/30 dark:bg-brand/15 dark:text-brand-soft">
            Technology
          </span>
          <h2 className="mt-5 text-3xl font-bold tracking-tight text-text-1 dark:text-white sm:text-4xl">
            Built on a Modern, Reliable Stack
          </h2>
          <p className="mt-4 text-lg text-text-2 dark:text-text-3 max-w-2xl mx-auto">
            We choose proven tools so your software is fast, secure, and easy to
            extend as your business grows.
          </p>
        </Reveal>
        <div className="flex flex-wrap justify-center gap-3 sm:gap-4">
          {TECH.map((tech) => (
            <Reveal key={tech} delay={0}>
              <span className="inline-flex items-center rounded-full border border-border-default bg-surface-2 px-5 py-2.5 text-sm font-semibold text-text-2 transition-all duration-300 hover:-translate-y-0.5 hover:border-brand/40 hover:shadow-md dark:border-border-subtle dark:bg-slate-900 dark:text-slate-200">
                {tech}
              </span>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}