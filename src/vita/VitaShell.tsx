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
  useReducer,
  useRef,
  useState,
  type FC,
  type RefAttributes
} from "react";
import { activateDestination } from "../steam/navigation";
import { LiveArea } from "./LiveArea";
import { StatusBar } from "./StatusBar";
import { VITA_APPS } from "./model";
import {
  createInitialVitaView,
  reduceVitaView,
  type VitaAction
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

export function VitaShell() {
  const focusAnchor = useRef<HTMLDivElement>(null);
  const [view, dispatch] = useReducer(
    reduceVitaView,
    undefined,
    createInitialVitaView
  );
  const [now, setNow] = useState(() => new Date());

  useEffect(() => {
    const timer = window.setInterval(() => setNow(new Date()), 1000);
    return () => window.clearInterval(timer);
  }, []);

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

  const activateLiveArea = useCallback(() => {
    if (view.kind !== "livearea") return;

    const app = VITA_APPS[view.appIndex];
    const result = activateDestination(app.destination);

    if (!result.handled) {
      toaster.toast({
        title: app.title,
        body: result.message
      });
    }
  }, [view]);

  const handleAction = useCallback(
    (action: VitaAction) => {
      if (view.kind === "home" && action === "back") {
        Navigation.NavigateBack();
        return;
      }

      if (view.kind === "livearea" && action === "accept") {
        activateLiveArea();
        return;
      }

      dispatch(action);
    },
    [activateLiveArea, view]
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
        <VitaHome selectedIndex={view.selectedIndex} />
      ) : (
        <LiveArea app={VITA_APPS[view.appIndex]} />
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
