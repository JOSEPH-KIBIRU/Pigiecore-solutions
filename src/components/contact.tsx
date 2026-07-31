"use client";

import { useState } from "react";

export default function Contact() {
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">(
    "idle"
  );

  return (
    <section
      id="contact"
      className="py-20 sm:py-28 lg:py-32 bg-white"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
            Get in Touch
          </h2>
          <p className="mt-4 text-lg text-slate-600 max-w-2xl mx-auto">
            Have a project in mind? We would love to hear about it. Fill out the
            form and we will get back to you within 1 hour.
          </p>
        </div>
        <div className="max-w-xl mx-auto">
          <form
            className="space-y-6"
            onSubmit={async (e) => {
              e.preventDefault();
              setStatus("loading");
              const form = e.target as HTMLFormElement;
              const data = new FormData(form);
              const body = {
                name: data.get("name"),
                email: data.get("email"),
                phone: data.get("phone"),
                service: data.get("service"),
                message: data.get("message"),
              };

              try {
                const res = await fetch("/api/contact", {
                  method: "POST",
                  headers: { "Content-Type": "application/json" },
                  body: JSON.stringify(body),
                });

                if (res.ok) {
                  setStatus("success");
                  form.reset();
                } else {
                  setStatus("error");
                }
              } catch {
                setStatus("error");
              }
            }}
          >
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div>
                <label
                  htmlFor="name"
                  className="block text-sm font-medium text-slate-700 mb-1.5"
                >
                  Full Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  required
                  className="block w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-slate-900 placeholder-slate-400 shadow-sm focus:border-sky-500 focus:ring-2 focus:ring-sky-500/20 outline-none transition-all"
                  placeholder="Your name"
                />
              </div>
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-slate-700 mb-1.5"
                >
                  Email Address
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  required
                  className="block w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-slate-900 placeholder-slate-400 shadow-sm focus:border-sky-500 focus:ring-2 focus:ring-sky-500/20 outline-none transition-all"
                  placeholder="your.email@company.com"
                />
              </div>
            </div>
            <div>
              <label
                htmlFor="phone"
                className="block text-sm font-medium text-slate-700 mb-1.5"
              >
                Phone Number
              </label>
              <input
                type="tel"
                id="phone"
                name="phone"
                className="block w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-slate-900 placeholder-slate-400 shadow-sm focus:border-sky-500 focus:ring-2 focus:ring-sky-500/20 outline-none transition-all"
                placeholder="+254 7XX XXX XXX"
              />
            </div>
            <div>
              <label
                htmlFor="service"
                className="block text-sm font-medium text-slate-700 mb-1.5"
              >
                Service Interested In
              </label>
              <select
                id="service"
                name="service"
                className="block w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-slate-900 shadow-sm focus:border-sky-500 focus:ring-2 focus:ring-sky-500/20 outline-none transition-all"
              >
                <option value="">Select a service</option>
                <option value="real-estate">Real Estate Dashboard</option>
                <option value="website">Website Development</option>
                <option value="logistics">Logistics & Fleet Management</option>
                <option value="salon">Salon & Barber Booking</option>
                <option value="school">School Management System</option>
                <option value="hospital">Hospital Management System</option>
                <option value="other">Other</option>
              </select>
            </div>
            <div>
              <label
                htmlFor="message"
                className="block text-sm font-medium text-slate-700 mb-1.5"
              >
                Message
              </label>
              <textarea
                id="message"
                name="message"
                rows={4}
                className="block w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-slate-900 placeholder-slate-400 shadow-sm focus:border-sky-500 focus:ring-2 focus:ring-sky-500/20 outline-none transition-all resize-none"
                placeholder="Tell us about your project..."
              ></textarea>
            </div>
            <button
              type="submit"
              disabled={status === "loading"}
              className="w-full inline-flex items-center justify-center rounded-full bg-sky-500 px-8 py-4 text-base font-semibold text-white shadow-lg shadow-sky-500/25 transition-all hover:bg-sky-600 hover:shadow-xl hover:shadow-sky-500/30 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {status === "loading"
                ? "Sending..."
                : status === "success"
                ? "Sent!"
                : "Send Message"}
            </button>
            {status === "success" && (
              <p className="text-sm text-emerald-600 text-center">
                Thanks! We will get back to you soon.
              </p>
            )}
            {status === "error" && (
              <p className="text-sm text-red-600 text-center">
                Something went wrong. Please try again or email us directly.
              </p>
            )}
          </form>
        </div>
      </div>
    </section>
  );
}