import { readyMadeBySlug, readyMadePhoto } from "./coasters";
import { DESIGNS } from "./designs";
import { TILES } from "./tiles";

/**
 * Shared shop rules. Imported by BOTH the browser (cart UI) and the server
 * (/api/checkout), so what the customer sees is what Stripe charges. The server
 * never trusts a price from the browser; it recomputes it from the grid here.
 */

export const GRID_CELLS = 16; // 4 x 4 tiles = one 4" coaster
export const MAX_QTY_PER_LINE = 20;
export const MAX_LINES = 20;

/** Flat US shipping, in cents. Set to 0 to offer free shipping everywhere. */
export const SHIPPING_CENTS = 600;
/** Orders with a subtotal at or above this ship free. null disables it. */
export const FREE_SHIPPING_OVER_CENTS: number | null = null;

/**
 * What the browser keeps in localStorage and sends to /api/checkout.
 * id is "p:<slug>" for a photographed ready-made coaster (lib/coasters.ts) or
 * "g:<grid>" for a custom/designer coaster, where grid is 16 base-36 characters,
 * one per tile: an index into TILES.
 */
export type CartItem = {
  id: string;
  qty: number;
};

export const gridId = (grid: number[]) => `g:${encodeGrid(grid)}`;
export const readyMadeId = (slug: string) => `p:${slug}`;

/** Price of one photographed ready-made coaster, in cents. Placeholder, like unitPriceCents. */
export const READY_MADE_PRICE_CENTS = 1800;

/** Everything the cart and Stripe need to know about one cart id. */
export type ResolvedItem = {
  id: string;
  name: string;
  description: string;
  unitCents: number;
  /** Site-relative photo path, if there is a real photo. */
  photo?: string;
  /** Tile indexes, so designer coasters can be drawn without a photo. */
  tiles?: number[];
  /** Saved on the Stripe product so you can see exactly what to make. */
  metadata: Record<string, string>;
};

/** Turn an untrusted id into a priced item, or null if it isn't a real product. */
export function resolveItem(id: unknown): ResolvedItem | null {
  if (typeof id !== "string") return null;
  if (id.startsWith("p:")) {
    const c = readyMadeBySlug(id.slice(2));
    if (!c) return null;
    return {
      id,
      name: c.name,
      description: `4" glass tile coaster: ${c.name}`,
      unitCents: READY_MADE_PRICE_CENTS,
      photo: readyMadePhoto(c.slug),
      metadata: { sku: id },
    };
  }
  if (id.startsWith("g:")) {
    const tiles = decodeGrid(id.slice(2));
    if (!tiles) return null;
    return {
      id,
      name: nameForGrid(tiles),
      description: `4" glass tile coaster: ${describeGrid(tiles)}`,
      unitCents: unitPriceCents(tiles),
      tiles,
      metadata: { sku: id, grid: id.slice(2) },
    };
  }
  return null;
}

export const encodeGrid = (grid: number[]) =>
  grid.map((c) => c.toString(36)).join("");

/** Returns the tile indexes, or null if the string isn't a complete, valid design. */
export function decodeGrid(s: unknown): number[] | null {
  if (typeof s !== "string" || s.length !== GRID_CELLS) return null;
  const out: number[] = [];
  for (const ch of s) {
    const n = parseInt(ch, 36);
    if (Number.isNaN(n) || n >= TILES.length) return null;
    out.push(n);
  }
  return out;
}

/**
 * Price of ONE coaster, in cents.
 *
 * TODO(you): this is the one business decision in the shop. Right now every
 * coaster costs the same. See the notes in the chat for options.
 */
export function unitPriceCents(grid: number[]): number {
  void grid;
  return 1800;
}

/** "Dusk ×8, Pearl ×8" — shown at checkout and kept for fulfillment. */
export function describeGrid(grid: number[]): string {
  const counts = new Map<number, number>();
  for (const c of grid) counts.set(c, (counts.get(c) ?? 0) + 1);
  return [...counts.entries()]
    .sort((a, b) => b[1] - a[1])
    .map(([c, n]) => `${TILES[c].name} ×${n}`)
    .join(", ");
}

/** A ready-made design's name if the grid matches one, otherwise "Custom Coaster". */
export function nameForGrid(grid: number[]): string {
  const key = grid.join(",");
  return DESIGNS.find((d) => d.grid.join(",") === key)?.name ?? "Custom Coaster";
}

export const formatUsd = (cents: number) =>
  new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" }).format(
    cents / 100,
  );

export function shippingFor(subtotalCents: number): number {
  if (FREE_SHIPPING_OVER_CENTS !== null && subtotalCents >= FREE_SHIPPING_OVER_CENTS)
    return 0;
  return SHIPPING_CENTS;
}

/**
 * Validate untrusted cart input (from JSON). Returns clean items, or an error
 * string. Merges duplicate designs so the Stripe line items stay tidy.
 */
export function validateCart(
  raw: unknown,
): { items: CartItem[] } | { error: string } {
  if (!Array.isArray(raw) || raw.length === 0) return { error: "Your cart is empty." };
  if (raw.length > MAX_LINES) return { error: "Too many items in the cart." };

  const merged = new Map<string, number>();
  for (const r of raw) {
    const item = resolveItem(r?.id);
    const qty = r?.qty;
    if (!item) return { error: "One of the items in your cart is no longer available." };
    if (!Number.isInteger(qty) || qty < 1 || qty > MAX_QTY_PER_LINE)
      return { error: `Quantity must be between 1 and ${MAX_QTY_PER_LINE}.` };
    merged.set(item.id, Math.min((merged.get(item.id) ?? 0) + qty, MAX_QTY_PER_LINE));
  }
  return { items: [...merged].map(([id, qty]) => ({ id, qty })) };
}
