"use client";

import Link from "next/link";
import { cartCount, useCart } from "../lib/cart";

/** Cart button for the home nav, with a live item-count badge. No count on the server render. */
export default function CartPill() {
  const count = cartCount(useCart());
  return (
    <Link
      href="/cart"
      aria-label={count > 0 ? `Cart, ${count} ${count === 1 ? "item" : "items"}` : "Cart"}
      className="inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-[15px] font-bold tracking-[0.08em] transition-transform hover:-translate-y-0.5 sm:text-base"
      style={{
        background: "#f9f8f0",
        color: "#b15356",
        fontFamily: "var(--font-dm-sans), sans-serif",
      }}
    >
      CART
      {count > 0 && (
        <span
          aria-hidden="true"
          className="flex h-5 min-w-5 items-center justify-center rounded-full px-1 text-xs"
          style={{ background: "#b15356", color: "#f9f8f0" }}
        >
          {count}
        </span>
      )}
    </Link>
  );
}
