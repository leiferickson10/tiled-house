import type { Metadata } from "next";
import Link from "next/link";
import PageShell from "../components/PageShell";
import ReadyMadeShop from "../components/ReadyMadeShop";
import JsonLd from "../components/JsonLd";
import ShopTabs from "../components/ShopTabs";
import {
  COLOR_HEX,
  READY_MADE,
  colorCounts,
  colorsOf,
  readyMadePhoto,
} from "../lib/coasters";
import { READY_MADE_PRICE_CENTS } from "../lib/shop";
import { SITE_NAME, absoluteUrl } from "../lib/site";

export const metadata: Metadata = {
  title: "Shop Glass Tile Coasters — Tiled House",
  description:
    "Handmade glass tile coasters in checkerboard color combinations. Filter by color, or design your own.",
  alternates: { canonical: "/shop" },
};

// Every ready-made coaster as a schema.org Product, so search engines can show
// the name, photo and price. Prices come from the same constant the cart uses.
const price = (READY_MADE_PRICE_CENTS / 100).toFixed(2);
const productsJsonLd = {
  "@context": "https://schema.org",
  "@type": "ItemList",
  name: "Handmade glass tile coasters",
  itemListElement: READY_MADE.map((c, i) => ({
    "@type": "ListItem",
    position: i + 1,
    item: {
      "@type": "Product",
      name: `${c.name} Glass Tile Coaster`,
      sku: c.slug,
      description: `Handmade 4" x 4" glass mosaic tile coaster in ${c.colors.join(" and ")}.`,
      image: absoluteUrl(readyMadePhoto(c.slug)),
      color: c.colors.join(" / "),
      brand: { "@type": "Brand", name: SITE_NAME },
      offers: {
        "@type": "Offer",
        url: absoluteUrl("/shop"),
        price,
        priceCurrency: "USD",
        availability: "https://schema.org/InStock",
        itemCondition: "https://schema.org/NewCondition",
        seller: { "@type": "Organization", name: SITE_NAME },
      },
    },
  })),
};

