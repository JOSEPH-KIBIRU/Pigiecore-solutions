"use client";

import { useState } from "react";
import { signIn, signUp } from "@/lib/auth";
import Link from "next/link";
import { AlertCircle, Check } from "lucide-react";

export default function AdminLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(false);
  const [mode, setMode] = useState<"login" | "signup">("login");
  const [signupSuccess, setSignupSuccess] = useState(false);

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
    } else if (mode === "signup" && password.length < 6) {
      nextErrors.password = "Password must be at least 6 characters";
    }
    setFieldErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0) return;

    setLoading(true);

    try {
      if (mode === "login") {
        await signIn(email, password);
        window.location.href = "/admin";
      } else {
        const result = await signUp(email, password);
        if (result.user) {
          setSignupSuccess(true);
          setMode("login");
          setLoading(false);
          return;
        }
      }
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
          <div className="w-14 h-14 bg-gradient-to-br from-sky-500 to-blue-600 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg shadow-sky-500/25">
            <span className="text-white font-bold text-2xl">P</span>
          </div>
          <h1 className="text-2xl font-bold text-slate-900 dark:text-white">
            {mode === "login" ? "Welcome Back" : "Create Account"}
          </h1>
          <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
            {mode === "login"
              ? "Sign in to manage your site"
              : "Create your admin account"}
          </p>
        </div>

        {signupSuccess && (
          <div className="mb-6 p-4 rounded-xl bg-emerald-50 border border-emerald-200 text-sm text-emerald-700 flex items-center gap-3 dark:bg-emerald-950/30 dark:border-emerald-800 dark:text-emerald-400">
            <Check className="w-5 h-5 shrink-0" />
            Account created! Check your email to confirm, then sign in.
          </div>
        )}

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
                  : "border-slate-300 focus:border-sky-500 focus:ring-sky-500/20 dark:border-slate-700"
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
            <input
              type="password" id="password" value={password}
              onChange={(e) => { setPassword(e.target.value); if (fieldErrors.password) setFieldErrors((er) => ({ ...er, password: "" })); }}
              className={`block w-full rounded-xl border bg-white px-4 py-3 text-slate-900 placeholder-slate-400 shadow-sm focus:ring-2 outline-none transition-all dark:bg-slate-800 dark:text-slate-100 ${
                fieldErrors.password
                  ? "border-red-400 focus:border-red-500 focus:ring-red-500/20"
                  : "border-slate-300 focus:border-sky-500 focus:ring-sky-500/20 dark:border-slate-700"
              }`}
              placeholder="Enter your password"
            />
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
            className="w-full inline-flex items-center justify-center rounded-xl bg-gradient-to-r from-sky-500 to-blue-600 px-4 py-3 text-sm font-semibold text-white transition-all hover:shadow-lg hover:shadow-sky-500/25 disabled:opacity-50"
          >
            {loading ? "Please wait..." : mode === "login" ? "Sign In" : "Create Account"}
          </button>
        </form>

        <div className="mt-4 text-center">
          <button
            onClick={() => { setMode(mode === "login" ? "signup" : "login"); setError(""); setFieldErrors({}); setSignupSuccess(false); }}
            className="text-sm text-sky-500 hover:text-sky-600 transition-colors"
          >
            {mode === "login" ? "No account? Create one" : "Already have an account? Sign in"}
          </button>
        </div>

        <p className="mt-6 text-center text-xs text-slate-400 dark:text-slate-500">
          <Link href="/" className="hover:text-sky-500 transition-colors">← Back to homepage</Link>
        </p>
      </div>
    </main>
  );
}
