import Link from "next/link";
import {
  Home,
  Globe,
  Truck,
  Scissors,
  GraduationCap,
  Hospital,
  ArrowUpRight,
} from "lucide-react";
import Reveal from "@/components/reveal";

type ColorKey = "sky" | "violet" | "emerald" | "amber" | "rose" | "teal";

const services: {
  icon: typeof Home;
  title: string;
  description: string;
  color: ColorKey;
  tag: string;
}[] = [
  {
    icon: Home,
    title: "Real Estate Dashboard",
    description:
      "Automated dashboards with live property listings, market analytics, lead tracking, and investment metrics — all in one place.",
    color: "sky",
    tag: "Property Analytics",
  },
  {
    icon: Globe,
    title: "Website Development",
    description:
      "Custom websites and web applications built for performance, responsive design, and seamless user experience.",
    color: "violet",
    tag: "Web & Mobile",
  },
  {
    icon: Truck,
    title: "Logistics & Fleet Management",
    description:
      "Track vehicles, manage routes, optimize delivery schedules, and monitor fleet health in real time.",
    color: "emerald",
    tag: "Fleet & Tracking",
  },
  {
    icon: Scissors,
    title: "Salon & Barber Booking",
    description:
      "Online booking systems with appointment scheduling, staff management, payment processing, and client profiles.",
    color: "amber",
    tag: "Appointments",
  },
  {
    icon: GraduationCap,
    title: "School Management System",
    description:
      "Manage students, teachers, classes, grades, attendance, fees, and communications — all in one platform.",
    color: "rose",
    tag: "Education OS",
  },
  {
    icon: Hospital,
    title: "Hospital Management System",
    description:
      "Patient records, appointment booking, billing, pharmacy tracking, and staff management for healthcare facilities.",
    color: "teal",
    tag: "Healthcare",
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
  rose: {
    bg: "bg-rose-50/70 dark:bg-rose-500/10",
    iconBg: "bg-rose-100 dark:bg-rose-500/20",
    iconText: "text-rose-600 dark:text-rose-400",
    border: "border-rose-200 dark:border-rose-500/20",
    hoverBorder: "hover:border-rose-300 dark:hover:border-rose-500/50",
    glow: "from-rose-500/15",
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
            Our Services
          </span>
          <h2 className="mt-5 text-3xl font-bold tracking-tight text-slate-900 dark:text-white sm:text-4xl lg:text-5xl">
            What We Build
          </h2>
          <p className="mt-4 text-lg text-slate-600 dark:text-slate-300 max-w-2xl mx-auto">
            End-to-end software solutions tailored to the unique needs of your
            industry.
          </p>
        </Reveal>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {services.map((service, i) => {
            const ColorIcon = service.icon;
            const c = colorMap[service.color];
            return (
              <Reveal key={service.title} delay={(i % 3) * 0.08}>
                <div
                  className={`group relative ${c.bg} ${c.border} border rounded-2xl p-6 lg:p-8 overflow-hidden transition-all duration-300 hover:-translate-y-1.5 hover:shadow-xl ${c.hoverBorder}`}
                >
                  <div
                    className={`absolute inset-x-0 top-0 h-1 bg-gradient-to-r ${c.glow} to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100`}
                  />
                  <div className="flex items-start justify-between mb-5">
                    <div
                      className={`w-12 h-12 ${c.iconBg} ${c.iconText} rounded-xl flex items-center justify-center transition-transform duration-300 group-hover:scale-110 group-hover:-rotate-6`}
                    >
                      <ColorIcon className="w-6 h-6" />
                    </div>
                    <span className={`text-[11px] font-semibold uppercase tracking-wider ${c.iconText}`}>
                      {service.tag}
                    </span>
                  </div>
                  <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-3">
                    {service.title}
                  </h3>
                  <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed mb-5">
                    {service.description}
                  </p>
                  <Link
                    href="#contact"
                    className={`inline-flex items-center gap-1 text-sm font-semibold ${c.iconText} opacity-70 transition-all duration-300 group-hover:gap-2 group-hover:opacity-100`}
                  >
                    Start this project <ArrowUpRight className="w-4 h-4" />
                  </Link>
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}