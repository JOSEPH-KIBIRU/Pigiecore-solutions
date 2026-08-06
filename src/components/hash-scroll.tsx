"use client";

import { useEffect } from "react";

/**
 * Reliably scrolls to a URL hash (#section) on any page, including after
 * cross-page navigation, accounting for the fixed navbar offset.
 */
export default function HashScroll() {
  useEffect(() => {
    function scrollToHash() {
      const hash = window.location.hash;
      if (!hash || hash.length < 2) return;
      const id = decodeURIComponent(hash.slice(1));
      
      // Retry a few times to allow client-side sections to render.
      let attempts = 0;
      function tryScroll() {
        const el = document.getElementById(id);
        if (el) {
          // --- THE FIX: Manual Offset Calculation ---
          const navbarOffset = 80; // 64px (h-16 navbar) + 16px breathing room
          
          // Get element's position relative to the viewport, add how far we've scrolled down the page, then subtract the navbar height
          const elementPosition = el.getBoundingClientRect().top;
          const offsetPosition = elementPosition + window.scrollY - navbarOffset;

          window.scrollTo({
            top: offsetPosition,
            behavior: "smooth"
          });
          // -----------------------------------------
          return;
        }
        attempts += 1;
        if (attempts < 20) setTimeout(tryScroll, 100);
      }
      tryScroll();
    }

    scrollToHash();
    window.addEventListener("hashchange", scrollToHash);
    return () => window.removeEventListener("hashchange", scrollToHash);
  }, []);

  return null;
}