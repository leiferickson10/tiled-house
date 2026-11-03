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
  { slug: "green-light-blue", name: "Sage + Coastal Blue", colors: ["Sage", "Coastal Blue"] },
  { slug: "green-terracotta", name: "Sage + Cinnamon", colors: ["Sage", "Cinnamon"] },
  { slug: "green-white", name: "Sage + Pearl", colors: ["Sage", "Pearl"] },
  { slug: "light-blue-green", name: "Powder + Sage", colors: ["Powder", "Sage"] },
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
  { slug: "red-white", name: "Pearl + Ruby", colors: ["Pearl", "Ruby"] },
  { slug: "red-teal", name: "Coastal Blue + Ruby", colors: ["Coastal Blue", "Ruby"] },
  { slug: "powder-cherry", name: "Powder + Ruby", colors: ["Powder", "Ruby"] },
  { slug: "sage-red", name: "Sage + Ruby", colors: ["Sage", "Ruby"] },
  { slug: "auburn-cherry", name: "Auburn + Ruby", colors: ["Auburn", "Ruby"] },
  { slug: "grasshopper-auburn", name: "Sage + Auburn", colors: ["Sage", "Auburn"] },
  { slug: "pearl-electric-blue", name: "Pearl + Electric Blue", colors: ["Pearl", "Electric Blue"] },
  { slug: "moonlight-electric-blue", name: "Moonlight + Electric Blue", colors: ["Moonlight", "Electric Blue"] },
  { slug: "powder-electric-blue", name: "Powder + Electric Blue", colors: ["Powder", "Electric Blue"] },
  { slug: "coastal-blue-electric-blue", name: "Coastal Blue + Electric Blue", colors: ["Coastal Blue", "Electric Blue"] },
  { slug: "sage-electric-blue", name: "Sage + Electric Blue", colors: ["Sage", "Electric Blue"] },
  { slug: "cinnamon-electric-blue", name: "Cinnamon + Electric Blue", colors: ["Cinnamon", "Electric Blue"] },
  { slug: "auburn-electric-blue", name: "Auburn + Electric Blue", colors: ["Auburn", "Electric Blue"] },
  { slug: "ruby-electric-blue", name: "Ruby + Electric Blue", colors: ["Ruby", "Electric Blue"] },
  { slug: "moonlight-auburn", name: "Moonlight + Auburn", colors: ["Moonlight", "Auburn"] },
  { slug: "moonlight-ruby", name: "Moonlight + Ruby", colors: ["Moonlight", "Ruby"] },
  { slug: "powder-auburn", name: "Powder + Auburn", colors: ["Powder", "Auburn"] },
  { slug: "coastal-blue-auburn", name: "Coastal Blue + Auburn", colors: ["Coastal Blue", "Auburn"] },
  { slug: "solid-moonlight", name: "Solid Moonlight", colors: ["Moonlight"] },
  { slug: "solid-grasshopper", name: "Solid Sage", colors: ["Sage"] },
  { slug: "solid-fountain-blue", name: "Solid Coastal Blue", colors: ["Coastal Blue"] },
  { slug: "solid-brandied-melon", name: "Solid Cinnamon", colors: ["Cinnamon"] },
  { slug: "solid-powder", name: "Solid Powder", colors: ["Powder"] },
  { slug: "solid-pearl", name: "Solid Pearl", colors: ["Pearl"] },
  { slug: "solid-cherry", name: "Solid Ruby", colors: ["Ruby"] },
  { slug: "solid-electric-blue", name: "Solid Electric Blue", colors: ["Electric Blue"] },
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
  "Auburn",
  "Ruby",
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
