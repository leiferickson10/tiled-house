import type { Metadata } from "next";
import CartView from "../components/CartView";
import PageShell from "../components/PageShell";

export const metadata: Metadata = {
  title: "Your Cart — Tiled House",
  description:
    "Review the handmade glass tile coasters in your cart before you check out.",
  alternates: { canonical: "/cart" },
};

export default function CartPage() {
  return (
    <PageShell current="/cart" title="Your cart">
      <CartView />
    </PageShell>
  );
}
