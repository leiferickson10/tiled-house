import type { Metadata } from "next";
import Link from "next/link";
import { redirect } from "next/navigation";
import ClearCart from "../../components/ClearCart";
import PageShell from "../../components/PageShell";
import { formatUsd } from "../../lib/shop";
import { getStripe } from "../../lib/stripe";

// Brand colors from tiledhouse.com (same accent strip as the checkout summary).
const BRAND_STRIP = ["#b15356", "#ac5725", "#ddcd71", "#b7b386", "#90a9c3", "#9c708a"];

export const metadata: Metadata = {
  title: "Order Confirmation — Tiled House",
  description:
    "Thank you for your order. Your handmade glass tile coasters from Tiled House are on the way.",
  alternates: { canonical: "/checkout/return" },
};

export default async function ReturnPage({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const { session_id } = await searchParams;
  if (typeof session_id !== "string" || !session_id.startsWith("cs_")) {
    redirect("/cart");
  }

  let session;
  try {
    session = await getStripe().checkout.sessions.retrieve(session_id);
  } catch {
    redirect("/cart");
  }

  // Payment not finished (customer backed out): send them back into checkout.
  if (session.status === "open") redirect("/checkout");

  const paid = session.status === "complete" && session.payment_status === "paid";
  const processing = session.status === "complete" && !paid;
  const email = session.customer_details?.email;

  return (
    <PageShell
      current="/cart"
      title={paid ? "Thank you!" : processing ? "Payment processing" : "Checkout expired"}
    >
      {paid && <ClearCart />}
      <div className="max-w-xl space-y-4 text-lg">
        {paid && (
          <div className="overflow-hidden rounded-lg border-t-4 border-[#ddcd71] bg-[#f3ede3] p-6 shadow-sm sm:p-8">
            <div className="mb-6 flex h-2 overflow-hidden rounded-full" aria-hidden="true">
              {BRAND_STRIP.map((c) => (
                <span key={c} className="flex-1" style={{ backgroundColor: c }} />
              ))}
            </div>
            <h2
              className="text-3xl text-[#4a1d31] sm:text-4xl"
              style={{
                fontFamily: "var(--font-fraunces), serif",
                fontWeight: 800,
                lineHeight: 1,
                letterSpacing: "-0.02em",
              }}
            >
              Thank you for your order!
            </h2>
            <p className="mt-4">
              Check your email for details about your order
              {email ? (
                <>
                  {" "}
                  &mdash; we&rsquo;re sending them to <strong>{email}</strong>
                </>
              ) : null}
              .
            </p>
            <p className="mt-2 text-base text-[#4a1d31]/80">
              Your coasters are made by hand, so we&rsquo;ll be in touch as soon as
              they&rsquo;re on their way.
            </p>

            <dl className="mt-6 space-y-1 border-t border-[#4a1d31]/15 pt-4 text-base">
              <div className="flex justify-between">
                <dt>Shipping</dt>
                <dd>{formatUsd(session.total_details?.amount_shipping ?? 0)}</dd>
              </div>
              <div className="flex justify-between">
                <dt>Sales tax</dt>
                <dd>{formatUsd(session.total_details?.amount_tax ?? 0)}</dd>
              </div>
              <div className="flex justify-between border-t border-[#4a1d31]/15 pt-3 text-xl font-bold">
                <dt>Total charged</dt>
                <dd className="text-[#b15356]">{formatUsd(session.amount_total ?? 0)}</dd>
              </div>
            </dl>
            <p className="mt-4 text-sm text-[#4a1d31]/70">
              Order reference: {session.id.slice(-10)}
            </p>
          </div>
        )}
        {processing && (
          <p>
            Your payment is still being confirmed by your bank. We&rsquo;ll email you
            once it clears; you don&rsquo;t need to do anything else.
          </p>
        )}
        {!paid && !processing && (
          <p>
            This checkout session ended without a payment.{" "}
            <Link href="/cart" className="font-bold underline underline-offset-4">
              Return to your cart
            </Link>
            .
          </p>
        )}
        <p>
          <Link
            href="/shop"
            className="inline-block rounded-md bg-[#b15356] px-6 py-3 text-base font-bold text-[#f9f8f0] hover:bg-[#9a4548]"
          >
            Keep shopping
          </Link>
        </p>
      </div>
    </PageShell>
  );
}
