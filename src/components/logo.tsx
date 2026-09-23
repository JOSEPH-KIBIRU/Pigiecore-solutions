export default function Logo({
  size = 40,
  className = "",
}: {
  size?: number;
  className?: string;
}) {
  const fontSize = Math.round(size * 0.36);
  return (
    <div
      className={`relative shrink-0 ${className}`}
      style={{ width: size, height: size }}
      aria-label="Pigiecore Solutions"
      role="img"
    >
      <div className="absolute inset-0 rounded-full border-[3px] border-brand/25 dark:border-border-default" />
      <div className="absolute inset-0 rounded-full border-[3px] border-transparent border-t-brand border-r-brand-soft animate-spin [animation-duration:2.4s]" />
      <div className="absolute inset-0 flex items-center justify-center">
        <span
          className="font-bold text-brand dark:text-white tracking-tight select-none"
          style={{ fontSize }}
        >
          PG
        </span>
      </div>
    </div>
  );
}