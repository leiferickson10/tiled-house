"use client";

import Link from "next/link";
import { useState, type FormEvent } from "react";

/*
 * Site-wide footer (rendered from app/layout.tsx) with the email signup for
 * new pieces, sales and blog posts. Submissions go to POST /api/subscribe.
 */

const DISPLAY = { fontFamily: "var(--font-marcellus), serif" } as const;
const DM = { fontFamily: "var(--font-dm-sans), sans-serif" } as const;

export default function SiteFooter() {
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">(
    "idle",
  );

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const email = new FormData(e.currentTarget).get("email");
    setStatus("sending");
    try {
      const res = await fetch("/api/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, source: "footer" }),
      });
      if (!res.ok) throw new Error("Request failed");
      setStatus("sent");
    } catch {
      setStatus("error");
    }
  }

  return (
    <footer
      className="w-full px-6 py-12 text-center sm:px-10"
      style={{ ...DM, background: "#b15356", color: "#f9f8f0" }}
    >
      <div className="mx-auto max-w-xl">
        <h2 className="text-3xl leading-snug sm:text-4xl" style={DISPLAY}>
          Join the Tiled House list
        </h2>
        <p className="mt-3 text-base leading-snug">
          Get new pieces, sales and blog posts in your inbox.
        </p>

        {status === "sent" ? (
          <p role="status" className="mt-6 text-lg" style={DISPLAY}>
            Thank you! You&apos;re on the list.
          </p>
        ) : (
          <form
            onSubmit={handleSubmit}
            className="mt-6 flex flex-col gap-3 sm:flex-row"
          >
            <input
              type="email"
              name="email"
              required
              autoComplete="email"
              placeholder="you@email.com"
              aria-label="Email address"
              className="min-h-12 w-full flex-1 border-0 px-4 py-3 text-base"
              style={{ background: "#fff", color: "#333" }}
            />
            <button
              type="submit"
              disabled={status === "sending"}
              className="min-h-12 cursor-pointer border-0 px-6 py-3 text-base disabled:opacity-60"
              style={{ background: "#ddcd71", color: "#ac5725" }}
            >
              {status === "sending" ? "Subscribing..." : "Subscribe"}
            </button>
          </form>
        )}
        {status === "error" && (
          <p role="alert" className="mt-3 text-sm">
            Something went wrong. Please try again.
          </p>
        )}

        <p className="mt-4 text-xs leading-snug opacity-80">
          By subscribing you agree to receive emails from Tiled House about new
          pieces, sales and blog posts. Unsubscribe anytime.
        </p>

        <nav
          aria-label="Footer"
          className="mt-8 flex justify-center gap-6 text-sm underline"
        >
          <Link href="/">Home</Link>
          <Link href="/shop">Shop</Link>
          <Link href="/custom">Custom Design</Link>
        </nav>
        <p className="mt-6 text-xs opacity-80">
          &copy; {new Date().getFullYear()} Tiled House
        </p>
      </div>
    </footer>
  );
}
