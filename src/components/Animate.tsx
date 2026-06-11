"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import { animate, motion, useInView, useReducedMotion } from "framer-motion";

const EASE = [0.22, 1, 0.36, 1] as const;
const VIEWPORT = { once: true, margin: "0px 0px -70px 0px" } as const;

type RevealProps = {
  children: ReactNode;
  className?: string;
  delay?: number;
  y?: number;
  duration?: number;
};

export function Reveal({ children, className, delay = 0, y = 26, duration = 0.8 }: RevealProps) {
  const reduce = useReducedMotion();

  return (
    <motion.div
      className={className}
      initial={reduce ? false : { opacity: 0, y, filter: "blur(6px)" }}
      whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
      viewport={VIEWPORT}
      transition={{ duration, delay, ease: EASE }}
    >
      {children}
    </motion.div>
  );
}

type StaggerProps = {
  children: ReactNode;
  className?: string;
  delay?: number;
  gap?: number;
};

export function Stagger({ children, className, delay = 0, gap = 0.1 }: StaggerProps) {
  const reduce = useReducedMotion();

  return (
    <motion.div
      className={className}
      initial={reduce ? false : "hidden"}
      whileInView="visible"
      viewport={VIEWPORT}
      variants={{
        hidden: {},
        visible: { transition: { staggerChildren: gap, delayChildren: delay } },
      }}
    >
      {children}
    </motion.div>
  );
}

type StaggerItemProps = {
  children: ReactNode;
  className?: string;
  y?: number;
};

export function StaggerItem({ children, className, y = 28 }: StaggerItemProps) {
  return (
    <motion.div
      className={className}
      variants={{
        hidden: { opacity: 0, y, filter: "blur(6px)" },
        visible: {
          opacity: 1,
          y: 0,
          filter: "blur(0px)",
          transition: { duration: 0.7, ease: EASE },
        },
      }}
    >
      {children}
    </motion.div>
  );
}

type WordRevealProps = {
  text: string;
  delay?: number;
};

export function WordReveal({ text, delay = 0 }: WordRevealProps) {
  const reduce = useReducedMotion();
  const words = text.split(" ");

  if (reduce) {
    return <span>{text}</span>;
  }

  return (
    <span aria-label={text} role="text">
      {words.map((word, index) => (
        <span
          key={`${word}-${index}`}
          className="inline-block overflow-hidden align-top pb-[0.1em] -mb-[0.1em]"
          aria-hidden
        >
          <motion.span
            className="inline-block"
            initial={{ y: "115%", opacity: 0 }}
            animate={{ y: "0%", opacity: 1 }}
            transition={{ duration: 0.75, delay: delay + index * 0.09, ease: EASE }}
          >
            {word}
            {index < words.length - 1 ? " " : null}
          </motion.span>
        </span>
      ))}
    </span>
  );
}

type CountUpProps = {
  value: string;
  className?: string;
  duration?: number;
};

export function CountUp({ value, className, duration = 1.6 }: CountUpProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "0px 0px -40px 0px" });
  const reduce = useReducedMotion();
  const match = /^(\d+)(.*)$/.exec(value);
  const [display, setDisplay] = useState(match ? `0${match[2]}` : value);

  useEffect(() => {
    if (!match || !inView) return;

    const target = Number.parseInt(match[1], 10);
    const suffix = match[2];

    if (reduce) {
      setDisplay(value);
      return;
    }

    const controls = animate(0, target, {
      duration,
      ease: EASE,
      onUpdate: (latest) => setDisplay(`${Math.round(latest)}${suffix}`),
    });

    return () => controls.stop();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [inView, reduce]);

  return (
    <span ref={ref} className={className}>
      {display}
    </span>
  );
}
