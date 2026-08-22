"use client";

import { useEffect, useRef, useState } from "react";

/**
 * A single dot that follows the pointer and swells into a labelled disc over
 * anything carrying `data-cursor`. Pointer devices only — on touch the whole
 * component unmounts, so it costs nothing on mobile.
 */
export default function Cursor() {
  const dot = useRef<HTMLDivElement>(null);
  const label = useRef<HTMLDivElement>(null);
  const [enabled, setEnabled] = useState(false);
  const [text, setText] = useState("");

  useEffect(() => {
    const fine = window.matchMedia("(hover: hover) and (pointer: fine)");
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)");
    const sync = () => setEnabled(fine.matches && !reduced.matches);
    sync();
    fine.addEventListener("change", sync);
    reduced.addEventListener("change", sync);
    return () => {
      fine.removeEventListener("change", sync);
      reduced.removeEventListener("change", sync);
    };
  }, []);

  useEffect(() => {
    if (!enabled) return;
    const target = { x: window.innerWidth / 2, y: window.innerHeight / 2 };
    const pos = { ...target };
    let frame = 0;

    const onMove = (event: PointerEvent) => {
      target.x = event.clientX;
      target.y = event.clientY;
      if (dot.current) dot.current.style.opacity = "1";
    };

    const onOver = (event: PointerEvent) => {
      const hit = (event.target as Element | null)?.closest?.("[data-cursor]") as HTMLElement | null;
      const value = hit?.dataset.cursor ?? "";
      setText(value === "hover" ? "" : value);
      if (dot.current) {
        dot.current.dataset.state = !hit ? "" : value === "hover" ? "hover" : "label";
      }
      if (label.current) label.current.dataset.visible = String(Boolean(value) && value !== "hover");
    };

    const onLeave = () => {
      if (dot.current) dot.current.style.opacity = "0";
    };

    const tick = () => {
      pos.x += (target.x - pos.x) * 0.18;
      pos.y += (target.y - pos.y) * 0.18;
      const transform = `translate3d(${pos.x}px, ${pos.y}px, 0)`;
      if (dot.current) dot.current.style.transform = transform;
      if (label.current) label.current.style.transform = transform;
      frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);

    window.addEventListener("pointermove", onMove, { passive: true });
    window.addEventListener("pointerover", onOver, { passive: true });
    document.addEventListener("pointerleave", onLeave);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerover", onOver);
      document.removeEventListener("pointerleave", onLeave);
    };
  }, [enabled]);

  if (!enabled) return null;

  return (
    <>
      <div ref={dot} className="cursor-dot" style={{ opacity: 0 }} aria-hidden />
      <div ref={label} className="cursor-label" aria-hidden>
        {text}
      </div>
    </>
  );
}
