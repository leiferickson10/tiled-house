import Image from "next/image";
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
          <Photo src="/images/home/logo.jpg" alt="Tiled House logo" w={261} h={233} />
        </div>
        <h1 className="min-w-0 flex-1">
          <span className="sr-only">Tiled House</span>
          <Photo src="/images/home/wordmark.png" alt="" w={740} h={265} />
        </h1>
      </header>

      {/* Hero */}
      <div
        className="relative aspect-[4/3] w-full"
        style={{ border: `4px solid ${COLORS.rose}`, boxSizing: "border-box" }}
      >
        <Image
          src="/images/home/hero.jpg"
          alt="Glass tile coasters with pink carnations"
          fill
          sizes="100vw"
          className="object-cover"
          priority
        />
      </div>

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
        <div className="mt-8">
          <Cta href="/shop" bg="#ddcd71" color="#a75e54">
            Shop our Inventory
          </Cta>
        </div>
      </section>

      {/* The staples */}
      <section className="px-6 py-10" style={{ background: COLORS.rose }}>
        <h2 className="text-[34px]" style={{ ...HEAVY, color: "#f7f4f0" }}>
          the staples
          <br />
          behind our name
        </h2>
        <div className="mt-6 grid grid-cols-[1.4fr_1fr] items-end gap-3">
          <Photo
            src="/images/home/staples-photo.jpg"
            alt="Glass checkerboard tile coasters on linen"
            w={447}
            h={572}
          />
          <Photo
            src="/images/home/staples-coasters.jpg"
            alt="Red glass tile coasters"
            w={314}
            h={418}
          />
        </div>
        <div className="mt-6">
          <Cta href="#" bg="#b7b387" color="#ffffff">
            Shop the Shore Shop.
          </Cta>
        </div>
      </section>

      {/* All things tile */}
      <section className="px-6 py-10" style={{ background: COLORS.gold }}>
        <h2
          className="text-center text-[34px] leading-[1.3]"
          style={{ ...DISPLAY, color: "#ffffff" }}
        >
          ALL THINGS TILE!
        </h2>
        <div className="mt-6 grid grid-cols-2 gap-3">
          <Photo
            src="/images/home/tile-1.jpg"
            alt="Mosaic tile tray with a candle and plant"
            w={349}
            h={340}
          />
          <Photo
            src="/images/home/tile-2.jpg"
            alt="Green mosaic tile picture frame"
            w={349}
            h={340}
          />
          <Photo
            src="/images/home/tile-3.jpg"
            alt="Tile serving tray with a cup of tea"
            w={349}
            h={340}
          />
          <Photo
            src="/images/home/tile-4.jpg"
            alt="Green and white tile coasters"
            w={350}
            h={340}
          />
        </div>
        <div className="mx-auto mt-3 w-2/3">
          <Photo
            src="/images/home/tile-left.jpg"
            alt="Mosaic tile coasters on a wooden table"
            w={262}
            h={466}
          />
        </div>
        <div className="mt-6">
          <Cta href="#shop-mobile" bg={COLORS.cream} color={COLORS.gold}>
            Shop our Tile Pieces
          </Cta>
        </div>
      </section>

      {/* One-of-a-kind pieces */}
      <section
        id="shop-mobile"
        className="pt-10"
        style={{ background: COLORS.cream }}
      >
        <h2
          className="px-6 text-center text-[30px] leading-[1.3]"
          style={{ ...DISPLAY, color: "#ddcd71" }}
        >
          ONE-OF-A-KIND PIECES
        </h2>
        <div className="mt-6 space-y-3 px-6">
          <Cta href="#" bg="#ddcd71" color="#ac5725">
            Shop our Tile Pieces
          </Cta>
          <Cta href="/custom" bg="#ddcd71" color="#ac5725">
            Custom Design your Own!
          </Cta>
        </div>
        <div className="mt-8">
          <Photo
            src="/images/home/gallery.jpg"
            alt="Tile wall art, tile side tables, a tile clock and a tile cabinet"
            w={1366}
            h={566}
          />
        </div>
      </section>
    </div>
  );
}
