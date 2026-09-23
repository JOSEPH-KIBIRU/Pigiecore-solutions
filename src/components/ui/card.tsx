import { cn } from "@/lib/cn";

export function Card({
  children,
  className,
  interactive = false,
}: {
  children: React.ReactNode;
  className?: string;
  interactive?: boolean;
}) {
  return (
    <div
      className={cn(
        "rounded-card border border-border-default bg-surface-3 p-6",
        interactive &&
          "transition-all duration-300 hover:-translate-y-1 hover:border-border-strong hover:shadow-card",
        className
      )}
    >
      {children}
    </div>
  );
}
