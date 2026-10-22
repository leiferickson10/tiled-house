import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import PageShell from "../components/PageShell";
import ShopTabs from "../components/ShopTabs";
import { MOSAICS, mosaicPhoto } from "../lib/mosaics";

export const metadata: Metadata = {
  title: "Glass Tile Mosaics — Tiled House",
  description:
    "Mixed-color glass tile mosaics in soft blues, greens and clay tones.",
};

export default function MosaicsPage() {
  return (
    <PageShell current="/shop" title="Mosaics">
      <p className="-mt-4 mb-10 max-w-2xl text-lg text-[#4a1d31]/80">
        Sixteen glass tiles, no two rows alike. Soft blues, sage and clay mixed
        by hand into one-of-a-kind 4&Prime; pieces. Want a pattern of your own?{" "}
        <Link href="/custom" className="font-bold underline underline-offset-4 hover:text-[#b15356]">
          Design your own
        </Link>
        .
      </p>

      <ShopTabs current="mosaics" />

      <ul className="grid grid-cols-2 gap-x-5 gap-y-8 sm:grid-cols-3 lg:grid-cols-4">
        {MOSAICS.map((m, i) => (
          <li key={m.slug}>
            <Image
              src={mosaicPhoto(m.slug)}
              alt={`${m.name}, a mixed glass tile mosaic`}
              width={400}
              height={400}
              sizes="(min-width: 1024px) 25vw, (min-width: 640px) 33vw, 50vw"
              priority={i < 4}
              className="aspect-square w-full rounded-[4px] object-cover shadow-[0_12px_24px_-14px_rgba(74,29,49,0.55)]"
            />
            <p className="mt-3 text-sm font-medium leading-snug">{m.name}</p>
          </li>
        ))}
      </ul>
    </PageShell>
  );
}
