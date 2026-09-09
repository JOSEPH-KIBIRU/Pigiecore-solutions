import Link from "next/link";
import {
  Code2,
  Cloud,
  Globe,
  Smartphone,
  Zap,
  Search,
  CreditCard,
  Check,
  ArrowRight,
} from "lucide-react";
import Reveal from "@/components/reveal";
import { getEntry } from "@/lib/service-content";

type ColorKey =
  | "sky"
  | "violet"
  | "emerald"
  | "pink"
  | "amber"
  | "indigo"
  | "teal";

interface Service {
  icon: typeof Code2;
  title: string;
  description: string;
  slug: string;
  color: ColorKey;
}

const services: Service[] = [
  {
    icon: Code2,
    title: "Custom Software",
    description: "Business systems designed around your workflows.",
    slug: "software-development",
    color: "sky",
  },
  {
    icon: Cloud,
    title: "SaaS Platforms",
    description: "Scalable subscription-based software products.",
    slug: "saas-development",
    color: "violet",
  },
  {
    icon: Globe,
    title: "Web Applications",
    description: "Modern web applications for customers, staff and businesses.",
    slug: "web-applications",
    color: "emerald",
  },
  {
    icon: Smartphone,
    title: "Mobile App Development",
    description: "iOS, Android and cross-platform apps that grow your reach.",
    slug: "mobile-app-development",
    color: "pink",
  },
  {
    icon: Zap,
    title: "Business Automation",
    description: "Automate repetitive processes and workflows.",
    slug: "business-automation",
    color: "amber",
  },
  {
    icon: Search,
    title: "SEO & Web Maintenance",
    description: "Stay fast, secure and found on Google with care plans.",
    slug: "seo-web-maintenance",
    color: "indigo",
  },
  {
    icon: CreditCard,
    title: "Payment & API Integrations",
    description:
      "Connect your systems to payment providers and third-party services.",
    slug: "api-payment-integrations",
    color: "teal",
  },
];

const colorMap: Record<
  ColorKey,
  {
    grad: string;
    text: string;
    chip: string;
    softText: string;
    ring: string;
    bar: string;
  }
> = {
  sky: {
    grad: "from-sky-500 to-blue-600",
    text: "text-sky-600 dark:text-sky-400",
    chip: "bg-sky-100 text-sky-700 dark:bg-sky-500/15 dark:text-sky-300",
    softText: "text-slate-600 dark:text-slate-300",
    ring: "group-hover:border-sky-300 dark:group-hover:border-sky-500/50",
    bar: "bg-sky-400",
  },
  violet: {
    grad: "from-violet-500 to-purple-600",
    text: "text-violet-600 dark:text-violet-400",
    chip: "bg-violet-100 text-violet-700 dark:bg-violet-500/15 dark:text-violet-300",
    softText: "text-slate-600 dark:text-slate-300",
    ring: "group-hover:border-violet-300 dark:group-hover:border-violet-500/50",
    bar: "bg-violet-400",
  },
  emerald: {
    grad: "from-emerald-500 to-teal-600",
    text: "text-emerald-600 dark:text-emerald-400",
    chip: "bg-emerald-100 text-emerald-700 dark:bg-emerald-500/15 dark:text-emerald-300",
    softText: "text-slate-600 dark:text-slate-300",
    ring: "group-hover:border-emerald-300 dark:group-hover:border-emerald-500/50",
    bar: "bg-emerald-400",
  },
  pink: {
    grad: "from-pink-500 to-rose-600",
    text: "text-pink-600 dark:text-pink-400",
    chip: "bg-pink-100 text-pink-700 dark:bg-pink-500/15 dark:text-pink-300",
    softText: "text-slate-600 dark:text-slate-300",
    ring: "group-hover:border-pink-300 dark:group-hover:border-pink-500/50",
    bar: "bg-pink-400",
  },
  amber: {
    grad: "from-amber-500 to-orange-600",
    text: "text-amber-600 dark:text-amber-400",
    chip: "bg-amber-100 text-amber-700 dark:bg-amber-500/15 dark:text-amber-300",
    softText: "text-slate-600 dark:text-slate-300",
    ring: "group-hover:border-amber-300 dark:group-hover:border-amber-500/50",
    bar: "bg-amber-400",
  },
  indigo: {
    grad: "from-indigo-500 to-blue-600",
    text: "text-indigo-600 dark:text-indigo-400",
    chip: "bg-indigo-100 text-indigo-700 dark:bg-indigo-500/15 dark:text-indigo-300",
    softText: "text-slate-600 dark:text-slate-300",
    ring: "group-hover:border-indigo-300 dark:group-hover:border-indigo-500/50",
    bar: "bg-indigo-400",
  },
  teal: {
    grad: "from-teal-500 to-cyan-600",
    text: "text-teal-600 dark:text-teal-400",
    chip: "bg-teal-100 text-teal-700 dark:bg-teal-500/15 dark:text-teal-300",
    softText: "text-slate-600 dark:text-slate-300",
    ring: "group-hover:border-teal-300 dark:group-hover:border-teal-500/50",
    bar: "bg-teal-400",
  },
};

