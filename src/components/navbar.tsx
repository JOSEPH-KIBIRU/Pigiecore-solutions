"use client";

import Link from "next/link";
import { useState, useRef, useEffect } from "react";
import Logo from "@/components/logo";

const SERVICES = [
  { label: "Custom Software", href: "/services/software-development" },
  { label: "SaaS Platforms", href: "/services/saas-development" },
  { label: "Web Applications", href: "/services/web-applications" },
  { label: "Mobile App Development", href: "/services/mobile-app-development" },
  { label: "Business Automation", href: "/services/business-automation" },
  { label: "SEO & Web Maintenance", href: "/services/seo-web-maintenance" },
  { label: "Payment & API Integrations", href: "/services/api-payment-integrations" },
];

const SOLUTIONS = [
  { label: "Property Management", href: "/solutions/property-management" },
  { label: "Fleet Management", href: "/solutions/fleet-management" },
  { label: "School Management", href: "/solutions/school-management" },
  { label: "Healthcare", href: "/solutions/healthcare" },
  { label: "Office Manager", href: "/solutions/office-management" },
  { label: "Custom Business Systems", href: "/solutions/custom-business-systems" },
];

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
    "text-sm text-slate-600 hover:text-brand transition-colors dark:text-slate-300 dark:hover:text-brand-soft";

  return (
        <nav className="fixed top-0 left-0 right-0 z-50 dark bg-[#0b0c0e] border-b border-white/10">
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
                <div className="absolute top-full left-0 mt-2 w-64 rounded-xl border border-slate-200 bg-surface-2 py-2 shadow-lg dark:border-slate-700 dark:bg-surface-2">
                  {SERVICES.map((item) => (
                    <Link
                      key={item.href}
                      href={item.href}
                      onClick={() => setOpenDropdown(null)}
                      className="block px-4 py-2 text-sm text-slate-600 hover:bg-slate-50 hover:text-brand dark:text-slate-300 dark:hover:bg-slate-800 dark:hover:text-brand-soft"
                    >
                      {item.label}
                    </Link>
                  ))}
                  <div className="mt-1 border-t border-slate-100 dark:border-slate-800"></div>
                  <Link
                    href="/services"
                    onClick={() => setOpenDropdown(null)}
                    className="flex items-center justify-between px-4 py-2 text-sm font-semibold text-brand hover:bg-slate-50 dark:hover:bg-slate-800"
                  >
                    All Services <span>&rarr;</span>
                  </Link>
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
                <div className="absolute top-full left-0 mt-2 w-64 rounded-xl border border-slate-200 bg-surface-2 py-2 shadow-lg dark:border-slate-700 dark:bg-surface-2">
                  {SOLUTIONS.map((item) => (
                    <Link
                      key={item.href}
                      href={item.href}
                      onClick={() => setOpenDropdown(null)}
                      className="block px-4 py-2 text-sm text-slate-600 hover:bg-slate-50 hover:text-brand dark:text-slate-300 dark:hover:bg-slate-800 dark:hover:text-brand-soft"
                    >
                      {item.label}
                    </Link>
                  ))}
                  <div className="mt-1 border-t border-slate-100 dark:border-slate-800"></div>
                  <Link
                    href="/solutions"
                    onClick={() => setOpenDropdown(null)}
                    className="flex items-center justify-between px-4 py-2 text-sm font-semibold text-brand hover:bg-slate-50 dark:hover:bg-slate-800"
                  >
                    All Solutions <span>&rarr;</span>
                  </Link>
                </div>
              )}
            </div>

            <Link href="/#selected-work" className={linkClass}>
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
            <Link
              href="/admin"
              className="inline-flex items-center justify-center rounded-full border border-slate-300 px-4 py-2 text-sm font-medium text-slate-900 transition-colors hover:border-brand hover:text-brand dark:border-border-default dark:text-white/80 dark:hover:border-[#9d95ff] dark:hover:text-brand-soft"
            >
              Login
            </Link>
            <Link
              href="/#contact"
              className="inline-flex items-center justify-center rounded-full bg-brand px-5 py-2 text-sm font-medium text-white transition-colors hover:bg-brand-hover"
            >
              Start Your Project
            </Link>
          </div>

          {/* Mobile controls */}
          <div className="flex items-center gap-2 lg:hidden">
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
              className="block px-4 py-2 text-sm text-slate-600 hover:text-brand dark:text-slate-300 dark:hover:text-brand-soft">
              Home
            </Link>
            <div>
              <div className="text-xs text-slate-400 dark:text-slate-500 px-4 pb-1 font-medium uppercase tracking-wider">Services</div>
              <div className="space-y-1">
                {SERVICES.map((item) => (
                  <Link key={item.href} href={item.href} onClick={() => setMobileMenuOpen(false)}
                    className="block px-4 py-2 text-sm text-slate-600 hover:text-brand dark:text-slate-300 dark:hover:text-brand-soft">
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
                    className="block px-4 py-2 text-sm text-slate-600 hover:text-brand dark:text-slate-300 dark:hover:text-brand-soft">
                    {item.label}
                  </Link>
                ))}
              </div>
            </div>
            <Link href="/#selected-work" onClick={() => setMobileMenuOpen(false)}
              className="block px-4 py-2 text-sm text-slate-600 hover:text-brand dark:text-slate-300 dark:hover:text-brand-soft">
              Our Work
            </Link>
            <Link href="/about" onClick={() => setMobileMenuOpen(false)}
              className="block px-4 py-2 text-sm text-slate-600 hover:text-brand dark:text-slate-300 dark:hover:text-brand-soft">
              About
            </Link>
            <Link href="/blog" onClick={() => setMobileMenuOpen(false)}
              className="block px-4 py-2 text-sm text-slate-600 hover:text-brand dark:text-slate-300 dark:hover:text-brand-soft">
              Blog
            </Link>
            <Link href="/#contact" onClick={() => setMobileMenuOpen(false)}
              className="block px-4 py-2 text-sm text-slate-600 hover:text-brand dark:text-slate-300 dark:hover:text-brand-soft">
              Contact
            </Link>
            <div className="pt-2 px-4">
              <Link href="/#contact" onClick={() => setMobileMenuOpen(false)}
                className="block w-full text-center rounded-full bg-brand px-5 py-2.5 text-sm font-medium text-white hover:bg-brand-hover">
                Start Your Project
              </Link>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}