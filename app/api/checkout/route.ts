import { NextResponse } from "next/server";
import type Stripe from "stripe";
import { getStripe } from "../../lib/stripe";
import { SHIPPING_CENTS, resolveItem, shippingFor, validateCart } from "../../lib/shop";

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

  // 1. Never trust the browser: re-validate the cart and rebuild every price here.
  const cart = validateCart((body as { items?: unknown })?.items);
  if ("error" in cart) {
    return NextResponse.json({ error: cart.error }, { status: 400 });
  }

  const siteUrl =
    process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "") ?? new URL(req.url).origin;

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

  const shipping = shippingFor(subtotal);
  try {
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
            display_name: shipping === 0 ? "Free shipping" : "Standard shipping",
            fixed_amount: { amount: shipping, currency: "usd" },
            tax_behavior: "exclusive",
            tax_code: TAX_CODE_SHIPPING,
          },
        },
      ],

      // Discounts: shows a "promotion code" box. Codes (e.g. FRIENDS) are created
      // in the Stripe dashboard, so rates and expiry never live in this code.
      allow_promotion_codes: true,

      // Fraud signals: more data = better Radar scoring and easier dispute defense.
      billing_address_collection: "required",
      phone_number_collection: { enabled: true },

      // Abandoned sessions stop being payable after an hour.
      expires_at: Math.floor(Date.now() / 1000) + 60 * 60,
      metadata: { source: "tiledhouse.com", shipping_cents: String(SHIPPING_CENTS) },
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
