import type { Metadata } from "next";
import Link from "next/link";
import PageShell from "../components/PageShell";
import ReadyMadeShop from "../components/ReadyMadeShop";
import { READY_MADE, colorCounts, colorsOf } from "../lib/coasters";

export const metadata: Metadata = {
  title: "Shop Glass Tile Coasters — Tiled House",
  description:
    "Handmade glass tile coasters in checkerboard color combinations. Filter by color, or design your own.",
};

export default async function ShopPage({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const { color } = await searchParams;
  const colors = colorCounts();
  // Only accept a color that really exists; anything else shows everything.
  const active = colors.find((c) => c.color === color)?.color;
  const visible = active
    ? READY_MADE.filter((c) => colorsOf(c).includes(active))
    : READY_MADE;

  return (
    <PageShell current="/shop" title="Shop">
      <p className="-mt-4 mb-8 max-w-2xl text-lg text-[#4a1d31]/80">
        Handmade 4&Prime; coasters made from glass mosaic tile. Pick a favorite
        below, or{" "}
        <Link href="/custom" className="font-bold underline underline-offset-4 hover:text-[#b15356]">
          design your own
        </Link>
        .
      </p>

      <nav aria-label="Filter by color" className="mb-10">
        <p className="mb-3 text-sm font-bold uppercase tracking-[0.12em] text-[#b15356]">
          Filter by color
        </p>
        <div className="flex flex-wrap gap-2">
          <Chip href="/shop" active={!active}>
            All ({READY_MADE.length})
          </Chip>
          {colors.map(({ color: c, count }) => (
            <Chip key={c} href={`/shop?color=${encodeURIComponent(c)}`} active={active === c}>
              {c} ({count})
            </Chip>
          ))}
        </div>
      </nav>

      <p className="mb-6 text-sm text-[#4a1d31]/60" aria-live="polite">
        Showing {visible.length} of {READY_MADE.length} coasters
        {active ? ` with ${active}` : ""}
      </p>

      <ReadyMadeShop coasters={visible} />

      <section className="mt-16 rounded-lg bg-white/70 p-8 text-center shadow-sm">
        <h2
          className="text-3xl text-[#b15356]"
          style={{ fontFamily: "var(--font-fraunces), serif", fontWeight: 800 }}
        >
          Want your own colors?
        </h2>
        <p className="mx-auto mt-3 max-w-md text-[#4a1d31]/80">
          Paint a 4&times;4 tile coaster one tile at a time in our designer.
        </p>
        <Link
          href="/custom"
          className="mt-5 inline-block rounded-full bg-[#b15356] px-6 py-3 font-bold text-[#f9f8f0] transition hover:bg-[#9a4347]"
        >
          Design your own
        </Link>
      </section>
    </PageShell>
  );
}

function Chip({
  href,
  active,
  children,
}: {
  href: string;
  active: boolean;
  children: React.ReactNode;
}) {
  return (
    <Link
      href={href}
      scroll={false}
      aria-current={active ? "page" : undefined}
      className={`rounded-full border px-3.5 py-1.5 text-sm transition ${
        active
          ? "border-[#b15356] bg-[#b15356] text-[#f9f8f0]"
          : "border-[#b15356]/40 text-[#4a1d31] hover:border-[#b15356]"
      }`}
    >
      {children}
    </Link>
  );
}
