import { cn } from "@/lib/utils";

/**
 * CSS-only infinite marquee. The track is rendered twice and translated by
 * -50%, so the loop is seamless without measuring anything at runtime.
 */
export default function Marquee({
  items,
  duration = 46,
  className,
  itemClassName,
  separator = "/",
}: {
  items: readonly string[];
  duration?: number;
  className?: string;
  itemClassName?: string;
  separator?: string;
}) {
  const track = (
    <div className="flex shrink-0 items-center">
      {items.map((item, i) => (
        <span key={item + i} className={cn("flex items-center whitespace-nowrap", itemClassName)}>
          {item}
          <span aria-hidden className="px-[0.6em] text-grey/50">
            {separator}
          </span>
        </span>
      ))}
    </div>
  );

  return (
    <div className={cn("marquee-host overflow-hidden", className)}>
      <div className="marquee" style={{ ["--marquee-dur" as string]: `${duration}s` }}>
        {track}
        <div aria-hidden>{track}</div>
      </div>
    </div>
  );
}
