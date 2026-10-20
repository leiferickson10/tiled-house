"use client";

import Link from "next/link";
import { cartCount, useCart } from "../lib/cart";

/** Nav link with a live item count. Renders no count on the server render. */
export default function CartLink({ active }: { active: boolean }) {
  const count = cartCount(useCart());
  return (
    <Link
      href="/cart"
      className={active ? "text-white" : "text-white/70 hover:text-white"}
    >
      CART{count > 0 ? ` (${count})` : ""}
    </Link>
  );
}
