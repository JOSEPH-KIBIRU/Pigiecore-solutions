"use client";

import { useState } from "react";
import { signIn } from "@/lib/auth";
import Link from "next/link";
import { AlertCircle, Eye, EyeOff } from "lucide-react";
import Logo from "@/components/logo";

export default function AdminLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    const nextErrors: Record<string, string> = {};
    const emailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim());
    if (!email.trim()) {
      nextErrors.email = "Email address is required";
    } else if (!emailValid) {
      nextErrors.email = "Please enter a valid email address";
    }
    if (!password) {
      nextErrors.password = "Password is required";
    }
    setFieldErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0) return;

    setLoading(true);

    try {
      const rl = await fetch("/api/login-check", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: email.trim() }),
      });
      if (rl.status === 429) {
        const data = await rl.json().catch(() => null);
        setError(data?.error || "Too many login attempts. Please try again later.");
        setLoading(false);
        return;
      }

      await signIn(email, password);
      window.location.href = "/admin";
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : "Failed to sign in";
      setError(message);
      setLoading(false);
    }
  }

  return (
    <main className="min-h-screen bg-slate-50 dark:bg-slate-950 flex items-center justify-center py-20">
      <div className="w-full max-w-md px-4">
        <div className="mb-8 text-center">
          <Logo size={56} accentColor="#4D9BFF" className="mx-auto mb-4 text-text-1 dark:text-white" />
          <h1 className="text-2xl font-bold text-slate-900 dark:text-white">Welcome Back</h1>
          <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
            Sign in to manage your site
          </p>
        </div>

        <form
          onSubmit={handleSubmit}
          noValidate
          className="space-y-4 rounded-2xl border border-slate-200 bg-white p-8 shadow-sm dark:border-slate-800 dark:bg-slate-900"
        >
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5">
              Email
            </label>
            <input
              type="email" id="email" value={email}
              onChange={(e) => { setEmail(e.target.value); if (fieldErrors.email) setFieldErrors((er) => ({ ...er, email: "" })); }}
              className={`block w-full rounded-xl border bg-white px-4 py-3 text-slate-900 placeholder-slate-400 shadow-sm focus:ring-2 outline-none transition-all dark:bg-slate-800 dark:text-slate-100 ${
                fieldErrors.email
                  ? "border-red-400 focus:border-red-500 focus:ring-red-500/20"
                  : "border-slate-300 focus:border-brand focus:ring-brand/20 dark:border-slate-700"
              }`}
              placeholder="admin@pigiecore.com"
            />
            {fieldErrors.email && (
              <p className="mt-1.5 text-sm text-red-600 dark:text-red-400">{fieldErrors.email}</p>
            )}
          </div>
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5">
              Password
            </label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"} id="password" value={password}
                onChange={(e) => { setPassword(e.target.value); if (fieldErrors.password) setFieldErrors((er) => ({ ...er, password: "" })); }}
                className={`block w-full rounded-xl border bg-white px-4 py-3 pr-11 text-slate-900 placeholder-slate-400 shadow-sm focus:ring-2 outline-none transition-all dark:bg-slate-800 dark:text-slate-100 ${
                  fieldErrors.password
                    ? "border-red-400 focus:border-red-500 focus:ring-red-500/20"
                    : "border-slate-300 focus:border-brand focus:ring-brand/20 dark:border-slate-700"
                }`}
                placeholder="Enter your password"
              />
              <button
                type="button"
                onClick={() => setShowPassword((v) => !v)}
                aria-label={showPassword ? "Hide password" : "Show password"}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 transition-colors hover:text-slate-200"
              >
                {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
              </button>
            </div>
            {fieldErrors.password && (
              <p className="mt-1.5 text-sm text-red-600 dark:text-red-400">{fieldErrors.password}</p>
            )}
          </div>
          {error && (
            <p className="text-sm text-red-600 dark:text-red-400 flex items-center gap-2">
              <AlertCircle className="w-4 h-4" /> {error}
            </p>
          )}
          <button
            type="submit" disabled={loading}
            className="w-full inline-flex items-center justify-center rounded-xl bg-gradient-to-r from-brand to-brand-hover px-4 py-3 text-sm font-semibold text-white transition-all hover:shadow-lg hover:shadow-brand/25 disabled:opacity-50"
          >
            {loading ? "Please wait..." : "Sign In"}
          </button>
        </form>

        <p className="mt-6 text-center text-xs text-slate-400 dark:text-slate-500">
          <Link href="/" className="hover:text-brand transition-colors">← Back to homepage</Link>
        </p>
      </div>
    </main>
  );
}
