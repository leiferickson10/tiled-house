import type { Metadata } from "next";
import TestCheckout from "./TestCheckout";

// Launch smoke test only. Hidden from search; useless without CHECKOUT_TEST_KEY.
export const metadata: Metadata = {
  title: "Checkout test",
  robots: { index: false, follow: false },
};

export default function CheckoutTestPage() {
  return (
    <main className="mx-auto max-w-xl p-6">
      <h1 className="mb-4 text-xl font-bold">Live checkout test ($1)</h1>
      <TestCheckout />
    </main>
  );
}
