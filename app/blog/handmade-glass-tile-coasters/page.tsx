import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import JsonLd from "../../components/JsonLd";
import PageShell from "../../components/PageShell";
import { SITE_NAME, absoluteUrl } from "../../lib/site";

export const metadata: Metadata = {
  title: "Handmade Glass Tile Coasters: Design Your Own | Tiled House",
  description:
    "Handmade 4-inch glass mosaic tile coasters in nine colors. Shop ready-made designs or paint your own, one tile at a time.",
  alternates: { canonical: "/blog/handmade-glass-tile-coasters" },
  openGraph: {
    type: "article",
    siteName: SITE_NAME,
    locale: "en_US",
    title: "Handmade Glass Tile Coasters: Design Your Own | Tiled House",
    description:
      "Handmade 4-inch glass mosaic tile coasters in nine colors. Shop ready-made designs or paint your own, one tile at a time.",
    url: "/blog/handmade-glass-tile-coasters",
    publishedTime: "2026-10-27",
    images: [
      {
        url: "/images/home/hero.jpg",
        width: 2708,
        height: 979,
        alt: "Handmade glass tile coasters in blue, red and sage green beside orange leaves",
      },
    ],
  },
};

const postJsonLd = {
  "@context": "https://schema.org",
  "@type": "BlogPosting",
  headline: "Handmade Glass Tile Coasters: Shop Ready-Made or Design Your Own",
  description:
    "Handmade 4-inch glass mosaic tile coasters in nine colors. Shop ready-made designs or paint your own, one tile at a time.",
  image: absoluteUrl("/images/home/hero.jpg"),
  datePublished: "2026-10-27",
  mainEntityOfPage: absoluteUrl("/blog/handmade-glass-tile-coasters"),
  author: { "@type": "Organization", name: SITE_NAME },
  publisher: { "@type": "Organization", name: SITE_NAME },
};

const linkClass =
  "font-bold underline underline-offset-4 hover:text-[#b15356]";

const h2Class = "mt-12 mb-4 text-3xl text-[#b15356]";
const h2Style = {
  fontFamily: "var(--font-fraunces), serif",
  fontWeight: 800,
  letterSpacing: "-0.02em",
} as const;

const captionClass = "mt-2 text-sm italic text-[#4a1d31]/60";

function Figure({
  src,
  alt,
  width,
  height,
  caption,
  priority,
}: {
  src: string;
  alt: string;
  width: number;
  height: number;
  caption: string;
  priority?: boolean;
}) {
  return (
    <figure className="my-8">
      <Image
        src={src}
        alt={alt}
        width={width}
        height={height}
        sizes="(min-width: 768px) 672px, 100vw"
        priority={priority}
        className="h-auto w-full rounded-sm"
      />
      <figcaption className={captionClass}>{caption}</figcaption>
    </figure>
  );
}

const SWATCHES = [
  { name: "Pearl", file: "pearl" },
  { name: "Moonlight", file: "moonlight" },
  { name: "Powder", file: "powder" },
  { name: "Fountain Blue", file: "fountain-blue" },
  { name: "Hawaiian Ocean", file: "hawaiian-ocean" },
  { name: "Grasshopper", file: "grasshopper" },
  { name: "Brandied Melon", file: "brandied-melon" },
  { name: "Auburn", file: "auburn" },
  { name: "Cherry", file: "cherry" },
];

const PAIRINGS = [
  {
    name: "Pearl + Brandied Melon",
    file: "pearl-brandied-melon",
    alt: "Overhead view of a glass tile coaster in a checkerboard of pale gray and terracotta",
  },
  {
    name: "Moonlight + Fountain Blue",
    file: "moonlight-fountain-blue",
    alt: "Overhead view of a glass tile coaster in a checkerboard of pale blue and teal",
  },
  {
    name: "Solid Grasshopper",
    file: "solid-grasshopper",
    alt: "Overhead view of a glass tile coaster made entirely of sage green tiles",
  },
];

