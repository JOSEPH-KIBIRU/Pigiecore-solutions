"use client";

import { useEffect, useState } from "react";

const TYPE_MS = 90;
const DELETE_MS = 45;
const PAUSE_MS = 2000;

export default function RotatingWord({ words }: { words: string[] }) {
  const [state, setState] = useState({ index: 0, text: "", deleting: false });

  useEffect(() => {
    if (typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setState({ index: 0, text: words[0] ?? "", deleting: false });
      return;
    }

    let timer: ReturnType<typeof setTimeout>;
    const word = words[state.index] ?? "";

    if (!state.deleting) {
      if (state.text.length < word.length) {
        timer = setTimeout(() => {
          setState((s) => ({ ...s, text: word.slice(0, s.text.length + 1) }));
        }, TYPE_MS);
      } else {
        timer = setTimeout(() => setState((s) => ({ ...s, deleting: true })), PAUSE_MS);
      }
    } else if (state.text.length > 0) {
      timer = setTimeout(() => {
        setState((s) => ({ ...s, text: word.slice(0, s.text.length - 1) }));
      }, DELETE_MS);
    } else {
      timer = setTimeout(() => {
        setState((s) => ({
          index: (s.index + 1) % words.length,
          text: "",
          deleting: false,
        }));
      }, 200);
    }

    return () => clearTimeout(timer);
  }, [state, words]);

  return (
    <span aria-label={`Built for ${words[0]}`}>
      <span>{state.text}</span>
      <span
        aria-hidden
        className="ml-0.5 inline-block w-[2px] self-stretch bg-sky-300 opacity-80 animate-pulse"
        style={{ minHeight: "1em" }}
      >
        &nbsp;
      </span>
    </span>
  );
}
