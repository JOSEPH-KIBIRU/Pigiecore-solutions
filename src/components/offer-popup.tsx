"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { X, Sparkles, Megaphone } from "lucide-react";

interface Offer {
  id: number;
  title: string;
  body: string | null;
  button_text: string | null;
  button_url: string | null;
  color_from: string;
  color_to: string;
}

const SHOW_DELAY = 3500;
const DISMISSED_KEY = "pigiecore_offer_dismissed";

export default function OfferPopup() {
  const [offer, setOffer] = useState<Offer | null>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const res = await fetch("/api/offers", { cache: "no-store" });
        if (!res.ok) return;
        const data: Offer[] = await res.json();
        if (!data.length) return;
        const top = data[0];
        try {
          if (sessionStorage.getItem(DISMISSED_KEY)) return;
        } catch {
          /* ignore storage */
        }
        if (cancelled) return;
        setOffer(top);
        setTimeout(() => setVisible(true), SHOW_DELAY);
      } catch {
        // ignore network errors
      }
    })();
    return () => {
      cancelled = true;
    };
  }, []);

  function dismiss() {
    setVisible(false);
    try {
      sessionStorage.setItem(DISMISSED_KEY, "1");
    } catch {
      // ignore storage
    }
  }

  if (!offer || !visible) return null;

  const href = offer.button_url || "/#contact";
  const external = /^https?:\/\//i.test(href);

  return (
    <div className="fixed bottom-6 left-6 z-[70] max-w-sm w-[calc(100vw-3rem)] sm:w-96 animate-fade-in-up"
      role="dialog" aria-label="Special offer">
      <div
        className="relative rounded-2xl shadow-2xl p-6 text-white overflow-hidden"
        style={{ background: `linear-gradient(135deg, ${offer.color_from}, ${offer.color_to})` }}
      >
        <div
          className="absolute inset-0 opacity-30"
          style={{ background: "radial-gradient(circle at 20% 0%, rgba(255,255,255,0.5), transparent 60%)" }}
        />
        <button
          onClick={dismiss}
          aria-label="Close offer"
          className="absolute top-3 right-3 z-10 w-7 h-7 rounded-full bg-black/20 hover:bg-black/30 flex items-center justify-center transition-colors"
        >
          <X className="w-4 h-4" />
        </button>

        <div className="relative">
          <div className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-white/85">
            <Megaphone className="w-4 h-4 animate-pulse-glow" />
            Special Offer
          </div>
          <div className="mt-2 text-lg font-bold leading-tight">{offer.title}</div>
          {offer.body && <div className="mt-2 text-sm text-white/90 leading-relaxed">{offer.body}</div>}
          {offer.button_text && (
            <Link
              href={href}
              {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
              onClick={dismiss}
              className="inline-flex items-center gap-2 mt-4 rounded-full bg-white text-slate-900 px-5 py-2.5 text-sm font-semibold shadow-lg transition-transform hover:scale-[1.03]"
            >
              <Sparkles className="w-4 h-4" /> {offer.button_text}
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}