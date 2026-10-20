/**
 * The glass mosaic colors currently in stock (American Olean Color Appeal Glass,
 * 1X1 glossy). Hex/RGB values were measured from the supplier's product photos
 * on tilestoreonline.com, so they approximate the real glass rather than match
 * it exactly. Add or remove entries here as stock changes; the designer reads
 * everything from this list.
 */
export type TileColor = {
  sku: string;
  name: string;
  code: string;
  hex: string;
  rgb: [number, number, number];
};

export const TILES: TileColor[] = [
  { sku: "19-C110-11", code: "C110", name: "Dusk", hex: "#577594", rgb: [87, 117, 148] },
  { sku: "19-C106-11", code: "C106", name: "Moonlight", hex: "#B9CECE", rgb: [185, 206, 206] },
  { sku: "19-C116-11", code: "C116", name: "Auburn", hex: "#C5523A", rgb: [197, 82, 58] },
  { sku: "19-C111-11", code: "C111", name: "Grasshopper", hex: "#8DA26E", rgb: [141, 162, 110] },
  { sku: "19-C117-11", code: "C117", name: "Cherry", hex: "#D42E2A", rgb: [212, 46, 42] },
  { sku: "19-C108-11", code: "C108", name: "Fountain Blue", hex: "#7DC1CA", rgb: [125, 193, 202] },
  { sku: "19-C115-11", code: "C115", name: "Brandied Melon", hex: "#B57453", rgb: [181, 116, 83] },
  { sku: "19-C109-11", code: "C109", name: "Powder", hex: "#90B7CB", rgb: [144, 183, 203] },
  { sku: "19-C101-11", code: "C101", name: "Pearl", hex: "#E3E6E3", rgb: [227, 230, 227] },
];
