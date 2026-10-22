"use client";

import { EmbeddedCheckout, EmbeddedCheckoutProvider } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import Image from "next/image";
import Link from "next/link";
import { useCallback, useEffect, useRef, useState } from "react";
import { useCart } from "../lib/cart";
import { formatUsd, resolveItem, shippingFor } from "../lib/shop";
import CoasterThumb from "./CoasterThumb";

// Created once at module scope so Stripe.js isn't re-loaded on every render.
const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY ?? "");

// Brand colors from tiledhouse.com, used for the accent strip on the summary.
const BRAND_STRIP = ["#b15356", "#ac5725", "#ddcd71", "#b7b386", "#90a9c3", "#9c708a"];

export default function CheckoutView() {
  const items = useCart();
  const [error, setError] = useState<string | null>(null);
  // The first render after a page load sees an empty cart (see lib/cart.ts), so
  // read the latest items at call time instead of capturing that empty list.
  const itemsRef = useRef(items);
  useEffect(() => {
    itemsRef.current = items;
  }, [items]);

  const fetchClientSecret = useCallback(async () => {
    const res = await fetch("/api/checkout", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ items: itemsRef.current }),
    });
    const data = (await res.json().catch(() => ({}))) as {
      clientSecret?: string;
      error?: string;
    };
    if (!res.ok || !data.clientSecret) {
      const message = data.error ?? "We couldn't start checkout. Please try again.";
      setError(message);
      throw new Error(message);
    }
    return data.clientSecret;
    // The session is created once per page visit; later cart edits are ignored
    // until the page reloads, so checkout can't charge a stale cart silently.
  }, []);

  if (items.length === 0) {
    return (
      <p className="text-lg">
        Your cart is empty.{" "}
        <Link href="/shop" className="font-bold underline underline-offset-4">
          Shop coasters
        </Link>
      </p>
    );
  }

  const lines = items.flatMap((cartItem) => {
    const product = resolveItem(cartItem.id);
    return product ? [{ cartItem, product }] : [];
  });
  const subtotal = lines.reduce((n, l) => n + l.product.unitCents * l.cartItem.qty, 0);
  const shipping = shippingFor(subtotal);

  return (
    <div>
      <ol className="mb-8 flex items-center gap-3 text-sm font-bold uppercase tracking-[0.12em]">
        <li className="text-[#4a1d31]/50">Cart</li>
        <li aria-hidden="true" className="h-px w-8 bg-[#4a1d31]/25" />
        <li className="text-[#b15356]" aria-current="step">
          Checkout
        </li>
        <li aria-hidden="true" className="h-px w-8 bg-[#4a1d31]/25" />
        <li className="text-[#4a1d31]/50">Done</li>
      </ol>

      {error && (
        <p role="alert" className="mb-6 rounded-md bg-[#b15356]/10 p-4 text-[#b15356]">
          {error}{" "}
          <Link href="/cart" className="font-bold underline underline-offset-4">
            Back to cart
          </Link>
        </p>
      )}

      <div className="grid items-start gap-8 lg:grid-cols-[1fr_21rem]">
        <div className="order-2 overflow-hidden rounded-lg border-t-4 border-[#ddcd71] bg-white p-4 shadow-sm sm:p-6 lg:order-1">
          <EmbeddedCheckoutProvider stripe={stripePromise} options={{ fetchClientSecret }}>
            <EmbeddedCheckout />
          </EmbeddedCheckoutProvider>
        </div>

        <aside className="order-1 rounded-lg bg-[#f3ede3] p-6 shadow-sm lg:sticky lg:top-6 lg:order-2">
          <div className="mb-5 flex h-2 overflow-hidden rounded-full" aria-hidden="true">
            {BRAND_STRIP.map((c) => (
              <span key={c} className="flex-1" style={{ backgroundColor: c }} />
            ))}
          </div>
          <h2 className="mb-4 text-sm font-bold uppercase tracking-[0.12em] text-[#b15356]">
            Your order
          </h2>
          <ul className="divide-y divide-[#4a1d31]/15">
            {lines.map(({ cartItem, product }) => (
              <li key={cartItem.id} className="flex items-center gap-3 py-3 first:pt-0">
                <div className="relative w-14 shrink-0">
                  {product.photo ? (
                    <Image
                      src={product.photo}
                      alt={product.name}
                      width={112}
                      height={112}
                      className="aspect-square w-full rounded-[4px] object-cover"
                    />
                  ) : (
                    <CoasterThumb grid={product.tiles ?? []} label={product.name} />
                  )}
                  <span className="absolute -right-2 -top-2 flex h-5 min-w-5 items-center justify-center rounded-full bg-[#b15356] px-1 text-xs font-bold text-[#f9f8f0]">
                    {cartItem.qty}
                  </span>
                </div>
                <p className="flex-1 text-sm font-medium leading-tight">{product.name}</p>
                <p className="text-sm">{formatUsd(product.unitCents * cartItem.qty)}</p>
              </li>
            ))}
          </ul>
          <dl className="mt-4 space-y-1 border-t border-[#4a1d31]/15 pt-4 text-sm">
            <div className="flex justify-between">
              <dt>Subtotal</dt>
              <dd>{formatUsd(subtotal)}</dd>
            </div>
            <div className="flex justify-between">
              <dt>Shipping</dt>
              <dd>{shipping === 0 ? "Free" : formatUsd(shipping)}</dd>
            </div>
            <div className="flex justify-between text-[#4a1d31]/70">
              <dt>Sales tax</dt>
              <dd>At payment</dd>
            </div>
          </dl>
          <p className="mt-4 flex justify-between border-t border-[#4a1d31]/15 pt-4 text-lg font-bold">
            <span>Total before tax</span>
            <span className="text-[#b15356]">{formatUsd(subtotal + shipping)}</span>
          </p>
          <p className="mt-3 text-xs text-[#4a1d31]/70">
            Have a friends &amp; family code? Enter it in the payment box.
          </p>
          <Link
            href="/cart"
            className="mt-4 inline-block text-sm underline underline-offset-4 hover:text-[#b15356]"
          >
            Edit cart
          </Link>
        </aside>
      </div>
    </div>
  );
}
