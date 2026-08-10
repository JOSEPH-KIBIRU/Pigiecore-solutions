import Link from "next/link";
import {
  Code2,
  Cloud,
  Globe,
  Zap,
  CreditCard,
  ArrowRight,
} from "lucide-react";
import Reveal from "@/components/reveal";

type ColorKey = "sky" | "violet" | "emerald" | "amber" | "teal";

const services: {
  icon: typeof Code2;
  title: string;
  description: string;
  color: ColorKey;
  href: string;
}[] = [
  {
    icon: Code2,
    title: "Custom Software",
    description: "Business systems designed around your workflows.",
    color: "sky",
    href: "/services/software-development",
  },
  {
    icon: Cloud,
    title: "SaaS Platforms",
    description: "Scalable subscription-based software products.",
    color: "violet",
    href: "/services/saas-development",
  },
  {
    icon: Globe,
    title: "Web Applications",
    description: "Modern web applications for customers, staff and businesses.",
    color: "emerald",
    href: "/services/web-applications",
  },
  {
    icon: Zap,
    title: "Business Automation",
    description: "Automate repetitive processes and workflows.",
    color: "amber",
    href: "/services/business-automation",
  },
  {
    icon: CreditCard,
    title: "Payment & API Integrations",
    description: "Connect your systems to payment providers and third-party services.",
    color: "teal",
    href: "/services/api-payment-integrations",
  },
];

const colorMap: Record<ColorKey, { bg: string; iconBg: string; iconText: string; border: string; hoverBorder: string; glow: string }> = {
  sky: {
    bg: "bg-sky-50/70 dark:bg-sky-500/10",
    iconBg: "bg-sky-100 dark:bg-sky-500/20",
    iconText: "text-sky-600 dark:text-sky-400",
    border: "border-sky-200 dark:border-sky-500/20",
    hoverBorder: "hover:border-sky-300 dark:hover:border-sky-500/50",
    glow: "from-sky-500/15",
  },
  violet: {
    bg: "bg-violet-50/70 dark:bg-violet-500/10",
    iconBg: "bg-violet-100 dark:bg-violet-500/20",
    iconText: "text-violet-600 dark:text-violet-400",
    border: "border-violet-200 dark:border-violet-500/20",
    hoverBorder: "hover:border-violet-300 dark:hover:border-violet-500/50",
    glow: "from-violet-500/15",
  },
  emerald: {
    bg: "bg-emerald-50/70 dark:bg-emerald-500/10",
    iconBg: "bg-emerald-100 dark:bg-emerald-500/20",
    iconText: "text-emerald-600 dark:text-emerald-400",
    border: "border-emerald-200 dark:border-emerald-500/20",
    hoverBorder: "hover:border-emerald-300 dark:hover:border-emerald-500/50",
    glow: "from-emerald-500/15",
  },
  amber: {
    bg: "bg-amber-50/70 dark:bg-amber-500/10",
    iconBg: "bg-amber-100 dark:bg-amber-500/20",
    iconText: "text-amber-600 dark:text-amber-400",
    border: "border-amber-200 dark:border-amber-500/20",
    hoverBorder: "hover:border-amber-300 dark:hover:border-amber-500/50",
    glow: "from-amber-500/15",
  },
  teal: {
    bg: "bg-teal-50/70 dark:bg-teal-500/10",
    iconBg: "bg-teal-100 dark:bg-teal-500/20",
    iconText: "text-teal-600 dark:text-teal-400",
    border: "border-teal-200 dark:border-teal-500/20",
    hoverBorder: "hover:border-teal-300 dark:hover:border-teal-500/50",
    glow: "from-teal-500/15",
  },
};

