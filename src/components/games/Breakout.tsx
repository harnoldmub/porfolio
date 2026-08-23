"use client";

import { useCallback, useEffect, useRef, useState } from "react";

import GameShell from "./GameShell";
import {
  PALETTE,
  useBestScore,
  useCanvasSize,
  useGameLoop,
  useSound,
  useTaunt,
  type GameStatus,
} from "./engine";

const ASPECT = 3 / 2;
const W = 600;                 // logical board, scaled to the canvas
const H = W / ASPECT;
const COLS = 17;
const TOP = 46;
const BRICK_H = 15;
const GAP = 3;
const PADDLE_W = 92;
const PADDLE_H = 8;
const LIVES = 3;

/** The wall spells the monogram: five columns per letter, one column of air. */
const GLYPHS = [
  ".###..#...#.#...#",
  "#...#.##.##.#...#",
  "#...#.#.#.#..#.#.",
  "#####.#...#...#..",
  "#...#.#...#...#..",
  "#...#.#...#...#..",
  "#...#.#...#...#..",
];

type Brick = { x: number; y: number; w: number; h: number; alive: boolean; hit: number; accent: boolean };

/**
 * AMY Breakout. The wall is the monogram, the ball is the only moving white,
 * and a destroyed brick contracts and fades rather than exploding.
 */
