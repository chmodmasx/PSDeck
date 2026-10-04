import { useRef } from "react";
import type { VitaApp } from "./model";
import { VITA_PAGE_SIZE } from "./model";
import {
  pageCountForItems,
  pageForIndex
} from "./state";
import { VitaArtwork } from "./VitaArtwork";

type Props = {
  apps: VitaApp[];
  selectedIndex: number;
  pageDirection: "next" | "previous" | null;
  onSelect: (index: number) => void;
  onActivate: (index: number) => void;
  onPageChange: (page: number) => void;
};

export function VitaHome({
  apps,
  selectedIndex,
  pageDirection,
  onSelect,
  onActivate,
  onPageChange
}: Props) {
  const pointerStart = useRef<{ x: number; y: number } | null>(null);
  const swiped = useRef(false);

  const pageIndex = pageForIndex(selectedIndex);
  const pageCount = pageCountForItems(apps.length);
  const pageStart = pageIndex * VITA_PAGE_SIZE;
  const pageApps = apps.slice(pageStart, pageStart + VITA_PAGE_SIZE);

  const onPointerDownCapture = (event: React.PointerEvent) => {
    pointerStart.current = {
      x: event.clientX,
      y: event.clientY
    };
    swiped.current = false;
  };

  const onPointerUpCapture = (event: React.PointerEvent) => {
    const start = pointerStart.current;
    pointerStart.current = null;
    if (!start) return;

    const dx = event.clientX - start.x;
    const dy = event.clientY - start.y;

    if (Math.abs(dy) < 58 || Math.abs(dy) < Math.abs(dx) * 1.15) {
      return;
    }

    const nextPage = dy < 0 ? pageIndex + 1 : pageIndex - 1;

    if (nextPage >= 0 && nextPage < pageCount) {
      swiped.current = true;
      onPageChange(nextPage);
      event.preventDefault();
      event.stopPropagation();
      window.setTimeout(() => {
        swiped.current = false;
      }, 120);
    }
  };

  return (
    <section
      className="vita-home"
      aria-label="PSDeck Home"
      onPointerDownCapture={onPointerDownCapture}
      onPointerUpCapture={onPointerUpCapture}
    >
      <div
        className={`vita-home-page ${
          pageDirection === "next"
            ? "page-enter-next"
            : pageDirection === "previous"
              ? "page-enter-previous"
              : ""
        }`}
        key={pageIndex}
      >
        {pageApps.map((app, localIndex) => {
          const globalIndex = pageStart + localIndex;
          const selected = globalIndex === selectedIndex;

          return (
            <div
              className={`vita-bubble-slot vita-slot-${localIndex}`}
              key={app.id}
            >
              <button
                className={`vita-bubble ${selected ? "selected" : ""}`}
                style={{
                  "--bubble-accent": app.accent,
                  "--bubble-accent-dark": app.accentDark
                } as React.CSSProperties}
                type="button"
                tabIndex={-1}
                aria-label={app.title}
                onPointerDown={() => onSelect(globalIndex)}
                onClick={(event) => {
                  if (swiped.current) {
                    event.preventDefault();
                    event.stopPropagation();
                    return;
                  }
                  onActivate(globalIndex);
                }}
              >
                <VitaArtwork
                  urls={app.imageUrls}
                  alt=""
                  className="vita-bubble-artwork"
                />
                <span className="vita-bubble-gloss" aria-hidden="true" />
              </button>

              <div
                className={`vita-bubble-label ${selected ? "selected" : ""}`}
              >
                {app.title}
              </div>
            </div>
          );
        })}
      </div>

      <aside
        className="vita-page-indicator"
        aria-label={`Home page ${pageIndex + 1} of ${pageCount}`}
      >
        {Array.from({ length: pageCount }, (_, index) => (
          <button
            className={index === pageIndex ? "active" : ""}
            key={index}
            type="button"
            tabIndex={-1}
            aria-label={`Go to page ${index + 1}`}
            onClick={() => onPageChange(index)}
          />
        ))}
      </aside>
    </section>
  );
}
