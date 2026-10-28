import type { CSSProperties } from "react";

/*
 * Badge + call-to-action pill laid over an inventory photo so the tile reads
 * as clickable. Purely presentational (no state), so it renders on the server.
 * Pass font sizes in whatever unit the layout uses (cqw on desktop, px on phones).
 */

const DM: CSSProperties = { fontFamily: "var(--font-dm-sans), sans-serif" };

export default function TileOverlay({
  badge,
  caption,
  badgeSize,
  captionSize,
}: {
  badge?: string;
  caption: string;
  badgeSize: string;
  captionSize: string;
}) {
  return (
    <>
      {badge && (
        <span
          className="absolute left-[5%] top-[2.5%] uppercase tracking-widest"
          style={{
            ...DM,
            background: "#f9f8f0",
            color: "#b15356",
            fontSize: badgeSize,
            padding: "0.45em 0.9em",
          }}
        >
          {badge}
        </span>
      )}
      <span
        className="absolute bottom-[4%] left-1/2 -translate-x-1/2 whitespace-nowrap transition-transform group-hover:scale-105"
        style={{
          ...DM,
          background: "#B34F58",
          color: "#fff",
          fontSize: captionSize,
          padding: "0.6em 1.2em",
          boxShadow: "0 2px 8px rgba(0,0,0,0.18)",
        }}
      >
        {caption}
      </span>
    </>
  );
}
