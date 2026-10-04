import { useEffect, useRef } from "react";
import type { VitaAction } from "./state";

type Props = {
  onAction: (action: VitaAction) => void;
};

export function useKeyboardInput({ onAction }: Props) {
  const callbackRef = useRef(onAction);

  useEffect(() => {
    callbackRef.current = onAction;
  }, [onAction]);

  useEffect(() => {
    const keymap: Record<string, VitaAction | undefined> = {
      ArrowLeft: "left",
      ArrowRight: "right",
      ArrowUp: "up",
      ArrowDown: "down",
      Enter: "accept",
      Escape: "back"
    };

    const onKeyDown = (event: KeyboardEvent) => {
      const action = keymap[event.key];
      if (!action) return;

      event.preventDefault();
      event.stopPropagation();
      callbackRef.current(action);
    };

    window.addEventListener("keydown", onKeyDown);

    return () => window.removeEventListener("keydown", onKeyDown);
  }, []);
}
