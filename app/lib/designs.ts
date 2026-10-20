import { TILES } from "./tiles";

/**
 * Ready-made coaster designs, generated from the in-stock colors in tiles.ts:
 *  - one solid coaster per color            (9)
 *  - one 1x1 checkerboard per color pair    (36, rotations counted once)
 * Adding a color to TILES automatically adds its designs here.
 */
export type Design = {
  id: string;
  name: string;
  kind: "solid" | "checkerboard";
  /** Indexes into TILES used by this design. */
  colors: number[];
  /** 16 entries, row by row, each an index into TILES. */
  grid: number[];
};

const SIZE = 4;
const slug = (s: string) => s.toLowerCase().replace(/\s+/g, "-");

const solids: Design[] = TILES.map((t, i) => ({
  id: `solid-${slug(t.name)}`,
  name: `${t.name} Solid`,
  kind: "solid",
  colors: [i],
  grid: Array(SIZE * SIZE).fill(i),
}));

const checkerboards: Design[] = [];
for (let a = 0; a < TILES.length; a++) {
  for (let b = a + 1; b < TILES.length; b++) {
    checkerboards.push({
      id: `checker-${slug(TILES[a].name)}-${slug(TILES[b].name)}`,
      name: `${TILES[a].name} + ${TILES[b].name} Checkerboard`,
      kind: "checkerboard",
      colors: [a, b],
      grid: Array.from({ length: SIZE * SIZE }, (_, i) =>
        (Math.floor(i / SIZE) + (i % SIZE)) % 2 === 0 ? a : b,
      ),
    });
  }
}

export const DESIGNS: Design[] = [...solids, ...checkerboards];

export const designById = (id: string | undefined) =>
  DESIGNS.find((d) => d.id === id);
