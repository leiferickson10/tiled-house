/**
 * Photographed mosaics for the Mosaics page (public/images/mosaics/). These are
 * random 4x4 mixes of the in-stock glass colors, not checkerboards, so they are
 * kept apart from READY_MADE in coasters.ts and are not in the cart yet.
 * To add one: drop an 800x800 jpg named <slug>.jpg in that folder and add its
 * slug here.
 */
export type Mosaic = {
  slug: string;
  name: string;
};

const slugs = [
  "mosaic-01",
  "mosaic-02",
  "mosaic-03",
  "mosaic-04",
  "mosaic-05",
  "mosaic-06",
  "mosaic-07",
  "mosaic-08",
  "mosaic-09",
  "mosaic-10",
];

export const MOSAICS: Mosaic[] = slugs.map((slug, i) => ({
  slug,
  name: `Mosaic ${String(i + 1).padStart(2, "0")}`,
}));

export const mosaicPhoto = (slug: string) => `/images/mosaics/${slug}.jpg`;
