"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";

/*
 * Rotating gallery for the About Us section. Photo slides crossfade every few
 * seconds; the video slide plays once and then moves on, and after the last
 * slide it loops back to the first. Visitors who prefer reduced motion stay
 * on the current slide (the dots still work and the video shows its still
 * instead of playing).
 */

type Slide =
  | { kind: "photo"; src: string; alt: string }
  | { kind: "video"; src: string; poster: string; label: string };

const SLIDES: Slide[] = [
  {
    kind: "photo",
    src: "/images/about/gallery-1-coaster.webp",
    alt: "Glass tile coaster under a cup of coffee on a wooden table",
  },
  {
    kind: "video",
    src: "/images/about/gallery-2-designer.mp4",
    poster: "/images/about/gallery-2-designer-poster.jpg",
    label: "Painting a glass tile coaster in the Tiled House coaster designer",
  },
  {
    kind: "photo",
    src: "/images/about/gallery-3-diy-box.webp",
    alt: "Tiled House house sticker on a kraft shipping box",
  },
];

const PHOTO_MS = 6000;
// Safety net so a video that can't play never freezes the rotation.
const VIDEO_MAX_MS = 20000;

export default function AboutGallery({ sizes }: { sizes: string }) {
  const [index, setIndex] = useState(0);
  const videoRef = useRef<HTMLVideoElement>(null);

  const next = () => setIndex((i) => (i + 1) % SLIDES.length);
  const active = SLIDES[index];

  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (reduce.matches) return;
    if (active.kind === "video") {
      const v = videoRef.current;
      if (v) {
        v.currentTime = 0;
        v.play().catch(() => {});
      }
      const id = window.setTimeout(next, VIDEO_MAX_MS);
      return () => window.clearTimeout(id);
    }
    const id = window.setTimeout(next, PHOTO_MS);
    return () => window.clearTimeout(id);
  }, [index, active.kind]);

  return (
    <div
      aria-roledescription="carousel"
      aria-label="Tiled House photos"
    >
      <div className="relative w-full" style={{ aspectRatio: "500 / 440" }}>
        {SLIDES.map((slide, i) => (
          <div
            key={i}
            className="absolute inset-0 transition-opacity duration-700"
            style={{ opacity: i === index ? 1 : 0 }}
            aria-hidden={i !== index}
          >
            {slide.kind === "photo" ? (
              <Image
                src={slide.src}
                alt={slide.alt}
                fill
                sizes={sizes}
                className="object-cover"
                priority={i === 0}
              />
            ) : (
              <video
                ref={videoRef}
                src={slide.src}
                poster={slide.poster}
                aria-label={slide.label}
                muted
                playsInline
                preload="metadata"
                onEnded={next}
                className="mx-auto h-full rounded-sm object-contain"
              />
            )}
          </div>
        ))}
      </div>
      <div className="mt-3 flex justify-center gap-3">
        {SLIDES.map((_, i) => (
          <button
            key={i}
            type="button"
            onClick={() => setIndex(i)}
            aria-label={`Show slide ${i + 1} of ${SLIDES.length}`}
            aria-current={i === index}
            className="h-2.5 w-2.5 rounded-full"
            style={{
              background: "#f9f8f0",
              opacity: i === index ? 1 : 0.45,
            }}
          />
        ))}
      </div>
    </div>
  );
}
