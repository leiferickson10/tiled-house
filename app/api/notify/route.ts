import { NextRequest, NextResponse } from "next/server";
import { esc, isEmail, oneLine, sendOwnerNotice } from "../../lib/notifyEmail";

/** "Coming soon" pop-up: emails the shop owner who wants to hear when an item is ready. */
export async function POST(req: NextRequest) {
  const body = await req.json().catch(() => null);
  const email = typeof body?.email === "string" ? body.email.trim() : "";
  const item = typeof body?.item === "string" ? oneLine(body.item, 40) : "";

  if (!isEmail(email)) {
    return NextResponse.json({ error: "Please enter a valid email." }, { status: 400 });
  }

  try {
    await sendOwnerNotice({
      subject: `Notify request${item ? `: ${item}` : ""}`,
      html: `<h2 style="margin:0 0 8px">Someone wants to be notified</h2>
        <p style="margin:0"><strong>${esc(email)}</strong></p>
        <p style="margin:8px 0 0">Item: <strong>${esc(item || "(not specified)")}</strong></p>
        <p style="margin:12px 0 0;font-size:13px;color:#666">Reply to this email to reach them.</p>`,
      replyTo: email,
    });
  } catch (err) {
    console.error("Notify request email failed:", err);
    return NextResponse.json({ error: "Something went wrong. Please try again." }, { status: 502 });
  }
  return NextResponse.json({ ok: true });
}
