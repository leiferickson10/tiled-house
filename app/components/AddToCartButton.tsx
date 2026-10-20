"use client";

import Link from "next/link";
import { useState } from "react";
import { cartActions } from "../lib/cart";
import { formatUsd } from "../lib/shop";

/** Adds one coaster (a cart item id, see lib/shop.ts) to the cart. */
export default function AddToCartButton({
  id,
  priceCents,
  compact = false,
  disabled = false,
}: {
  id: string;
  priceCents: number;
  compact?: boolean;
  disabled?: boolean;
}) {
  const [added, setAdded] = useState(false);

  const add = () => {
    cartActions.add(id);
    setAdded(true);
  };

  const size = compact ? "px-4 py-2 text-sm" : "px-6 py-4 text-base";

  return (
    <div className={compact ? "mt-2" : "mt-4"}>
      <button
        type="button"
        onClick={add}
        disabled={disabled}
        className={`w-full rounded-full bg-[#b15356] font-bold text-[#f9f8f0] transition hover:bg-[#9a4347] disabled:cursor-not-allowed disabled:opacity-50 ${compact ? "" : "sm:w-auto"} ${size}`}
      >
        {added ? "Add another" : "Add to cart"} &middot;{" "}
        {formatUsd(priceCents)}
      </button>
      {added && (
        <p className="mt-2 text-sm" role="status">
          Added!{" "}
          <Link href="/cart" className="font-bold underline underline-offset-4">
            View cart
          </Link>
        </p>
      )}
    </div>
  );
}
