"use client";

import { useEffect, useRef } from "react";
import { ArrowUpRight, X } from "lucide-react";

const navItems = [
  ["Services", "#services"],
  ["Solutions", "#solutions"],
  ["Process", "#process"],
  ["Work", "#work"],
  ["About", "#about"],
] as const;

interface MobileMenuProps {
  open: boolean;
  onClose: () => void;
}

export function MobileMenu({ open, onClose }: MobileMenuProps) {
  const panelRef = useRef<HTMLDivElement>(null);
  const previouslyFocusedRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    if (open) {
      previouslyFocusedRef.current = document.activeElement as HTMLElement;
      document.body.style.setProperty("overflow", "hidden");
      document.body.style.setProperty("position", "fixed");
      document.body.style.setProperty("width", "100%");

      const handleKeyDown = (e: KeyboardEvent) => {
        if (e.key === "Escape") {
          onClose();
        }
        if (e.key === "Tab") {
          if (!panelRef.current) return;
          const focusable = panelRef.current.querySelectorAll<HTMLElement>(
            'a[href], button:not([disabled])'
          );
          if (focusable.length === 0) return;
          const first = focusable[0];
          const last = focusable[focusable.length - 1];
          if (e.shiftKey && document.activeElement === first) {
            e.preventDefault();
            last.focus();
          } else if (!e.shiftKey && document.activeElement === last) {
            e.preventDefault();
            first.focus();
          }
        }
      };

      document.addEventListener("keydown", handleKeyDown);
      return () => {
        document.removeEventListener("keydown", handleKeyDown);
        document.body.style.removeProperty("overflow");
        document.body.style.removeProperty("position");
        document.body.style.removeProperty("width");
        previouslyFocusedRef.current?.focus();
      };
    }
  }, [open, onClose]);

  useEffect(() => {
    if (open) {
      const timer = setTimeout(() => {
        panelRef.current?.querySelector("a")?.focus();
      }, 100);
      return () => clearTimeout(timer);
    }
  }, [open]);

  return (
    <>
      <div
        className={`mobile-menu-backdrop ${open ? "is-open" : ""}`}
        onClick={onClose}
        aria-hidden="true"
      />
      <div
        className={`mobile-menu-overlay ${open ? "is-open" : ""}`}
        role="dialog"
        aria-modal="true"
        aria-label="Navigation menu"
        ref={panelRef}
      >
        <button
          className="mobile-menu-close"
          onClick={onClose}
          aria-label="Close navigation"
        >
          <X size={22} />
        </button>

        <nav className="mobile-menu-nav" aria-label="Primary">
          <ul>
            {navItems.map(([label, href], index) => (
              <li key={href}>
                <a
                  href={href}
                  onClick={onClose}
                  style={{ ["--stagger" as string]: `${index * 0.08}s` }}
                >
                  {label}
                  <ArrowUpRight size={16} />
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <a
          href="#contact"
          className="mobile-menu-cta"
          onClick={onClose}
        >
          Start a project
          <ArrowUpRight size={16} />
        </a>
      </div>
    </>
  );
}
