"use client";

import type { ReactNode } from "react";

import { useReveal } from "@/lib/useReveal";
import { cn } from "@/lib/utils";

type Props = {
  lines: readonly ReactNode[];
  className?: string;
  lineClassName?: string;
  /** Seconds before the first line moves. */
  delay?: number;
  stagger?: number;
  /** Above-the-fold headings reveal on mount instead of on scroll. */
  immediate?: boolean;
  /**
   * Cap the size so the longest line still fits the column. Without it the
   * mega scale only works up to about eleven characters, and any longer line
   * silently wraps — so editing the copy could break the composition.
   */
  fit?: boolean;
};

/** Archivo's average uppercase advance, measured at these tracking values. */
const AVG_ADVANCE = 0.6;
/**
 * Usable width inside `.shell`. It tracks the viewport until the shell hits
 * its 1680px ceiling, after which the gutters cap at 4.5rem and the column
 * stops growing — so the fit has to stop growing with it.
 */
const COLUMN = "min(90vw, 1536px)";

/**
 * Each line rises out of its own clipping mask. The text is real text in the
 * DOM at all times — selectable, readable by assistive tech, and indexable.
 */
export default function RevealLines({
  lines,
  className,
  lineClassName,
  delay = 0,
  stagger = 0.09,
  immediate = false,
  fit = false,
}: Props) {
  const ref = useReveal<HTMLSpanElement>({ immediate, amount: 0.3 });

  const longest = fit
    ? Math.max(...lines.map((line) => (typeof line === "string" ? line.length : 0)), 1)
    : 0;

  return (
    <span
      ref={ref}
      className={cn("block", className)}
      data-reveal-group
      style={
        fit
          ? {
              fontSize: `min(1em, calc(${COLUMN} / ${(AVG_ADVANCE * longest).toFixed(2)}))`,
            }
          : undefined
      }
    >
      {lines.map((line, i) => (
        <span
          key={i}
          className="line-mask"
          data-reveal-child
          style={{ ["--reveal-delay" as string]: `${delay + i * stagger}s` }}
        >
          <span className={lineClassName}>{line}</span>
        </span>
      ))}
    </span>
  );
}