function ServiceVisual({
  color,
  icon: Icon,
  label,
}: {
  color: ColorKey;
  icon: typeof Code2;
  label: string;
}) {
  const c = colorMap[color];
  return (
    <div
      aria-hidden
      className={`relative overflow-hidden rounded-[2rem] bg-gradient-to-br ${c.grad} p-[1px] shadow-2xl shadow-slate-900/20 dark:shadow-black/40`}
    >
      <div className="relative flex min-h-[260px] items-center justify-center overflow-hidden rounded-[calc(2rem-1px)] bg-white px-10 py-14 dark:bg-slate-950/90 sm:min-h-[300px]">
        <div
          className={`absolute -right-12 -top-12 h-44 w-44 rounded-full bg-gradient-to-br ${c.grad} opacity-10 blur-2xl`}
        ></div>
        <div
          className={`absolute -bottom-16 -left-10 h-52 w-52 rounded-full bg-gradient-to-br ${c.grad} opacity-[0.08] blur-3xl`}
        ></div>

        {/* faux window dots */}
        <div className="absolute left-6 top-5 flex gap-1.5">
          <span className="h-2.5 w-2.5 rounded-full bg-slate-200 dark:bg-slate-700"></span>
          <span className="h-2.5 w-2.5 rounded-full bg-slate-200 dark:bg-slate-700"></span>
          <span className="h-2.5 w-2.5 rounded-full bg-slate-200 dark:bg-slate-700"></span>
        </div>

        {/* code bars */}
        <div className="absolute right-8 top-10 hidden space-y-2 sm:block">
          {[80, 60, 72].map((w, i) => (
            <div
              key={i}
              style={{ width: `${w}px` }}
              className={`h-1.5 rounded-full ${c.bar} opacity-20`}
            ></div>
          ))}
        </div>

        <div className="relative flex flex-col items-center text-center">
          <div
            className={`flex h-20 w-20 items-center justify-center rounded-3xl bg-gradient-to-br ${c.grad} text-white shadow-xl`}
          >
            <Icon className="h-10 w-10" />
          </div>
          <span
            className={`mt-6 inline-block rounded-full px-3 py-1 text-xs font-semibold ${c.chip}`}
          >
            {label}
          </span>
        </div>
      </div>
    </div>
  );
}

export default function Services() {
  return (
    <section
      id="services"
      className="py-20 sm:py-28 lg:py-32 bg-white dark:bg-slate-950"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <Reveal className="text-center mb-16 lg:mb-20">
          <span className="inline-flex items-center rounded-full border border-sky-200 bg-sky-50 px-4 py-1.5 text-sm font-medium text-sky-700 dark:border-sky-800 dark:bg-sky-950/30 dark:text-sky-300">
            What We Build
          </span>
          <h2 className="mt-5 text-3xl font-bold tracking-tight text-slate-900 dark:text-white sm:text-4xl lg:text-5xl">
            Software Built Around Your Business
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-slate-600 dark:text-slate-300">
            From custom systems to SaaS platforms, we build software that fits
            the way your business works.
          </p>
        </Reveal>

        <div className="space-y-16 lg:space-y-24">
          {services.map((service, i) => {
            const Icon = service.icon;
            const c = colorMap[service.color];
            const entry = getEntry("services", service.slug);
            const bullets = entry?.features.slice(0, 2) ?? [];
            const flip = i % 2 === 1;

            return (
              <Reveal key={service.slug} delay={0.05}>
                <div
                  className={`group grid items-center gap-8 lg:grid-cols-2 lg:gap-14 ${
                    flip ? "" : ""
                  }`}
                >
                  {/* Text side */}
                  <div className={flip ? "lg:order-2" : "lg:order-1"}>
                    <span
                      className={`inline-flex items-center gap-2 text-sm font-bold uppercase tracking-widest ${c.text}`}
                    >
                      <span className="font-mono">0{i + 1}</span>
                      <span className="h-px w-8 bg-current opacity-40"></span>
                    </span>
                    <h3
                      className={`mt-4 text-2xl font-bold tracking-tight text-slate-900 dark:text-white sm:text-3xl`}
                    >
                      {service.title}
                    </h3>
                    <p
                      className={`mt-4 max-w-xl text-lg leading-relaxed ${c.softText}`}
                    >
                      {service.description}
                    </p>
                    {bullets.length > 0 && (
                      <ul className="mt-6 space-y-3">
                        {bullets.map((b) => (
                          <li
                            key={b.title}
                            className="flex items-start gap-3 text-slate-700 dark:text-slate-300"
                          >
                            <span
                              className={`mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-gradient-to-br ${c.grad} text-white`}
                            >
                              <Check className="h-3 w-3" />
                            </span>
                            <span>
                              <span className="font-semibold">{b.title}: </span>
                              {b.description}
                            </span>
                          </li>
                        ))}
                      </ul>
                    )}
                    <Link
                      href={`/services/${service.slug}`}
                      className={`mt-8 inline-flex items-center gap-2 rounded-full bg-gradient-to-r ${c.grad} px-6 py-3 text-sm font-semibold text-white shadow-lg transition-all hover:shadow-xl hover:opacity-95`}
                    >
                      Explore {service.title}
                      <ArrowRight className="h-4 w-4" />
                    </Link>
                  </div>

                  {/* Visual side */}
                  <div className={flip ? "lg:order-1" : "lg:order-2"}>
                    <ServiceVisual
                      color={service.color}
                      icon={Icon}
                      label={service.title}
                    />
                  </div>
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
