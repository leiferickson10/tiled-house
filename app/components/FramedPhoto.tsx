import Image from "next/image";

/*
 * A photo shown inside the mosaic tile frame. The frame image has a transparent
 * opening; the photo sits behind it and is cropped to fill that opening.
 * Sizes itself to its parent's width (frame ratio 907 x 1361).
 */
export default function FramedPhoto({ sizes }: { sizes: string }) {
  return (
    <div className="relative w-full" style={{ aspectRatio: "907 / 1361" }}>
      <div
        className="absolute overflow-hidden"
        style={{ left: "15%", top: "10.4%", width: "70%", height: "79.2%" }}
      >
        <Image
          src="/images/about/ocean-wedding.webp"
          alt="Newlyweds embracing on the beach at dusk"
          fill
          sizes={sizes}
          className="object-cover"
        />
      </div>
      <Image
        src="/images/about/tile-frame.webp"
        alt=""
        fill
        sizes={sizes}
        className="pointer-events-none"
      />
    </div>
  );
}
