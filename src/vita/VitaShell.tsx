import {
  Focusable,
  GamepadButton,
  Navigation,
  type FocusableProps,
  type GamepadEvent
} from "@decky/ui";
import { toaster } from "@decky/api";
import {
  useCallback,
  useEffect,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
  type FC,
  type RefAttributes
} from "react";
import { activateApp } from "../steam/navigation";
import { useSteamLibrary } from "../steam/useSteamLibrary";
import { LiveArea } from "./LiveArea";
import { StatusBar } from "./StatusBar";
import {
  buildHomeApps,
  type VitaApp
} from "./model";
import {
  createInitialVitaView,
  firstIndexForPage,
  moveHomeIndex,
  pageForIndex,
  type VitaDirection,
  type VitaView
} from "./state";
import { VITA_STYLES } from "./styles";
import { useKeyboardInput } from "./useKeyboardInput";
import { VitaHome } from "./VitaHome";

type NativeFocusableProps = Omit<FocusableProps, "onGamepadDirection"> & {
  preferredFocus?: boolean;
  focusableIfEmpty?: boolean;
  focusable?: boolean;
  onGamepadDirection?: (event: GamepadEvent) => boolean | void;
};

const NativeFocusable = Focusable as FC<
  NativeFocusableProps & RefAttributes<HTMLDivElement>
>;

function consume(event: GamepadEvent) {
  event.preventDefault();
  event.stopPropagation();
  event.stopImmediatePropagation();
}

function findLiveAreaApp(view: VitaView, apps: VitaApp[]): VitaApp | null {
  if (view.kind !== "livearea") return null;
  return apps.find((app) => app.id === view.appId) ?? null;
}

