import { stackMarks } from "@/data/profile";

/**
 * The technology marks, forced monochrome. Each SVG is used as a CSS mask so
 * the logo takes the page's ink colour instead of dragging a dozen brand
 * palettes into the design — and hovering restores full opacity one at a time.
 */
export default function StackMarks({ className }: { className?: string }) {
  return (
    <ul className={className}>
      {stackMarks.map((mark) => (
        <li key={mark.name} className="group flex items-center gap-3">
          <span
            aria-hidden
            className="h-5 w-5 shrink-0 bg-paper/45 transition-colors duration-300 group-hover:bg-paper"
            style={{
              maskImage: `url(${mark.icon})`,
              WebkitMaskImage: `url(${mark.icon})`,
              maskRepeat: "no-repeat",
              WebkitMaskRepeat: "no-repeat",
              maskPosition: "center",
              WebkitMaskPosition: "center",
              maskSize: "contain",
              WebkitMaskSize: "contain",
            }}
          />
          <span className="meta transition-colors duration-300 group-hover:text-paper">
            {mark.name}
          </span>
        </li>
      ))}
    </ul>
  );
}
