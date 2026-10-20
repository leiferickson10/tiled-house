import type { Metadata } from "next";
import Link from "next/link";
import { redirect } from "next/navigation";
import ClearCart from "../../components/ClearCart";
import PageShell from "../../components/PageShell";
import { formatUsd } from "../../lib/shop";
import { getStripe } from "../../lib/stripe";

export const metadata: Metadata = {
  title: "Order Confirmation — Tiled House",
  robots: { index: false },
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
          <>
            <p>
              Your order is confirmed
              {email ? (
                <>
                  . A receipt is on its way to <strong>{email}</strong>
                </>
              ) : null}
              .
            </p>
            <p>
              Total charged:{" "}
              <strong>{formatUsd(session.amount_total ?? 0)}</strong> (including{" "}
              {formatUsd(session.total_details?.amount_tax ?? 0)} tax and{" "}
              {formatUsd(session.total_details?.amount_shipping ?? 0)} shipping).
            </p>
            <p className="text-base text-[#4a1d31]/70">
              Order reference: {session.id.slice(-10)}
            </p>
          </>
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
          <Link href="/designs" className="font-bold underline underline-offset-4">
            Keep shopping
          </Link>
        </p>
      </div>
    </PageShell>
  );
}
