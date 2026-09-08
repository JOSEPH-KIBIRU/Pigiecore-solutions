import Link from "next/link";

const GRADIENTS = {
  primary:
    '<linearGradient id="pg-rb-1" x1="0%" y1="0%" x2="100%" y2="100%">' +
    '<stop offset="0%" stopColor="#312e81" />' +
    '<stop offset="35%" stopColor="#7c3aed" />' +
    '<stop offset="68%" stopColor="#BB4CF0" />' +
    '<stop offset="100%" stopColor="#ec4899" />' +
    "</linearGradient>",
  electric:
    '<linearGradient id="pg-rb-2" x1="100%" y1="0%" x2="0%" y2="100%">' +
    '<stop offset="0%" stopColor="#0284c7" />' +
    '<stop offset="50%" stopColor="#4f46e5" />' +
    '<stop offset="100%" stopColor="#8b5cf6" />' +
    "</linearGradient>",
  cyan:
    '<linearGradient id="pg-rb-3" x1="0%" y1="0%" x2="100%" y2="100%">' +
    '<stop offset="0%" stopColor="#67e8f9" />' +
    '<stop offset="100%" stopColor="#7dd3fc" />' +
    "</linearGradient>",
};

const BANDS = [
  {
    url: "url(#pg-rb-1)",
    d: "M -80 40 C 140 -30, 320 120, 470 60 C 640 -10, 800 210, 960 130",
    w: 116,
    glowW: 152,
    opacity: 0.9,
  },
  {
    url: "url(#pg-rb-2)",
    d: "M 20 360 C 260 300, 420 480, 640 430 C 820 390, 880 240, 1040 300",
    w: 86,
    glowW: 120,
    opacity: 0.85,
  },
  {
    url: "url(#pg-rb-3)",
    d: "M 120 620 C 320 560, 460 700, 680 660 C 860 628, 940 520, 1060 560",
    w: 34,
    glowW: 66,
    opacity: 0.95,
  },
];

export default function Hero() {
  return (
    <section className="relative pt-24 pb-24 sm:pt-28 sm:pb-32 lg:pt-36 lg:pb-36 overflow-hidden bg-slate-50 dark:bg-slate-950">
      {/* Subtle dot grid */}
      <div className="absolute inset-0 bg-[radial-gradient(#64748b_1px,transparent_1px)] [background-size:32px_32px] opacity-[0.18] dark:opacity-[0.08]"></div>

      {/* Ambient glow, contained near the hero */}
      <div aria-hidden className="pointer-events-none absolute inset-0">
        <div className="absolute -top-48 left-[-12%] h-[36rem] w-[36rem] rounded-full bg-[radial-gradient(closest-side,rgba(124,58,237,0.12),transparent)] blur-2xl"></div>
        <div className="absolute top-[8%] right-[-10%] h-[42rem] w-[42rem] rounded-full bg-[radial-gradient(closest-side,rgba(187,76,240,0.16),transparent)] blur-2xl animate-breathe dark:opacity-90"></div>
      </div>

      {/* Abstract flowing light-ribbon visual (right side) */}
      <div
        aria-hidden
        className="animate-drift-slow pointer-events-none absolute right-[-30%] top-[30%] z-0 w-[110%] opacity-30 sm:right-[-16%] sm:top-[20%] sm:w-[80%] sm:opacity-45 md:right-[-8%] md:top-[14%] md:w-[56%] md:opacity-70 lg:right-[-3%] lg:top-[8%] lg:w-[52%] lg:opacity-90"
      >
        <div className="animate-sway-slow w-full">
          <svg
            className="animate-hue-drift h-auto w-full"
            viewBox="0 0 1000 840"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            style={{ overflow: "visible" }}
          >
            <defs dangerouslySetInnerHTML={{ __html: Object.values(GRADIENTS).join("") }} />
            {BANDS.map((band, i) => (
              <g key={i}>
                <path
                  d={band.d}
                  stroke={band.url}
                  strokeWidth={band.glowW}
                  strokeLinecap="round"
                  opacity={0.22}
                  style={{ filter: "blur(34px)" }}
                />
                <path
                  d={band.d}
                  stroke={band.url}
                  strokeWidth={band.w}
                  strokeLinecap="round"
                  opacity={band.opacity}
                />
              </g>
            ))}
          </svg>
        </div>
      </div>

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="w-full lg:w-[56%]">
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
