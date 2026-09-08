import Link from "next/link";

const RIBBON_GRADIENT =
  '<linearGradient id="pg-s-ribbon" x1="0%" y1="100%" x2="100%" y2="0%">' +
  '<stop offset="0%" stopColor="#22d3ee" />' +
  '<stop offset="33%" stopColor="#3b82f6" />' +
  '<stop offset="66%" stopColor="#8b5cf6" />' +
  '<stop offset="100%" stopColor="#ec4899" />' +
  "</linearGradient>";

const GLOW_FILTER =
  '<filter id="pg-s-glow" x="-30%" y="-30%" width="160%" height="160%">' +
  '<feGaussianBlur stdDeviation="18" />' +
  "</filter>";

// Single thick S-ribbon: a long horizontal run along the bottom that sweeps
// up into an elegant S on the right side of the hero.
const RIBBON_D =
  "M -40 460 C 160 470 320 540 470 460 C 610 386 560 235 700 170 C 780 132 820 150 880 90";

export default function Hero() {
  return (
    <section className="relative pt-24 pb-24 sm:pt-28 sm:pb-32 lg:pt-36 lg:pb-40 overflow-hidden bg-slate-50 dark:bg-slate-950">
      {/* Subtle dot grid */}
      <div className="absolute inset-0 bg-[radial-gradient(#64748b_1px,transparent_1px)] [background-size:32px_32px] opacity-[0.18] dark:opacity-[0.08]"></div>

      {/* Ambient tone (very subtle, not the glow) */}
      <div aria-hidden className="pointer-events-none absolute inset-0">
        <div className="absolute right-[-12%] top-[10%] h-[46rem] w-[46rem] rounded-full bg-[radial-gradient(closest-side,rgba(139,92,246,0.1),transparent)] blur-2xl"></div>
      </div>

      {/* Single glowing S-ribbon on the right / lower half */}
      <div
        aria-hidden
        className="pointer-events-none absolute bottom-[-12%] right-[-26%] z-0 w-[130%] opacity-30 dark:opacity-45 sm:right-[-18%] sm:bottom-[-14%] sm:w-[95%] sm:opacity-45 sm:dark:opacity-60 md:right-[-12%] md:bottom-[-18%] md:w-[72%] md:opacity-70 md:dark:opacity-80 lg:right-[-4%] lg:bottom-[-20%] lg:w-[58%] lg:opacity-95 lg:dark:opacity-100"
      >
        <div className="animate-drift-slow w-full">
          <div className="animate-sway-slow w-full">
            <svg
              className="animate-hue-drift block h-auto w-full"
              viewBox="0 0 920 560"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              style={{ overflow: "visible" }}
            >
              <defs
                dangerouslySetInnerHTML={{
                  __html: GLOW_FILTER + RIBBON_GRADIENT,
                }}
              />
              {/* Self-glow halo hugging the ribbon */}
              <path
                d={RIBBON_D}
                stroke="url(#pg-s-ribbon)"
                strokeWidth="168"
                strokeLinecap="round"
                opacity="0.65"
                filter="url(#pg-s-glow)"
              />
              {/* Core ribbon */}
              <path
                d={RIBBON_D}
                stroke="url(#pg-s-ribbon)"
                strokeWidth="92"
                strokeLinecap="round"
                opacity="0.98"
              />
              {/* Bright centre line for luminosity */}
              <path
                d={RIBBON_D}
                stroke="#ffffff"
                strokeWidth="14"
                strokeLinecap="round"
                opacity="0.18"
              />
            </svg>
          </div>
        </div>
      </div>

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="w-full lg:w-[54%]">
          <div className="animate-fade-in-up text-center lg:text-left">
            <div className="inline-flex items-center gap-2 rounded-full bg-sky-50 dark:bg-sky-950/30 border border-sky-200 dark:border-sky-800 px-4 py-1.5 text-sm font-medium text-sky-700 dark:text-sky-300 mb-8">
              <span className="w-2 h-2 rounded-full bg-sky-500 animate-pulse"></span>
              <span>Pigiecore Solutions</span>
            </div>
            <h1 className="mx-auto max-w-2xl text-4xl font-bold tracking-tight text-slate-900 dark:text-white sm:text-5xl lg:mx-0 lg:leading-[1.1] xl:text-6xl">
              Custom Software &amp; Digital Solutions
              <span className="bg-gradient-to-r from-sky-500 via-blue-500 to-violet-500 bg-clip-text text-transparent">
                {" "}Built for Your Business.
              </span>
            </h1>
            <p className="mt-6 max-w-2xl text-lg text-slate-600 dark:text-slate-400 leading-8 mx-auto lg:mx-0">
              We design and build custom software, SaaS platforms, web
              applications and business automation solutions for businesses in
              Kenya and beyond.
            </p>
            <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4 lg:justify-start">
              <Link
                href="/#contact"
                className="inline-flex items-center justify-center rounded-full bg-sky-500 px-8 py-3.5 text-base font-semibold text-white shadow-lg shadow-sky-500/25 transition-all hover:bg-sky-600 hover:shadow-xl hover:shadow-sky-500/30"
              >
                Start Your Project
              </Link>
              <Link
                href="/#selected-work"
                className="inline-flex items-center justify-center rounded-full border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 px-8 py-3.5 text-base font-semibold text-slate-900 dark:text-slate-100 transition-all hover:border-sky-500 hover:text-sky-500 dark:hover:text-sky-400"
              >
                View Our Work
              </Link>
            </div>
            <div className="mt-14 flex items-center justify-center gap-8 sm:gap-12 text-center lg:justify-start">
              {[
                { value: "6+", label: "Products" },
                { value: "24/7", label: "Support" },
                { value: "100%", label: "Custom" },
              ].map((stat) => (
                <div key={stat.label}>
                  <div className="text-2xl font-bold text-slate-900 dark:text-white">
                    {stat.value}
                  </div>
                  <div className="text-sm text-slate-500 dark:text-slate-400 mt-1">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
