"use client";

import { useEffect, useState } from "react";
import { ArrowUp } from "lucide-react";

export default function BackToTop() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setVisible(window.scrollY > 400);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  if (!visible) return null;

  return (
    <button
      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      aria-label="Back to top"
      className="fixed bottom-24 right-6 z-[60] w-12 h-12 rounded-full bg-gradient-to-br from-brand to-brand-hover text-white shadow-lg shadow-brand/30 flex items-center justify-center transition-all hover:scale-110 hover:shadow-xl animate-fade-in-up"
    >
      <ArrowUp className="w-5 h-5" />
    </button>
  );
}