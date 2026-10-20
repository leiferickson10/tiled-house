import type { Metadata } from "next";
import Link from "next/link";
import CoasterDesigner from "../components/CoasterDesigner";
import SiteNav from "../components/SiteNav";
import { designById } from "../lib/designs";

export const metadata: Metadata = {
  title: "Design Your Own Coaster — Tiled House",
  description:
    "Design a custom glass tile coaster. Pick from our in-stock glass mosaic colors and paint a 4x4 tile design.",
};

export default async function CustomPage({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const { design } = await searchParams;
  const start = designById(typeof design === "string" ? design : undefined);

  return (
    <main
      className="flex min-h-screen flex-col bg-[#f9f8f0] text-[#4a1d31]"
      style={{ fontFamily: "var(--font-dm-sans), sans-serif" }}
    >
      <SiteNav current="/custom" />

      <div className="mx-auto w-full max-w-6xl px-6 py-12 sm:px-10 sm:py-16">
        <header className="mb-10 max-w-2xl">
          <h1
            className="text-5xl text-[#b15356] sm:text-7xl"
            style={{
              fontFamily: "var(--font-fraunces), serif",
              fontWeight: 800,
              lineHeight: 0.95,
              letterSpacing: "-0.026em",
            }}
          >
            Design your own coaster
          </h1>
          <p className="mt-5 text-lg text-[#4a1d31]/80">
            {start
              ? `Starting from “${start.name}”. Change any tile you like.`
              : "Pick from the glass tile colors we have in stock and paint your own 4-inch coaster, one tile at a time."}
          </p>
          <p className="mt-3 text-sm">
            <Link href="/designs" className="underline underline-offset-4 hover:text-[#b15356]">
              Or browse ready-made designs
            </Link>
          </p>
        </header>

        {/* key forces a fresh designer when the starting design changes */}
        <CoasterDesigner key={start?.id ?? "blank"} initialGrid={start?.grid} />
      </div>
    </main>
  );
}
