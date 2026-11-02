import type Stripe from "stripe";
import { formatUsd } from "./shop";

/**
 * Order confirmation email, sent from the Stripe webhook via Resend's REST API
 * (no SDK needed).
 *
 * Env vars:
 *   RESEND_API_KEY      required, or no email is sent (the order is still logged)
 *   EMAIL_FROM          e.g. "Tiled House <orders@tiledhouse.com>" (domain must be
 *                       verified in Resend)
 *   ORDER_NOTIFY_EMAIL  optional: BCC'd on every order so you see what to make
 */

const esc = (s: unknown) =>
  String(s ?? "").replace(/[&<>"']/g, (c) =>
    ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c]!,
  );

export async function sendOrderEmail(session: Stripe.Checkout.Session): Promise<void> {
  const apiKey = process.env.RESEND_API_KEY;
  const from = process.env.EMAIL_FROM;
  const to = session.customer_details?.email;

  if (!apiKey || !from) {
    console.warn("Order email skipped: RESEND_API_KEY / EMAIL_FROM not set.", session.id);
    return;
  }
  if (!to) {
    console.warn("Order email skipped: no customer email on session", session.id);
    return;
  }

  const lines = session.line_items?.data ?? [];
  const totals = session.total_details;
  const ship = session.collected_information?.shipping_details;
  const ref = session.id.slice(-10);

  const rows = lines
    .map(
      (li) => `<tr>
        <td style="padding:8px 0">${esc(li.description)} &times; ${li.quantity ?? 1}</td>
        <td style="padding:8px 0;text-align:right">${formatUsd(li.amount_subtotal)}</td>
      </tr>`,
    )
    .join("");

  const totalRow = (label: string, cents: number, bold = false) =>
    `<tr style="${bold ? "font-weight:bold;font-size:18px" : ""}">
      <td style="padding:4px 0">${label}</td>
      <td style="padding:4px 0;text-align:right">${formatUsd(cents)}</td>
    </tr>`;

  const address = ship?.address
    ? [
        ship.name,
        ship.address.line1,
        ship.address.line2,
        `${ship.address.city ?? ""}, ${ship.address.state ?? ""} ${ship.address.postal_code ?? ""}`,
      ]
        .filter(Boolean)
        .map(esc)
        .join("<br>")
    : "";

  const html = `<div style="background:#f9f8f0;padding:24px;font-family:Arial,Helvetica,sans-serif;color:#4a1d31">
  <div style="max-width:560px;margin:0 auto;background:#f3ede3;border-top:4px solid #ddcd71;padding:28px">
    <h1 style="margin:0 0 12px;font-family:Georgia,serif;color:#b15356">Thank you for your order!</h1>
    <p style="margin:0 0 20px">We&rsquo;re making your handmade glass tile coasters now and will email you when they ship.</p>
    <table style="width:100%;border-collapse:collapse;border-top:1px solid #d9cfc0">${rows}</table>
    <table style="width:100%;border-collapse:collapse;border-top:1px solid #d9cfc0;margin-top:8px">
      ${totals?.amount_discount ? totalRow("Discount", -totals.amount_discount) : ""}
      ${totalRow("Shipping", totals?.amount_shipping ?? 0)}
      ${totalRow("Sales tax", totals?.amount_tax ?? 0)}
      ${totalRow("Total", session.amount_total ?? 0, true)}
    </table>
    ${address ? `<p style="margin:20px 0 4px;font-weight:bold">Shipping to</p><p style="margin:0">${address}</p>` : ""}
    <p style="margin:24px 0 0;font-size:13px;opacity:.7">Order reference: ${esc(ref)}</p>
  </div>
</div>`;

  const bcc = process.env.ORDER_NOTIFY_EMAIL;
  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
      // Stripe can deliver a webhook twice; the same key means one email.
      "Idempotency-Key": `order-${session.id}`,
    },
    body: JSON.stringify({
      from,
      to,
      ...(bcc ? { bcc } : {}),
      subject: `Your Tiled House order (#${ref})`,
      html,
    }),
  });

  if (!res.ok) {
    // Throw so the webhook returns 500 and Stripe retries.
    throw new Error(`Resend ${res.status}: ${await res.text()}`);
  }
}
