import Link from "next/link";

// IMPROVED: Native JSX filters instead of dangerouslySetInnerHTML
// (Prevents hydration warnings and is cleaner React practice)
const Filters = () => (
  <defs>
    <filter id="pg-tube-bloom" x="-40%" y="-40%" width="180%" height="180%">
      <feGaussianBlur stdDeviation="35" result="blur" />
      <feComposite in="SourceGraphic" in2="blur" operator="over" />
    </filter>
    <filter id="pg-tube-trail" x="-30%" y="-30%" width="160%" height="160%">
      <feGaussianBlur stdDeviation="10" />
    </filter>
  </defs>
);

// KEPT EXACTLY AS REQUESTED: Maintains the right-facing "⊃" orientation and shape
const TUBE_D =
  "M 940 140 C 600 150 400 420 540 700 C 640 880 820 900 940 840";

// IMPROVED: Premium "Aurora" Color Palette (Deep Violet → Cyan → White Hot)
// 💡 ALTERNATIVE: If you prefer a "Growth/Business" vibe, change these to:
// ["#064e3b", "#059669", "#14b8a6", "#5eead4", "#ffffff"] (Emerald to Teal)
const CORE_STROKES = [
  { w: 160, color: "#4c1d95", opacity: 0.7 },  // violet-900 (Deep base)
  { w: 110, color: "#7c3aed", opacity: 0.85 }, // violet-600 (Mid glow)
  { w: 70, color: "#06b6d4", opacity: 0.95 },  // cyan-500 (Bright cyan)
  { w: 40, color: "#67e8f9", opacity: 1 },     // cyan-300 (Hot edge)
  { w: 18, color: "#ffffff", opacity: 1 },     // white (White-hot core)
];

// IMPROVED: Slightly adjusted trail echoes for a smoother, more ethereal light bleed
const TRAIL_ECHOES = [
  { dx: -12, dy: 8, w: 60, opacity: 0.25 },
  { dx: -24, dy: 16, w: 45, opacity: 0.15 },
  { dx: -36, dy: 24, w: 30, opacity: 0.08 },
];

export default function Hero() {
  return (
    <section className="relative pt-24 pb-28 sm:pt-28 sm:pb-36 lg:pt-32 lg:pb-48 overflow-hidden bg-[#050507] text-white">
      {/* IMPROVED: Dual vignette depth to subtly light up the dark background behind the tube */}
      <div aria-hidden className="pointer-events-none absolute inset-0">
        <div className="absolute right-[-15%] top-[5%] h-[60%] w-[60%] bg-[radial-gradient(closest-side,rgba(124,58,237,0.08),transparent)]"></div>
        <div className="absolute right-[10%] top-[20%] h-[40%] w-[40%] bg-[radial-gradient(closest-side,rgba(6,182,212,0.05),transparent)]"></div>
      </div>

      {/* Big right-facing "⊃"-style arc along the right edge */}
      <div
        aria-hidden
        className="animate-drift-slow pointer-events-none absolute right-[-60%] top-[18%] z-0 w-[180%] opacity-30 sm:right-[-34%] sm:top-[16%] sm:w-[125%] sm:opacity-40 md:right-[-12%] md:top-[14%] md:w-[86%] md:opacity-70 lg:right-[-2%] lg:top-[14%] lg:w-[60%] lg:opacity-100 xl:w-[54%]"
      >
        <div className="animate-sway-slow w-full">
          <svg
            className="block h-auto w-full"
            viewBox="0 0 1000 1000"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            style={{ overflow: "visible" }}
          >
            <Filters />

            {/* Glowing light trail echoes with screen blending for realistic light */}
            {TRAIL_ECHOES.map((t, i) => (
              <path
                key={i}
                d={TUBE_D}
                stroke="#06b6d4"
                strokeWidth={t.w}
                strokeLinecap="round"
                opacity={t.opacity}
                transform={`translate(${t.dx} ${t.dy})`}
                filter="url(#pg-tube-trail)"
                className="mix-blend-screen"
              />
            ))}

            {/* Soft volumetric bloom: deep violet then cyan halo */}
            <path
              d={TUBE_D}
              stroke="#4c1d95"
              strokeWidth="240"
              strokeLinecap="round"
              opacity="0.4"
              filter="url(#pg-tube-bloom)"
              className="mix-blend-screen"
            />
            <path
              d={TUBE_D}
              stroke="#06b6d4"
              strokeWidth="180"
              strokeLinecap="round"
              opacity="0.5"
              filter="url(#pg-tube-bloom)"
              className="mix-blend-screen"
            />

            {/* Tube body: deep-violet edge -> cyan -> white-hot core */}
            {CORE_STROKES.map((s, i) => (
              <path
                key={i}
                d={TUBE_D}
                stroke={s.color}
                strokeWidth={s.w}
                strokeLinecap="round"
                opacity={s.opacity}
                className={i < 2 ? "mix-blend-screen" : ""}
              />
            ))}
          </svg>
        </div>
      </div>

      {/* Centred copy above the tube */}
      <div className="relative z-10 mx-auto max-w-3xl px-4 text-center sm:px-6">
        <div className="animate-fade-in-up">
          <div className="mx-auto inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-4 py-1.5 text-sm font-medium text-cyan-200 mb-8 backdrop-blur-sm">
            <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse"></span>
            <span>Pigiecore Solutions</span>
          </div>

          {/* IMPROVED: Heading gradient now matches the new tube colors */}
          <h1 className="text-4xl font-bold tracking-tight sm:text-5xl lg:leading-[1.1] xl:text-6xl">
            Custom Software &amp; Digital Solutions
            <span className="bg-gradient-to-r from-violet-400 via-cyan-400 to-blue-500 bg-clip-text text-transparent">
              {" "}Built for Your Business.
            </span>
          </h1>

          <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-slate-300">
            We design and build custom software, SaaS platforms, web
            applications and business automation solutions for businesses in
            Kenya and beyond.
          </p>

          <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
            {/* IMPROVED: Button now has a subtle gradient and scale hover effect */}
            <Link
              href="/#contact"
              className="inline-flex items-center justify-center rounded-full bg-gradient-to-r from-violet-600 to-cyan-600 px-8 py-3.5 text-base font-semibold text-white shadow-lg shadow-violet-500/25 transition-all hover:shadow-xl hover:shadow-cyan-500/30 hover:scale-105"
            >
              Start Your Project
            </Link>
            <Link
              href="/#selected-work"
              className="inline-flex items-center justify-center rounded-full border border-white/25 bg-white/5 px-8 py-3.5 text-base font-semibold text-white transition-all hover:border-cyan-400 hover:text-cyan-300 hover:bg-white/10"
            >
              View Our Work
            </Link>
          </div>

          <div className="mt-14 flex items-center justify-center gap-8 text-center sm:gap-12">
            {[
              { value: "6+", label: "Products" },
              { value: "24/7", label: "Support" },
              { value: "100%", label: "Custom" },
            ].map((stat) => (
              <div key={stat.label}>
                <div className="text-2xl font-bold text-white">{stat.value}</div>
                <div className="mt-1 text-sm text-slate-400">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
