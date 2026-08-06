"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import * as DropdownMenu from "@radix-ui/react-dropdown-menu";
import { ChevronDown, Menu, X, User, ArrowRight } from "lucide-react";
import Logo from "@/components/logo";
import ThemeToggle from "@/components/theme-toggle";

const SERVICE_ITEMS = [
  { label: "Real Estate Dashboard", value: "real-estate", href: "#services" },
  { label: "Website Development", value: "website", href: "#services" },
  { label: "Logistics & Fleet", value: "logistics", href: "#services" },
  { label: "Salon & Barber Booking", value: "salon", href: "#services" },
  { label: "School Management", value: "school", href: "#services" },
  { label: "Hospital Management", value: "hospital", href: "#services" },
];

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    if (!mobileMenuOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setMobileMenuOpen(false);
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [mobileMenuOpen]);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 border-b border-slate-200/70 bg-white/80 backdrop-blur-xl dark:border-slate-800/70 dark:bg-slate-950/80">
      <div className="w-full px-5 sm:px-8 lg:px-12">
        <div className="flex items-center justify-between h-16 gap-6">
          <Link href="/" aria-label="Pigiecore Solutions — Home" className="shrink-0">
            <Logo size={38} />
          </Link>

          <div className="hidden md:flex items-center gap-7">
            <DropdownMenu.Root>
              <DropdownMenu.Trigger asChild>
                <button className="inline-flex items-center gap-1 text-sm font-medium text-slate-700 hover:text-sky-500 transition-colors dark:text-slate-200 dark:hover:text-sky-400 outline-none">
                  Services
                  <ChevronDown className="w-3.5 h-3.5" />
                </button>
              </DropdownMenu.Trigger>
              <DropdownMenu.Portal>
                <DropdownMenu.Content
                  align="start"
                  sideOffset={10}
                  className="z-[80] w-64 rounded-2xl border border-slate-200 bg-white p-2 shadow-xl dark:border-slate-700 dark:bg-slate-900"
                >
                  {SERVICE_ITEMS.map((item) => (
                    <DropdownMenu.Item
                      key={item.value}
                      asChild
                      className="cursor-pointer rounded-xl px-4 py-2.5 text-sm text-slate-700 outline-none transition-colors hover:bg-sky-50 hover:text-sky-600 data-[highlighted]:bg-sky-50 data-[highlighted]:text-sky-600 dark:text-slate-200 dark:hover:bg-slate-800 dark:hover:text-sky-400 dark:data-[highlighted]:bg-slate-800 dark:data-[highlighted]:text-sky-400"
                    >
                      <Link href={item.href}>{item.label}</Link>
                    </DropdownMenu.Item>
                  ))}
                </DropdownMenu.Content>
              </DropdownMenu.Portal>
            </DropdownMenu.Root>
            <Link
              href="/about"
              className="text-sm font-medium text-slate-700 hover:text-sky-500 transition-colors dark:text-slate-200 dark:hover:text-sky-400"
            >
              About
            </Link>
            <Link
              href="/blog"
              className="text-sm font-medium text-slate-700 hover:text-sky-500 transition-colors dark:text-slate-200 dark:hover:text-sky-400"
            >
              Insights
            </Link>
            <Link
              href="/faq"
              className="text-sm font-medium text-slate-700 hover:text-sky-500 transition-colors dark:text-slate-200 dark:hover:text-sky-400"
            >
              FAQ
            </Link>
          </div>

          <div className="hidden md:flex items-center gap-3">
            <ThemeToggle />
            <Link
              href="/admin"
              className="inline-flex items-center gap-1.5 rounded-full border border-slate-300 px-4 py-2 text-sm font-medium text-slate-700 transition-colors hover:border-sky-500 hover:text-sky-500 dark:border-slate-600 dark:text-slate-200 dark:hover:border-sky-400 dark:hover:text-sky-400"
            >
              <User className="w-4 h-4" /> Login
            </Link>
            <Link
              href="/#contact"
              className="inline-flex items-center gap-1.5 rounded-full bg-sky-500 px-5 py-2 text-sm font-semibold text-white shadow-sm shadow-sky-500/25 transition-all hover:bg-sky-600 hover:shadow-md hover:shadow-sky-500/30"
            >
              Book a Demo <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="flex items-center gap-2 md:hidden">
            <ThemeToggle />
            <Link
              href="/admin"
              aria-label="Admin login"
              className="p-2 rounded-lg text-slate-600 dark:text-slate-300"
            >
              <User className="w-5 h-5" />
            </Link>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Toggle menu"
              className="p-2 rounded-lg text-slate-700 dark:text-slate-200"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {mobileMenuOpen && (
        <div className="md:hidden border-t border-slate-200 dark:border-slate-800 bg-white/95 backdrop-blur-xl dark:bg-slate-950/95 py-4 space-y-2 max-h-[calc(100vh-4rem)] overflow-y-auto">
          <div className="space-y-1">
            <div className="text-xs text-slate-400 dark:text-slate-500 px-4 pb-1 font-medium uppercase tracking-wider">
              Services
            </div>
            {SERVICE_ITEMS.map((item) => (
              <Link
                key={item.value}
                href={item.href}
                onClick={() => setMobileMenuOpen(false)}
                className="block px-4 py-2 text-sm text-slate-700 hover:text-sky-500 dark:text-slate-200 dark:hover:text-sky-400"
              >
                {item.label}
              </Link>
            ))}
          </div>
          <Link
            href="/about"
            onClick={() => setMobileMenuOpen(false)}
            className="block px-4 py-2 text-sm text-slate-700 hover:text-sky-500 dark:text-slate-200 dark:hover:text-sky-400"
          >
            About
          </Link>
          <Link
            href="/blog"
            onClick={() => setMobileMenuOpen(false)}
            className="block px-4 py-2 text-sm text-slate-700 hover:text-sky-500 dark:text-slate-200 dark:hover:text-sky-400"
          >
            Insights
          </Link>
          <Link
            href="/faq"
            onClick={() => setMobileMenuOpen(false)}
            className="block px-4 py-2 text-sm text-slate-700 hover:text-sky-500 dark:text-slate-200 dark:hover:text-sky-400"
          >
            FAQ
          </Link>
          <Link
            href="/#contact"
            onClick={() => setMobileMenuOpen(false)}
            className="block px-4 py-2 text-sm text-slate-700 hover:text-sky-500 dark:text-slate-200 dark:hover:text-sky-400"
          >
            Contact
          </Link>
          <div className="pt-2 px-4">
            <Link
              href="/#contact"
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center justify-center gap-1.5 rounded-full bg-sky-500 px-5 py-2.5 text-sm font-semibold text-white hover:bg-sky-600"
            >
              Book a Demo <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
}