export default function Breakout({ compact = false }: { compact?: boolean }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const size = useCanvasSize(canvasRef, ASPECT);

  const [status, setStatus] = useState<GameStatus>("idle");
  const [score, setScore] = useState(0);
  const [lives, setLives] = useState(LIVES);
  const [best, submitBest] = useBestScore("breakout");
  const sound = useSound();
  const taunt = useTaunt(score, status);

  const bricks = useRef<Brick[]>([]);
  const paddleX = useRef(W / 2);
  const targetX = useRef(W / 2);
  const ball = useRef({ x: W / 2, y: H - 60, vx: 3.1, vy: -3.4 });
  const keys = useRef({ left: false, right: false });

  const buildWall = useCallback(() => {
    const cellW = (W - 80) / COLS;
    const out: Brick[] = [];
    GLYPHS.forEach((row, r) => {
      [...row].forEach((c, col) => {
        if (c !== "#") return;
        out.push({
          x: 40 + col * cellW + GAP / 2,
          y: TOP + r * (BRICK_H + GAP),
          w: cellW - GAP,
          h: BRICK_H,
          alive: true,
          hit: 0,
          // A sparse scatter of blue, so the accent reads as rhythm not noise.
          accent: (r * COLS + col) % 7 === 3,
        });
      });
    });
    bricks.current = out;
  }, []);

  const serve = useCallback(() => {
    ball.current = { x: W / 2, y: H - 60, vx: Math.random() > 0.5 ? 3.1 : -3.1, vy: -3.4 };
    paddleX.current = W / 2;
    targetX.current = W / 2;
  }, []);

  const start = useCallback(() => {
    buildWall();
    serve();
    setScore(0);
    setLives(LIVES);
    setStatus("playing");
  }, [buildWall, serve]);

  // --- input -------------------------------------------------------------
  useEffect(() => {
    const onKey = (e: KeyboardEvent, down: boolean) => {
      if (["ArrowLeft", "ArrowRight", "a", "d", "q"].includes(e.key)) e.preventDefault();
      if (e.key === "ArrowLeft" || e.key === "a" || e.key === "q") keys.current.left = down;
      if (e.key === "ArrowRight" || e.key === "d") keys.current.right = down;
      if (down && e.key === " " && status !== "playing") start();
    };
    const dn = (e: KeyboardEvent) => onKey(e, true);
    const up = (e: KeyboardEvent) => onKey(e, false);
    window.addEventListener("keydown", dn, { passive: false });
    window.addEventListener("keyup", up);
    return () => {
      window.removeEventListener("keydown", dn);
      window.removeEventListener("keyup", up);
    };
  }, [status, start]);

  useEffect(() => {
    const el = canvasRef.current;
    if (!el) return;
    const move = (clientX: number) => {
      const r = el.getBoundingClientRect();
      targetX.current = ((clientX - r.left) / r.width) * W;
    };
    const onPointer = (e: PointerEvent) => move(e.clientX);
    const onTouch = (e: TouchEvent) => {
      e.preventDefault();               // the page must not scroll mid-rally
      move(e.touches[0].clientX);
    };
    el.addEventListener("pointermove", onPointer, { passive: true });
    el.addEventListener("touchmove", onTouch, { passive: false });
    el.addEventListener("touchstart", onTouch, { passive: false });
    return () => {
      el.removeEventListener("pointermove", onPointer);
      el.removeEventListener("touchmove", onTouch);
      el.removeEventListener("touchstart", onTouch);
    };
  }, []);

  // --- simulation --------------------------------------------------------
  useGameLoop(
    useCallback(() => {
      bricks.current.forEach((b) => {
        if (!b.alive && b.hit < 1) b.hit = Math.min(1, b.hit + 0.12);
      });
      if (status !== "playing") return;

      if (keys.current.left) targetX.current -= 7;
      if (keys.current.right) targetX.current += 7;
      targetX.current = Math.max(PADDLE_W / 2, Math.min(W - PADDLE_W / 2, targetX.current));
      paddleX.current += (targetX.current - paddleX.current) * 0.28;

      const b = ball.current;
      b.x += b.vx;
      b.y += b.vy;

      if (b.x < 6) { b.x = 6; b.vx = Math.abs(b.vx); sound.play("hit"); }
      if (b.x > W - 6) { b.x = W - 6; b.vx = -Math.abs(b.vx); sound.play("hit"); }
      if (b.y < 6) { b.y = 6; b.vy = Math.abs(b.vy); sound.play("hit"); }

      // Paddle: the contact point steers the rebound, so rallies stay winnable.
      const py = H - 26;
      if (b.vy > 0 && b.y > py - 6 && b.y < py + PADDLE_H + 6) {
        const dx = b.x - paddleX.current;
        if (Math.abs(dx) <= PADDLE_W / 2 + 5) {
          const speed = Math.min(7.4, Math.hypot(b.vx, b.vy) * 1.02);
          const angle = (dx / (PADDLE_W / 2)) * 1.05 - Math.PI / 2;
          b.vx = Math.cos(angle) * speed;
          b.vy = Math.sin(angle) * speed;
          b.y = py - 6;
          sound.play("hit");
        }
      }

      for (const brick of bricks.current) {
        if (!brick.alive) continue;
        if (b.x < brick.x - 5 || b.x > brick.x + brick.w + 5) continue;
        if (b.y < brick.y - 5 || b.y > brick.y + brick.h + 5) continue;
        brick.alive = false;
        // Bounce off the shallower axis of penetration.
        const overlapX = Math.min(Math.abs(b.x - brick.x), Math.abs(b.x - brick.x - brick.w));
        const overlapY = Math.min(Math.abs(b.y - brick.y), Math.abs(b.y - brick.y - brick.h));
        if (overlapX < overlapY) b.vx = -b.vx;
        else b.vy = -b.vy;
        sound.play("point");
        setScore((s) => s + (brick.accent ? 3 : 1));
        break;
      }

      if (bricks.current.every((brick) => !brick.alive)) {
        buildWall();
        serve();
        return;
      }

      if (b.y > H + 12) {
        setLives((l) => {
          const left = l - 1;
          if (left <= 0) {
            sound.play("over");
            setStatus("over");
            setScore((s) => { submitBest(s); return s; });
          } else serve();
          return Math.max(0, left);
        });
      }
    }, [status, sound, buildWall, serve, submitBest]),
    status !== "idle",
  );

  // --- render ------------------------------------------------------------
  const draw = useCallback(() => {
    const ctx = canvasRef.current?.getContext("2d");
    if (!ctx || !size.width) return;
    const { width, dpr } = size;
    const s = width / W;
    ctx.setTransform(dpr * s, 0, 0, dpr * s, 0, 0);

    ctx.fillStyle = PALETTE.ink;
    ctx.fillRect(0, 0, W, H);

    for (const brick of bricks.current) {
      if (!brick.alive && brick.hit >= 1) continue;
      // Destroyed bricks contract toward their centre and fade out.
      const k = brick.alive ? 0 : brick.hit;
      const inset = k * brick.h * 0.5;
      ctx.globalAlpha = brick.alive ? 1 : 1 - k;
      ctx.fillStyle = brick.accent ? PALETTE.blue : PALETTE.paper;
      ctx.fillRect(brick.x + inset, brick.y + inset * 0.6, brick.w - inset * 2, brick.h - inset * 1.2);
    }
    ctx.globalAlpha = 1;

    ctx.fillStyle = PALETTE.paper;
    ctx.fillRect(paddleX.current - PADDLE_W / 2, H - 26, PADDLE_W, PADDLE_H);

    ctx.beginPath();
    ctx.arc(ball.current.x, ball.current.y, 5, 0, Math.PI * 2);
    ctx.fill();

    ctx.strokeStyle = PALETTE.line;
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.moveTo(0, H - 14.5);
    ctx.lineTo(W, H - 14.5);
    ctx.stroke();
  }, [size]);

  useEffect(draw, [draw, status]);
  useGameLoop(draw, status !== "idle");

  return (
    <GameShell
      title="AMY Breakout"
      score={score}
      best={best}
      extra={{ label: "Vies", value: String(lives).padStart(2, "0") }}
      taunt={taunt}
      status={status}
      soundOn={sound.on}
      onToggleSound={sound.toggle}
      onStart={start}
      hint="Souris ou flèches — glissez le doigt sur mobile."
      canvasRef={canvasRef}
      aspect={ASPECT}
      compact={compact}
    />
  );
}
