import type { Metadata } from "next";
import CartView from "../components/CartView";
import PageShell from "../components/PageShell";

export const metadata: Metadata = { title: "Your Cart — Tiled House" };

export default function CartPage() {
  return (
    <PageShell current="/cart" title="Your cart">
      <CartView />
    </PageShell>
  );
}
