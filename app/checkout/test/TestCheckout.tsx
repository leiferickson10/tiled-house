"use client";

import { EmbeddedCheckout, EmbeddedCheckoutProvider } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { useCallback, useState } from "react";

const publishableKey = process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY;
const stripePromise = publishableKey ? loadStripe(publishableKey) : null;

/** Visit /checkout/test?key=<CHECKOUT_TEST_KEY> to get a $1 live checkout. */
export default function TestCheckout() {
  const [error, setError] = useState<string | null>(null);

  const fetchClientSecret = useCallback(async () => {
    // Read at call time (client only) so no Suspense boundary is needed.
    const testKey = new URLSearchParams(window.location.search).get("key");
    const res = await fetch("/api/checkout", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ testKey }),
    });
    const data = (await res.json().catch(() => ({}))) as {
      clientSecret?: string;
      error?: string;
    };
    if (!res.ok || !data.clientSecret) {
      const message = data.error ?? "Could not start test checkout.";
      setError(message);
      throw new Error(message);
    }
    return data.clientSecret;
  }, []);

  if (!stripePromise) return <p role="alert">NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY is not set.</p>;

  return (
    <>
      {error && <p role="alert" className="mb-4 text-red-700">{error}</p>}
      <EmbeddedCheckoutProvider stripe={stripePromise} options={{ fetchClientSecret }}>
        <EmbeddedCheckout />
      </EmbeddedCheckoutProvider>
    </>
  );
}
