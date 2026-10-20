import type { Metadata } from "next";
import Link from "next/link";
import DesignGallery from "../components/DesignGallery";
import SiteNav from "../components/SiteNav";
import { DESIGNS } from "../lib/designs";

export const metadata: Metadata = {
  title: "Ready-Made Glass Tile Coasters — Tiled House",
  description:
    "Browse solid and checkerboard glass tile coasters in every color combination we have in stock, then customize any design.",
};

export default function DesignsPage() {
  return (
    <main
      className="flex min-h-screen flex-col bg-[#f9f8f0] text-[#4a1d31]"
      style={{ fontFamily: "var(--font-dm-sans), sans-serif" }}
    >
      <SiteNav current="/designs" />
      <div className="mx-auto w-full max-w-6xl px-6 py-12 sm:px-10 sm:py-16">
        <header className="mb-12 max-w-2xl">
          <h1
            className="text-5xl text-[#b15356] sm:text-7xl"
            style={{
              fontFamily: "var(--font-fraunces), serif",
              fontWeight: 800,
              lineHeight: 0.95,
              letterSpacing: "-0.026em",
            }}
          >
            Ready-made coasters
          </h1>
          <p className="mt-5 text-lg text-[#4a1d31]/80">
            {DESIGNS.length} designs: every solid color and every two-color
            checkerboard from the glass we have in stock. Pick one to customize,
            or start from scratch in the designer.
          </p>
          <p className="mt-3 text-sm">
            <Link href="/shop" className="underline underline-offset-4 hover:text-[#b15356]">
              Looking for our photographed coasters? Visit the shop
            </Link>
          </p>
        </header>
        <DesignGallery />
      </div>
    </main>
  );
}
