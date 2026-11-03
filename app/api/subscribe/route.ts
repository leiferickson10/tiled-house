import { NextRequest, NextResponse } from "next/server";
import { esc, isEmail, oneLine, sendOwnerNotice } from "../../lib/notifyEmail";

/** Footer newsletter signup: emails the new subscriber's address to the shop owner. */
export async function POST(req: NextRequest) {
  const body = await req.json().catch(() => null);
  const email = typeof body?.email === "string" ? body.email.trim() : "";
  const source = typeof body?.source === "string" ? oneLine(body.source, 40) : "";

  if (!isEmail(email)) {
    return NextResponse.json({ error: "Please enter a valid email." }, { status: 400 });
  }

  try {
    await sendOwnerNotice({
      subject: `New newsletter signup: ${oneLine(email, 120)}`,
      html: `<h2 style="margin:0 0 8px">New newsletter signup</h2>
        <p style="margin:0"><strong>${esc(email)}</strong></p>
        ${source ? `<p style="margin:8px 0 0;font-size:13px;color:#666">From: ${esc(source)}</p>` : ""}`,
      replyTo: email,
    });
  } catch (err) {
    console.error("Newsletter signup email failed:", err);
    return NextResponse.json({ error: "Something went wrong. Please try again." }, { status: 502 });
  }
  return NextResponse.json({ ok: true });
}
