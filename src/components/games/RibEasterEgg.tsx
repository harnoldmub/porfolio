"use client";

import dynamic from "next/dynamic";
import { useState } from "react";

import type { GameId } from "./GameOverlay";

// Nothing game-related is fetched until the line below the RIB is clicked —
// the picker included. A bank page should not carry an arcade.
const GamePicker = dynamic(() => import("./GamePicker"), { ssr: false });
const GameOverlay = dynamic(() => import("./GameOverlay"), { ssr: false });

/**
 * One quiet line under the bank details. The page stays a RIB; this is only
 * here for whoever is still waiting for a transfer to go through.
 */
export default function RibEasterEgg() {
  const [open, setOpen] = useState(false);
  const [game, setGame] = useState<GameId | null>(null);

  return (
    <div className={open ? "w-full" : ""}>
      {!open ? (
        <button
          type="button"
          onClick={() => setOpen(true)}
          className="meta inline-flex min-h-11 items-center gap-2 text-ink/45 transition-colors duration-200 hover:text-ink"
        >
          Virement en cours ? Passez le temps <span aria-hidden>→</span>
        </button>
      ) : (
        <div className="animate-[rib-in_0.35s_cubic-bezier(0.16,1,0.3,1)_both]">
          <div className="flex items-center justify-between gap-4">
            <p className="meta text-ink/45">Deux minutes à perdre</p>
            <button
              type="button"
              onClick={() => setOpen(false)}
              className="meta inline-flex min-h-11 items-center text-ink/45 transition-colors hover:text-ink"
            >
              Masquer
            </button>
          </div>
          <GamePicker tone="light" className="mt-2" onPick={setGame} />
        </div>
      )}

      {game && <GameOverlay game={game} onClose={() => setGame(null)} />}
    </div>
  );
}
