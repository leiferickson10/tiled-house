"use client";

import Image from "next/image";
import Link from "next/link";
import { cartActions, useCart } from "../lib/cart";
import { MAX_QTY_PER_LINE, formatUsd, resolveItem } from "../lib/shop";
import CoasterThumb from "./CoasterThumb";

export default function CartView() {
  const items = useCart();

  if (items.length === 0) {
    return (
      <div>
        <p className="text-lg text-[#4a1d31]/80">Your cart is empty.</p>
        <div className="mt-6 flex flex-wrap gap-3">
          <PillLink href="/designs">Browse designs</PillLink>
          <PillLink href="/custom" outline>
            Design your own
          </PillLink>
        </div>
      </div>
    );
  }

  const lines = items.flatMap((cartItem) => {
    const product = resolveItem(cartItem.id);
    return product ? [{ cartItem, product }] : [];
  });
  const subtotal = lines.reduce((n, l) => n + l.product.unitCents * l.cartItem.qty, 0);

  return (
    <div className="grid gap-10 lg:grid-cols-[1fr_20rem]">
      <ul className="divide-y divide-[#4a1d31]/15">
        {lines.map(({ cartItem: item, product }) => (
          <li key={item.id} className="flex gap-4 py-5 first:pt-0">
            <div className="w-24 shrink-0 sm:w-32">
              {product.photo ? (
                <Image
                  src={product.photo}
                  alt={product.name}
                  width={400}
                  height={400}
                  className="aspect-square w-full rounded-[4px] object-cover shadow-[0_12px_24px_-14px_rgba(74,29,49,0.55)]"
                />
              ) : (
                <CoasterThumb grid={product.tiles ?? []} label={product.name} />
              )}
            </div>
            <div className="flex-1">
              <p className="font-medium">{product.name}</p>
              <p className="text-sm text-[#4a1d31]/70">{product.description}</p>
              <p className="mt-1 text-sm">{formatUsd(product.unitCents)} each</p>
              <div className="mt-3 flex items-center gap-3">
                <label className="sr-only" htmlFor={`qty-${item.id}`}>
                  Quantity
                </label>
                <select
                  id={`qty-${item.id}`}
                  value={item.qty}
                  onChange={(e) => cartActions.setQty(item.id, Number(e.target.value))}
                  className="rounded-md border border-[#4a1d31]/30 bg-white px-2 py-1 text-sm"
                >
                  {Array.from({ length: MAX_QTY_PER_LINE }, (_, i) => i + 1).map((n) => (
                    <option key={n} value={n}>
                      {n}
                    </option>
                  ))}
                </select>
                <button
                  type="button"
                  onClick={() => cartActions.remove(item.id)}
                  className="text-sm underline underline-offset-4 hover:text-[#b15356]"
                >
                  Remove
                </button>
              </div>
            </div>
            <p className="font-medium">{formatUsd(product.unitCents * item.qty)}</p>
          </li>
        ))}
      </ul>

      <aside className="h-fit rounded-lg bg-white/70 p-6 shadow-sm">
        <h2 className="mb-4 text-sm font-bold uppercase tracking-[0.12em] text-[#b15356]">
          Order summary
        </h2>
        <p className="flex justify-between text-lg">
          <span>Subtotal</span>
          <span>{formatUsd(subtotal)}</span>
        </p>
        <p className="mt-2 text-sm text-[#4a1d31]/70">
          Shipping and sales tax are calculated at checkout once we know where it&rsquo;s going.
        </p>
        <Link
          href="/checkout"
          className="mt-5 block rounded-full bg-[#b15356] px-6 py-4 text-center text-base font-bold text-[#f9f8f0] transition hover:bg-[#9a4347]"
        >
          Checkout
        </Link>
      </aside>
    </div>
  );
}

function PillLink({
  href,
  outline,
  children,
}: {
  href: string;
  outline?: boolean;
  children: React.ReactNode;
}) {
  return (
    <Link
      href={href}
      className={
        outline
          ? "rounded-full border border-[#b15356] px-6 py-3 font-bold text-[#b15356] hover:bg-[#b15356] hover:text-[#f9f8f0]"
          : "rounded-full bg-[#b15356] px-6 py-3 font-bold text-[#f9f8f0] hover:bg-[#9a4347]"
      }
    >
      {children}
    </Link>
  );
}
