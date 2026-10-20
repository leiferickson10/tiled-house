"use client";

import { EmbeddedCheckout, EmbeddedCheckoutProvider } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import Link from "next/link";
import { useCallback, useState } from "react";
import { useCart } from "../lib/cart";

// Created once at module scope so Stripe.js isn't re-loaded on every render.
const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY ?? "");

export default function CheckoutView() {
  const items = useCart();
  const [error, setError] = useState<string | null>(null);

  const fetchClientSecret = useCallback(async () => {
    const res = await fetch("/api/checkout", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ items }),
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (items.length === 0) {
    return (
      <p className="text-lg">
        Your cart is empty.{" "}
        <Link href="/designs" className="font-bold underline underline-offset-4">
          Browse designs
        </Link>
      </p>
    );
  }

  return (
    <div>
      {error && (
        <p role="alert" className="mb-6 rounded-md bg-[#b15356]/10 p-4 text-[#b15356]">
          {error}{" "}
          <Link href="/cart" className="font-bold underline underline-offset-4">
            Back to cart
          </Link>
        </p>
      )}
      <EmbeddedCheckoutProvider stripe={stripePromise} options={{ fetchClientSecret }}>
        <EmbeddedCheckout />
      </EmbeddedCheckoutProvider>
    </div>
  );
}
