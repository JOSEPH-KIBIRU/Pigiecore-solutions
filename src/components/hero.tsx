import Link from "next/link";

const codeSnippets = [
  "{ }", "< />", "() =>", "npm", "git", "API", "DB", "UI/UX",
];

export default function Hero() {
  return (
    <section className="relative pt-24 pb-16 sm:pt-32 sm:pb-24 lg:pt-40 lg:pb-32 overflow-hidden bg-slate-50 dark:bg-slate-950">
      <div className="absolute inset-0 bg-[radial-gradient(#64748b_1px,transparent_1px)] [background-size:32px_32px] opacity-[0.25] dark:opacity-[0.12]"></div>

      <div className="absolute top-20 left-1/4 w-72 h-72 bg-sky-400/20 rounded-full blur-3xl animate-float"></div>
      <div className="absolute bottom-10 right-1/4 w-96 h-96 bg-cyan-300/10 rounded-full blur-3xl"></div>

      <div className="absolute top-32 left-8 text-2xl font-mono text-sky-500/40 dark:text-sky-400/30 rotate-12 hidden lg:block">
        &lt;code&gt;
      </div>
      <div className="absolute bottom-32 right-12 text-2xl font-mono text-cyan-500/40 dark:text-cyan-400/30 -rotate-6 hidden lg:block">
        &lt;/code&gt;
      </div>
      <div className="absolute top-1/3 right-1/4 text-lg font-mono text-sky-500/30 dark:text-sky-400/25 hidden lg:block">
        const future = await build();
      </div>
      <div className="absolute bottom-1/4 left-12 text-lg font-mono text-cyan-500/30 dark:text-cyan-400/25 hidden lg:block">
        npm init pigiecore
      </div>

      <div className="absolute inset-0 overflow-hidden pointer-events-none hidden sm:block">
        {codeSnippets.map((snippet, i) => (
          <div
            key={i}
            className="absolute font-mono text-sm text-slate-500/40 dark:text-slate-400/30 animate-float"
            style={{
              top: `${15 + (i * 12) % 70}%`,
              left: `${5 + (i * 17) % 90}%`,
              animationDelay: `${i * 0.5}s`,
              animationDuration: `${4 + (i % 3) * 2}s`,
            }}
          >
            {snippet}
          </div>
        ))}
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="text-center max-w-4xl mx-auto animate-fade-in-up">
          <div className="inline-flex items-center gap-2 rounded-full bg-sky-50 dark:bg-sky-950/30 border border-sky-200 dark:border-sky-800 px-4 py-1.5 text-sm font-medium text-sky-700 dark:text-sky-300 mb-8">
            <span className="w-2 h-2 rounded-full bg-sky-500 animate-pulse"></span>
            Software Solutions for Modern Businesses
          </div>
          <h1 className="text-4xl font-bold tracking-tight text-slate-900 dark:text-white sm:text-5xl lg:text-6xl lg:leading-[1.1]">
            We Build Software That
            <span className="text-sky-500"> Grows </span>
            Your Business
          </h1>
          <p className="mt-6 text-lg text-slate-600 dark:text-slate-400 max-w-2xl mx-auto leading-8">
            From automated dashboards to fleet management and booking systems —
            Pigiecore Solutions crafts custom software that streamlines
            operations and drives results.
          </p>
          <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="#contact"
              className="inline-flex items-center justify-center rounded-full bg-sky-500 px-8 py-3.5 text-base font-semibold text-white shadow-lg shadow-sky-500/25 transition-all hover:bg-sky-600 hover:shadow-xl hover:shadow-sky-500/30"
            >
              Start a Project
            </Link>
            <Link
              href="#services"
              className="inline-flex items-center justify-center rounded-full border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 px-8 py-3.5 text-base font-semibold text-slate-900 dark:text-slate-100 transition-all hover:border-sky-500 hover:text-sky-500 dark:hover:text-sky-400"
            >
              Our Services
            </Link>
          </div>
          <div className="mt-16 flex items-center justify-center gap-8 sm:gap-12 text-center">
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
    </section>
  );
}