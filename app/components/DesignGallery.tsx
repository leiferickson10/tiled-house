"use client";

import Link from "next/link";
import { useState } from "react";
import { DESIGNS, type Design } from "../lib/designs";
import { gridId, unitPriceCents } from "../lib/shop";
import { TILES } from "../lib/tiles";
import AddToCartButton from "./AddToCartButton";
import CoasterThumb, { GLASS_SHINE } from "./CoasterThumb";

type Filter = number | null; // index into TILES, or null for everything

export default function DesignGallery() {
  const [filter, setFilter] = useState<Filter>(null);

  const visible = DESIGNS.filter(
    (d) => filter === null || d.colors.includes(filter),
  );
  const solids = visible.filter((d) => d.kind === "solid");
  const checks = visible.filter((d) => d.kind === "checkerboard");

  return (
    <div>
      <div className="mb-10">
        <p className="mb-3 text-sm font-bold uppercase tracking-[0.12em] text-[#b15356]">
          Filter by color
        </p>
        <div className="flex flex-wrap gap-2">
          <Chip active={filter === null} onClick={() => setFilter(null)}>
            All ({DESIGNS.length})
          </Chip>
          {TILES.map((t, i) => (
            <Chip
              key={t.sku}
              active={filter === i}
              onClick={() => setFilter(filter === i ? null : i)}
            >
              <span
                className="mr-2 inline-block h-3.5 w-3.5 rounded-[2px] align-[-2px]"
                style={{
                  background: `${GLASS_SHINE}, ${t.hex}`,
                  boxShadow: "inset 0 0 0 1px rgba(0,0,0,0.15)",
                }}
              />
              {t.name}
            </Chip>
          ))}
        </div>
      </div>

      <Group title="Solid colors" designs={solids} />
      <Group title="Checkerboards" designs={checks} />

      {visible.length === 0 && (
        <p className="text-[#4a1d31]/70">No designs match that filter.</p>
      )}
    </div>
  );
}

function Group({ title, designs }: { title: string; designs: Design[] }) {
  if (designs.length === 0) return null;
  return (
    <section className="mb-14" aria-label={title}>
      <h2
        className="mb-6 text-3xl text-[#b15356] sm:text-4xl"
        style={{
          fontFamily: "var(--font-fraunces), serif",
          fontWeight: 800,
          letterSpacing: "-0.02em",
        }}
      >
        {title}{" "}
        <span className="text-lg font-normal text-[#4a1d31]/50">
          ({designs.length})
        </span>
      </h2>
      <ul className="grid grid-cols-2 gap-x-5 gap-y-8 sm:grid-cols-3 lg:grid-cols-4">
        {designs.map((d) => (
          <li key={d.id}>
            <Link
              href={`/custom?design=${d.id}`}
              className="group block outline-offset-4 focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#b15356]"
            >
              <div className="transition group-hover:-translate-y-1">
                <CoasterThumb grid={d.grid} label={d.name} />
              </div>
              <p className="mt-3 text-sm font-medium leading-snug">{d.name}</p>
              <p className="text-xs text-[#4a1d31]/60 group-hover:text-[#b15356]">
                Customize this design &rarr;
              </p>
            </Link>
            <AddToCartButton id={gridId(d.grid)} priceCents={unitPriceCents(d.grid)} compact />
          </li>
        ))}
      </ul>
    </section>
  );
}

function Chip({
  active,
  onClick,
  children,
}: {
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={active}
      className={`rounded-full border px-3.5 py-1.5 text-sm transition ${
        active
          ? "border-[#b15356] bg-[#b15356] text-[#f9f8f0]"
          : "border-[#b15356]/40 text-[#4a1d31] hover:border-[#b15356]"
      }`}
    >
      {children}
    </button>
  );
}
