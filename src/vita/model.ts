export type VitaDestination =
  | "steam:library"
  | "steam:store"
  | "steam:friends"
  | "steam:settings"
  | "steam:downloads"
  | "steam:media";

export type VitaIcon =
  | "library"
  | "store"
  | "friends"
  | "settings"
  | "downloads"
  | "media";

export type VitaApp = {
  id: string;
  title: string;
  subtitle: string;
  icon: VitaIcon;
  destination: VitaDestination;
  startLabel: string;
  accent: string;
  accentDark: string;
  details: string[];
};

export const VITA_APPS: VitaApp[] = [
  {
    id: "library",
    title: "Library",
    subtitle: "Your Steam games",
    icon: "library",
    destination: "steam:library",
    startLabel: "Start",
    accent: "#2f9be9",
    accentDark: "#07558f",
    details: ["Installed games", "Recent titles", "Collections"]
  },
  {
    id: "store",
    title: "Store",
    subtitle: "Steam Store",
    icon: "store",
    destination: "steam:store",
    startLabel: "Open",
    accent: "#22a6d5",
    accentDark: "#05607f",
    details: ["Browse games", "Wishlist", "Special offers"]
  },
  {
    id: "friends",
    title: "Friends",
    subtitle: "Chat and social",
    icon: "friends",
    destination: "steam:friends",
    startLabel: "Open",
    accent: "#50b95b",
    accentDark: "#197028",
    details: ["Friends list", "Chat", "Invitations"]
  },
  {
    id: "settings",
    title: "Settings",
    subtitle: "Steam Deck settings",
    icon: "settings",
    destination: "steam:settings",
    startLabel: "Open",
    accent: "#858c98",
    accentDark: "#414852",
    details: ["System", "Display", "Controller"]
  },
  {
    id: "downloads",
    title: "Downloads",
    subtitle: "Manage downloads",
    icon: "downloads",
    destination: "steam:downloads",
    startLabel: "Open",
    accent: "#ef8b36",
    accentDark: "#a74b09",
    details: ["Active downloads", "Updates", "Queue"]
  },
  {
    id: "media",
    title: "Media",
    subtitle: "Screenshots and recordings",
    icon: "media",
    destination: "steam:media",
    startLabel: "Open",
    accent: "#b363d7",
    accentDark: "#6b278b",
    details: ["Screenshots", "Game recordings", "Captures"]
  }
];

export const HOME_COLUMNS = 3;
