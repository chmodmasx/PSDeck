import { useEffect, useRef, useState } from "react";
import type { VitaApp } from "../vita/model";
import {
  readInstalledSteamGames,
  subscribeSteamLibrary
} from "./library";

function signature(games: VitaApp[]) {
  return games
    .map((game) => `${game.id}:${game.lastPlayed ?? 0}`)
    .join("|");
}

export function useSteamLibrary(): VitaApp[] {
  const [games, setGames] = useState<VitaApp[]>([]);
  const signatureRef = useRef("");

  useEffect(() => {
    let alive = true;

    const refresh = () => {
      if (!alive) return;

      const next = readInstalledSteamGames();
      const nextSignature = signature(next);

      if (nextSignature !== signatureRef.current) {
        signatureRef.current = nextSignature;
        setGames(next);
      }
    };

    refresh();

    const warmupTimers = [500, 1500, 3500].map((delay) =>
      window.setTimeout(refresh, delay)
    );
    const interval = window.setInterval(refresh, 10000);
    const unsubscribe = subscribeSteamLibrary(refresh);

    return () => {
      alive = false;
      warmupTimers.forEach((timer) => window.clearTimeout(timer));
      window.clearInterval(interval);
      unsubscribe();
    };
  }, []);

  return games;
}
