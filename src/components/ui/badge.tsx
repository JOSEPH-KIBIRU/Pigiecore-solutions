import { cn } from "@/lib/cn";

type Tone = "brand" | "neutral" | "dark";

export default function Badge({
  children,
  tone = "brand",
  className,
}: {
  children: React.ReactNode;
  tone?: Tone;
  className?: string;
}) {
  const tones: Record<Tone, string> = {
    brand: "border-brand/25 bg-brand/10 text-brand",
    neutral: "border-border-default bg-surface-muted text-text-2",
    dark: "border-white/15 bg-white/5 text-white",
  };
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full border px-4 py-1.5 text-[var(--text-eyebrow)] font-semibold uppercase tracking-[0.14em]",
        tones[tone],
        className
      )}
    >
      {children}
    </span>
  );
}
