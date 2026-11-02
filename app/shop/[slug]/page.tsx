import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import AddToCartButton from "../../components/AddToCartButton";
import JsonLd from "../../components/JsonLd";
import PageShell from "../../components/PageShell";
import ProductGallery, { type GalleryImage } from "../../components/ProductGallery";
import { READY_MADE, readyMadeBySlug, readyMadePhoto } from "../../lib/coasters";
import { READY_MADE_PRICE_CENTS, readyMadeId } from "../../lib/shop";
import { PROCESSING_DAYS, SITE_NAME, absoluteUrl } from "../../lib/site";

// Shared photos that sit behind every coaster's own photo.
const PRODUCT_SHOT = "/images/detail/product-shot.webp";
const BACKING = "/images/detail/backing.webp";

export function generateStaticParams() {
  return READY_MADE.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const c = readyMadeBySlug(slug);
  if (!c) return {};
  return {
    title: `${c.name} Glass Tile Coaster — Tiled House`,
    description: `Handmade 4" x 4" glass mosaic tile coaster in ${c.colors.join(" and ")}.`,
    alternates: { canonical: `/shop/${c.slug}` },
  };
}

export default async function ProductPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const c = readyMadeBySlug(slug);
  if (!c) notFound();

  const images: GalleryImage[] = [
    { src: readyMadePhoto(c.slug), alt: `${c.name} glass tile coaster`, label: "Coaster" },
    {
      src: PRODUCT_SHOT,
      alt: "Glass tile coasters styled on a wooden coffee table with a mug and a vase",
      label: "Product shot",
    },
    {
      src: BACKING,
      alt: "A glass tile coaster beside another turned over to show its wood backing and felt feet",
      label: "Backing",
    },
  ];

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: `${c.name} Glass Tile Coaster`,
    sku: c.slug,
    description: `Handmade 4" x 4" glass mosaic tile coaster in ${c.colors.join(" and ")}.`,
    image: images.map((i) => absoluteUrl(i.src)),
    color: c.colors.join(" / "),
    brand: { "@type": "Brand", name: SITE_NAME },
    offers: {
      "@type": "Offer",
      url: absoluteUrl(`/shop/${c.slug}`),
      price: (READY_MADE_PRICE_CENTS / 100).toFixed(2),
      priceCurrency: "USD",
      availability: "https://schema.org/InStock",
      itemCondition: "https://schema.org/NewCondition",
      seller: { "@type": "Organization", name: SITE_NAME },
    },
  };

  return (
    <PageShell current="/shop" title={c.name}>
      <JsonLd data={jsonLd} />
      <p className="-mt-4 mb-8">
        <Link href="/shop" className="text-sm underline underline-offset-4 hover:text-[#b15356]">
          &larr; All coasters
        </Link>
      </p>
      <div className="grid grid-cols-[minmax(0,1fr)] items-start gap-6 pb-24 sm:gap-8 sm:pb-0 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] lg:gap-12">
        <ProductGallery images={images} />
        <div className="max-w-md">
          <p className="text-sm font-bold uppercase tracking-[0.12em] text-[#b15356]">
            Handmade glass tile coaster
          </p>
          <ul className="mt-3 space-y-1.5 text-base sm:mt-4 sm:space-y-2 sm:text-lg">
            <li>4&Prime; &times; 4&Prime; glass mosaic tile</li>
            <li>Colors: {c.colors.join(" + ")}</li>
            <li>Wood backing with felt feet</li>
            <li>
              Made by hand, ships within {PROCESSING_DAYS} business days (
              <Link href="/shipping-returns" className="underline underline-offset-4 hover:text-[#b15356]">
                shipping &amp; returns
              </Link>
              )
            </li>
          </ul>
          {/* Tablet and up: button sits under the details. Phones use the fixed bar below. */}
          <div className="hidden sm:block">
            <AddToCartButton id={readyMadeId(c.slug)} priceCents={READY_MADE_PRICE_CENTS} />
          </div>
          <p className="mt-4 text-sm text-[#4a1d31]/70">
            Buy 3 get 1 free, or 15% off orders of 1&ndash;2 coasters. Applied automatically
            at checkout.
          </p>
        </div>
      </div>

      {/* Phones: Add to cart stays on screen while scrolling. */}
      <div className="fixed inset-x-0 bottom-0 z-20 border-t border-[#4a1d31]/15 bg-[#f9f8f0] px-4 pb-[max(0.75rem,env(safe-area-inset-bottom))] pt-1 shadow-[0_-6px_16px_-10px_rgba(74,29,49,0.4)] sm:hidden">
        <AddToCartButton id={readyMadeId(c.slug)} priceCents={READY_MADE_PRICE_CENTS} compact />
      </div>
    </PageShell>
  );
}
