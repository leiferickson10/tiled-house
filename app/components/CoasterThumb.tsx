import { GROUT_GAP, GROUT_HEX, TILES, tileBackground } from "../lib/tiles";

/** Read-only picture of a 4x4 coaster, used in the design gallery. */
export default function CoasterThumb({
  grid,
  label,
}: {
  grid: (number | null)[];
  label: string;
}) {
  return (
    <div
      role="img"
      aria-label={label}
      className="w-full rounded-[4px] p-[6%] shadow-[0_12px_24px_-14px_rgba(74,29,49,0.55)]"
      style={{ background: GROUT_HEX }}
    >
      <div className="grid grid-cols-4" style={{ gap: GROUT_GAP }}>
        {grid.map((c, i) => (
          <span
            key={i}
            className="aspect-square rounded-[2px]"
            style={{
              background:
                c === null ? "#f5f2e8" : tileBackground(TILES[c]),
              boxShadow:
                "inset 0 0 0 1px rgba(255,255,255,0.28), inset 0 -2px 3px rgba(0,0,0,0.12)",
            }}
          />
        ))}
      </div>
    </div>
  );
}
