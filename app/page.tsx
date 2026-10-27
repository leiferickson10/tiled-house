import Image from "next/image";
import type { CSSProperties, ReactNode } from "react";
import AboutGallery from "./components/AboutGallery";
import HomeMobile from "./components/HomeMobile";
import InventoryTile from "./components/InventoryTile";
import TileOverlay from "./components/TileOverlay";

/*
 * Home page, rebuilt from page 1 of the "TILED HOUSE" Canva design.
 *
 * The design is 1366px wide. Every section keeps the design's aspect ratio and
 * every element is positioned/sized as a percentage of its section, with font
 * sizes in container-query units (cqw), so the page scales as one piece exactly
 * like the Canva layout. Coordinates below are the design's own pixel values.
 */

const W = 1366;

type Sec = { top: number; h: number };

const NAV_H = 56;
const HEADER: Sec = { top: 0, h: 314 };
const HERO: Sec = { top: 314, h: 494 };
const ABOUT: Sec = { top: 808, h: 726 };
const PIECES: Sec = { top: 3165, h: 768 };
const TAIL: Sec = { top: 5509, h: 64 };

const COLORS = {
  cream: "#f9f8f0",
  rose: "#b15356",
  gold: "#d3c467",
  tan: "#ce9164",
};

const pct = (v: number, of: number) => `${(v / of) * 100}%`;
const fs = (px: number) => `${(px / W) * 100}cqw`;

const DM = { fontFamily: "var(--font-dm-sans), sans-serif" } as const;
const DISPLAY = { fontFamily: "var(--font-marcellus), serif" } as const;
const HEAVY = {
  fontFamily: "var(--font-fraunces), serif",
  fontWeight: 800,
  lineHeight: 0.9,
  letterSpacing: "-0.026em",
} as const;

function Section({
  id,
  sec,
  bg,
  children,
}: {
  id?: string;
  sec: Sec;
  bg: string;
  children?: ReactNode;
}) {
  return (
    <section
      id={id}
      className="w-full overflow-hidden"
      style={{ background: bg, containerType: "inline-size" }}
    >
      <div
        className="relative w-full"
        style={{ aspectRatio: `${W} / ${sec.h}` }}
      >
        {children}
      </div>
    </section>
  );
}

function Abs({
  sec,
  x,
  y,
  w,
  h,
  className,
  style,
  children,
}: {
  sec: Sec;
  x: number;
  y: number;
  w: number;
  h?: number;
  className?: string;
  style?: CSSProperties;
  children?: ReactNode;
}) {
  return (
    <div
      className={`absolute ${className ?? ""}`}
      style={{
        left: pct(x, W),
        top: pct(y - sec.top, sec.h),
        width: pct(w, W),
        height: h === undefined ? undefined : pct(h, sec.h),
        ...style,
      }}
    >
      {children}
    </div>
  );
}

function Photo({
  sec,
  src,
  alt,
  x,
  y,
  w,
  h,
}: {
  sec: Sec;
  src: string;
  alt: string;
  x: number;
  y: number;
  w: number;
  h: number;
}) {
  return (
    <Abs sec={sec} x={x} y={y} w={w} h={h}>
      <Image src={src} alt={alt} fill sizes="100vw" className="object-fill" />
    </Abs>
  );
}

function Btn({
  sec,
  x,
  y,
  w,
  h,
  bg,
  color,
  href = "#",
  children,
}: {
  sec: Sec;
  x: number;
  y: number;
  w: number;
  h: number;
  bg: string;
  color: string;
  href?: string;
  children: ReactNode;
}) {
  return (
    <Abs sec={sec} x={x} y={y} w={w} h={h}>
      <a
        href={href}
        className="flex h-full w-full items-center justify-center text-center underline hover:opacity-85"
        style={{ ...DM, background: bg, color, fontSize: fs(20), lineHeight: 1.4 }}
      >
        {children}
      </a>
    </Abs>
  );
}

