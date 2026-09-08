import Link from "next/link";

const FILTERS =
  '<filter id="pg-tube-bloom" x="-40%" y="-40%" width="180%" height="180%">' +
  '<feGaussianBlur stdDeviation="30" />' +
  "</filter>" +
  '<filter id="pg-tube-trail" x="-30%" y="-30%" width="160%" height="160%">' +
  '<feGaussianBlur stdDeviation="8" />' +
  "</filter>";

// Big right-facing "⊃"-style arc on the right edge: its curve bulges into the
// page and its open ends (tips) point toward the right. It never reaches the
// top of the hero — it sits along the right side.
const TUBE_D =
  "M 940 140 C 600 150 400 420 540 700 C 640 880 820 900 940 840";

const CORE_STROKES = [
  { w: 150, color: "#1d4ed8", opacity: 0.8 },
  { w: 112, color: "#2563eb", opacity: 0.92 },
  { w: 78, color: "#06b6d4", opacity: 0.95 },
  { w: 50, color: "#67e8f9", opacity: 1 },
  { w: 22, color: "#ffffff", opacity: 1 },
];

const TRAIL_ECHOES = [
  { dx: -10, dy: 6, w: 54, opacity: 0.22 },
  { dx: -20, dy: 12, w: 40, opacity: 0.13 },
  { dx: -30, dy: 18, w: 28, opacity: 0.07 },
];

export default function Hero() {
  return (
    <section className="relative pt-24 pb-28 sm:pt-28 sm:pb-36 lg:pt-32 lg:pb-48 overflow-hidden bg-[#050507] text-white">
      {/* Faint vignette depth only */}
      <div aria-hidden className="pointer-events-none absolute inset-0">
        <div className="absolute right-[-15%] top-[5%] h-[60%] w-[60%] bg-[radial-gradient(closest-side,rgba(34,211,238,0.05),transparent)]"></div>
      </div>

      {/* Big right-facing "⊃"-style arc along the right edge (not touching top) */}
      <div
        aria-hidden
        className="animate-drift-slow pointer-events-none absolute right-[-60%] top-[18%] z-0 w-[180%] opacity-25 sm:right-[-34%] sm:top-[16%] sm:w-[125%] sm:opacity-40 md:right-[-12%] md:top-[14%] md:w-[86%] md:opacity-70 lg:right-[-2%] lg:top-[14%] lg:w-[60%] lg:opacity-100 xl:w-[54%]"
      >
        <div className="animate-sway-slow w-full">
          <svg
            className="block h-auto w-full"
            viewBox="0 0 1000 1000"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            style={{ overflow: "visible" }}
          >
            <defs dangerouslySetInnerHTML={{ __html: FILTERS }} />
            {/* Glowing light trail echoes */}
            {TRAIL_ECHOES.map((t, i) => (
              <path
                key={i}
                d={TUBE_D}
                stroke="#0ea5e9"
                strokeWidth={t.w}
                strokeLinecap="round"
                opacity={t.opacity}
                transform={`translate(${t.dx} ${t.dy})`}
                filter="url(#pg-tube-trail)"
              />
            ))}
            {/* Soft volumetric bloom: deep blue then cyan halo */}
            <path
              d={TUBE_D}
              stroke="#1d4ed8"
              strokeWidth="230"
              strokeLinecap="round"
              opacity="0.4"
              filter="url(#pg-tube-bloom)"
            />
            <path
              d={TUBE_D}
              stroke="#22d3ee"
              strokeWidth="170"
              strokeLinecap="round"
              opacity="0.5"
              filter="url(#pg-tube-bloom)"
            />
            {/* Tube body: deep-blue edge -> cyan -> white-hot core */}
            {CORE_STROKES.map((s, i) => (
              <path
                key={i}
                d={TUBE_D}
                stroke={s.color}
                strokeWidth={s.w}
                strokeLinecap="round"
                opacity={s.opacity}
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
          <h1 className="text-4xl font-bold tracking-tight sm:text-5xl lg:leading-[1.1] xl:text-6xl">
            Custom Software &amp; Digital Solutions
            <span className="bg-gradient-to-r from-cyan-300 via-sky-400 to-blue-500 bg-clip-text text-transparent">
              {" "}Built for Your Business.
            </span>
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-slate-300">
            We design and build custom software, SaaS platforms, web
            applications and business automation solutions for businesses in
            Kenya and beyond.
          </p>
          <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Link
              href="/#contact"
              className="inline-flex items-center justify-center rounded-full bg-cyan-400 px-8 py-3.5 text-base font-semibold text-slate-900 shadow-lg shadow-cyan-500/25 transition-all hover:bg-cyan-300 hover:shadow-xl hover:shadow-cyan-400/30"
            >
              Start Your Project
            </Link>
            <Link
              href="/#selected-work"
              className="inline-flex items-center justify-center rounded-full border border-white/25 bg-white/5 px-8 py-3.5 text-base font-semibold text-white transition-all hover:border-cyan-300 hover:text-cyan-200"
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
                <div className="text-2xl font-bold">{stat.value}</div>
                <div className="mt-1 text-sm text-slate-400">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
