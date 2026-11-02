"use client";

import Image from "next/image";
import { useRef, useState } from "react";

export type GalleryImage = { src: string; alt: string; label: string };

/**
 * Phones: a full-width swipeable strip (scroll-snap) with dots.
 * Tablet and up: one large photo plus clickable thumbnails.
 */
export default function ProductGallery({ images }: { images: GalleryImage[] }) {
  const [active, setActive] = useState(0);
  const strip = useRef<HTMLUListElement>(null);
  const current = images[active];

  const onScroll = () => {
    const el = strip.current;
    if (!el) return;
    setActive(Math.round(el.scrollLeft / el.clientWidth));
  };

  const goTo = (i: number) => {
    const el = strip.current;
    if (el) el.scrollTo({ left: i * el.clientWidth, behavior: "smooth" });
    setActive(i);
  };

  return (
    <div className="min-w-0">
      {/* Phone: swipe. Full-bleed so the photo uses the whole screen width. */}
      <div className="-mx-6 sm:hidden">
        <ul
          ref={strip}
          onScroll={onScroll}
          className="flex snap-x snap-mandatory overflow-x-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
        >
          {images.map((img, i) => (
            <li key={img.src} className="w-full shrink-0 snap-center">
              <Image
                src={img.src}
                alt={img.alt}
                width={900}
                height={900}
                sizes="100vw"
                priority={i === 0}
                className="aspect-square w-full object-cover"
              />
            </li>
          ))}
        </ul>
        <div className="mt-3 flex items-center justify-center gap-3">
          {images.map((img, i) => (
            <button
              key={img.src}
              type="button"
              onClick={() => goTo(i)}
              aria-label={`Show photo: ${img.label}`}
              aria-current={i === active}
              className="flex h-8 items-center px-1"
            >
              <span
                className={`block h-2.5 rounded-full transition-all ${
                  i === active ? "w-6 bg-[#b15356]" : "w-2.5 bg-[#4a1d31]/25"
                }`}
              />
            </button>
          ))}
        </div>
        <p className="mt-1 text-center text-xs text-[#4a1d31]/70">{current.label}</p>
      </div>

      {/* Tablet and up: large photo with thumbnails. */}
      <div className="hidden sm:block">
        <Image
          key={current.src}
          src={current.src}
          alt={current.alt}
          width={900}
          height={900}
          sizes="(min-width: 1024px) 40vw, 90vw"
          className="aspect-square w-full rounded-[4px] object-cover shadow-[0_12px_24px_-14px_rgba(74,29,49,0.55)]"
        />
        <ul className="mt-3 grid grid-cols-3 gap-3">
          {images.map((img, i) => (
            <li key={img.src}>
              <button
                type="button"
                onClick={() => setActive(i)}
                aria-label={`Show photo: ${img.label}`}
                aria-current={i === active}
                className={`block w-full overflow-hidden rounded-[4px] border-2 transition ${
                  i === active ? "border-[#b15356]" : "border-transparent opacity-80 hover:opacity-100"
                }`}
              >
                <Image
                  src={img.src}
                  alt=""
                  width={240}
                  height={240}
                  sizes="(min-width: 1024px) 13vw, 30vw"
                  className="aspect-square w-full object-cover"
                />
              </button>
              <p className="mt-1 text-center text-xs text-[#4a1d31]/70">{img.label}</p>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
