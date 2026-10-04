import { useEffect, useRef } from "react";
import type { VitaDirection } from "./state";

export type VitaInputAction = VitaDirection | "accept" | "back";

type Props = {
  onAction: (action: VitaInputAction) => void;
};

export function useKeyboardInput({ onAction }: Props) {
  const callbackRef = useRef(onAction);

  useEffect(() => {
    callbackRef.current = onAction;
  }, [onAction]);

  useEffect(() => {
    const keymap: Record<string, VitaInputAction | undefined> = {
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
