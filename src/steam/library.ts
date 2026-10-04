import type { VitaApp } from "../vita/model";

type SteamOverview = {
  appid?: number;
  app_type?: number;
  display_name?: string;
  sort_as?: string;
  visible_in_game_list?: boolean;
  installed?: boolean;
  local_per_client_data?: {
    installed?: boolean;
  };
  most_available_per_client_data?: {
    installed?: boolean;
  };
  rt_last_time_played?: number;
  rt_last_played?: number;
  gameid?: string | number;
  m_gameid?: string | number;
  icon_hash?: string;
  local_cache_version?: string | number;
  library_capsule_filename?: string;
};

type AppStoreLike = {
  allApps?: SteamOverview[];
  GetAppOverviewByAppID?: (appId: number) => SteamOverview | null;
};

const STEAM_LOOPBACK = "https://steamloopback.host";
const STEAMSTATIC = "https://shared.cloudflare.steamstatic.com";
const STEAMCOMMUNITY =
  "https://steamcdn-a.akamaihd.net/steamcommunity/public/images";

function store(): AppStoreLike | undefined {
  return (globalThis as unknown as { appStore?: AppStoreLike }).appStore;
}

function isInstalled(overview: SteamOverview): boolean {
  if (overview.app_type === 1073741824) {
    return true;
  }

  return (
    overview.installed === true ||
    overview.local_per_client_data?.installed === true ||
    overview.most_available_per_client_data?.installed === true
  );
}

function isGameLike(overview: SteamOverview): boolean {
  return overview.app_type === 1 || overview.app_type === 1073741824;
}

function cacheBust(overview: SteamOverview): string {
  const value = overview.local_cache_version;
  return value === undefined || value === null || value === ""
    ? ""
    : `?c=${encodeURIComponent(String(value))}`;
}

function artworkUrls(overview: SteamOverview): string[] {
  const appId = Number(overview.appid);
  const bust = cacheBust(overview);
  const urls: string[] = [
    `${STEAM_LOOPBACK}/customimages/${appId}_icon.png`,
    `${STEAM_LOOPBACK}/customimages/${appId}_icon.jpg`,
    `${STEAM_LOOPBACK}/assets/${appId}/icon.jpg${bust}`
  ];

  if (overview.icon_hash) {
    urls.push(
      `${STEAMCOMMUNITY}/apps/${appId}/${overview.icon_hash}.jpg`,
      `${STEAMCOMMUNITY}/apps/${appId}/${overview.icon_hash}.png`
    );
  }

  const portrait =
    overview.library_capsule_filename || "library_600x900.jpg";

  urls.push(
    `${STEAM_LOOPBACK}/assets/${appId}/${portrait}${bust}`,
    `${STEAM_LOOPBACK}/assets/${appId}/library_600x900.jpg${bust}`,
    `${STEAMSTATIC}/store_item_assets/steam/apps/${appId}/library_600x900.jpg`,
    `${STEAMSTATIC}/store_item_assets/steam/apps/${appId}/header.jpg`
  );

  return urls;
}

function toVitaGame(overview: SteamOverview): VitaApp | null {
  const appId = Number(overview.appid);
  const title = String(overview.display_name ?? "").trim();

  if (!Number.isFinite(appId) || appId <= 0 || !title) {
    return null;
  }

  const gameId = overview.gameid ?? overview.m_gameid;
  const lastPlayed = Number(
    overview.rt_last_time_played ?? overview.rt_last_played ?? 0
  );

  return {
    id: `game:${appId}`,
    kind: "game",
    title,
    subtitle:
      overview.app_type === 1073741824 ? "Non-Steam game" : "Steam game",
    startLabel: "Start",
    accent: "#238fd4",
    accentDark: "#0b4d87",
    details: [
      overview.app_type === 1073741824 ? "Non-Steam shortcut" : "Installed",
      lastPlayed > 0 ? "Recently played" : "Ready to play"
    ],
    imageUrls: artworkUrls(overview),
    appId,
    gameId: gameId === undefined ? undefined : String(gameId),
    appType: overview.app_type,
    lastPlayed
  };
}

export function readInstalledSteamGames(): VitaApp[] {
  try {
    const allApps = store()?.allApps;
    if (!Array.isArray(allApps)) {
      return [];
    }

    return allApps
      .filter((overview) => {
        return (
          overview &&
          overview.visible_in_game_list !== false &&
          isGameLike(overview) &&
          isInstalled(overview)
        );
      })
      .map(toVitaGame)
      .filter((game): game is VitaApp => game !== null)
      .sort((a, b) => {
        const recent = (b.lastPlayed ?? 0) - (a.lastPlayed ?? 0);
        if (recent !== 0) return recent;
        return a.title.localeCompare(b.title);
      });
  } catch (error) {
    console.warn("[PSDeck] could not read Steam library", error);
    return [];
  }
}

export function subscribeSteamLibrary(onChange: () => void): () => void {
  const client = (
    globalThis as unknown as {
      SteamClient?: {
        Apps?: {
          RegisterForAppOverviewChanges?: (
            callback: () => void
          ) =>
            | void
            | {
                unregister?: () => void;
                Unregister?: () => void;
              };
        };
      };
    }
  ).SteamClient;

  let registration:
    | void
    | {
        unregister?: () => void;
        Unregister?: () => void;
      };

  try {
    registration = client?.Apps?.RegisterForAppOverviewChanges?.(() => {
      window.setTimeout(onChange, 250);
    });
  } catch (error) {
    console.warn("[PSDeck] app overview subscription unavailable", error);
  }

  return () => {
    try {
      registration?.unregister?.();
      registration?.Unregister?.();
    } catch {
      // Older Steam builds return no unregister handle.
    }
  };
}
