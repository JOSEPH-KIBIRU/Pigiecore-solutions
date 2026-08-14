import Link from "next/link";
import Logo from "@/components/logo";

export default function LegalPage({
  title,
  updated,
  children,
}: {
  title: string;
  updated: string;
  children: React.ReactNode;
}) {
  return (
    <main className="flex flex-col flex-1 bg-white dark:bg-slate-950">
      <header className="bg-slate-900 dark:bg-slate-950 border-b border-slate-800 py-6">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          <Link href="/" aria-label="Pigiecore Solutions — Home">
            <Logo size={38} />
          </Link>
          <Link
            href="/"
            className="text-sm font-medium text-sky-400 hover:text-sky-300 transition-colors"
          >
            Back to Home
          </Link>
        </div>
      </header>
      <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        <h1 className="text-3xl sm:text-4xl font-bold text-slate-900 dark:text-white">
          {title}
        </h1>
        <p className="text-sm text-slate-500 dark:text-slate-400 mt-2">
          Effective date: {updated}
        </p>
        <div className="mt-8 space-y-8">{children}</div>
        <div className="mt-12 p-5 rounded-2xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
          <h2 className="text-lg font-semibold text-slate-900 dark:text-white">
            Contact Us
          </h2>
          <p className="mt-2 text-slate-600 dark:text-slate-400 leading-relaxed">
            If you have any questions about this policy, reach us at{" "}
            <a
              href="mailto:support@pigiecore.co.ke"
              className="text-sky-500 hover:text-sky-400"
            >
              support@pigiecore.co.ke
            </a>{" "}
            or call{" "}
            <a
              href="tel:+254798118515"
              className="text-sky-500 hover:text-sky-400"
            >
              +254798118515
            </a>{" "}
            or{" "}
            <a
              href="tel:+254708769459"
              className="text-sky-500 hover:text-sky-400"
            >
              +254708769459
            </a>
            .
          </p>
        </div>
      </article>
    </main>
  );
}