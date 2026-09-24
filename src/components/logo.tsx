interface LogoProps {
  size?: number;
  className?: string;
  accentColor?: string;
}

/**
 * Pigiecore "P" mark. The solid shape uses `currentColor` so it adapts to
 * light/dark surfaces; the accent node uses the brand blue.
 */
export default function Logo({
  size = 40,
  className = "",
  accentColor = "#0056D2",
}: LogoProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 320 320"
      role="img"
      aria-label="Pigiecore Solutions"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <path
        fill="currentColor"
        fillRule="evenodd"
        clipRule="evenodd"
        d="M0 0 L200 0 C255 0 300 45 300 100 C300 155 255 200 200 200 L120 200 L120 300 L0 300 Z M120 60 L180 60 C203 60 220 77 220 100 C220 123 203 140 180 140 L120 140 Z"
      />
      <circle cx="260" cy="140" r="18" fill={accentColor} />
    </svg>
  );
}
