import { NextResponse } from "next/server";
import type Stripe from "stripe";
import { isLocalDeliveryCode } from "../../lib/localDelivery";
import { SOLD_OUT_IN_CODE, soldOutTilesIn } from "../../lib/stock";
import { getStripe } from "../../lib/stripe";
import { SHIPPING_CENTS, discountFor, resolveItem, shippingFor, validateCart } from "../../lib/shop";

// Stripe product tax codes: https://docs.stripe.com/tax/tax-codes
const TAX_CODE_TANGIBLE_GOODS = "txcd_99999999";
const TAX_CODE_SHIPPING = "txcd_92010001";

export async function POST(req: Request) {
  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid request." }, { status: 400 });
  }

  // The env var is only trusted if it's a public https URL. A leftover
  // "http://localhost:3000" in production would send paid customers to a dead
  // page, so anything else falls back to the origin the request came from.
  const envUrl = process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "");
  const siteUrl =
    envUrl?.startsWith("https://") && !envUrl.includes("localhost")
      ? envUrl
      : new URL(req.url).origin;

  // 1. Never trust the browser: re-validate the cart and rebuild every price here.
  const cart = validateCart((body as { items?: unknown })?.items);
  if ("error" in cart) {
    return NextResponse.json({ error: cart.error }, { status: 400 });
  }

  // Sold out: refuse any coaster that needs a tile color we've run out of. This
  // is the real check; the shop's "Sold out" buttons are just a convenience.
  for (const { id } of cart.items) {
    if (soldOutTilesIn(id, SOLD_OUT_IN_CODE).length > 0) {
      return NextResponse.json(
        { error: `Sorry, ${resolveItem(id)!.name} just sold out. Please remove it from your cart.` },
        { status: 409 },
      );
    }
  }

  let subtotal = 0;
  const line_items: Stripe.Checkout.SessionCreateParams.LineItem[] = cart.items.map(
    ({ id, qty }) => {
      const item = resolveItem(id)!; // validateCart already proved it resolves
      subtotal += item.unitCents * qty;
      return {
        quantity: qty,
        price_data: {
          currency: "usd",
          unit_amount: item.unitCents,
          tax_behavior: "exclusive", // tax is added on top of this price
          product_data: {
            name: item.name,
            description: item.description,
            tax_code: TAX_CODE_TANGIBLE_GOODS,
            // Stripe shows this photo in checkout. It must be a public https
            // URL, so it's skipped on localhost.
            ...(item.photo && siteUrl.startsWith("https://")
              ? { images: [siteUrl + item.photo] }
              : {}),
            // Fulfillment reads this to know exactly what to make.
            metadata: item.metadata,
          },
        },
      };
    },
  );

  // A valid local-delivery code means you're dropping it off, so shipping is free.
  // The code is checked here on the server; the browser only sends what was typed.
  const localDelivery = isLocalDeliveryCode((body as { localCode?: unknown })?.localCode);
  const shipping = localDelivery ? 0 : shippingFor(subtotal);
  const discount = discountFor(
    cart.items.map(({ id, qty }) => ({ unitCents: resolveItem(id)!.unitCents, qty })),
  );
  try {
    // Automatic discount: a one-off coupon sized by lib/shop.ts, so the browser
    // can never choose its own amount.
    const coupon = discount
      ? await getStripe().coupons.create({
          amount_off: discount.cents,
          currency: "usd",
          duration: "once",
          name: discount.label,
        })
      : null;

    const session = await getStripe().checkout.sessions.create({
      mode: "payment",
      ui_mode: "embedded_page",
      return_url: `${siteUrl}/checkout/return?session_id={CHECKOUT_SESSION_ID}`,
      line_items,

      // Tax: Stripe Tax works out the rate from the shipping address.
      automatic_tax: { enabled: true },

      // Shipping: US only, one flat rate (see lib/shop.ts).
      shipping_address_collection: { allowed_countries: ["US"] },
      shipping_options: [
        {
          shipping_rate_data: {
            type: "fixed_amount",
            display_name: localDelivery
              ? "Free local delivery (drop-off)"
              : shipping === 0
                ? "Free shipping"
                : "Standard shipping",
            fixed_amount: { amount: shipping, currency: "usd" },
            tax_behavior: "exclusive",
            tax_code: TAX_CODE_SHIPPING,
          },
        },
      ],

      // Discounts: Stripe doesn't allow `discounts` and `allow_promotion_codes`
      // together. With an automatic discount we apply it and hide the promo box;
      // otherwise the box shows and dashboard codes (e.g. FRIENDS) still work.
      ...(coupon
        ? { discounts: [{ coupon: coupon.id }] }
        : { allow_promotion_codes: true }),

      // Fraud signals: more data = better Radar scoring and easier dispute defense.
      billing_address_collection: "required",
      phone_number_collection: { enabled: true },

      // Abandoned sessions stop being payable after an hour.
      expires_at: Math.floor(Date.now() / 1000) + 60 * 60,
      metadata: {
        source: "tiledhouse.com",
        shipping_cents: String(SHIPPING_CENTS),
        // The order emails read this to flag orders you'll drop off yourself.
        ...(localDelivery ? { local_delivery: "true" } : {}),
      },
    });

    return NextResponse.json({ clientSecret: session.client_secret });
  } catch (err) {
    console.error("Stripe session creation failed:", err);
    return NextResponse.json(
      { error: "We couldn't start checkout. Please try again." },
      { status: 502 },
    );
  }
}
