import { readyMadeBySlug } from "./coasters";
import { decodeGrid } from "./shop";
import { TILES } from "./tiles";

/**
 * Tile colors that are sold out. To mark a color sold out, add its name here
 * exactly as it appears in tiles.ts (e.g. "Auburn") and push. Every coaster that
 * uses that color then shows a disabled "Sold out" button, the designer greys the
 * color out, and /api/checkout refuses any cart containing it. Remove the name and
 * push again when it's back in stock.
 */
export const SOLD_OUT_IN_CODE: string[] = [];

/** Every valid tile color name. */
export const TILE_NAMES = TILES.map((t) => t.name);

/**
 * The tile colors one cart item uses ("p:<slug>" ready-made, "g:<grid>" custom),
 * or null if the id isn't a real product. Shared by the browser and the server.
 */
export function tilesForItem(id: unknown): string[] | null {
  if (typeof id !== "string") return null;
  if (id.startsWith("p:")) {
    const c = readyMadeBySlug(id.slice(2));
    return c ? [...c.colors] : null;
  }
  if (id.startsWith("g:")) {
    const grid = decodeGrid(id.slice(2));
    return grid ? [...new Set(grid.map((t) => TILES[t].name))] : null;
  }
  return null;
}

/** The sold-out colors this item needs (empty when it can be ordered). */
export function soldOutTilesIn(id: unknown, soldOut: Iterable<string>): string[] {
  const out = new Set(soldOut);
  return (tilesForItem(id) ?? []).filter((t) => out.has(t));
}
