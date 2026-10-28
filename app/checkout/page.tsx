import type { Metadata } from "next";
import CheckoutView from "../components/CheckoutView";
import PageShell from "../components/PageShell";

export const metadata: Metadata = {
  title: "Checkout — Tiled House",
  description:
    "Check out securely and get your handmade glass tile coasters from Tiled House.",
  alternates: { canonical: "/checkout" },
};

export default function CheckoutPage() {
  return (
    <PageShell current="/cart" title="Checkout">
      <CheckoutView />
    </PageShell>
  );
}
