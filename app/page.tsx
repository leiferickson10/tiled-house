import Image from "next/image";
import type { Metadata } from "next";
import type { CSSProperties, ReactNode } from "react";
import JsonLd from "./components/JsonLd";
import { SITE_NAME, SITE_URL, absoluteUrl } from "./lib/site";
import AboutSection from "./components/AboutSection";
import HomeNav from "./components/HomeNav";
import MeetCreators from "./components/MeetCreators";
import HomeMobile from "./components/HomeMobile";
import InventorySection from "./components/InventorySection";

/*
 * Home page, rebuilt from page 1 of the "TILED HOUSE" Canva design.
 *
 * The design is 1366px wide. Every section keeps the design's aspect ratio and
 * every element is positioned/sized as a percentage of its section, with font
 * sizes in container-query units (cqw), so the page scales as one piece exactly
 * like the Canva layout. Coordinates below are the design's own pixel values.
 */

export const metadata: Metadata = {
  title: "Tiled House — Handmade Glass Tile Coasters & Home Decor",
  description:
    "Tiled House makes handmade glass mosaic tile coasters and home decor. Shop ready-made designs or design your own custom tile coaster.",
  alternates: { canonical: "/" },
};

const siteJsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": `${SITE_URL}/#organization`,
      name: SITE_NAME,
      url: SITE_URL,
      logo: absoluteUrl("/images/home/logo-th.png"),
    },
    {
      "@type": "WebSite",
      "@id": `${SITE_URL}/#website`,
      name: SITE_NAME,
      url: SITE_URL,
      publisher: { "@id": `${SITE_URL}/#organization` },
    },
  ],
};

const W = 1366;

type Sec = { top: number; h: number };

const HEADER: Sec = { top: 0, h: 314 };
const HERO: Sec = { top: 314, h: 494 };
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

export default function Home() {
  return (
    <main id="home" className="flex flex-col" style={DM}>
      <JsonLd data={siteJsonLd} />
      {/* Phones get their own stacked layout; the scaled Canva layout is desktop/tablet only. */}
      <HomeMobile />
      <div className="hidden flex-col md:flex">
        <HomeNav links={NAV} />
        <Header />
        <Hero />
        <InventorySection id="shop" />
        <Section sec={TAIL} bg={COLORS.cream} />
        <AboutSection id="about" shopHref="#shop" gallerySizes="40vw" />
        <MeetCreators id="meet-the-creators" />
      </div>
    </main>
  );
}

// "Studio Tile" and "Tile Cart" tabs intentionally removed.
const NAV = [
  { label: "HOME", href: "#home", active: true },
  { label: "SHOP", href: "/shop" },
  { label: "ABOUT US", href: "#about" },
  { label: "MEET THE CREATORS", href: "#meet-the-creators" },
];

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
          <Image
            src="/images/home/wordmark.png"
            alt="Tiled House"
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
