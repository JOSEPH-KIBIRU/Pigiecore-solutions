"use client";

import Link from "next/link";
import { useState, useRef, useEffect } from "react";
import Logo from "@/components/logo";

const SERVICE_ITEMS = [
  { label: "Real Estate Dashboard", value: "real-estate", href: "#services" },
  { label: "Website Development", value: "website", href: "#services" },
  { label: "Logistics & Fleet", value: "logistics", href: "#services" },
  { label: "Salon & Barber Booking", value: "salon", href: "#services" },
  { label: "School Management", value: "school", href: "#services" },
  { label: "Hospital Management", value: "hospital", href: "#services" },
];

function toggleDark(): void {
  const html = document.documentElement;
  const next = html.classList.contains("dark") ? "light" : "dark";
  if (next === "dark") {
    html.classList.add("dark");
  } else {
    html.classList.remove("dark");
  }
  localStorage.setItem("theme", next);
}

function SunIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className="h-5 w-5"
      viewBox="0 0 20 20"
      fill="currentColor"
    >
      <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z" />
    </svg>
  );
}

function MoonIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className="h-5 w-5"
      viewBox="0 0 20 20"
      fill="currentColor"
    >
      <path d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z" />
    </svg>
  );
}

function ThemeToggle() {
  return (
    <>
      <span className="dark:hidden">
        <SunIcon />
      </span>
      <span className="hidden dark:inline">
        <MoonIcon />
      </span>
    </>
  );
}

export default function Navbar() {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setDropdownOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white border-b border-slate-200 dark:bg-slate-950 dark:border-slate-800">
      <div className="w-full px-5 sm:px-10 lg:px-16">
        <div className="flex items-center justify-between h-16 gap-8">
          <Link href="/" aria-label="Pigiecore Solutions — Home" className="shrink-0">
            <Logo size={38} />
          </Link>
          <div className="hidden md:flex flex-1 items-center justify-between gap-4">
            <div className="relative" ref={dropdownRef}>
              <button
                onClick={() => setDropdownOpen(!dropdownOpen)}
                className="flex items-center gap-1 text-sm text-slate-600 hover:text-sky-500 transition-colors dark:text-slate-300 dark:hover:text-sky-400"
              >
                Services
                <svg className={`w-3.5 h-3.5 transition-transform ${dropdownOpen ? "rotate-180" : ""}`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              {dropdownOpen && (
                <div className="absolute top-full left-0 mt-2 w-56 rounded-xl border border-slate-200 bg-white py-2 shadow-lg dark:border-slate-700 dark:bg-slate-900">
                  {SERVICE_ITEMS.map((item) => (
                    <Link
                      key={item.value}
                      href={item.href}
                      onClick={() => setDropdownOpen(false)}
                      className="block px-4 py-2 text-sm text-slate-600 hover:bg-slate-50 hover:text-sky-500 dark:text-slate-300 dark:hover:bg-slate-800 dark:hover:text-sky-400"
                    >
                      {item.label}
                    </Link>
                  ))}
                </div>
              )}
            </div>
            <Link
              href="#about"
              className="text-sm text-slate-600 hover:text-sky-500 transition-colors dark:text-slate-300 dark:hover:text-sky-400"
            >
              About
            </Link>
            <Link
              href="#contact"
              className="text-sm text-slate-600 hover:text-sky-500 transition-colors dark:text-slate-300 dark:hover:text-sky-400"
            >
              Contact
            </Link>
            <Link
              href="/blog"
              className="text-sm text-slate-600 hover:text-sky-500 transition-colors dark:text-slate-300 dark:hover:text-sky-400"
            >
              Insights
            </Link>
            <button
              onClick={toggleDark}
              className="p-2 rounded-lg text-slate-600 hover:text-slate-900 hover:bg-slate-100 transition-colors dark:text-slate-300 dark:hover:text-white dark:hover:bg-slate-800"
              aria-label="Toggle dark mode"
            >
              <ThemeToggle />
            </button>
            <Link
              href="/admin"
              className="inline-flex items-center justify-center rounded-full border border-slate-300 px-4 py-2 text-sm font-medium text-slate-900 transition-colors hover:border-sky-500 hover:text-sky-500 dark:border-slate-600 dark:text-slate-200 dark:hover:border-sky-400 dark:hover:text-sky-400"
            >
              Login
            </Link>
            <Link
              href="#contact"
              className="inline-flex items-center justify-center rounded-full bg-sky-500 px-5 py-2 text-sm font-medium text-white transition-colors hover:bg-sky-600"
            >
              Book a Demo
            </Link>
          </div>
          <div className="flex items-center gap-2 md:hidden">
            <button
              onClick={toggleDark}
              className="p-2 rounded-lg text-slate-600 hover:text-slate-900 dark:text-slate-300"
              aria-label="Toggle dark mode"
            >
              <ThemeToggle />
            </button>
            <Link
              href="/admin"
              className="p-2 rounded-lg text-slate-600 hover:text-slate-900 dark:text-slate-300"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                />
              </svg>
            </Link>
            <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="text-slate-600 hover:text-slate-900 dark:text-slate-300">
              {mobileMenuOpen ? (
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              ) : (
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              )}
            </button>
          </div>
        </div>
        {mobileMenuOpen && (
          <div className="md:hidden border-t border-slate-200 dark:border-slate-800 py-4 space-y-2">
            <div className="space-y-1">
              <div className="text-xs text-slate-400 dark:text-slate-500 px-4 pb-1 font-medium uppercase tracking-wider">Services</div>
              {SERVICE_ITEMS.map((item) => (
                <Link key={item.value} href={item.href} onClick={() => setMobileMenuOpen(false)}
                  className="block px-4 py-2 text-sm text-slate-600 hover:text-sky-500 dark:text-slate-300 dark:hover:text-sky-400">
                  {item.label}
                </Link>
              ))}
            </div>
            <Link href="#about" onClick={() => setMobileMenuOpen(false)}
              className="block px-4 py-2 text-sm text-slate-600 hover:text-sky-500 dark:text-slate-300 dark:hover:text-sky-400">
              About
            </Link>
            <Link href="#contact" onClick={() => setMobileMenuOpen(false)}
              className="block px-4 py-2 text-sm text-slate-600 hover:text-sky-500 dark:text-slate-300 dark:hover:text-sky-400">
              Contact
            </Link>
            <Link href="/blog" onClick={() => setMobileMenuOpen(false)}
              className="block px-4 py-2 text-sm text-slate-600 hover:text-sky-500 dark:text-slate-300 dark:hover:text-sky-400">
              Insights
            </Link>
            <div className="pt-2 px-4">
              <Link href="#contact" onClick={() => setMobileMenuOpen(false)}
                className="block w-full text-center rounded-full bg-sky-500 px-5 py-2.5 text-sm font-medium text-white hover:bg-sky-600">
                Book a Demo
              </Link>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}