export default function Services() {
  return (
    <section
      id="services"
      className="py-20 sm:py-28 lg:py-32 bg-white dark:bg-slate-950"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <Reveal className="text-center mb-16">
          <span className="inline-flex items-center rounded-full border border-sky-200 bg-sky-50 px-4 py-1.5 text-sm font-medium text-sky-700 dark:border-sky-800 dark:bg-sky-950/30 dark:text-sky-300">
            What We Build
          </span>
          <h2 className="mt-5 text-3xl font-bold tracking-tight text-slate-900 dark:text-white sm:text-4xl lg:text-5xl">
            Software Built Around Your Business
          </h2>
          <p className="mt-4 text-lg text-slate-600 dark:text-slate-300 max-w-2xl mx-auto">
            From custom systems to SaaS platforms, we build software that fits
            the way your business works.
          </p>
        </Reveal>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-6 lg:gap-8">
          {services.slice(0, 3).map((service, i) => {
            const ColorIcon = service.icon;
            const c = colorMap[service.color];
            return (
              <Reveal key={service.title} delay={i * 0.08}>
                <Link
                  href={service.href}
                  className={`group relative flex h-full flex-col ${c.bg} ${c.border} border rounded-2xl p-6 lg:p-8 overflow-hidden transition-all duration-300 hover:-translate-y-1.5 hover:shadow-xl ${c.hoverBorder} lg:col-span-2`}
                >
                  <div
                    className={`absolute inset-x-0 top-0 h-1 bg-gradient-to-r ${c.glow} to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100`}
                  />
                  <div
                    className={`w-12 h-12 ${c.iconBg} ${c.iconText} rounded-xl flex items-center justify-center transition-transform duration-300 group-hover:scale-110 group-hover:-rotate-6`}
                  >
                    <ColorIcon className="w-6 h-6" />
                  </div>
                  <h3 className="mt-5 text-lg font-bold text-slate-900 dark:text-white">
                    {service.title}
                  </h3>
                  <p className="mt-2 text-sm text-slate-600 dark:text-slate-400 leading-relaxed flex-1">
                    {service.description}
                  </p>
                  <span
                    className={`mt-5 inline-flex items-center gap-1.5 text-sm font-semibold ${c.iconText} opacity-70 transition-all duration-300 group-hover:gap-2.5 group-hover:opacity-100`}
                  >
                    Learn More <ArrowRight className="w-4 h-4" />
                  </span>
                </Link>
              </Reveal>
            );
          })}
          {services.slice(3).map((service, i) => {
            const ColorIcon = service.icon;
            const c = colorMap[service.color];
            return (
              <Reveal key={service.title} delay={(i + 1) * 0.08}>
                <Link
                  href={service.href}
                  className={`group relative flex h-full flex-col sm:flex-row sm:items-center ${c.bg} ${c.border} border rounded-2xl p-6 lg:p-8 overflow-hidden transition-all duration-300 hover:-translate-y-1.5 hover:shadow-xl ${c.hoverBorder} lg:col-span-3`}
                >
                  <div
                    className={`absolute inset-x-0 top-0 h-1 bg-gradient-to-r ${c.glow} to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100`}
                  />
                  <div
                    className={`w-12 h-12 shrink-0 ${c.iconBg} ${c.iconText} rounded-xl flex items-center justify-center transition-transform duration-300 group-hover:scale-110 group-hover:-rotate-6`}
                  >
                    <ColorIcon className="w-6 h-6" />
                  </div>
                  <div className="mt-4 sm:mt-0 sm:ml-5 flex-1">
                    <h3 className="text-lg font-bold text-slate-900 dark:text-white">
                      {service.title}
                    </h3>
                    <p className="mt-1 text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                      {service.description}
                    </p>
                  </div>
                  <span
                    className={`mt-4 sm:mt-0 inline-flex items-center gap-1.5 text-sm font-semibold ${c.iconText} opacity-70 transition-all duration-300 group-hover:gap-2.5 group-hover:opacity-100`}
                  >
                    Learn More <ArrowRight className="w-4 h-4" />
                  </span>
                </Link>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}