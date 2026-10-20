import { TILES } from "../lib/tiles";

export const GLASS_SHINE =
  "linear-gradient(135deg, rgba(255,255,255,0.38) 0%, rgba(255,255,255,0) 48%, rgba(0,0,0,0.10) 100%)";

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
      style={{ background: "#ece8dc" }}
    >
      <div className="grid grid-cols-4 gap-[3%]">
        {grid.map((c, i) => (
          <span
            key={i}
            className="aspect-square rounded-[2px]"
            style={{
              background:
                c === null ? "#f5f2e8" : `${GLASS_SHINE}, ${TILES[c].hex}`,
              boxShadow:
                "inset 0 0 0 1px rgba(255,255,255,0.28), inset 0 -2px 3px rgba(0,0,0,0.12)",
            }}
          />
        ))}
      </div>
    </div>
  );
}