export function VitaShell() {
  const focusAnchor = useRef<HTMLDivElement>(null);
  const steamGames = useSteamLibrary();
  const apps = useMemo(() => buildHomeApps(steamGames), [steamGames]);

  const [view, setView] = useState<VitaView>(createInitialVitaView);
  const [now, setNow] = useState(() => new Date());
  const [pageDirection, setPageDirection] = useState<
    "next" | "previous" | null
  >(null);

  useEffect(() => {
    const timer = window.setInterval(() => setNow(new Date()), 1000);
    return () => window.clearInterval(timer);
  }, []);

  useEffect(() => {
    setView((current) => {
      if (current.kind !== "home") return current;
      if (apps.length === 0) return { kind: "home", selectedIndex: 0 };

      const selectedIndex = Math.min(
        current.selectedIndex,
        apps.length - 1
      );

      return selectedIndex === current.selectedIndex
        ? current
        : { kind: "home", selectedIndex };
    });
  }, [apps.length]);

  useLayoutEffect(() => {
    let attempts = 0;

    const grabFocus = () => {
      attempts += 1;
      try {
        focusAnchor.current?.focus({ preventScroll: true });
      } catch {
        // Steam may still be completing its route transition.
      }
    };

    grabFocus();

    const timer = window.setInterval(() => {
      grabFocus();
      if (attempts >= 12) {
        window.clearInterval(timer);
      }
    }, 120);

    return () => window.clearInterval(timer);
  }, []);

  const openApp = useCallback(
    (index: number) => {
      const app = apps[index];
      if (!app) return;

      setView({
        kind: "livearea",
        appId: app.id,
        homeIndex: index
      });
    },
    [apps]
  );

  const backToHome = useCallback(() => {
    setView((current) => {
      if (current.kind !== "livearea") return current;
      return {
        kind: "home",
        selectedIndex: Math.min(
          current.homeIndex,
          Math.max(0, apps.length - 1)
        )
      };
    });
  }, [apps.length]);

  const startLiveArea = useCallback(() => {
    const app = findLiveAreaApp(view, apps);
    if (!app) return;

    const result = activateApp(app);

    if (!result.handled) {
      toaster.toast({
        title: app.title,
        body: result.message
      });
    }
  }, [apps, view]);

  const moveHome = useCallback(
    (direction: VitaDirection) => {
      setView((current) => {
        if (current.kind !== "home") return current;

        const nextIndex = moveHomeIndex(
          current.selectedIndex,
          direction,
          apps.length
        );

        const oldPage = pageForIndex(current.selectedIndex);
        const newPage = pageForIndex(nextIndex);

        if (newPage !== oldPage) {
          setPageDirection(newPage > oldPage ? "next" : "previous");
        } else {
          setPageDirection(null);
        }

        return {
          kind: "home",
          selectedIndex: nextIndex
        };
      });
    },
    [apps.length]
  );

  const handleAction = useCallback(
    (action: "left" | "right" | "up" | "down" | "accept" | "back") => {
      if (view.kind === "home") {
        if (action === "back") {
          Navigation.NavigateBack();
          return;
        }

        if (action === "accept") {
          openApp(view.selectedIndex);
          return;
        }

        moveHome(action);
        return;
      }

      if (action === "back") {
        backToHome();
        return;
      }

      if (action === "accept") {
        startLiveArea();
      }
    },
    [backToHome, moveHome, openApp, startLiveArea, view]
  );

  useKeyboardInput({ onAction: handleAction });

  const handleDirection = useCallback(
    (event: GamepadEvent) => {
      consume(event);

      switch (event.detail.button) {
        case GamepadButton.DIR_LEFT:
          handleAction("left");
          break;
        case GamepadButton.DIR_RIGHT:
          handleAction("right");
          break;
        case GamepadButton.DIR_UP:
          handleAction("up");
          break;
        case GamepadButton.DIR_DOWN:
          handleAction("down");
          break;
        default:
          break;
      }

      return true;
    },
    [handleAction]
  );

  const handleOk = useCallback(
    (event: GamepadEvent) => {
      consume(event);
      if (!event.detail.is_repeat) {
        handleAction("accept");
      }
    },
    [handleAction]
  );

  const handleCancel = useCallback(
    (event: GamepadEvent) => {
      consume(event);
      if (!event.detail.is_repeat) {
        handleAction("back");
      }
    },
    [handleAction]
  );

  const changePage = useCallback(
    (page: number) => {
      setView((current) => {
        if (current.kind !== "home") return current;

        const currentPage = pageForIndex(current.selectedIndex);
        if (page === currentPage) return current;

        setPageDirection(page > currentPage ? "next" : "previous");

        return {
          kind: "home",
          selectedIndex: firstIndexForPage(page, apps.length)
        };
      });
    },
    [apps.length]
  );

  const selectBubble = useCallback((index: number) => {
    setPageDirection(null);
    setView({ kind: "home", selectedIndex: index });
  }, []);

  const liveAreaApp = findLiveAreaApp(view, apps);

  return (
    <NativeFocusable
      ref={focusAnchor}
      className="psdeck-vita-root"
      tabIndex={0}
      focusable
      focusableIfEmpty
      preferredFocus
      flow-children="none"
      noFocusRing
      onGamepadDirection={handleDirection}
      onOKButton={handleOk}
      onCancelButton={handleCancel}
      actionDescriptionMap={{
        [GamepadButton.OK]: view.kind === "home" ? "Open" : "Start",
        [GamepadButton.CANCEL]: "Back"
      }}
    >
      <style>{VITA_STYLES}</style>
      <StatusBar now={now} />

      {view.kind === "home" ? (
        <VitaHome
          apps={apps}
          selectedIndex={view.selectedIndex}
          pageDirection={pageDirection}
          onSelect={selectBubble}
          onActivate={openApp}
          onPageChange={changePage}
        />
      ) : liveAreaApp ? (
        <LiveArea
          app={liveAreaApp}
          onStart={startLiveArea}
          onBack={backToHome}
        />
      ) : (
        <VitaHome
          apps={apps}
          selectedIndex={0}
          pageDirection={null}
          onSelect={selectBubble}
          onActivate={openApp}
          onPageChange={changePage}
        />
      )}

      <button
        className="vita-dev-exit"
        type="button"
        tabIndex={-1}
        onClick={() => Navigation.NavigateBack()}
      >
        Exit PSDeck
      </button>
    </NativeFocusable>
  );
}
