import storeIcon from "../assets/vita/store.svg";
import friendsIcon from "../assets/vita/friends.svg";
import settingsIcon from "../assets/vita/settings.svg";
import downloadsIcon from "../assets/vita/downloads.svg";
import mediaIcon from "../assets/vita/media.svg";
import gameFallbackIcon from "../assets/vita/game-fallback.svg";

export type VitaDestination =
  | "steam:store"
  | "steam:friends"
  | "steam:settings"
  | "steam:downloads"
  | "steam:media";

export type VitaApp = {
  id: string;
  kind: "system" | "game";
  title: string;
  subtitle: string;
  startLabel: string;
  accent: string;
  accentDark: string;
  details: string[];
  imageUrls: string[];
  destination?: VitaDestination;
  appId?: number;
  gameId?: string;
  appType?: number;
  lastPlayed?: number;
};

export const VITA_PAGE_SIZE = 10;
export const VITA_MAX_PAGES = 10;
export const VITA_MAX_HOME_APPS = VITA_PAGE_SIZE * VITA_MAX_PAGES;

export const GAME_FALLBACK_ICON = gameFallbackIcon;

export const VITA_SYSTEM_APPS: VitaApp[] = [
  {
    id: "system:store",
    kind: "system",
    title: "Store",
    subtitle: "Steam Store",
    destination: "steam:store",
    startLabel: "Open",
    accent: "#22a6d5",
    accentDark: "#05607f",
    details: ["Browse games", "Wishlist", "Special offers"],
    imageUrls: [storeIcon]
  },
  {
    id: "system:friends",
    kind: "system",
    title: "Friends",
    subtitle: "Chat and social",
    destination: "steam:friends",
    startLabel: "Open",
    accent: "#397ecf",
    accentDark: "#254c9a",
    details: ["Friends list", "Chat", "Invitations"],
    imageUrls: [friendsIcon]
  },
  {
    id: "system:settings",
    kind: "system",
    title: "Settings",
    subtitle: "Steam Deck settings",
    destination: "steam:settings",
    startLabel: "Open",
    accent: "#858c98",
    accentDark: "#414852",
    details: ["System", "Display", "Controller"],
    imageUrls: [settingsIcon]
  },
  {
    id: "system:downloads",
    kind: "system",
    title: "Downloads",
    subtitle: "Manage downloads",
    destination: "steam:downloads",
    startLabel: "Open",
    accent: "#ef8b36",
    accentDark: "#a74b09",
    details: ["Active downloads", "Updates", "Queue"],
    imageUrls: [downloadsIcon]
  },
  {
    id: "system:media",
    kind: "system",
    title: "Media",
    subtitle: "Screenshots and recordings",
    destination: "steam:media",
    startLabel: "Open",
    accent: "#b363d7",
    accentDark: "#6b278b",
    details: ["Screenshots", "Game recordings", "Captures"],
    imageUrls: [mediaIcon]
  }
];

export function buildHomeApps(games: VitaApp[]): VitaApp[] {
  const availableGames = games.slice(
    0,
    Math.max(0, VITA_MAX_HOME_APPS - VITA_SYSTEM_APPS.length)
  );

  return [...VITA_SYSTEM_APPS, ...availableGames];
}
