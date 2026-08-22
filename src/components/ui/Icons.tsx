type IconProps = { className?: string };

const base = {
  viewBox: "0 0 16 16",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.4,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
  "aria-hidden": true,
};

/** → */
export const ArrowRight = ({ className }: IconProps) => (
  <svg {...base} className={className} width="16" height="16">
    <path d="M2.5 8h11M9 3.5 13.5 8 9 12.5" />
  </svg>
);

/** ← */
export const ArrowLeft = ({ className }: IconProps) => (
  <svg {...base} className={className} width="16" height="16">
    <path d="M13.5 8h-11M7 3.5 2.5 8 7 12.5" />
  </svg>
);

/** ↗ */
export const ArrowUpRight = ({ className }: IconProps) => (
  <svg {...base} className={className} width="16" height="16">
    <path d="M4.5 11.5 11.5 4.5M5.5 4.5h6v6" />
  </svg>
);

/** ↓ */
export const ArrowDown = ({ className }: IconProps) => (
  <svg {...base} className={className} width="16" height="16">
    <path d="M8 2.5v11M3.5 9 8 13.5 12.5 9" />
  </svg>
);
