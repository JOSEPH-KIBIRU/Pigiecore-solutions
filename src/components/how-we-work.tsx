import { Search, PenTool, Code2, Rocket, LifeBuoy } from "lucide-react";
import Reveal from "@/components/reveal";

const STEPS = [
  { icon: Search, title: "Discover", description: "We map your workflows, pain points, and goals in a free consultation." },
  { icon: PenTool, title: "Design", description: "You approve a clear blueprint — features, screens, and timelines — before we build." },
  { icon: Code2, title: "Build", description: "We develop in short iterations so you see working software as it takes shape." },
  { icon: Rocket, title: "Launch", description: "We deploy, train your team, and hand over a system that's ready for day one." },
  { icon: LifeBuoy, title: "Support", description: "Ongoing maintenance, updates, and a sub-24-hour response when you need help." },
];

export default function HowWeWork() {
  return (
    <section id="how-we-work" className="py-20 sm:py-28 bg-white dark:bg-slate-950">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <Reveal className="text-center mb-14">
          <span className="inline-flex items-center rounded-full border border-sky-200 bg-sky-50 px-4 py-1.5 text-sm font-medium text-sky-700 dark:border-sky-800 dark:bg-sky-950/30 dark:text-sky-300">
            How We Work
          </span>
          <h2 className="mt-5 text-3xl font-bold tracking-tight text-slate-900 dark:text-white sm:text-4xl">
            A Clear Path From Idea to Launch
          </h2>
          <p className="mt-4 text-lg text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
            No mystery, no surprises. You're involved at every step so the result
            matches what you actually need.
          </p>
        </Reveal>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
          {STEPS.map((step, i) => (
            <Reveal key={step.title} delay={i * 0.06}>
              <div className="relative h-full rounded-2xl border border-slate-200 bg-slate-50 p-6 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg dark:border-slate-800 dark:bg-slate-900">
                <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-sky-500 to-blue-600 flex items-center justify-center mb-4">
                  <step.icon className="w-5 h-5 text-white" />
                </div>
                <div className="text-xs font-semibold text-sky-500 mb-1">
                  Step {i + 1}
                </div>
                <h3 className="font-bold text-slate-900 dark:text-white">{step.title}</h3>
                <p className="mt-2 text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                  {step.description}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}