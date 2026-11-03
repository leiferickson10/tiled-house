import { NextRequest, NextResponse } from "next/server";
import { esc, isEmail, oneLine, sendOwnerNotice } from "../../lib/notifyEmail";

/** Booking form: emails the shop owner the request, with Reply-To set to the visitor. */
export async function POST(req: NextRequest) {
  const body = await req.json().catch(() => null);
  const name = oneLine(body?.name, 100);
  const email = typeof body?.email === "string" ? body.email.trim() : "";
  const craft = oneLine(body?.craft, 100);
  const crafters = oneLine(body?.crafters, 10);
  const notes = typeof body?.notes === "string" ? body.notes.trim().slice(0, 2000) : "";

  if (!name || !craft || !isEmail(email)) {
    return NextResponse.json({ error: "Missing required fields." }, { status: 400 });
  }

  try {
    await sendOwnerNotice({
      subject: `Booking request from ${name}`,
      html: `<h2 style="margin:0 0 8px">New booking request</h2>
        <p style="margin:0 0 4px"><strong>Name:</strong> ${esc(name)}</p>
        <p style="margin:0 0 4px"><strong>Email:</strong> ${esc(email)}</p>
        <p style="margin:0 0 4px"><strong>Craft:</strong> ${esc(craft)}</p>
        <p style="margin:0 0 4px"><strong>Number of crafters:</strong> ${esc(crafters || "(not given)")}</p>
        ${notes ? `<p style="margin:12px 0 0"><strong>Notes:</strong><br>${esc(notes).replace(/\n/g, "<br>")}</p>` : ""}
        <p style="margin:16px 0 0;font-size:13px;color:#666">Reply to this email to answer them directly.</p>`,
      replyTo: email,
    });
  } catch (err) {
    console.error("Booking request email failed:", err);
    return NextResponse.json({ error: "Something went wrong. Please try again." }, { status: 502 });
  }
  return NextResponse.json({ ok: true });
}
