"use client";

import { useState } from "react";
import Reveal from "@/components/reveal";

interface ContactErrors {
  name?: string;
  email?: string;
  phone?: string;
  message?: string;
}

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const PHONE_RE = /^\d{9,15}$/;

export default function Contact() {
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">(
    "idle"
  );
  const [errors, setErrors] = useState<ContactErrors>({});

  const [values, setValues] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });

  function validate(data: ContactErrors): ContactErrors {
    const next: ContactErrors = {};
    if (!data.name || data.name.trim().length < 2) {
      next.name = "Please enter your full name";
    }
    if (!data.email) {
      next.email = "Email address is required";
    } else if (!EMAIL_RE.test(data.email)) {
      next.email = "Please enter a valid email address";
    }
    if (!data.phone) {
      next.phone = "Phone number is required";
    } else if (!PHONE_RE.test(data.phone)) {
      next.phone = "Please enter a valid phone number";
    }
    if (!data.message || data.message.trim().length < 10) {
      next.message = "Please enter a message of at least 10 characters";
    }
    return next;
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("idle");
    const nextErrors = validate(values);
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0) return;

    setStatus("loading");
    const body = {
      name: values.name,
      email: values.email,
      phone: values.phone || null,
      service: (e.target as HTMLFormElement).service?.value ?? null,
      message: values.message,
    };

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });

      if (res.ok) {
        setStatus("success");
        setValues({ name: "", email: "", phone: "", message: "" });
        (e.target as HTMLFormElement).reset();
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  }

  const inputClass = (hasError: boolean) =>
    `block w-full rounded-xl border bg-white px-4 py-3 text-slate-900 placeholder-slate-400 shadow-sm focus:ring-2 outline-none transition-all dark:bg-slate-800 dark:text-white dark:placeholder-slate-500 dark:border-slate-700 ${
      hasError
        ? "border-red-400 focus:border-red-500 focus:ring-red-500/20 dark:border-red-500/60"
        : "border-slate-300 focus:border-sky-500 focus:ring-sky-500/20 dark:border-slate-600"
    }`;

  return (
    <section
      id="contact"
      className="py-20 sm:py-28 lg:py-32 bg-slate-50 dark:bg-slate-950"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <Reveal className="text-center mb-16">
          <span className="inline-flex items-center rounded-full border border-sky-200 bg-sky-50 px-4 py-1.5 text-sm font-medium text-sky-700 dark:border-sky-800 dark:bg-sky-950/30 dark:text-sky-300">
            Contact Us
          </span>
          <h2 className="mt-5 text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl dark:text-white">
            Get in Touch
          </h2>
          <p className="mt-4 text-lg text-slate-600 max-w-2xl mx-auto dark:text-slate-400">
            Have a project in mind? We would love to hear about it. Fill out the
            form and we will get back to you within 1 hour.
          </p>
        </Reveal>
        <Reveal className="max-w-xl mx-auto">
          <form
            className="space-y-6"
            noValidate
            onSubmit={handleSubmit}
          >
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div>
                <label
                  htmlFor="name"
                  className="block text-sm font-medium text-slate-700 mb-1.5 dark:text-slate-300"
                >
                  Full Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={values.name}
                  onChange={(e) => {
                    setValues((v) => ({ ...v, name: e.target.value }));
                    if (errors.name) setErrors((er) => ({ ...er, name: undefined }));
                  }}
                  className={inputClass(!!errors.name)}
                  placeholder="Your name"
                  aria-invalid={!!errors.name}
                />
                {errors.name && (
                  <p className="mt-1.5 text-sm text-red-500">{errors.name}</p>
                )}
              </div>
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-slate-700 mb-1.5 dark:text-slate-300"
                >
                  Email Address
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={values.email}
                  onChange={(e) => {
                    setValues((v) => ({ ...v, email: e.target.value }));
                    if (errors.email) setErrors((er) => ({ ...er, email: undefined }));
                  }}
                  className={inputClass(!!errors.email)}
                  placeholder="your.email@company.com"
                  aria-invalid={!!errors.email}
                />
                {errors.email && (
                  <p className="mt-1.5 text-sm text-red-500">{errors.email}</p>
                )}
              </div>
            </div>
            <div>
              <label
                htmlFor="phone"
                  className="block text-sm font-medium text-slate-700 mb-1.5 dark:text-slate-300"
                >
                  Phone Number
              </label>
              <input
                type="tel"
                id="phone"
                name="phone"
                inputMode="numeric"
                value={values.phone}
                onChange={(e) => {
                  const digits = e.target.value.replace(/\D/g, "");
                  setValues((v) => ({ ...v, phone: digits }));
                  if (errors.phone) setErrors((er) => ({ ...er, phone: undefined }));
                }}
                className={inputClass(!!errors.phone)}
                placeholder="0712345678"
                aria-invalid={!!errors.phone}
              />
              {errors.phone && (
                <p className="mt-1.5 text-sm text-red-500">{errors.phone}</p>
              )}
            </div>
            <div>
              <label
                htmlFor="service"
                  className="block text-sm font-medium text-slate-700 mb-1.5 dark:text-slate-300"
                >
                  Service Interested In
              </label>
              <select
                id="service"
                name="service"
                className="block w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-slate-900 shadow-sm focus:border-sky-500 focus:ring-2 focus:ring-sky-500/20 outline-none transition-all dark:bg-slate-800 dark:text-white dark:border-slate-600"
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
                  className="block text-sm font-medium text-slate-700 mb-1.5 dark:text-slate-300"
                >
                  Message
              </label>
              <textarea
                id="message"
                name="message"
                rows={4}
                value={values.message}
                onChange={(e) => {
                  setValues((v) => ({ ...v, message: e.target.value }));
                  if (errors.message) setErrors((er) => ({ ...er, message: undefined }));
                }}
                className={`${inputClass(!!errors.message)} resize-none`}
                placeholder="Tell us about your project..."
                aria-invalid={!!errors.message}
              ></textarea>
              {errors.message && (
                <p className="mt-1.5 text-sm text-red-500">{errors.message}</p>
              )}
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
              <p className="text-sm text-emerald-600 text-center dark:text-emerald-400">
                Thanks! We will get back to you soon.
              </p>
            )}
            {status === "error" && (
              <p className="text-sm text-red-600 text-center dark:text-red-400">
                Something went wrong. Please try again or email us directly.
              </p>
            )}
          </form>
        </Reveal>
      </div>
    </section>
  );
}
