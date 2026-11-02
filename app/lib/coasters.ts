import { TILES } from "./tiles";

/**
 * Ready-made coasters that have real product photos (public/images/coasters/).
 * These are their own products, separate from the designer's 9-color palette in
 * tiles.ts, but they are built from those same 9 glass colors, so `colors` below
 * must use the tile names from tiles.ts. To add one: drop an 800x800 jpg named
 * <slug>.jpg in that folder and add a line here. Rename "name" to whatever you
 * want customers to see; the shop filter reads `colors`, not the name.
 */
export type ReadyMadeCoaster = {
  slug: string;
  name: string;
  /** The tile colors, by name in tiles.ts: two for a checkerboard, one for a solid. */
  colors: [string] | [string, string];
};

export const READY_MADE: ReadyMadeCoaster[] = [
  { slug: "green-light-blue", name: "Sage + Light Blue", colors: ["Sage", "Coastal Blue"] },
  { slug: "green-terracotta", name: "Sage + Terracotta", colors: ["Sage", "Cinnamon"] },
  { slug: "green-white", name: "Sage + White", colors: ["Sage", "Pearl"] },
  { slug: "light-blue-green", name: "Light Blue + Sage", colors: ["Powder", "Sage"] },
  { slug: "powder-fountain-blue", name: "Powder + Coastal Blue", colors: ["Powder", "Coastal Blue"] },
  { slug: "moonlight-fountain-blue", name: "Moonlight + Coastal Blue", colors: ["Moonlight", "Coastal Blue"] },
  { slug: "pearl-moonlight", name: "Pearl + Moonlight", colors: ["Pearl", "Moonlight"] },
  { slug: "moonlight-powder", name: "Moonlight + Powder", colors: ["Moonlight", "Powder"] },
  { slug: "powder-brandied-melon", name: "Powder + Cinnamon", colors: ["Powder", "Cinnamon"] },
  { slug: "pearl-fountain-blue", name: "Pearl + Coastal Blue", colors: ["Pearl", "Coastal Blue"] },
  { slug: "fountain-blue-brandied-melon", name: "Coastal Blue + Cinnamon", colors: ["Coastal Blue", "Cinnamon"] },
  { slug: "pearl-brandied-melon", name: "Pearl + Cinnamon", colors: ["Pearl", "Cinnamon"] },
  { slug: "moonlight-grasshopper", name: "Moonlight + Sage", colors: ["Moonlight", "Sage"] },
  { slug: "pearl-powder", name: "Pearl + Powder", colors: ["Pearl", "Powder"] },
  { slug: "moonlight-brandied-melon", name: "Moonlight + Cinnamon", colors: ["Moonlight", "Cinnamon"] },
  { slug: "solid-moonlight", name: "Solid Moonlight", colors: ["Moonlight"] },
  { slug: "solid-grasshopper", name: "Solid Sage", colors: ["Sage"] },
  { slug: "solid-fountain-blue", name: "Solid Coastal Blue", colors: ["Coastal Blue"] },
  { slug: "solid-brandied-melon", name: "Solid Cinnamon", colors: ["Cinnamon"] },
  { slug: "solid-powder", name: "Solid Powder", colors: ["Powder"] },
  { slug: "solid-pearl", name: "Solid Pearl", colors: ["Pearl"] },
];

export const readyMadeBySlug = (slug: string) =>
  READY_MADE.find((c) => c.slug === slug);

export const readyMadePhoto = (slug: string) => `/images/coasters/${slug}.jpg`;

/** The tile colors in a coaster, e.g. ["Dusk", "Pearl"]. */
export const colorsOf = (c: ReadyMadeCoaster) => c.colors;

/** Swatch color for each tile, from the supplier values in tiles.ts. */
export const COLOR_HEX: Record<string, string> = Object.fromEntries(
  TILES.map((t) => [t.name, t.hex]),
);

/** Left to right on the shop page: light to dark, cool to warm. */
const SWATCH_ORDER = [
  "Pearl",
  "Moonlight",
  "Powder",
  "Coastal Blue",
  "Electric Blue",
  "Sage",
  "Cinnamon",
];

/** Every color that appears in the collection, with how many coasters use it. */
export function colorCounts(): { color: string; count: number }[] {
  const counts = new Map<string, number>();
  for (const c of READY_MADE)
    for (const color of new Set(colorsOf(c)))
      counts.set(color, (counts.get(color) ?? 0) + 1);
  const rank = (color: string) => {
    const i = SWATCH_ORDER.indexOf(color);
    return i === -1 ? SWATCH_ORDER.length : i;
  };
  return [...counts]
    .map(([color, count]) => ({ color, count }))
    .sort((a, b) => rank(a.color) - rank(b.color) || a.color.localeCompare(b.color));
}
