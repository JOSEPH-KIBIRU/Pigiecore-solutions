"use client";

import { useEffect } from "react";

/**
 * Reliably scrolls to a URL hash (#section) on any page, including after
 * cross-page navigation, where Next's built-in hash handling can be flaky
 * because the target element may not be rendered yet when it tries to scroll.
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
          el.scrollIntoView({ behavior: "smooth", block: "start" });
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