"use client";

import { useState, useEffect } from "react";
import { Star, Quote } from "lucide-react";

interface Testimonial {
  id: number;
  client_name: string;
  company: string | null;
  role: string | null;
  content: string;
  rating: number;
  created_at: string;
}

export default function Testimonials() {
  const [items, setItems] = useState<Testimonial[]>([]);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    fetch("/api/testimonials")
      .then((res) => (res.ok ? res.json() : Promise.reject()))
      .then((data: Testimonial[]) => {
        setItems(data.slice(0, 6));
        setLoaded(true);
      })
      .catch(() => setLoaded(true));
  }, []);

  if (!loaded || items.length === 0) return null;

  return (
    <section id="testimonials" className="py-20 sm:py-28 bg-slate-50 dark:bg-slate-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl dark:text-white">
            What Our Clients Say
          </h2>
          <p className="mt-4 text-lg text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
            Real feedback from businesses we have helped automate and grow.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {items.map((item) => (
            <div
              key={item.id}
              className="relative rounded-2xl border border-slate-200 bg-white p-6 shadow-sm hover:shadow-lg transition-all duration-300 dark:border-slate-700 dark:bg-slate-800"
            >
              <Quote className="absolute top-5 right-5 w-8 h-8 text-sky-100 dark:text-sky-900" />
              <div className="flex gap-0.5 mb-4">
                {[1, 2, 3, 4, 5].map((n) => (
                  <Star key={n} className={`w-4 h-4 ${n <= item.rating ? "text-amber-400 fill-amber-400" : "text-slate-300 dark:text-slate-600"}`} />
                ))}
              </div>
              <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed mb-6">
                &ldquo;{item.content}&rdquo;
              </p>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-sky-400 to-blue-500 flex items-center justify-center text-white font-semibold shrink-0">
                  {item.client_name.charAt(0).toUpperCase()}
                </div>
                <div>
                  <div className="text-sm font-semibold text-slate-900 dark:text-white">{item.client_name}</div>
                  <div className="text-xs text-slate-500 dark:text-slate-400">
                    {[item.role, item.company].filter(Boolean).join(" \u00b7 ") || "Client"}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
