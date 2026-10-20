/**
 * Ready-made coasters that have real product photos (public/images/coasters/).
 * These are their own products, separate from the designer's 9-color palette in
 * tiles.ts, because the photographed coasters use more colors than the designer
 * offers. To add one: drop an 800x800 jpg named <slug>.jpg in that folder and
 * add a line here. Rename "name" to whatever you want customers to see.
 */
export type ReadyMadeCoaster = {
  slug: string;
  name: string;
};

export const READY_MADE: ReadyMadeCoaster[] = [
  { slug: "brown-red", name: "Brown + Red" },
  { slug: "dark-blue-light-blue", name: "Dark Blue + Light Blue" },
  { slug: "dark-blue-teal", name: "Dark Blue + Teal" },
  { slug: "gray-blue-green", name: "Gray Blue + Green" },
  { slug: "gray-blue-red", name: "Gray Blue + Red" },
  { slug: "gray-blue-tan", name: "Gray Blue + Tan" },
  { slug: "gray-blue-teal", name: "Gray Blue + Teal" },
  { slug: "gray-blue-white-2", name: "Gray Blue + White 2" },
  { slug: "gray-blue-white-3", name: "Gray Blue + White 3" },
  { slug: "gray-blue-white", name: "Gray Blue + White" },
  { slug: "green-gray-blue", name: "Green + Gray Blue" },
  { slug: "green-light-blue", name: "Green + Light Blue" },
  { slug: "green-terracotta", name: "Green + Terracotta" },
  { slug: "green-white", name: "Green + White" },
  { slug: "light-blue-dark-blue", name: "Light Blue + Dark Blue" },
  { slug: "light-blue-green", name: "Light Blue + Green" },
  { slug: "light-gray-red", name: "Light Gray + Red" },
  { slug: "light-gray-terracotta", name: "Light Gray + Terracotta" },
  { slug: "pale-blue-gray-blue", name: "Pale Blue + Gray Blue" },
  { slug: "red-light-blue", name: "Red + Light Blue" },
  { slug: "red-orange", name: "Red + Orange" },
  { slug: "red-teal", name: "Red + Teal" },
  { slug: "red-white", name: "Red + White" },
  { slug: "sage-red", name: "Sage + Red" },
  { slug: "teal-dark-blue", name: "Teal + Dark Blue" },
  { slug: "teal-gray-blue", name: "Teal + Gray Blue" },
  { slug: "terracotta-gray-blue", name: "Terracotta + Gray Blue" },
  { slug: "terracotta-light-blue", name: "Terracotta + Light Blue" },
  { slug: "terracotta-orange", name: "Terracotta + Orange" },
  { slug: "terracotta-teal", name: "Terracotta + Teal" },
  { slug: "terracotta-white", name: "Terracotta + White" },
];

export const readyMadeBySlug = (slug: string) =>
  READY_MADE.find((c) => c.slug === slug);

export const readyMadePhoto = (slug: string) => `/images/coasters/${slug}.jpg`;

/** The color words in a coaster's name: "Gray Blue + White 2" -> ["Gray Blue", "White"]. */
export const colorsOf = (c: ReadyMadeCoaster) =>
  c.name.split(" + ").map((s) => s.replace(/\s+\d+$/, "").trim());

/** Every color that appears in the collection, with how many coasters use it. */
export function colorCounts(): { color: string; count: number }[] {
  const counts = new Map<string, number>();
  for (const c of READY_MADE)
    for (const color of new Set(colorsOf(c)))
      counts.set(color, (counts.get(color) ?? 0) + 1);
  return [...counts]
    .map(([color, count]) => ({ color, count }))
    .sort((a, b) => a.color.localeCompare(b.color));
}
