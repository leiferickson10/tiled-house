import { NextResponse } from "next/server";
import type Stripe from "stripe";
import { getStripe } from "../../../lib/stripe";

/**
 * Stripe → our server. This is the ONLY trustworthy signal that money arrived:
 * the browser's return page can be skipped (closed tab) or faked, but a signed
 * webhook can't be. Fulfillment (emailing you, writing the order somewhere)
 * belongs here.
 *
 * Local testing:  stripe listen --forward-to localhost:3000/api/stripe/webhook
 * Production:     add the endpoint in Dashboard > Developers > Webhooks and put
 *                 its signing secret in STRIPE_WEBHOOK_SECRET.
 */
export async function POST(req: Request) {
  const secret = process.env.STRIPE_WEBHOOK_SECRET;
  const signature = req.headers.get("stripe-signature");
  if (!secret || !signature) {
    return NextResponse.json({ error: "Webhook not configured." }, { status: 400 });
  }

  // Signature verification needs the raw, unparsed body.
  const raw = await req.text();
  let event: Stripe.Event;
  try {
    event = getStripe().webhooks.constructEvent(raw, signature, secret);
  } catch {
    return NextResponse.json({ error: "Bad signature." }, { status: 400 });
  }

  try {
    switch (event.type) {
      case "checkout.session.completed":
      case "checkout.session.async_payment_succeeded": {
        // "completed" can fire BEFORE funds arrive (bank debits etc.), so only
        // fulfill when payment_status is "paid".
        const session = event.data.object;
        if (session.payment_status === "paid") await fulfillOrder(session.id);
        break;
      }
      case "checkout.session.async_payment_failed":
        console.warn("Async payment failed for session", event.data.object.id);
        break;
      case "charge.dispute.created":
        console.warn("DISPUTE opened:", event.data.object.id, event.data.object.reason);
        break;
      case "radar.early_fraud_warning.created":
        console.warn("Early fraud warning:", event.data.object.charge);
        break;
    }
  } catch (err) {
    console.error(`Webhook handler failed for ${event.id}:`, err);
    // Non-2xx makes Stripe retry for up to 3 days, which is what we want.
    return NextResponse.json({ error: "Handler failed." }, { status: 500 });
  }

  return NextResponse.json({ received: true });
}

async function fulfillOrder(sessionId: string) {
  // Stripe may deliver the same event more than once, so this must be
  // idempotent: key any record you write on session.id.
  const session = await getStripe().checkout.sessions.retrieve(sessionId, {
    expand: ["line_items.data.price.product"],
  });

  const items = session.line_items?.data.map((li) => ({
    name: li.description,
    qty: li.quantity,
    sku: (li.price?.product as Stripe.Product | undefined)?.metadata?.sku,
    grid: (li.price?.product as Stripe.Product | undefined)?.metadata?.grid,
  }));

  // TODO: there is no database or email provider in this project yet. Until
  // there is, new orders only show in the server log and the Stripe Dashboard.
  // Next step: email yourself (Resend) and/or save to a DB, keyed on session.id.
  console.log("NEW ORDER", {
    id: session.id,
    email: session.customer_details?.email,
    total: session.amount_total,
    tax: session.total_details?.amount_tax,
    ship_to: session.collected_information?.shipping_details,
    items,
  });
}
