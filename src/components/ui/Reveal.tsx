"use client";

import type { ElementType, ReactNode } from "react";

import { useReveal } from "@/lib/useReveal";
import { cn } from "@/lib/utils";

type Props = {
  children: ReactNode;
  /** Above-the-fold blocks reveal on mount instead of on scroll. */
  immediate?: boolean;
  /** Seconds. */
  delay?: number;
  className?: string;
  amount?: number;
  as?: ElementType;
};

export default function Reveal({ children, delay = 0, className, amount, as, immediate }: Props) {
  const Tag = (as ?? "div") as ElementType;
  const ref = useReveal<HTMLElement>({ amount, immediate });

  return (
    <Tag
      ref={ref}
      className={cn("reveal", className)}
      style={delay ? ({ ["--reveal-delay" as string]: `${delay}s` }) : undefined}
    >
      {children}
    </Tag>
  );
}
