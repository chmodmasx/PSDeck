import { Navigation } from "@decky/ui";
import type { VitaDestination } from "../vita/model";

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

export function activateDestination(
  destination: VitaDestination
): NavigationResult {
  switch (destination) {
    case "steam:library":
      Navigation.NavigateToLibraryTab();
      closeSideMenus();
      return { handled: true, message: "Opened Steam Library." };

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
