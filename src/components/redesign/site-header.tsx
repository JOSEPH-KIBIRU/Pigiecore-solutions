"use client";

import { useState } from "react";
import { ArrowUpRight, Menu } from "lucide-react";
import { MobileMenu } from "./mobile-menu";

const navItems = [
  ["Services", "#services"],
  ["Solutions", "#solutions"],
  ["Process", "#process"],
  ["Work", "#work"],
  ["About", "#about"],
] as const;

export function SiteHeader() {
  const [open, setOpen] = useState(false);

  return (
    <header className="site-header">
      <div className="header-inner">
        <a className="brand" href="#top" onClick={() => setOpen(false)} aria-label="Pigiecore home">
          <span className="brand-mark">P</span>
          <span>Pigiecore Solutions</span>
        </a>

        <nav className="desktop-nav" aria-label="Primary navigation">
          {navItems.map(([label, href]) => (
            <a key={href} href={href} className="nav-link">
              {label}
            </a>
          ))}
        </nav>

        <a className="header-cta" href="#contact">
          Start a project
          <ArrowUpRight size={15} strokeWidth={2.2} />
        </a>

        <button
          className="mobile-menu-button"
          onClick={() => setOpen(true)}
          aria-label="Open navigation"
        >
          <Menu size={21} />
        </button>
      </div>

      <MobileMenu open={open} onClose={() => setOpen(false)} />
    </header>
  );
}
