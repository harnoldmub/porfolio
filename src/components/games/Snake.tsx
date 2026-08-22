"use client";

import { useCallback, useEffect, useRef, useState } from "react";

import GameShell from "./GameShell";
import {
  PALETTE,
  useBestScore,
  useCanvasSize,
  useGameLoop,
  useSound,
  useSwipe,
  useTaunt,
  type GameStatus,
} from "./engine";

const COLS = 24;
const ROWS = 16;
const ASPECT = COLS / ROWS;
const START_SPEED = 9;   // ticks between moves
const MIN_SPEED = 4;

type Cell = { x: number; y: number };
type Dir = "up" | "down" | "left" | "right";

const VECTORS: Record<Dir, Cell> = {
  up: { x: 0, y: -1 },
  down: { x: 0, y: 1 },
  left: { x: -1, y: 0 },
  right: { x: 1, y: 0 },
};
const OPPOSITE: Record<Dir, Dir> = { up: "down", down: "up", left: "right", right: "left" };

/**
 * AMY Snake. The body is drawn as separate blocks with a hairline gap so it
 * reads as a run of pixels rather than a tube, and the head carries the only
 * solid white on the board.
 *
 * `autoplay` runs a simple greedy pilot for the attract loop on the 404 — it
 * steers toward the food and refuses moves that would trap it on the next step.
 */
