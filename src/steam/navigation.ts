import { Navigation } from "@decky/ui";
import type { VitaApp, VitaDestination } from "../vita/model";

export type NavigationResult = {
  handled: boolean;
  message: string;
};

function closeSideMenus() {
  try {
    Navigation.CloseSideMenus();
  } catch (error) {
    console.warn("[PSDeck] could not close side menus", error);
  }
}

function activateSystemDestination(
  destination: VitaDestination
): NavigationResult {
  switch (destination) {
    case "steam:store":
      Navigation.NavigateToSteamWeb("https://store.steampowered.com/");
      closeSideMenus();
      return { handled: true, message: "Opened Steam Store." };

    case "steam:friends":
      Navigation.NavigateToChat();
      closeSideMenus();
      return { handled: true, message: "Opened Steam Chat/Friends." };

    case "steam:settings":
      return {
        handled: false,
        message: "Steam Settings still needs on-device route mapping."
      };

    case "steam:downloads":
      return {
        handled: false,
        message: "Downloads still needs on-device route mapping."
      };

    case "steam:media":
      return {
        handled: false,
        message: "Media still needs on-device route mapping."
      };
  }
}

function deriveGameId(app: VitaApp): string | null {
  if (app.gameId) return app.gameId;
  if (!app.appId) return null;

  if (app.appType === 1073741824) {
    return (
      (BigInt(app.appId) << 32n) |
      0x0200000000000000n
    ).toString();
  }

  return String(app.appId);
}

function launchGame(app: VitaApp): NavigationResult {
  const gameId = deriveGameId(app);

  if (!gameId) {
    return {
      handled: false,
      message: "Steam did not expose a game id for this entry."
    };
  }

  const client = (
    globalThis as unknown as {
      SteamClient?: {
        Apps?: {
          RunGame?: (
            gameId: string,
            launchOptions: string,
            a: number,
            b: number
          ) => void;
        };
      };
    }
  ).SteamClient;

  if (typeof client?.Apps?.RunGame !== "function") {
    return {
      handled: false,
      message: "SteamClient.Apps.RunGame is unavailable on this build."
    };
  }

  try {
    client.Apps.RunGame(gameId, "", -1, 100);
    closeSideMenus();
    return {
      handled: true,
      message: `Launching ${app.title}.`
    };
  } catch (error) {
    console.error("[PSDeck] failed to launch game", app.appId, error);
    return {
      handled: false,
      message: "Steam rejected the launch request."
    };
  }
}

export function activateApp(app: VitaApp): NavigationResult {
  if (app.kind === "game") {
    return launchGame(app);
  }

  if (!app.destination) {
    return {
      handled: false,
      message: "This system bubble has no destination."
    };
  }

  return activateSystemDestination(app.destination);
}
