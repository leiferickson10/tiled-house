"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { FREE_EVERY_NTH, SMALL_ORDER_MAX_QTY, SMALL_ORDER_PERCENT_OFF } from "../lib/shop";

const DISPLAY = {
  fontFamily: "var(--font-fraunces), serif",
  fontWeight: 800,
  letterSpacing: "-0.01em",
} as const;

/**
 * Slim sticky bar on the shop pages (/shop and every product page) announcing
 * the automatic discounts. The numbers come from lib/shop.ts, the same constants
 * /api/checkout uses, so the message always matches what Stripe charges.
 */
export default function PromoBar() {
  const pathname = usePathname();
  const inShop = pathname === "/shop" || pathname.startsWith("/shop/");
  if (!inShop) return null;

  const smallRange = SMALL_ORDER_MAX_QTY > 1 ? `1–${SMALL_ORDER_MAX_QTY}` : "1";

  return (
    <div
      role="region"
      aria-label="Current offers"
      className="sticky top-0 z-30 bg-[#b15356] text-[#f9f8f0]"
      style={{ fontFamily: "var(--font-dm-sans), sans-serif" }}
    >
      <Link
        href="/shop"
        className="mx-auto flex min-h-9 max-w-5xl flex-wrap items-center justify-center gap-x-3 px-4 py-1.5 text-center leading-tight"
      >
        <span className="text-[15px] sm:text-base" style={DISPLAY}>
          {SMALL_ORDER_PERCENT_OFF}% off{" "}
          <span className="text-[12px] font-bold uppercase tracking-[0.12em]" style={{ fontFamily: "inherit" }}>
            {smallRange} coasters
          </span>
        </span>
        <span aria-hidden="true" className="text-[#ddcd71]">
          &#9670;
        </span>
        <span className="text-[15px] sm:text-base" style={DISPLAY}>
          Buy {FREE_EVERY_NTH - 1}, get 1 free
        </span>
        <span className="hidden text-[11px] font-bold uppercase tracking-[0.12em] text-[#f9f8f0]/80 md:inline">
          Applied at checkout
        </span>
      </Link>
    </div>
  );
}
