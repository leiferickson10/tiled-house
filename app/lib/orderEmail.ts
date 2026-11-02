import type Stripe from "stripe";
import { decodeGrid, formatUsd } from "./shop";
import { TILES } from "./tiles";

/**
 * Order confirmation email, sent from the Stripe webhook via Resend's REST API
 * (no SDK needed).
 *
 * Env vars:
 *   RESEND_API_KEY      required, or no email is sent (the order is still logged)
 *   EMAIL_FROM          e.g. "Tiled House <orders@tiledhouse.com>" (domain must be
 *                       verified in Resend)
 *   ORDER_NOTIFY_EMAIL  where the shop-owner "New order" email goes (what to make,
 *                       4x4 tile layout, ship-to address, customer contact)
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

  await postEmail(apiKey, `order-${session.id}`, {
    from,
    to,
    subject: `Your Tiled House order (#${ref})`,
    html,
  });
}

async function postEmail(apiKey: string, idempotencyKey: string, body: object) {
  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
      // Stripe can deliver a webhook twice; the same key means one email.
      "Idempotency-Key": idempotencyKey,
    },
    body: JSON.stringify(body),
  });
  if (!res.ok) {
    // Throw so the webhook returns 500 and Stripe retries.
    throw new Error(`Resend ${res.status}: ${await res.text()}`);
  }
}

/**
 * "New order" email to the shop owner (ORDER_NOTIFY_EMAIL): what to make, for
 * whom, and where to ship it. Custom coasters are spelled out as a 4x4 grid.
 */
export async function sendOwnerOrderEmail(session: Stripe.Checkout.Session): Promise<void> {
  const apiKey = process.env.RESEND_API_KEY;
  const from = process.env.EMAIL_FROM;
  const to = process.env.ORDER_NOTIFY_EMAIL;
  if (!apiKey || !from || !to) {
    console.warn("Owner order email skipped: RESEND_API_KEY / EMAIL_FROM / ORDER_NOTIFY_EMAIL not set.", session.id);
    return;
  }

  const ref = session.id.slice(-10);
  const cust = session.customer_details;
  const ship = session.collected_information?.shipping_details;

  const items = (session.line_items?.data ?? [])
    .map((li) => {
      const meta = (li.price?.product as Stripe.Product | undefined)?.metadata ?? {};
      const tiles = decodeGrid(meta.grid);
      let detail = "";
      if (tiles) {
        const cell = (t: number) =>
          `<td style="border:1px solid #bbb;padding:6px 8px;font-size:13px;text-align:center;background:${TILES[t].hex};color:#000">${esc(TILES[t].name)}</td>`;
        // 4 rows of 4 tiles, read left to right, top to bottom
        const rows = [0, 4, 8, 12]
          .map((i) => `<tr>${tiles.slice(i, i + 4).map(cell).join("")}</tr>`)
          .join("");
        detail = `<table style="border-collapse:collapse;margin:8px 0">${rows}</table>
          <div style="font-size:12px;opacity:.7">Design code: ${esc(meta.grid)}</div>`;
      } else if (meta.sku) {
        detail = `<div style="font-size:13px;opacity:.7">Ready-made: ${esc(meta.sku)}</div>`;
      }
      return `<div style="padding:12px 0;border-bottom:1px solid #d9cfc0">
        <div style="font-size:18px;font-weight:bold">${li.quantity ?? 1} &times; ${esc(li.description)}</div>
        ${detail}
      </div>`;
    })
    .join("");

  const addr = ship?.address;
  const address = addr
    ? [ship?.name, addr.line1, addr.line2, `${addr.city ?? ""}, ${addr.state ?? ""} ${addr.postal_code ?? ""}`]
        .filter(Boolean)
        .map(esc)
        .join("<br>")
    : "(no shipping address)";

  const html = `<div style="font-family:Arial,Helvetica,sans-serif;color:#222;max-width:600px">
    <h2 style="margin:0 0 4px">New order #${esc(ref)}</h2>
    <p style="margin:0 0 16px">Total ${formatUsd(session.amount_total ?? 0)}</p>
    <h3 style="margin:16px 0 0">Make these</h3>${items}
    <h3 style="margin:20px 0 4px">Ship to</h3><p style="margin:0">${address}</p>
    <h3 style="margin:20px 0 4px">Customer</h3>
    <p style="margin:0">${esc(cust?.name)}<br>${esc(cust?.email)}<br>${esc(cust?.phone)}</p>
  </div>`;

  await postEmail(apiKey, `owner-${session.id}`, {
    from,
    to,
    subject: `New order #${ref}: ${(session.line_items?.data ?? []).reduce((n, li) => n + (li.quantity ?? 1), 0)} coaster(s)`,
    html,
  });
}
