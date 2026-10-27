import Image from "next/image";
import AboutGallery from "./AboutGallery";
import InventoryTile from "./InventoryTile";
import TileOverlay from "./TileOverlay";
import type { CSSProperties, ReactNode } from "react";

/*
 * Phone layout for the home page (shown below 768px; the scaled Canva layout in
 * app/page.tsx is hidden there). Same copy, photos and colors, but real stacked
 * sections with readable text instead of a shrunken 1366px canvas.
 */

const COLORS = {
  cream: "#f9f8f0",
  rose: "#b15356",
  gold: "#d3c467",
};

const DM: CSSProperties = { fontFamily: "var(--font-dm-sans), sans-serif" };
const DISPLAY: CSSProperties = { fontFamily: "var(--font-marcellus), serif" };
const HEAVY: CSSProperties = {
  fontFamily: "var(--font-fraunces), serif",
  fontWeight: 800,
  lineHeight: 0.95,
  letterSpacing: "-0.026em",
};

function Cta({
  href,
  bg,
  color,
  children,
}: {
  href: string;
  bg: string;
  color: string;
  children: ReactNode;
}) {
  return (
    <a
      href={href}
      className="flex min-h-12 items-center justify-center px-5 py-3 text-center text-lg underline active:opacity-85"
      style={{ ...DM, background: bg, color }}
    >
      {children}
    </a>
  );
}

function Photo({
  src,
  alt,
  w,
  h,
  className,
}: {
  src: string;
  alt: string;
  w: number;
  h: number;
  className?: string;
}) {
  return (
    <Image
      src={src}
      alt={alt}
      width={w}
      height={h}
      sizes="(max-width: 768px) 100vw, 0px"
      className={`h-auto w-full ${className ?? ""}`}
    />
  );
}

const INVENTORY = [
  { label: "COASTERS", href: "/shop", src: "/images/home/inventory-coasters.jpg", alt: "Teal and gray glass tile coasters on a wooden table" },
  { label: "TRAYS", src: "/images/home/inventory-trays.jpg", alt: "Colorful glass tile tray holding a perfume bottle and a ring dish" },
  { label: "TABLES", src: "/images/home/inventory-tables.jpg", alt: "Tile-wrapped side tables beside a leafy plant" },
  { label: "DECOR", src: "/images/home/inventory-decor.jpg", alt: "Square mosaic tile wall clock" },
];

export default function HomeMobile() {
  return (
    <div className="md:hidden" style={DM}>
      {/* Nav */}
      <nav
        className="flex h-14 items-center justify-center gap-8 text-lg"
        style={{ background: COLORS.gold }}
      >
        <a href="#home-mobile" className="text-white">
          HOME
        </a>
        <a href="/shop" className="text-white/70">
          SHOP
        </a>
      </nav>

      {/* Header: logo + wordmark */}
      <header
        id="home-mobile"
        className="flex items-center gap-3 px-3 py-4"
        style={{ background: COLORS.cream }}
      >
        <div className="w-[28%] shrink-0">
          <Photo src="/images/home/logo-th.png" alt="Tiled House logo" w={702} h={648} />
        </div>
        <h1 className="min-w-0 flex-1">
          <span className="sr-only">Tiled House</span>
          <Photo src="/images/home/wordmark.png" alt="" w={988} h={229} />
        </h1>
      </header>

      {/* Hero */}
      <div
        className="relative aspect-[4/3] w-full"
        style={{ border: `4px solid ${COLORS.rose}`, boxSizing: "border-box" }}
      >
        <Image
          src="/images/home/hero.jpg"
          alt="Glass tile coasters in blue, red and sage beside orange leaves"
          fill
          sizes="100vw"
          className="object-cover"
          priority
        />
      </div>

      {/* Shop our inventory (matches the Canva "Shop our Inventory" page) */}
      <section
        id="shop-mobile"
        className="pt-10"
        style={{ background: COLORS.cream }}
      >
        <h2
          className="px-6 text-center text-[30px] leading-[1.3]"
          style={{ ...DISPLAY, color: COLORS.rose }}
        >
          SHOP OUR INVENTORY
        </h2>
        <p className="mt-3 px-6 text-center text-[16px]" style={{ color: COLORS.rose }}>
          New pieces are on the way. Tap one to get early access.
        </p>
        <div className="mt-6 space-y-3 px-6">
          <Cta href="/shop" bg="#ddcd71" color="#ac5725">
            Shop our Inventory
          </Cta>
          <Cta href="/custom" bg="#ddcd71" color="#ac5725">
            Custom Design your Own!
          </Cta>
        </div>
        <div className="mt-8 grid grid-cols-2 gap-x-3 gap-y-6 px-6 pb-10">
          {INVENTORY.map((item) => (
            <div key={item.label}>
              <InventoryTile label={item.label} href={item.href}>
                <h3
                  className="mb-2 text-center text-[22px] leading-[1.3] group-active:opacity-70"
                  style={{ ...DISPLAY, color: "#ddcd71", fontWeight: 400 }}
                >
                  {item.label}
                </h3>
                <div className="relative overflow-hidden">
                  <Photo src={item.src} alt={item.alt} w={638} h={1075} />
                  <TileOverlay
                    badge={item.href ? undefined : "Coming soon"}
                    caption={item.href ? "Shop now ➔" : "Be the first to know ➔"}
                    badgeSize="10px"
                    captionSize="12px"
                  />
                </div>
              </InventoryTile>
            </div>
          ))}
        </div>
      </section>

      {/* About */}
      <section
        className="px-6 py-10"
        style={{
          background:
            "linear-gradient(to top right, #b57a50 0%, #cd8e63 45%, #dea781 100%)",
          color: "#f7f4f0",
        }}
      >
        <h2 className="text-[56px]" style={{ ...HEAVY, color: COLORS.rose }}>
          About Us
        </h2>
        <div className="mt-6">
          <AboutGallery sizes="100vw" />
        </div>
        <div className="mt-6 space-y-5 text-[17px] leading-[1.45]">
          <p>
            <strong>Tiled House</strong> is a Home Decor shop thats all about
            making your home feel like YOU!
          </p>
          <ul className="list-disc space-y-4 pl-6">
            <li>
              <a href="#shop-mobile" className="underline">
                Shop our one-of-a-kind tile furniture and decor
              </a>
              , handmade with quality ensured.
            </li>
            <li>
              <a href="/custom" className="underline">
                Customize a piece
              </a>{" "}
              with your favorite colors and details, personaly selected by you to
              match your home. Leave it to us to hand craft your vision with our
              professional designers!
            </li>
            <li>
              <a href="#" className="underline">
                DIY your own
              </a>
              , get creative with one of our DIY kits. Hand make your own decor,
              select the colors materials to match the style you want and
              litterly make your home feel like you!
            </li>
          </ul>
          <p
            className="pt-2 text-center text-xl tracking-[0.12em]"
            style={{ lineHeight: 1.6 }}
          >
            SHOP IT.
            <br />
            CUSTOMIZE IT.
            <br />
            DIY IT.
          </p>
          <p className="text-center italic">
            Create something you love and make it yours
          </p>
        </div>
      </section>
    </div>
  );
}
