import Image from "next/image";
import type { CSSProperties, ReactNode } from "react";

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
const STAPLES: Sec = { top: 1534, h: 795 };
const TILES: Sec = { top: 2329, h: 836 };
const PIECES: Sec = { top: 3165, h: 836 };
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
      <TopNav />
      <Header />
      <Hero />
      <About />
      <Staples />
      <AllThingsTile />
      <OneOfAKind />
      <Section sec={TAIL} bg={COLORS.cream} />
    </main>
  );
}

// "Studio Tile" and "Tile Cart" tabs intentionally removed; the rest are centered.
const NAV = [
  { label: "HOME", href: "#home", active: true },
  { label: "SHOP", href: "#shop", active: false },
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
        src="/images/home/logo.jpg"
        alt="Tiled House logo"
        x={23}
        y={32}
        w={261}
        h={233}
      />
      <Abs sec={HEADER} x={310} y={24} w={740} h={265}>
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
      <Btn
        sec={HEADER}
        x={1103.8}
        y={62.3}
        w={189.2}
        h={66}
        bg={COLORS.rose}
        color={COLORS.cream}
        href="#shop"
      >
        View our Inventory
      </Btn>
      <Btn
        sec={HEADER}
        x={1103.8}
        y={156.5}
        w={196.2}
        h={66}
        bg={COLORS.rose}
        color="#f7f4f0"
        href="/custom"
      >
        Custom Design your own decor
      </Btn>
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
          alt="Glass tile coasters with pink carnations"
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
      <Btn
        sec={ABOUT}
        x={141.1}
        y={1249.6}
        w={284.2}
        h={72.6}
        bg="#ddcd71"
        color="#a75e54"
        href="#shop"
      >
        Shop our Inventory
      </Btn>
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

// Hand-drawn style wobble for the grid lines behind "the staples" section.
function wobble(
  from: [number, number],
  to: [number, number],
  seed: number,
): string {
  const steps = 18;
  const pts: string[] = [];
  for (let i = 0; i <= steps; i++) {
    const t = i / steps;
    const x = from[0] + (to[0] - from[0]) * t;
    const y = from[1] + (to[1] - from[1]) * t;
    const vertical = from[0] === to[0];
    const off = Math.sin(i * 1.9 + seed) * 3.2;
    pts.push(`${i === 0 ? "M" : "L"}${(vertical ? x + off : x).toFixed(1)} ${(vertical ? y : y + off).toFixed(1)}`);
  }
  return pts.join(" ");
}

const GRID_X = [80, 210, 335, 455, 563, 676];
const GRID_Y = [105, 228, 350, 472, 592, 712];

function Staples() {
  return (
    <Section sec={STAPLES} bg={COLORS.rose}>
      <svg
        className="absolute left-0 top-0 h-full"
        style={{ width: pct(701, W) }}
        viewBox="0 0 701 795"
        preserveAspectRatio="none"
        fill="none"
        stroke="#7b3237"
        strokeWidth={9}
        strokeLinecap="round"
        aria-hidden="true"
      >
        {GRID_X.map((x, i) => (
          <path key={`v${x}`} d={wobble([x, -10], [x, 800], i * 1.3)} />
        ))}
        {GRID_Y.map((y, i) => (
          <path key={`h${y}`} d={wobble([-10, y], [701, y], i * 2.1)} />
        ))}
      </svg>
      <Photo
        sec={STAPLES}
        src="/images/home/staples-photo.jpg"
        alt="Glass checkerboard tile coasters on linen"
        x={793}
        y={1661}
        w={447}
        h={572}
      />
      <Photo
        sec={STAPLES}
        src="/images/home/staples-coasters.jpg"
        alt="Red glass tile coasters"
        x={398}
        y={1866}
        w={314}
        h={418}
      />
      <Abs sec={STAPLES} x={23.3} y={1672} w={650}>
        <h2
          className="whitespace-nowrap"
          style={{ ...HEAVY, color: "#f7f4f0", fontSize: fs(71.5) }}
        >
          the staples
          <br />
          behind our name
        </h2>
      </Abs>
      <Btn
        sec={STAPLES}
        x={61.2}
        y={2066}
        w={271.2}
        h={61.1}
        bg="#b7b387"
        color="#ffffff"
      >
        Shop the Shore Shop.
      </Btn>
    </Section>
  );
}

function AllThingsTile() {
  return (
    <Section sec={TILES} bg={COLORS.gold}>
      <Abs sec={TILES} x={58.6} y={2438} w={371}>
        <h2
          className="whitespace-nowrap text-center"
          style={{
            ...DISPLAY,
            color: "#ffffff",
            fontSize: fs(42.67),
            lineHeight: 1.3,
          }}
        >
          ALL THINGS TILE!
        </h2>
      </Abs>
      <Photo
        sec={TILES}
        src="/images/home/tile-left.jpg"
        alt="Mosaic tile coasters on a wooden table"
        x={65}
        y={2514}
        w={262}
        h={466}
      />
      <Btn
        sec={TILES}
        x={350.6}
        y={2514.3}
        w={227.4}
        h={58}
        bg={COLORS.cream}
        color={COLORS.gold}
        href="#shop"
      >
        Shop our Tile Pieces
      </Btn>
      <Photo
        sec={TILES}
        src="/images/home/tile-1.jpg"
        alt="Mosaic tile tray with a candle and plant"
        x={597}
        y={2400}
        w={349}
        h={340}
      />
      <Photo
        sec={TILES}
        src="/images/home/tile-2.jpg"
        alt="Green mosaic tile picture frame"
        x={958}
        y={2400}
        w={349}
        h={340}
      />
      <Photo
        sec={TILES}
        src="/images/home/tile-3.jpg"
        alt="Tile serving tray with a cup of tea"
        x={597}
        y={2751}
        w={349}
        h={340}
      />
      <Photo
        sec={TILES}
        src="/images/home/tile-4.jpg"
        alt="Green and white tile coasters"
        x={957}
        y={2751}
        w={350}
        h={340}
      />
    </Section>
  );
}

function OneOfAKind() {
  return (
    <Section id="shop" sec={PIECES} bg={COLORS.cream}>
      <Abs sec={PIECES} x={44.6} y={3285.5} w={754.4}>
        <h2
          className="whitespace-nowrap"
          style={{
            ...DISPLAY,
            color: "#ddcd71",
            fontSize: fs(45),
            lineHeight: 1.4,
          }}
        >
          ONE-OF-A-KIND PIECES
        </h2>
      </Abs>
      <Btn
        sec={PIECES}
        x={827.3}
        y={3309.8}
        w={227.4}
        h={58}
        bg="#ddcd71"
        color="#ac5725"
      >
        Shop our Tile Pieces
      </Btn>
      <Btn
        sec={PIECES}
        x={1088.2}
        y={3309.8}
        w={227.4}
        h={66}
        bg="#ddcd71"
        color="#ac5725"
        href="/custom"
      >
        Custom Design your Own!
      </Btn>
      <Photo
        sec={PIECES}
        src="/images/home/gallery.jpg"
        alt="Tile wall art, tile side tables, a tile clock and a tile cabinet"
        x={0}
        y={3435}
        w={W}
        h={566}
      />
    </Section>
  );
}