export default function HandmadeGlassTileCoastersPost() {
  return (
    <PageShell
      current="/blog"
      title="Handmade Glass Tile Coasters: Shop Ready-Made or Design Your Own"
    >
      <JsonLd data={postJsonLd} />
      <article className="max-w-2xl space-y-5 text-lg leading-relaxed text-[#4a1d31]/90">
        <p className="-mt-4 italic text-[#4a1d31]/70">
          Tiled House makes handmade glass mosaic coasters in soft blues, sage,
          clay and cherry red. Here&rsquo;s what goes into them, and how to make
          a set that looks like your home.
        </p>

        <Figure
          src="/images/home/hero.jpg"
          alt="Handmade glass tile coasters in blue, red and sage green beside orange leaves"
          width={2708}
          height={979}
          caption="Handmade glass mosaic coasters in blue, sage and red."
          priority
        />

        <p>
          Every home has a spot where a drink gets set down, and a ring gets
          left behind. We make <strong>handmade glass tile coasters</strong> so
          that spot looks as good as the rest of your room.
        </p>

        <h2 className={h2Class} style={h2Style}>
          What is a glass tile coaster?
        </h2>
        <p>
          Each Tiled House coaster is a 4&Prime; &times; 4&Prime; square made
          from <strong>16 glass mosaic tiles</strong>, set by hand with grout in
          between. Light passes through glass tile and bounces off it, so the
          colors look deeper than paint or ceramic. [Add what the backing is
          made of, e.g. cork or felt, and whether the coasters are heat-safe
          and water-safe.]
        </p>
        <p>No two coasters have to match. That&rsquo;s the point of mosaic.</p>

        <Figure
          src="/images/coasters/green-light-blue.jpg"
          alt="Overhead view of a 4 by 4 glass mosaic coaster in alternating sage green and light blue tiles"
          width={800}
          height={800}
          caption="Sixteen glass tiles, set by hand with grout in between."
        />

        <h2 className={h2Class} style={h2Style}>
          Nine colors to mix
        </h2>
        <p>
          Our glass tiles come in nine colors, from quiet neutrals to bold
          accents:
        </p>
        <ul className="list-disc space-y-2 pl-6">
          <li>
            <strong>Pearl</strong> and <strong>Moonlight</strong>: soft whites
            and pale grays
          </li>
          <li>
            <strong>Powder</strong>, <strong>Fountain Blue</strong> and{" "}
            <strong>Hawaiian Ocean</strong>: light sky blue to deep teal
          </li>
          <li>
            <strong>Grasshopper</strong>: a muted sage green
          </li>
          <li>
            <strong>Brandied Melon</strong> and <strong>Auburn</strong>: warm
            terracotta and clay
          </li>
          <li>
            <strong>Cherry</strong>: a bright, glossy red
          </li>
        </ul>

        <figure className="my-8">
          <ul className="grid grid-cols-3 gap-3">
            {SWATCHES.map((c) => (
              <li key={c.file}>
                <Image
                  src={`/images/tiles/${c.file}.jpg`}
                  alt={`Close-up of a ${c.name} glass mosaic tile`}
                  width={200}
                  height={200}
                  sizes="(min-width: 768px) 210px, 30vw"
                  className="h-auto w-full rounded-sm"
                />
                <span className="mt-1 block text-center text-sm">{c.name}</span>
              </li>
            ))}
          </ul>
          <figcaption className={captionClass}>
            All nine glass tile colors we use.
          </figcaption>
        </figure>
        <p>
          We have a lot of ready-made pairings, such as Green + Light Blue,
          Pearl + Brandied Melon and Moonlight + Fountain Blue. We also make
          solid-color coasters like Solid Grasshopper and Solid Powder. Browse
          them all in the{" "}
          <Link href="/shop" className={linkClass}>
            shop
          </Link>
          . Each one is $18.
        </p>

        <figure className="my-8">
          <ul className="grid grid-cols-3 gap-3">
            {PAIRINGS.map((c) => (
              <li key={c.file}>
                <Image
                  src={`/images/coasters/${c.file}.jpg`}
                  alt={c.alt}
                  width={800}
                  height={800}
                  sizes="(min-width: 768px) 210px, 30vw"
                  className="h-auto w-full rounded-sm"
                />
                <span className="mt-1 block text-center text-sm">{c.name}</span>
              </li>
            ))}
          </ul>
          <figcaption className={captionClass}>
            Three of our ready-made coasters.
          </figcaption>
        </figure>

        <h2 className={h2Class} style={h2Style}>
          Design your own custom tile coaster
        </h2>
        <p>
          If none of the pairings are quite right, make your own. Our free{" "}
          <Link href="/custom" className={linkClass}>
            coaster designer
          </Link>{" "}
          lets you paint a 4&times;4 grid one tile at a time. You can click or
          drag to paint, try a checkerboard pattern, or hit &ldquo;Surprise
          me&rdquo; for a random mix. When it looks right, add it to your cart
          and we&rsquo;ll hand-make it. [Add the usual turnaround time.]
        </p>
        <p>Some ideas to try:</p>
        <ul className="list-disc space-y-2 pl-6">
          <li>
            <strong>Match your kitchen.</strong> Pull two colors from your
            backsplash or dishes.
          </li>
          <li>
            <strong>Go monochrome.</strong> Four shades of blue in a gradient
            look good on a coffee table.
          </li>
          <li>
            <strong>Mix warm and cool.</strong> Terracotta with sage or powder
            blue is a Tiled House favorite.
          </li>
          <li>
            <strong>Gift a set.</strong> Choose a color for each person and
            make a set.
          </li>
        </ul>

        <Figure
          src="/images/about/gallery-3-diy-box.webp"
          alt="A kraft shipping box with a colorful tile house sticker, tied with twine and surrounded by eucalyptus"
          width={1600}
          height={1067}
          caption="The Tiled House logo on a kraft box."
        />

        <h2 className={h2Class} style={h2Style}>
          Why handmade?
        </h2>
        <p>
          We want your home to feel like <strong>you</strong>. Every piece we
          make is meant to be customized, whether that&rsquo;s a coaster in
          your favorite colors or, soon, a table, tray or decor piece. [Add a
          line about who makes them and where.]
        </p>

        <h2 className={h2Class} style={h2Style}>
          Shop Tiled House
        </h2>
        <ul className="list-disc space-y-2 pl-6">
          <li>
            <Link href="/shop" className={linkClass}>
              Shop ready-made glass tile coasters &rarr;
            </Link>
          </li>
          <li>
            <Link href="/custom" className={linkClass}>
              Design your own coaster &rarr;
            </Link>
          </li>
        </ul>
        <p>
          New tile furniture and decor are on the way. Join our list at
          tiledhouse.com to be first to hear.
        </p>
      </article>
    </PageShell>
  );
}