export default async function ShopPage({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const { color, deals, solids } = await searchParams;
  const dealsOn = deals === "1";
  const solidsOn = solids === "1";
  const colors = colorCounts();
  // Only accept a color that really exists; anything else shows everything.
  const active = colors.find((c) => c.color === color)?.color;
  const visible = READY_MADE.filter(
    (c) =>
      (!active || colorsOf(c).includes(active)) &&
      (!solidsOn || c.slug.startsWith("solid-")),
  );

  return (
    <PageShell current="/shop" title="Shop">
      <JsonLd data={productsJsonLd} />
      <p className="-mt-4 mb-8 max-w-2xl text-lg text-[#4a1d31]/80">
        Handmade 4&Prime; coasters made from glass mosaic tile. Pick a favorite
        below, or{" "}
        <Link href="/custom" className="font-bold underline underline-offset-4 hover:text-[#b15356]">
          design your own
        </Link>
        .
      </p>

      <ShopTabs current="coasters" />

      {/* Phone-only: the sliders button in the bar is a label for this checkbox, which reveals the color swatches. */}
      <input
        id="color-filter-toggle"
        type="checkbox"
        aria-label="Show color filter"
        className="peer sr-only"
      />
      {/* Phone-only filter bar, styled after Amazon's mobile search filters. */}
      <div className="-mx-6 mb-6 border-b border-[#d5d9d9] bg-white shadow-[0_2px_4px_rgba(15,17,17,0.08)] peer-checked:[&_.color-filter-btn]:border-2 peer-checked:[&_.color-filter-btn]:border-[#0f1111] peer-checked:[&_.color-filter-btn]:bg-[#f0f2f2] sm:hidden">
        <div className="flex items-center gap-2 overflow-x-auto px-3 py-2.5">
          <label
            htmlFor="color-filter-toggle"
            className="color-filter-btn flex h-9 w-[68px] shrink-0 cursor-pointer items-center justify-center rounded-[10px] border border-[#888c8c] text-[#0f1111]"
          >
            <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" aria-hidden="true">
              <path d="M3 7h9M17 7h4M3 17h4M12 17h9" />
              <circle cx="14.5" cy="7" r="2.5" />
              <circle cx="9.5" cy="17" r="2.5" />
            </svg>
          </label>

          <Link
            href={chipHref({ color: active, deals: dealsOn, solids: !solidsOn })}
            scroll={false}
            role="switch"
            aria-checked={solidsOn}
            className="flex shrink-0 items-center gap-2 pl-1 pr-2"
          >
            <span className="text-[17px] font-bold italic leading-none text-[#0f1111]">solids</span>
            <span
              className={`flex h-7 w-[52px] items-center rounded-full border-2 border-[#232f3e] px-[3px] transition ${
                solidsOn ? "justify-end bg-[#232f3e]" : "justify-start bg-white"
              }`}
            >
              <span
                className={`flex h-5 w-5 items-center justify-center rounded-full ${
                  solidsOn ? "bg-white text-[#232f3e]" : "bg-[#232f3e] text-white"
                }`}
              >
                <span className="block h-0.5 w-2 rounded bg-current" />
              </span>
            </span>
          </Link>

          <span className="h-8 w-px shrink-0 bg-[#d5d9d9]" aria-hidden="true" />

          <Link
            href={chipHref({ color: active, deals: !dealsOn, solids: solidsOn })}
            scroll={false}
            aria-current={dealsOn ? "true" : undefined}
            className={`flex h-9 shrink-0 items-center whitespace-nowrap rounded-[10px] px-3.5 text-[15px] leading-none text-[#0f1111] ${
              dealsOn
                ? "border-2 border-[#0f1111] bg-[#f0f2f2] font-medium"
                : "border border-[#888c8c] bg-white"
            }`}
          >
            Today&rsquo;s deals
          </Link>
        </div>
      </div>
      {dealsOn && (
        <p className="-mt-2 mb-6 text-sm text-[#4a1d31]/70 sm:hidden">
          No deals running today. Check back soon.
        </p>
      )}

      <nav id="filter-by-color" aria-label="Filter by color" className="mb-10 hidden sm:block peer-checked:block">
        <p className="mb-3 text-sm font-bold uppercase tracking-[0.12em] text-[#b15356]">
          Filter by color
        </p>
        <div className="flex flex-wrap gap-x-3 gap-y-4">
          <Swatch href={chipHref({ deals: dealsOn, solids: solidsOn })} active={!active} label="All" count={READY_MADE.length} />
          {colors.map(({ color: c, count }) => (
            <Swatch
              key={c}
              href={chipHref({ color: c, deals: dealsOn, solids: solidsOn })}
              active={active === c}
              label={c}
              count={count}
              hex={COLOR_HEX[c]}
            />
          ))}
        </div>
      </nav>

      <p className="mb-6 text-sm text-[#4a1d31]/60" aria-live="polite">
        Showing {visible.length} of {READY_MADE.length} coasters
        {active ? ` with ${active}` : ""}{solidsOn ? ", solids only" : ""}
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

/** Shop URL for the next filter-bar state, keeping the other filters. */
function chipHref(next: { color?: string; deals: boolean; solids: boolean }): string {
  const params = new URLSearchParams();
  if (next.color) params.set("color", next.color);
  if (next.deals) params.set("deals", "1");
  if (next.solids) params.set("solids", "1");
  const qs = params.toString();
  return qs ? `/shop?${qs}` : "/shop";
}

/** A round color dot with its name underneath. No hex means the "All" option. */
function Swatch({
  href,
  active,
  label,
  count,
  hex,
}: {
  href: string;
  active: boolean;
  label: string;
  count: number;
  hex?: string;
}) {
  return (
    <Link
      href={href}
      scroll={false}
      title={`${label} (${count})`}
      aria-label={`${label}, ${count} coasters`}
      aria-current={active ? "page" : undefined}
      className="group flex w-16 flex-col items-center gap-1.5 text-center"
    >
      <span
        className={`flex h-11 w-11 items-center justify-center rounded-full border border-[#4a1d31]/20 transition ${
          active
            ? "ring-2 ring-[#b15356] ring-offset-2 ring-offset-[#f9f8f0]"
            : "group-hover:ring-2 group-hover:ring-[#b15356]/40 group-hover:ring-offset-2 group-hover:ring-offset-[#f9f8f0]"
        }`}
        style={
          hex
            ? { backgroundColor: hex }
            : {
                backgroundImage:
                  "conic-gradient(#b3382f, #e08a3c, #4f7a4a, #2f8a8a, #1f3a5f, #b3382f)",
              }
        }
      >
        {active && (
          <svg
            viewBox="0 0 20 20"
            className="h-5 w-5 drop-shadow"
            fill="none"
            stroke={hex && isLight(hex) ? "#4a1d31" : "#fff"}
            strokeWidth="2.5"
            aria-hidden="true"
          >
            <path d="M4 10.5l4 4 8-9" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        )}
      </span>
      <span
        className={`text-xs leading-tight ${
          active ? "font-bold text-[#b15356]" : "text-[#4a1d31]/80"
        }`}
      >
        {label}
        <span className="block text-[10px] text-[#4a1d31]/50">{count}</span>
      </span>
    </Link>
  );
}

/** Rough perceived brightness, so the checkmark stays visible on pale swatches. */
function isLight(hex: string): boolean {
  const n = parseInt(hex.slice(1), 16);
  const r = (n >> 16) & 255;
  const g = (n >> 8) & 255;
  const b = n & 255;
  return 0.299 * r + 0.587 * g + 0.114 * b > 170;
}