export default function Home() {
  return (
    <main id="home" className="flex flex-col" style={DM}>
      {/* Phones get their own stacked layout; the scaled Canva layout is desktop/tablet only. */}
      <HomeMobile />
      <div className="hidden flex-col md:flex">
        <TopNav />
        <Header />
        <Hero />
        <OneOfAKind />
        <Section sec={TAIL} bg={COLORS.cream} />
        <About />
      </div>
    </main>
  );
}

// "Studio Tile" and "Tile Cart" tabs intentionally removed; the rest are centered.
const NAV = [
  { label: "HOME", href: "#home", active: true },
  { label: "SHOP", href: "/shop", active: false },
  { label: "ABOUT US", href: "#about", active: false },
];

function TopNav() {
  return (
    <nav
      className="w-full"
      style={{
        background: COLORS.gold,
        containerType: "inline-size",
      }}
    >
      <div
        className="flex items-center justify-center"
        style={{ height: fs(NAV_H), gap: fs(34) }}
      >
        {NAV.map((item) => (
          <a
            key={item.href}
            href={item.href}
            style={{
              ...DM,
              fontSize: fs(23.5),
              color: item.active ? "#ffffff" : "rgba(255,255,255,0.62)",
            }}
          >
            {item.label}
          </a>
        ))}
      </div>
    </nav>
  );
}

function Header() {
  return (
    <Section sec={HEADER} bg={COLORS.cream}>
      <Photo
        sec={HEADER}
        src="/images/home/logo-th.png"
        alt="Tiled House logo"
        x={23}
        y={28}
        w={261}
        h={241}
      />
      {/* Centered between the logo's right edge (284) and the page edge (1366). */}
      <Abs sec={HEADER} x={331} y={33} w={988} h={229}>
        <h1 className="relative h-full w-full">
          <span className="sr-only">Tiled House</span>
          <Image
            src="/images/home/wordmark.png"
            alt=""
            fill
            sizes="100vw"
            className="object-fill"
            priority
          />
        </h1>
      </Abs>
    </Section>
  );
}

function Hero() {
  return (
    <Section sec={HERO} bg={COLORS.cream}>
      {/* Canva: 1366x494 photo rectangle with a 6px #b15356 stroke inside its edge */}
      <div
        className="absolute inset-0"
        style={{
          border: `${fs(6)} solid ${COLORS.rose}`,
          boxSizing: "border-box",
        }}
      >
        <Image
          src="/images/home/hero.jpg"
          alt="Glass tile coasters in blue, red and sage beside orange leaves"
          fill
          sizes="100vw"
          className="object-fill"
          priority
        />
      </div>
    </Section>
  );
}

function About() {
  const gap = { marginBottom: fs(27.7) };
  return (
    <Section
      id="about"
      sec={ABOUT}
      bg="linear-gradient(to top right, #b57a50 0%, #cd8e63 45%, #dea781 100%)"
    >
      <Abs sec={ABOUT} x={39.4} y={846} w={622.4}>
        <h2
          className="whitespace-nowrap"
          style={{ ...HEAVY, color: COLORS.rose, fontSize: fs(126) }}
        >
          About Us
        </h2>
      </Abs>
      {/* Centered between the heading's bottom (y 955) and the section's bottom (y 1534) */}
      <Abs sec={ABOUT} x={60} y={1006} w={500}>
        <AboutGallery sizes="37vw" />
      </Abs>
      <Abs sec={ABOUT} x={603.7} y={1007.3} w={674.4}>
        <div
          style={{
            ...DM,
            color: "#f7f4f0",
            fontSize: fs(21.3335),
            lineHeight: 1.3,
          }}
        >
          <p style={gap}>
            <strong>Tiled House</strong> is a Home Decor shop thats all about
            making your home feel like YOU!
          </p>
          <ul className="list-disc" style={{ paddingLeft: fs(32) }}>
            <li style={gap}>
              <a href="#shop" className="underline">
                Shop our one-of-a-kind tile furniture and decor
              </a>
              , handmade with quality ensured.
            </li>
            <li style={gap}>
              <a href="/custom" className="underline">
                Customize a piece
              </a>{" "}
              with your favorite colors and details, personaly selected by you
              to match your home. Leave it to us to hand craft your vision with
              our professional designers!
            </li>
            <li style={gap}>
              <a href="#" className="underline">
                DIY your own
              </a>
              , get creative with one of our DIY kits. Hand make your own
              decor, select the colors materials to match the style you want
              and litterly make your home feel like you!
            </li>
          </ul>
          <p
            className="whitespace-pre text-center"
            style={{ ...gap, fontSize: fs(24), letterSpacing: "0.122em" }}
          >
            {"SHOP IT.       CUSTOMIZE IT.       DIY IT."}
          </p>
          <p className="text-center italic">
            Create something you love and make it yours
          </p>
        </div>
      </Abs>
    </Section>
  );
}

