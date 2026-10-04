import type { VitaIcon } from "./model";

export function VitaAppIcon({ icon }: { icon: VitaIcon }) {
  switch (icon) {
    case "library":
      return (
        <svg viewBox="0 0 64 64" aria-hidden="true">
          <path d="M12 20h40v29H12z" />
          <path d="M18 15h28v5H18zM19 28h26M19 36h19" />
        </svg>
      );

    case "store":
      return (
        <svg viewBox="0 0 64 64" aria-hidden="true">
          <path d="M16 24h32l-3 27H19z" />
          <path d="M24 25v-5a8 8 0 0116 0v5" />
          <path d="M25 34h14" />
        </svg>
      );

    case "friends":
      return (
        <svg viewBox="0 0 64 64" aria-hidden="true">
          <circle cx="25" cy="24" r="9" />
          <circle cx="43" cy="28" r="7" />
          <path d="M10 49c2-9 8-14 15-14s13 5 15 14M37 41c2-5 6-8 11-8 4 0 7 3 9 8" />
        </svg>
      );

    case "settings":
      return (
        <svg viewBox="0 0 64 64" aria-hidden="true">
          <circle cx="32" cy="32" r="9" />
          <path d="M32 9v9M32 46v9M9 32h9M46 32h9M16 16l7 7M41 41l7 7M48 16l-7 7M23 41l-7 7" />
          <circle cx="32" cy="32" r="20" opacity=".28" />
        </svg>
      );

    case "downloads":
      return (
        <svg viewBox="0 0 64 64" aria-hidden="true">
          <path d="M32 10v31" />
          <path d="M21 31l11 11 11-11" />
          <path d="M14 50h36" />
        </svg>
      );

    case "media":
      return (
        <svg viewBox="0 0 64 64" aria-hidden="true">
          <rect x="11" y="15" width="42" height="34" rx="5" />
          <circle cx="25" cy="27" r="5" />
          <path d="M15 44l12-12 8 8 6-6 8 10" />
        </svg>
      );
  }
}