export default function Snake({
  autoplay = false,
  compact = false,
}: {
  autoplay?: boolean;
  compact?: boolean;
}) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const hostRef = useRef<HTMLDivElement>(null);
  const size = useCanvasSize(canvasRef, ASPECT);

  const [status, setStatus] = useState<GameStatus>(autoplay ? "playing" : "idle");
  const [score, setScore] = useState(0);
  const [best, submitBest] = useBestScore("snake");
  const sound = useSound();
  const taunt = useTaunt(score, status);

  const snake = useRef<Cell[]>([]);
  const dir = useRef<Dir>("right");
  const queued = useRef<Dir[]>([]);
  const food = useRef<Cell>({ x: 0, y: 0 });
  const tick = useRef(0);
  const speed = useRef(START_SPEED);
  const grow = useRef(0);

  const placeFood = useCallback(() => {
    const taken = new Set(snake.current.map((c) => `${c.x},${c.y}`));
    const free: Cell[] = [];
    for (let y = 0; y < ROWS; y++) {
      for (let x = 0; x < COLS; x++) if (!taken.has(`${x},${y}`)) free.push({ x, y });
    }
    food.current = free[Math.floor(Math.random() * free.length)] ?? { x: 0, y: 0 };
  }, []);

  const start = useCallback(() => {
    snake.current = [
      { x: 6, y: 8 },
      { x: 5, y: 8 },
      { x: 4, y: 8 },
    ];
    dir.current = "right";
    queued.current = [];
    speed.current = START_SPEED;
    grow.current = 0;
    tick.current = 0;
    setScore(0);
    placeFood();
    setStatus("playing");
  }, [placeFood]);

  useEffect(() => {
    if (autoplay) start();
  }, [autoplay, start]);

  const turn = useCallback((next: Dir) => {
    const last = queued.current.at(-1) ?? dir.current;
    if (next === last || next === OPPOSITE[last]) return;
    if (queued.current.length < 2) queued.current.push(next);
  }, []);

  // --- input -------------------------------------------------------------
  useEffect(() => {
    if (autoplay) return;
    const keys: Record<string, Dir> = {
      ArrowUp: "up", ArrowDown: "down", ArrowLeft: "left", ArrowRight: "right",
      w: "up", s: "down", a: "left", d: "right",
      z: "up", q: "left", // AZERTY
    };
    const onKey = (e: KeyboardEvent) => {
      const next = keys[e.key] ?? keys[e.key.toLowerCase()];
      if (!next) return;
      e.preventDefault();          // arrows must not scroll the page
      if (status === "playing") turn(next);
      else start();
    };
    window.addEventListener("keydown", onKey, { passive: false });
    return () => window.removeEventListener("keydown", onKey);
  }, [status, turn, start, autoplay]);

  useSwipe(hostRef, (d) => {
    if (autoplay) return;
    if (status === "playing") turn(d);
    else start();
  });

  // --- simulation --------------------------------------------------------
  const pilot = useCallback(() => {
    const head = snake.current[0];
    const body = new Set(snake.current.slice(0, -1).map((c) => `${c.x},${c.y}`));
    const options = (Object.keys(VECTORS) as Dir[])
      .filter((d) => d !== OPPOSITE[dir.current])
      .map((d) => {
        const v = VECTORS[d];
        const nx = head.x + v.x;
        const ny = head.y + v.y;
        const dead =
          nx < 0 || ny < 0 || nx >= COLS || ny >= ROWS || body.has(`${nx},${ny}`);
        return { d, dead, dist: Math.abs(nx - food.current.x) + Math.abs(ny - food.current.y) };
      })
      .filter((o) => !o.dead)
      .sort((a, b) => a.dist - b.dist);
    if (options[0]) dir.current = options[0].d;
  }, []);

  useGameLoop(
    useCallback(() => {
      if (status !== "playing") return;
      tick.current += 1;
      if (tick.current < speed.current) return;
      tick.current = 0;

      if (autoplay) pilot();
      else {
        const next = queued.current.shift();
        if (next) dir.current = next;
      }

      const v = VECTORS[dir.current];
      const head = { x: snake.current[0].x + v.x, y: snake.current[0].y + v.y };

      const hitWall = head.x < 0 || head.y < 0 || head.x >= COLS || head.y >= ROWS;
      const body = snake.current.slice(0, grow.current > 0 ? undefined : -1);
      const hitSelf = body.some((c) => c.x === head.x && c.y === head.y);

      if (hitWall || hitSelf) {
        if (autoplay) return start();     // the attract loop simply restarts
        sound.play("over");
        setStatus("over");
        submitBest(score);
        return;
      }

      snake.current.unshift(head);
      if (grow.current > 0) grow.current -= 1;
      else snake.current.pop();

      if (head.x === food.current.x && head.y === food.current.y) {
        grow.current += 2;
        placeFood();
        sound.play("point");
        setScore((s) => {
          const next = s + 1;
          speed.current = Math.max(MIN_SPEED, START_SPEED - Math.floor(next / 4));
          return next;
        });
      }
    }, [status, autoplay, pilot, sound, submitBest, score, placeFood, start]),
    status === "playing",
  );

  // --- render ------------------------------------------------------------
  useEffect(() => {
    const ctx = canvasRef.current?.getContext("2d");
    if (!ctx || !size.width) return;
    const { width, height, dpr } = size;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

    const cell = Math.min(width / COLS, height / ROWS);
    const ox = (width - cell * COLS) / 2;
    const oy = (height - cell * ROWS) / 2;

    ctx.clearRect(0, 0, width, height);
    ctx.fillStyle = PALETTE.ink;
    ctx.fillRect(0, 0, width, height);

    // A grid you feel rather than read.
    ctx.strokeStyle = PALETTE.line;
    ctx.lineWidth = 1;
    ctx.globalAlpha = 0.45;
    ctx.beginPath();
    for (let x = 0; x <= COLS; x++) {
      ctx.moveTo(Math.round(ox + x * cell) + 0.5, oy);
      ctx.lineTo(Math.round(ox + x * cell) + 0.5, oy + ROWS * cell);
    }
    for (let y = 0; y <= ROWS; y++) {
      ctx.moveTo(ox, Math.round(oy + y * cell) + 0.5);
      ctx.lineTo(ox + COLS * cell, Math.round(oy + y * cell) + 0.5);
    }
    ctx.stroke();
    ctx.globalAlpha = 1;

    const gap = Math.max(1, cell * 0.14);
    const box = (c: Cell, fill: string, inset = gap) => {
      ctx.fillStyle = fill;
      ctx.fillRect(ox + c.x * cell + inset / 2, oy + c.y * cell + inset / 2, cell - inset, cell - inset);
    };

    // Food: the only blue on the board, with a soft halo.
    ctx.save();
    ctx.shadowColor = PALETTE.blue;
    ctx.shadowBlur = cell * 0.9;
    box(food.current, PALETTE.blue, gap * 1.8);
    ctx.restore();

    snake.current.forEach((c, i) => {
      if (i === 0) box(c, PALETTE.paper, gap * 0.6);
      else {
        // The tail fades toward the background instead of ending abruptly.
        const t = 1 - (i / snake.current.length) * 0.55;
        ctx.globalAlpha = Math.max(0.35, t);
        box(c, PALETTE.paper);
        ctx.globalAlpha = 1;
      }
    });
  }, [size, score, status]);

  // Redraw every frame while the board is moving.
  const [, force] = useState(0);
  useGameLoop(
    useCallback(() => force((n) => (n + 1) % 1000), []),
    status === "playing",
  );

  return (
    <div ref={hostRef}>
      <GameShell
        title="AMY Snake"
        score={score}
        best={best}
        taunt={taunt}
        status={autoplay ? "playing" : status}
        soundOn={sound.on}
        onToggleSound={sound.toggle}
        onStart={start}
        hint="Flèches, WASD/ZQSD — ou swipe sur mobile."
        canvasRef={canvasRef}
        aspect={ASPECT}
        compact={compact}
      />
    </div>
  );
}
