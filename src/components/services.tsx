import {
  Home,
  Globe,
  Truck,
  Scissors,
  GraduationCap,
  Hospital,
} from "lucide-react";

const services = [
  {
    icon: Home,
    title: "Real Estate Dashboard",
    description:
      "Automated dashboards with live property listings, market analytics, lead tracking, and investment metrics — all in one place.",
    color: "sky",
  },
  {
    icon: Globe,
    title: "Website Development",
    description:
      "Custom websites and web applications built for performance, responsive design, and seamless user experience.",
    color: "violet",
  },
  {
    icon: Truck,
    title: "Logistics & Fleet Management",
    description:
      "Track vehicles, manage routes, optimize delivery schedules, and monitor fleet health in real time.",
    color: "emerald",
  },
  {
    icon: Scissors,
    title: "Salon & Barber Booking",
    description:
      "Online booking systems with appointment scheduling, staff management, payment processing, and client profiles.",
    color: "amber",
  },
  {
    icon: GraduationCap,
    title: "School Management System",
    description:
      "Manage students, teachers, classes, grades, attendance, fees, and communications — all in one platform.",
    color: "rose",
  },
  {
    icon: Hospital,
    title: "Hospital Management System",
    description:
      "Patient records, appointment booking, billing, pharmacy tracking, and staff management for healthcare facilities.",
    color: "teal",
  },
];

const colorMap = {
  sky: {
    bg: "bg-sky-50 dark:bg-sky-500/10",
    iconBg: "bg-sky-100 dark:bg-sky-500/20",
    iconText: "text-sky-600 dark:text-sky-400",
    border: "border-sky-200 dark:border-sky-500/20",
  },
  violet: {
    bg: "bg-violet-50 dark:bg-violet-500/10",
    iconBg: "bg-violet-100 dark:bg-violet-500/20",
    iconText: "text-violet-600 dark:text-violet-400",
    border: "border-violet-200 dark:border-violet-500/20",
  },
  emerald: {
    bg: "bg-emerald-50 dark:bg-emerald-500/10",
    iconBg: "bg-emerald-100 dark:bg-emerald-500/20",
    iconText: "text-emerald-600 dark:text-emerald-400",
    border: "border-emerald-200 dark:border-emerald-500/20",
  },
  amber: {
    bg: "bg-amber-50 dark:bg-amber-500/10",
    iconBg: "bg-amber-100 dark:bg-amber-500/20",
    iconText: "text-amber-600 dark:text-amber-400",
    border: "border-amber-200 dark:border-amber-500/20",
  },
  rose: {
    bg: "bg-rose-50 dark:bg-rose-500/10",
    iconBg: "bg-rose-100 dark:bg-rose-500/20",
    iconText: "text-rose-600 dark:text-rose-400",
    border: "border-rose-200 dark:border-rose-500/20",
  },
  teal: {
    bg: "bg-teal-50 dark:bg-teal-500/10",
    iconBg: "bg-teal-100 dark:bg-teal-500/20",
    iconText: "text-teal-600 dark:text-teal-400",
    border: "border-teal-200 dark:border-teal-500/20",
  },
};

export default function Services() {
  return (
    <section
      id="services"
      className="py-20 sm:py-28 lg:py-32 bg-white dark:bg-slate-950"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold tracking-tight text-slate-900 dark:text-white sm:text-4xl">
            What We Build
          </h2>
          <p className="mt-4 text-lg text-slate-600 dark:text-slate-300 max-w-2xl mx-auto">
            End-to-end software solutions tailored to the unique needs of your
            industry.
          </p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {services.map((service) => {
            const ColorIcon = service.icon;
            const c = colorMap[service.color];
            return (
              <div
                key={service.title}
                className={`group ${c.bg} ${c.border} border rounded-2xl p-6 lg:p-8 transition-all duration-300 hover:shadow-xl hover:-translate-y-1 dark:border-slate-800`}
              >
                <div
                  className={`w-12 h-12 ${c.iconBg} ${c.iconText} rounded-xl flex items-center justify-center mb-5 transition-transform group-hover:scale-110`}
                >
                  <ColorIcon className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-3">
                  {service.title}
                </h3>
                <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                  {service.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}