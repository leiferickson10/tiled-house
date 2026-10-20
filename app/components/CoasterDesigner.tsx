"use client";

import { useRef, useState } from "react";
import { gridId, unitPriceCents } from "../lib/shop";
import { TILES } from "../lib/tiles";
import AddToCartButton from "./AddToCartButton";
import { GLASS_SHINE } from "./CoasterThumb";

const SIZE = 4; // 4 x 4 grid of 1" tiles = a 4" coaster
const COUNT = SIZE * SIZE;

/** One entry per tile, row by row: an index into TILES, or null if unpainted. */
type Grid = (number | null)[];

type State = { grid: Grid; history: Grid[] };

const EMPTY: Grid = Array<number | null>(COUNT).fill(null);

export default function CoasterDesigner({
  initialGrid,
}: {
  /** Optional starting design (16 tile indexes), e.g. from the gallery. */
  initialGrid?: Grid;
}) {
  const [{ grid, history }, setState] = useState<State>({
    grid: initialGrid && initialGrid.length === COUNT ? initialGrid : EMPTY,
    history: [],
  });
  const [active, setActive] = useState(0);
  const [previous, setPrevious] = useState(1);
  const painting = useRef(false);

  // Snapshot the current grid for undo, then replace it.
  const commit = (next: (g: Grid) => Grid) =>
    setState((s) => ({ grid: next(s.grid), history: [...s.history, s.grid] }));

  const setCell = (g: Grid, i: number, color: number) => {
    const copy = [...g];
    copy[i] = color;
    return copy;
  };

  const cellFromEvent = (x: number, y: number) => {
    const el = document.elementFromPoint(x, y)?.closest("[data-cell]");
    if (!el) return null;
    return Number(el.getAttribute("data-cell"));
  };

  const pickColor = (i: number) => {
    if (i === active) return;
    setPrevious(active);
    setActive(i);
  };

  const fillAll = () => commit(() => Array(COUNT).fill(active));

  const checkerboard = () =>
    commit(() =>
      Array.from({ length: COUNT }, (_, i) => {
        const row = Math.floor(i / SIZE);
        const col = i % SIZE;
        return (row + col) % 2 === 0 ? active : previous;
      }),
    );

  const randomize = () =>
    commit(() =>
      Array.from({ length: COUNT }, () =>
        Math.floor(Math.random() * TILES.length),
      ),
    );

  const clearAll = () => commit(() => EMPTY);

  const undo = () =>
    setState((s) =>
      s.history.length === 0
        ? s
        : { grid: s.history[s.history.length - 1], history: s.history.slice(0, -1) },
    );

  const counts = TILES.map((_, t) => grid.filter((c) => c === t).length);
  const painted = grid.filter((c) => c !== null).length;
  const complete = painted === COUNT;

  return (
    <div className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] lg:gap-16">
      {/* Preview / canvas */}
      <div className="flex flex-col items-center gap-4">
        <div
          role="group"
          aria-label="Coaster design: 4 by 4 grid of glass tiles"
          className="w-full max-w-[460px] touch-none select-none rounded-[6px] p-3 shadow-[0_18px_40px_-18px_rgba(74,29,49,0.55)]"
          style={{ background: "#ece8dc" }}
          onPointerDown={(e) => {
            const i = cellFromEvent(e.clientX, e.clientY);
            if (i === null) return;
            e.currentTarget.setPointerCapture(e.pointerId);
            painting.current = true;
            setState((s) =>
              s.grid[i] === active
                ? s
                : { grid: setCell(s.grid, i, active), history: [...s.history, s.grid] },
            );
          }}
          onPointerMove={(e) => {
            if (!painting.current) return;
            const i = cellFromEvent(e.clientX, e.clientY);
            if (i === null) return;
            setState((s) =>
              s.grid[i] === active ? s : { ...s, grid: setCell(s.grid, i, active) },
            );
          }}
          onPointerUp={() => (painting.current = false)}
          onPointerCancel={() => (painting.current = false)}
        >
          <div
            className="grid gap-[5px]"
            style={{ gridTemplateColumns: `repeat(${SIZE}, minmax(0, 1fr))` }}
          >
            {grid.map((c, i) => {
              const tile = c === null ? null : TILES[c];
              return (
                <button
                  key={i}
                  type="button"
                  data-cell={i}
                  aria-label={`Row ${Math.floor(i / SIZE) + 1}, column ${(i % SIZE) + 1}: ${tile ? tile.name : "empty"}`}
                  className="aspect-square cursor-pointer rounded-[2px] outline-offset-2 focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#b15356]"
                  style={{
                    background: tile
                      ? `${GLASS_SHINE}, ${tile.hex}`
                      : "repeating-linear-gradient(45deg, #f5f2e8 0 6px, #ebe7da 6px 12px)",
                    boxShadow: tile
                      ? "inset 0 0 0 1px rgba(255,255,255,0.28), inset 0 -2px 3px rgba(0,0,0,0.12)"
                      : "inset 0 0 0 1px rgba(0,0,0,0.06)",
                  }}
                  onClick={(e) => {
                    // Keyboard activation only (detail === 0); pointer painting is handled above.
                    if (e.detail !== 0) return;
                    commit((g) => setCell(g, i, active));
                  }}
                />
              );
            })}
          </div>
        </div>
        <p className="text-sm text-[#4a1d31]/70">
          4&Prime; × 4&Prime; coaster &middot; 16 glass tiles &middot; click or drag to paint
        </p>
      </div>

      {/* Controls */}
      <div className="flex flex-col gap-8">
        <section aria-labelledby="palette-heading">
          <h2
            id="palette-heading"
            className="mb-3 text-sm font-bold uppercase tracking-[0.12em] text-[#b15356]"
          >
            1. Pick a color
          </h2>
          <div className="grid grid-cols-3 gap-3 sm:grid-cols-5">
            {TILES.map((t, i) => (
              <button
                key={t.sku}
                type="button"
                onClick={() => pickColor(i)}
                aria-pressed={i === active}
                className={`flex flex-col items-center gap-1.5 rounded-md p-2 text-center text-xs transition ${
                  i === active
                    ? "bg-[#b15356]/10 ring-2 ring-[#b15356]"
                    : "hover:bg-black/5"
                }`}
              >
                <span
                  className="block aspect-square w-full rounded-[3px]"
                  style={{
                    background: `${GLASS_SHINE}, ${t.hex}`,
                    boxShadow: "inset 0 0 0 1px rgba(0,0,0,0.12)",
                  }}
                />
                <span className="font-medium leading-tight">{t.name}</span>
              </button>
            ))}
          </div>
        </section>

        <section aria-labelledby="tools-heading">
          <h2
            id="tools-heading"
            className="mb-3 text-sm font-bold uppercase tracking-[0.12em] text-[#b15356]"
          >
            2. Or use a pattern
          </h2>
          <div className="flex flex-wrap gap-2">
            <ToolButton onClick={fillAll}>Fill all with {TILES[active].name}</ToolButton>
            <ToolButton onClick={checkerboard}>
              Checkerboard: {TILES[active].name} + {TILES[previous].name}
            </ToolButton>
            <ToolButton onClick={randomize}>Surprise me</ToolButton>
            <ToolButton onClick={undo} disabled={history.length === 0}>
              Undo
            </ToolButton>
            <ToolButton onClick={clearAll} disabled={painted === 0}>
              Clear
            </ToolButton>
          </div>
          <p className="mt-2 text-xs text-[#4a1d31]/60">
            The checkerboard uses the color you just picked plus the one you picked before it.
          </p>
        </section>

        <section aria-labelledby="summary-heading">
          <h2
            id="summary-heading"
            className="mb-3 text-sm font-bold uppercase tracking-[0.12em] text-[#b15356]"
          >
            3. Your design
          </h2>
          {painted === 0 ? (
            <p className="text-sm text-[#4a1d31]/70">Nothing painted yet.</p>
          ) : (
            <ul className="grid gap-1.5 text-sm sm:grid-cols-2">
              {TILES.map((t, i) =>
                counts[i] === 0 ? null : (
                  <li key={t.sku} className="flex items-center gap-2">
                    <span
                      className="inline-block h-4 w-4 rounded-[2px]"
                      style={{ background: t.hex, boxShadow: "inset 0 0 0 1px rgba(0,0,0,0.15)" }}
                    />
                    {t.name} &times; {counts[i]}
                  </li>
                ),
              )}
            </ul>
          )}
          <p className="mt-3 text-sm text-[#4a1d31]/70">
            {complete
              ? "All 16 tiles painted. Looking good!"
              : `${painted} of ${COUNT} tiles painted.`}
          </p>

          {/* Only a fully painted design can be bought. The key resets the
              "Added!" state whenever the design changes. */}
          <AddToCartButton
            key={grid.join(",")}
            id={gridId(complete ? (grid as number[]) : Array(COUNT).fill(0))}
            priceCents={unitPriceCents(complete ? (grid as number[]) : Array(COUNT).fill(0))}
            disabled={!complete}
          />
        </section>
      </div>
    </div>
  );
}

function ToolButton({
  onClick,
  disabled,
  children,
}: {
  onClick: () => void;
  disabled?: boolean;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      className="rounded-full border border-[#b15356] px-4 py-2 text-sm font-medium text-[#b15356] transition hover:bg-[#b15356] hover:text-[#f9f8f0] disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:bg-transparent disabled:hover:text-[#b15356]"
    >
      {children}
    </button>
  );
}
