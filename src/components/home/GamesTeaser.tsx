"use client";

import dynamic from "next/dynamic";
import { useState } from "react";

import GamePicker from "@/components/games/GamePicker";
import type { GameId } from "@/components/games/GameOverlay";
import Reveal from "@/components/ui/Reveal";
import RevealLines from "@/components/ui/RevealLines";

const GameOverlay = dynamic(() => import("@/components/games/GameOverlay"), { ssr: false });

export default function GamesTeaser() {
  const [game, setGame] = useState<GameId | null>(null);

  return (
    <section id="games" className="relative border-t border-ink-line py-section" aria-labelledby="games-title">
      <div className="shell">
        <div className="grid-12 items-end gap-y-10">
          <div className="col-span-6 lg:col-span-7">
            <p className="meta text-blue-text">04 / Bonus</p>
            <h2 id="games-title" className="mt-5 font-display text-display font-semibold text-paper">
              <RevealLines lines={["DEUX JEUX.", "UNE PAUSE."]} />
            </h2>
          </div>
          <Reveal className="col-span-6 lg:col-span-4 lg:col-start-9">
            <p className="measure text-lead text-paper/65">
              Deux expériences courtes, accessibles au clavier comme au swipe.
            </p>
          </Reveal>
        </div>

        <Reveal className="mt-14 max-w-3xl lg:mt-20">
          <GamePicker onPick={setGame} />
        </Reveal>
      </div>

      {game && <GameOverlay game={game} onClose={() => setGame(null)} />}
    </section>
  );
}
