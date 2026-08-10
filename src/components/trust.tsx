import { Users, ShieldCheck, Timer, Headphones } from "lucide-react";
import Reveal from "@/components/reveal";

const ITEMS = [
  { icon: Users, title: "5 Kenyan Engineers", subtitle: "Local team, local understanding" },
  { icon: ShieldCheck, title: "100% Custom Built", subtitle: "No generic templates" },
  { icon: Timer, title: "<24h Response", subtitle: "Sub-24-hour support" },
  { icon: Headphones, title: "24/7 Support", subtitle: "We stay after launch" },
];

export default function Trust() {
  return (
    <section
      id="trust"
      className="py-14 sm:py-16 border-b border-slate-200 bg-white dark:border-slate-800 dark:bg-slate-950"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <Reveal>
          <p className="text-center text-sm font-medium uppercase tracking-wider text-slate-400 dark:text-slate-500">
            Trusted by growing businesses across Kenya
          </p>
          <div className="mt-8 grid grid-cols-2 gap-x-6 gap-y-8 md:grid-cols-4">
            {ITEMS.map((item) => (
              <div key={item.title} className="flex flex-col items-center text-center">
                <item.icon className="w-7 h-7 text-sky-500 mb-3" />
                <div className="text-lg font-bold text-slate-900 dark:text-white">
                  {item.title}
                </div>
                <div className="text-sm text-slate-500 dark:text-slate-400 mt-0.5">
                  {item.subtitle}
                </div>
              </div>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}