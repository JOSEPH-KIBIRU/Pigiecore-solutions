import Link from "next/link";

// The exact same path to keep the orientation facing right
const TUBE_D = "M 940 140 C 600 150 400 420 540 700 C 640 880 820 900 940 840";

export default function Hero() {
  return (
    <section className="relative pt-24 pb-28 sm:pt-28 sm:pb-36 lg:pt-32 lg:pb-48 overflow-hidden bg-[#050507] text-white">
      
      {/* CSS Animation for the color shift */}
      <style>{`
        @keyframes colorShift {
          0% { stroke: #06b6d4; }   /* Cyan */
          33% { stroke: #8b5cf6; }  /* Violet */
          66% { stroke: #3b82f6; }  /* Blue */
          100% { stroke: #06b6d4; } /* Cyan */
        }
        .animate-color-shift {
          animation: colorShift 8s ease-in-out infinite;
        }
      `}</style>

      {/* Vignette background */}
      <div aria-hidden className="pointer-events-none absolute inset-0">
        <div className="absolute right-[-15%] top-[5%] h-[60%] w-[60%] bg-[radial-gradient(closest-side,rgba(6,182,212,0.08),transparent)]"></div>
      </div>

      {/* Single thick glowing tube */}
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
            <defs>
              {/* 
                This filter creates a perfect, line-free glow. 
                It blurs the stroke, then merges the blur behind the solid original stroke.
              */}
              <filter id="pure-glow" x="-50%" y="-50%" width="200%" height="200%">
                <feGaussianBlur stdDeviation="30" result="blur" />
                <feMerge>
                  <feMergeNode in="blur" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
            </defs>

            {/* 
              ONE SINGLE PATH. 
              No stacked strokes = no internal lines. 
              The filter handles the solid core AND the glow simultaneously.
            */}
            <path
              d={TUBE_D}
              strokeWidth="90"
              strokeLinecap="round"
              filter="url(#pure-glow)"
              className="animate-color-shift"
            />
          </svg>
        </div>
      </div>

      {/* Centered content */}
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