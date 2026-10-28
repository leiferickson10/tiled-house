import Image from "next/image";
import InventoryTile from "./InventoryTile";
import TileOverlay from "./TileOverlay";

/*
 * "Shop our Inventory" section, shared by the desktop/tablet and phone home
 * layouts. Coasters links to /shop; the other tiles open the early-access popup
 * (see InventoryTile). Photos are cropped to 3:5 portrait, so new images only
 * need that shape, no code changes.
 */

const SERIF = { fontFamily: "var(--font-cormorant), serif", fontWeight: 400 } as const;
const DM = { fontFamily: "var(--font-dm-sans), sans-serif" } as const;

const ROSE = "#B04F57";

const INVENTORY = [
  { label: "COASTERS", href: "/shop", src: "/images/home/inventory-coasters.jpg", alt: "Teal and gray glass tile coasters on a wooden table" },
  { label: "TRAYS", src: "/images/home/inventory-trays.jpg", alt: "Colorful glass tile tray holding a perfume bottle and a ring dish" },
  { label: "TABLES", src: "/images/home/inventory-tables.jpg", alt: "Tile-wrapped side tables beside a leafy plant" },
  { label: "DECOR", src: "/images/home/inventory-decor.jpg", alt: "Square mosaic tile wall clock" },
];

export default function InventorySection({ id }: { id: string }) {
  return (
    <section
      id={id}
      className="px-[30px] pb-0 pt-10"
      style={{ background: "#DECDBA", borderBottom: "10px solid #D2C858" }}
    >
      <div className="flex flex-col gap-6 md:flex-row md:items-start md:justify-between">
        <div>
          <h2
            className="uppercase"
            style={{
              ...SERIF,
              color: ROSE,
              fontSize: "clamp(36px, 4vw, 52px)",
              lineHeight: 1.2,
            }}
          >
            Shop our Inventory
          </h2>
          <p
            className="ml-[18px] uppercase"
            style={{ ...SERIF, color: ROSE, fontSize: 28, lineHeight: 1.3 }}
          >
            One-of-a-kind pieces
          </p>
        </div>
        <a
          href="/custom"
          className="self-start underline hover:opacity-85"
          style={{
            ...DM,
            background: "#B34F58",
            color: "#fff",
            fontSize: 20,
            padding: 18,
            borderRadius: 0,
          }}
        >
          Custom design your own
        </a>
      </div>

      <div className="mt-[60px] grid grid-cols-1 gap-[30px] sm:grid-cols-2 lg:grid-cols-4">
        {INVENTORY.map((item) => (
          <InventoryTile key={item.label} label={item.label} href={item.href}>
            <h3
              className="mb-3 text-center uppercase transition-opacity group-hover:underline group-hover:opacity-70"
              style={{ ...SERIF, color: ROSE, fontSize: 36, lineHeight: 1.3 }}
            >
              {item.label}
            </h3>
            <div
              className="relative w-full overflow-hidden"
              style={{ aspectRatio: "3 / 5", border: "4px solid #F3EDE3" }}
            >
              <Image
                src={item.src}
                alt={item.alt}
                fill
                sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"
                className="object-cover transition-transform duration-300 group-hover:scale-105"
              />
              <TileOverlay
                badge={item.href ? undefined : "Coming soon"}
                caption={item.href ? "Shop now ➔" : "Be the first to know ➔"}
                badgeSize="12px"
                captionSize="16px"
              />
            </div>
          </InventoryTile>
        ))}
      </div>
    </section>
  );
}
