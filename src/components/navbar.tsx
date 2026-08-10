"use client";

import Link from "next/link";
import { useState, useRef, useEffect } from "react";
import Logo from "@/components/logo";

const SERVICES = [
  { label: "Software Development", href: "/services/software-development" },
  { label: "SaaS Development", href: "/services/saas-development" },
  { label: "Web Applications", href: "/services/web-applications" },
  { label: "Business Automation", href: "/services/business-automation" },
  { label: "API & Payment Integrations", href: "/services/api-payment-integrations" },
];

const SOLUTIONS = [
  { label: "Property Management", href: "/solutions/property-management" },
  { label: "Fleet Management", href: "/solutions/fleet-management" },
  { label: "School Management", href: "/solutions/school-management" },
  { label: "Healthcare", href: "/solutions/healthcare" },
  { label: "Custom Business Systems", href: "/solutions/custom-business-systems" },
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

type DropdownKey = "services" | "solutions" | null;

export default function Navbar() {
  const [openDropdown, setOpenDropdown] = useState<DropdownKey>(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const servicesRef = useRef<HTMLDivElement>(null);
  const solutionsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      const target = e.target as Node;
      if (
        servicesRef.current?.contains(target) ||
        solutionsRef.current?.contains(target)
      ) {
        return;
      }
      setOpenDropdown(null);
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const toggleDropdown = (key: Exclude<DropdownKey, null>) => {
    setOpenDropdown((prev) => (prev === key ? null : key));
  };

  const linkClass =
    "text-sm text-slate-600 hover:text-sky-500 transition-colors dark:text-slate-300 dark:hover:text-sky-400";

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white border-b border-slate-200 dark:bg-slate-950 dark:border-slate-800">
      <div className="w-full px-5 sm:px-8 lg:px-12">
        <div className="flex items-center justify-between h-16 gap-6">
          <Link href="/" aria-label="Pigiecore Solutions — Home" className="shrink-0">
            <Logo size={38} />
          </Link>

          {/* Desktop nav */}
          <div className="hidden lg:flex items-center gap-6">
            <Link href="/" className={linkClass}>
              Home
            </Link>

            <div className="relative" ref={servicesRef}>
              <button
                onClick={() => toggleDropdown("services")}
                className={`flex items-center gap-1 text-sm transition-colors ${linkClass}`}
              >
                Services
                <svg className={`w-3.5 h-3.5 transition-transform ${openDropdown === "services" ? "rotate-180" : ""}`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              {openDropdown === "services" && (
                <div className="absolute top-full left-0 mt-2 w-64 rounded-xl border border-slate-200 bg-white py-2 shadow-lg dark:border-slate-700 dark:bg-slate-900">
                  {SERVICES.map((item) => (
                    <Link
                      key={item.href}
                      href={item.href}
                      onClick={() => setOpenDropdown(null)}
                      className="block px-4 py-2 text-sm text-slate-600 hover:bg-slate-50 hover:text-sky-500 dark:text-slate-300 dark:hover:bg-slate-800 dark:hover:text-sky-400"
                    >
                      {item.label}
                    </Link>
                  ))}
                </div>
              )}
            </div>

            <div className="relative" ref={solutionsRef}>
              <button
                onClick={() => toggleDropdown("solutions")}
                className={`flex items-center gap-1 text-sm transition-colors ${linkClass}`}
              >
                Solutions
                <svg className={`w-3.5 h-3.5 transition-transform ${openDropdown === "solutions" ? "rotate-180" : ""}`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              {openDropdown === "solutions" && (
                <div className="absolute top-full left-0 mt-2 w-64 rounded-xl border border-slate-200 bg-white py-2 shadow-lg dark:border-slate-700 dark:bg-slate-900">
                  {SOLUTIONS.map((item) => (
                    <Link
                      key={item.href}
                      href={item.href}
                      onClick={() => setOpenDropdown(null)}
                      className="block px-4 py-2 text-sm text-slate-600 hover:bg-slate-50 hover:text-sky-500 dark:text-slate-300 dark:hover:bg-slate-800 dark:hover:text-sky-400"
                    >
                      {item.label}
                    </Link>
                  ))}
                </div>
              )}
            </div>

            <Link href="/#showcase" className={linkClass}>
              Our Work
            </Link>
            <Link href="/about" className={linkClass}>
              About
            </Link>
            <Link href="/blog" className={linkClass}>
              Blog
            </Link>
            <Link href="/#contact" className={linkClass}>
              Contact
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
              href="/#contact"
              className="inline-flex items-center justify-center rounded-full bg-sky-500 px-5 py-2 text-sm font-medium text-white transition-colors hover:bg-sky-600"
            >
              Start Your Project
            </Link>
          </div>

          {/* Mobile controls */}
          <div className="flex items-center gap-2 lg:hidden">
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
              aria-label="Admin login"
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
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="text-slate-600 hover:text-slate-900 dark:text-slate-300"
              aria-label="Toggle menu"
            >
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

        {/* Mobile menu */}
        {mobileMenuOpen && (
          <div className="lg:hidden border-t border-slate-200 dark:border-slate-800 py-4 space-y-2 max-h-[calc(100vh-4rem)] overflow-y-auto">
            <Link href="/" onClick={() => setMobileMenuOpen(false)}
              className="block px-4 py-2 text-sm text-slate-600 hover:text-sky-500 dark:text-slate-300 dark:hover:text-sky-400">
              Home
            </Link>
            <div>
              <div className="text-xs text-slate-400 dark:text-slate-500 px-4 pb-1 font-medium uppercase tracking-wider">Services</div>
              <div className="space-y-1">
                {SERVICES.map((item) => (
                  <Link key={item.href} href={item.href} onClick={() => setMobileMenuOpen(false)}
                    className="block px-4 py-2 text-sm text-slate-600 hover:text-sky-500 dark:text-slate-300 dark:hover:text-sky-400">
                    {item.label}
                  </Link>
                ))}
              </div>
            </div>
            <div className="pt-2">
              <div className="text-xs text-slate-400 dark:text-slate-500 px-4 pb-1 font-medium uppercase tracking-wider">Solutions</div>
              <div className="space-y-1">
                {SOLUTIONS.map((item) => (
                  <Link key={item.href} href={item.href} onClick={() => setMobileMenuOpen(false)}
                    className="block px-4 py-2 text-sm text-slate-600 hover:text-sky-500 dark:text-slate-300 dark:hover:text-sky-400">
                    {item.label}
                  </Link>
                ))}
              </div>
            </div>
            <Link href="/#showcase" onClick={() => setMobileMenuOpen(false)}
              className="block px-4 py-2 text-sm text-slate-600 hover:text-sky-500 dark:text-slate-300 dark:hover:text-sky-400">
              Our Work
            </Link>
            <Link href="/about" onClick={() => setMobileMenuOpen(false)}
              className="block px-4 py-2 text-sm text-slate-600 hover:text-sky-500 dark:text-slate-300 dark:hover:text-sky-400">
              About
            </Link>
            <Link href="/blog" onClick={() => setMobileMenuOpen(false)}
              className="block px-4 py-2 text-sm text-slate-600 hover:text-sky-500 dark:text-slate-300 dark:hover:text-sky-400">
              Blog
            </Link>
            <Link href="/#contact" onClick={() => setMobileMenuOpen(false)}
              className="block px-4 py-2 text-sm text-slate-600 hover:text-sky-500 dark:text-slate-300 dark:hover:text-sky-400">
              Contact
            </Link>
            <div className="pt-2 px-4">
              <Link href="/#contact" onClick={() => setMobileMenuOpen(false)}
                className="block w-full text-center rounded-full bg-sky-500 px-5 py-2.5 text-sm font-medium text-white hover:bg-sky-600">
                Start Your Project
              </Link>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}