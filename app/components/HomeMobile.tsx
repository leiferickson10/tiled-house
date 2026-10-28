import Image from "next/image";
import AboutSection from "./AboutSection";
import HomeNav from "./HomeNav";
import MeetCreators from "./MeetCreators";
import InventorySection from "./InventorySection";
import type { CSSProperties } from "react";

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
      <HomeNav
        links={[
          { label: "HOME", href: "#home-mobile", active: true },
          { label: "SHOP", href: "/shop" },
          { label: "ABOUT US", href: "#about-mobile" },
          { label: "MEET THE CREATORS", href: "#meet-the-creators-mobile" },
        ]}
      />

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
          <Photo src="/images/home/wordmark.png" alt="Tiled House" w={988} h={229} />
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

      <InventorySection id="shop-mobile" />

      <AboutSection id="about-mobile" shopHref="#shop-mobile" gallerySizes="100vw" />
      <MeetCreators id="meet-the-creators-mobile" />
    </div>
  );
}
