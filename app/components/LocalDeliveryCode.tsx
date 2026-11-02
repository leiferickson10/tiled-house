"use client";

import { useEffect, useState, type FormEvent } from "react";
import { clearLocalCode, getSavedLocalCode, saveLocalCode } from "../lib/localCode";

/** "Local delivery?" box on the cart page. A valid code makes shipping free at checkout. */
export default function LocalDeliveryCode() {
  const [applied, setApplied] = useState(false);
  const [status, setStatus] = useState<"idle" | "checking" | "invalid" | "error">("idle");

  // Re-check a code saved earlier in this tab (it may have been changed since).
  useEffect(() => {
    const saved = getSavedLocalCode();
    if (!saved) return;
    fetch("/api/local-delivery", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ code: saved }),
    })
      .then((r) => r.json())
      .then((d: { valid: boolean }) => {
        if (d.valid) setApplied(true);
        else clearLocalCode();
      })
      .catch(() => {});
  }, []);

  async function apply(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const code = String(new FormData(e.currentTarget).get("code") ?? "").trim();
    if (!code) return;
    setStatus("checking");
    try {
      const res = await fetch("/api/local-delivery", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ code }),
      });
      const data = (await res.json()) as { valid: boolean };
      if (data.valid) {
        saveLocalCode(code);
        setApplied(true);
        setStatus("idle");
      } else {
        setStatus("invalid");
      }
    } catch {
      setStatus("error");
    }
  }

  if (applied) {
    return (
      <div
        role="status"
        className="mt-5 flex items-start gap-3 rounded-lg border-2 border-[#4a1d31] bg-[#ddcd71] p-4"
      >
        <TruckIcon />
        <p className="text-base">
          <strong>Free local delivery applied!</strong> We&rsquo;ll drop your order off.{" "}
          <button
            type="button"
            onClick={() => {
              clearLocalCode();
              setApplied(false);
            }}
            className="underline underline-offset-2"
          >
            Remove
          </button>
        </p>
      </div>
    );
  }

  return (
    <div className="mt-5 rounded-lg border-2 border-[#b15356] bg-[#ddcd71]/35 p-4">
      <div className="flex items-center gap-3">
        <TruckIcon />
        <div>
          <p
            className="text-xl leading-tight text-[#4a1d31]"
            style={{ fontFamily: "var(--font-fraunces), serif", fontWeight: 800 }}
          >
            Local to us?
          </p>
          <p className="text-sm font-medium text-[#4a1d31]">
            Enter your delivery code for free local delivery.
          </p>
        </div>
      </div>
      <form onSubmit={apply} className="mt-3 flex gap-2">
        <input
          name="code"
          type="text"
          autoComplete="off"
          autoCapitalize="characters"
          aria-label="Local delivery code"
          placeholder="Delivery code"
          className="min-h-12 w-full flex-1 rounded-md border-2 border-[#4a1d31]/30 bg-white px-3 text-base"
        />
        <button
          type="submit"
          disabled={status === "checking"}
          className="min-h-12 rounded-full bg-[#b15356] px-6 text-base font-bold text-[#f9f8f0] transition hover:bg-[#9a4347] disabled:opacity-60"
        >
          {status === "checking" ? "Checking..." : "Apply"}
        </button>
      </form>
      {status === "invalid" && (
        <p role="alert" className="mt-2 text-sm font-bold text-[#b15356]">
          That code isn&rsquo;t valid.
        </p>
      )}
      {status === "error" && (
        <p role="alert" className="mt-2 text-sm font-bold text-[#b15356]">
          Couldn&rsquo;t check the code. Please try again.
        </p>
      )}
    </div>
  );
}

function TruckIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      className="h-8 w-8 shrink-0 text-[#b15356]"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M3 6h11v10H3zM14 9h4l3 3v4h-7z" />
      <circle cx="7" cy="17.5" r="1.8" fill="#f9f8f0" />
      <circle cx="17" cy="17.5" r="1.8" fill="#f9f8f0" />
    </svg>
  );
}
