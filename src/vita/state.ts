import { VITA_PAGE_SIZE } from "./model";

export type VitaView =
  | {
      kind: "home";
      selectedIndex: number;
    }
  | {
      kind: "livearea";
      appId: string;
      homeIndex: number;
    };

export type VitaDirection = "left" | "right" | "up" | "down";

type Slot = {
  x: number;
  row: 0 | 1 | 2;
};

export const VITA_PAGE_SLOTS: Slot[] = [
  { x: 0.26, row: 0 },
  { x: 0.50, row: 0 },
  { x: 0.74, row: 0 },
  { x: 0.14, row: 1 },
  { x: 0.38, row: 1 },
  { x: 0.62, row: 1 },
  { x: 0.86, row: 1 },
  { x: 0.26, row: 2 },
  { x: 0.50, row: 2 },
  { x: 0.74, row: 2 }
];

export function createInitialVitaView(): VitaView {
  return {
    kind: "home",
    selectedIndex: 0
  };
}

export function pageForIndex(index: number): number {
  return Math.max(0, Math.floor(index / VITA_PAGE_SIZE));
}

export function pageCountForItems(itemCount: number): number {
  return Math.max(1, Math.ceil(itemCount / VITA_PAGE_SIZE));
}

function pageCandidates(
  page: number,
  row: number,
  itemCount: number
): number[] {
  const base = page * VITA_PAGE_SIZE;

  return VITA_PAGE_SLOTS.flatMap((slot, localIndex) => {
    const globalIndex = base + localIndex;

    if (slot.row !== row || globalIndex >= itemCount) {
      return [];
    }

    return [globalIndex];
  });
}

function closestByX(
  candidates: number[],
  referenceX: number
): number | undefined {
  let best: number | undefined;
  let bestDistance = Number.POSITIVE_INFINITY;

  for (const candidate of candidates) {
    const x = VITA_PAGE_SLOTS[candidate % VITA_PAGE_SIZE]?.x ?? 0.5;
    const distance = Math.abs(x - referenceX);

    if (distance < bestDistance) {
      bestDistance = distance;
      best = candidate;
    }
  }

  return best;
}

export function moveHomeIndex(
  index: number,
  direction: VitaDirection,
  itemCount: number
): number {
  if (itemCount <= 0) return 0;

  const clampedIndex = Math.max(0, Math.min(itemCount - 1, index));
  const page = pageForIndex(clampedIndex);
  const local = clampedIndex % VITA_PAGE_SIZE;
  const current = VITA_PAGE_SLOTS[local];
  if (!current) return clampedIndex;

  if (direction === "left" || direction === "right") {
    const candidates = pageCandidates(page, current.row, itemCount)
      .filter((candidate) =>
        direction === "left"
          ? VITA_PAGE_SLOTS[candidate % VITA_PAGE_SIZE].x < current.x
          : VITA_PAGE_SLOTS[candidate % VITA_PAGE_SIZE].x > current.x
      )
      .sort((a, b) => {
        const ax = VITA_PAGE_SLOTS[a % VITA_PAGE_SIZE].x;
        const bx = VITA_PAGE_SLOTS[b % VITA_PAGE_SIZE].x;
        return direction === "left" ? bx - ax : ax - bx;
      });

    return candidates[0] ?? clampedIndex;
  }

  const rowDelta = direction === "up" ? -1 : 1;
  const targetRow = current.row + rowDelta;

  if (targetRow >= 0 && targetRow <= 2) {
    const candidate = closestByX(
      pageCandidates(page, targetRow, itemCount),
      current.x
    );
    return candidate ?? clampedIndex;
  }

  const targetPage = page + rowDelta;
  const pageCount = pageCountForItems(itemCount);

  if (targetPage < 0 || targetPage >= pageCount) {
    return clampedIndex;
  }

  const boundaryRow = direction === "up" ? 2 : 0;
  const candidate = closestByX(
    pageCandidates(targetPage, boundaryRow, itemCount),
    current.x
  );

  if (candidate !== undefined) {
    return candidate;
  }

  const first = targetPage * VITA_PAGE_SIZE;
  return Math.min(first, itemCount - 1);
}

export function firstIndexForPage(page: number, itemCount: number): number {
  const pageCount = pageCountForItems(itemCount);
  const safePage = Math.max(0, Math.min(pageCount - 1, page));
  return Math.min(safePage * VITA_PAGE_SIZE, Math.max(0, itemCount - 1));
}