const INVENTORY = [
  { label: "COASTERS", href: "/shop", src: "/images/home/inventory-coasters.jpg", alt: "Teal and gray glass tile coasters on a wooden table" },
  { label: "TRAYS", src: "/images/home/inventory-trays.jpg", alt: "Colorful glass tile tray holding a perfume bottle and a ring dish" },
  { label: "TABLES", src: "/images/home/inventory-tables.jpg", alt: "Tile-wrapped side tables beside a leafy plant" },
  { label: "DECOR", src: "/images/home/inventory-decor.jpg", alt: "Square mosaic tile wall clock" },
];

// Matches the "Shop our Inventory" page of the TILED HOUSE Canva design:
// four labeled photo columns, flush to the bottom of the section.
function OneOfAKind() {
  const colW = 319;
  const gapX = (W - colW * 4) / 3;
  return (
    <Section id="shop" sec={PIECES} bg={COLORS.cream}>
      <Abs sec={PIECES} x={35.5} y={3208} w={760}>
        <h2
          className="whitespace-nowrap"
          style={{
            ...DISPLAY,
            color: COLORS.rose,
            fontSize: fs(48),
            lineHeight: 1.4,
          }}
        >
          SHOP OUR INVENTORY
        </h2>
      </Abs>
      <Btn
        sec={PIECES}
        x={827.3}
        y={3213}
        w={227.4}
        h={58}
        bg="#ddcd71"
        color="#ac5725"
        href="/shop"
      >
        Shop our Inventory
      </Btn>
      <Btn
        sec={PIECES}
        x={1088.2}
        y={3213}
        w={227.4}
        h={58}
        bg="#ddcd71"
        color="#ac5725"
        href="/custom"
      >
        Custom Design your Own!
      </Btn>
      <Abs sec={PIECES} x={35.5} y={3275} w={760}>
        <p style={{ ...DM, color: COLORS.rose, fontSize: fs(22), lineHeight: 1.4 }}>
          New pieces are on the way. Tap one to get early access.
        </p>
      </Abs>
      {INVENTORY.map((item, i) => {
        const x = i * (colW + gapX);
        // Title and photo share one link/button so either one is clickable.
        return (
          <Abs key={item.label} sec={PIECES} x={x} y={3347} w={colW} h={586}>
            <InventoryTile label={item.label} href={item.href}>
              <h3
                className="text-center transition-opacity group-hover:underline group-hover:opacity-70"
                style={{
                  ...DISPLAY,
                  color: "#ddcd71",
                  fontSize: fs(38),
                  lineHeight: fs(48),
                  fontWeight: 400,
                }}
              >
                {item.label}
              </h3>
              <div
                className="relative overflow-hidden"
                style={{ aspectRatio: "319 / 538" }}
              >
                <Image
                  src={item.src}
                  alt={item.alt}
                  fill
                  sizes="25vw"
                  className="object-fill transition-transform duration-300 group-hover:scale-105"
                />
                <TileOverlay
                  badge={item.href ? undefined : "Coming soon"}
                  caption={item.href ? "Shop now ➔" : "Be the first to know ➔"}
                  badgeSize={fs(14)}
                  captionSize={fs(19)}
                />
              </div>
            </InventoryTile>
          </Abs>
        );
      })}
    </Section>
  );
}
