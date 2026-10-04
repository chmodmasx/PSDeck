import { HOME_COLUMNS, VITA_APPS } from "./model";

export type VitaView =
  | {
      kind: "home";
      selectedIndex: number;
    }
  | {
      kind: "livearea";
      appIndex: number;
    };

export type VitaAction =
  | "left"
  | "right"
  | "up"
  | "down"
  | "accept"
  | "back";

export function createInitialVitaView(): VitaView {
  return {
    kind: "home",
    selectedIndex: 0
  };
}

function moveHomeIndex(index: number, action: VitaAction) {
  const row = Math.floor(index / HOME_COLUMNS);
  const column = index % HOME_COLUMNS;

  if (action === "left" && column > 0) {
    return index - 1;
  }

  if (action === "right") {
    const next = index + 1;
    if (
      column < HOME_COLUMNS - 1 &&
      next < VITA_APPS.length &&
      Math.floor(next / HOME_COLUMNS) === row
    ) {
      return next;
    }
  }

  if (action === "up") {
    const next = index - HOME_COLUMNS;
    if (next >= 0) {
      return next;
    }
  }

  if (action === "down") {
    const next = index + HOME_COLUMNS;
    if (next < VITA_APPS.length) {
      return next;
    }
  }

  return index;
}

export function reduceVitaView(view: VitaView, action: VitaAction): VitaView {
  if (view.kind === "home") {
    if (action === "accept") {
      return {
        kind: "livearea",
        appIndex: view.selectedIndex
      };
    }

    if (
      action === "left" ||
      action === "right" ||
      action === "up" ||
      action === "down"
    ) {
      return {
        kind: "home",
        selectedIndex: moveHomeIndex(view.selectedIndex, action)
      };
    }

    return view;
  }

  if (action === "back") {
    return {
      kind: "home",
      selectedIndex: view.appIndex
    };
  }

  return view;
}
