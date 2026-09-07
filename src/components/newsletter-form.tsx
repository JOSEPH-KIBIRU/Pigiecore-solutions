"use client";

import { useState } from "react";
import { track } from "@vercel/analytics";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export default function NewsletterForm() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">(
    "idle"
  );
  const [message, setMessage] = useState("");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setMessage("");

    if (!EMAIL_RE.test(email.trim())) {
      setStatus("error");
      setMessage("Please enter a valid email address");
      return;
    }

    setStatus("loading");
    try {
      const res = await fetch("/api/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: email.trim() }),
      });
      if (res.status === 429) {
        setStatus("error");
        setMessage("Too many attempts. Please try again later.");
        return;
      }
      if (res.ok) {
        setStatus("success");
        setMessage("Subscribed! You'll hear from us soon.");
        setEmail("");
        track("newsletter_subscribed");
      } else {
        const data = await res.json().catch(() => null);
        setStatus("error");
        setMessage(data?.error || "Something went wrong. Please try again.");
      }
    } catch {
      setStatus("error");
      setMessage("Something went wrong. Please try again.");
    }
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="mt-4">
      <label htmlFor="newsletter-email" className="sr-only">
        Email address
      </label>
      <div className="flex flex-col gap-2 w-full sm:flex-row">
        <input
          type="email"
          id="newsletter-email"
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
            if (status === "error" || status === "success") {
              setStatus("idle");
              setMessage("");
            }
          }}
          placeholder="you@company.com"
          className="w-full min-w-0 flex-1 rounded-full border border-slate-300 bg-white px-4 py-2.5 text-sm text-slate-900 placeholder-slate-400 outline-none transition-colors focus:border-sky-500 focus:ring-2 focus:ring-sky-500/20"
        />
        <button
          type="submit"
          disabled={status === "loading"}
          className="shrink-0 rounded-full bg-gradient-to-r from-sky-500 to-blue-600 px-3.5 py-2.5 text-xs font-semibold text-white transition-all hover:from-sky-600 hover:to-blue-700 disabled:opacity-50"
        >
          {status === "loading" ? "Sending..." : "Subscribe"}
        </button>
      </div>
      {message && (
        <p
          className={`mt-2 text-xs ${
            status === "success"
              ? "text-emerald-500"
              : "text-red-400"
          }`}
        >
          {message}
        </p>
      )}
    </form>
  );
}
