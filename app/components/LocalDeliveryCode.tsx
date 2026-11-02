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
      <p role="status" className="mt-4 rounded-md bg-[#ddcd71]/40 p-3 text-sm">
        <strong>Free local delivery applied.</strong> We&rsquo;ll drop your order off.{" "}
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
    );
  }

  return (
    <details className="mt-4 text-sm">
      <summary className="cursor-pointer font-medium underline underline-offset-4">
        Local to us? Enter your delivery code
      </summary>
      <form onSubmit={apply} className="mt-3 flex gap-2">
        <input
          name="code"
          type="text"
          autoComplete="off"
          autoCapitalize="characters"
          aria-label="Local delivery code"
          placeholder="Delivery code"
          className="min-h-11 w-full flex-1 rounded-md border border-[#4a1d31]/30 bg-white px-3 text-base"
        />
        <button
          type="submit"
          disabled={status === "checking"}
          className="min-h-11 rounded-full bg-[#b15356] px-5 text-sm font-bold text-[#f9f8f0] disabled:opacity-60"
        >
          {status === "checking" ? "Checking..." : "Apply"}
        </button>
      </form>
      {status === "invalid" && (
        <p role="alert" className="mt-2 text-[#b15356]">
          That code isn&rsquo;t valid.
        </p>
      )}
      {status === "error" && (
        <p role="alert" className="mt-2 text-[#b15356]">
          Couldn&rsquo;t check the code. Please try again.
        </p>
      )}
    </details>
  );
}
