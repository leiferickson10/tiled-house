"use client";

import { useState } from "react";

const CRAFT_OPTIONS = [
  "Custom Phone Cases",
  "Tile Frames / Coasters",
  "DIY Keychains",
];

export default function BookingForm() {
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">(
    "idle"
  );

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("sending");

    const form = new FormData(e.currentTarget);
    const payload = Object.fromEntries(form.entries());

    try {
      const res = await fetch("/api/book", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (!res.ok) throw new Error("Request failed");
      setStatus("sent");
      e.currentTarget.reset();
    } catch {
      setStatus("error");
    }
  }

  if (status === "sent") {
    return (
      <div className="border border-ink/20 bg-plaster/60 px-6 py-8">
        <p className="font-serif text-2xl">Request sent.</p>
        <p className="mt-2 text-ink/70">
          We&apos;ll text or email you back with availability within a day.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      <Field label="Name" name="name" required />
      <Field label="Email" name="email" type="email" required />
      <Field label="Number of Crafters" name="crafters" type="number" min={1} />

      <label className="flex flex-col gap-1 text-sm">
        <span className="text-ink/80">Craft Selection</span>
        <select
          name="craft"
          required
          className="border border-ink/30 bg-plaster px-3 py-2 text-ink focus:outline-2 focus:outline-offset-2 focus:outline-ink"
        >
          {CRAFT_OPTIONS.map((c) => (
            <option key={c} value={c}>
              {c}
            </option>
          ))}
        </select>
      </label>

      <label className="flex flex-col gap-1 text-sm">
        <span className="text-ink/80">Questions or additional info</span>
        <textarea
          name="notes"
          rows={3}
          className="border border-ink/30 bg-plaster px-3 py-2 text-ink focus:outline-2 focus:outline-offset-2 focus:outline-ink"
        />
      </label>

      <button
        type="submit"
        disabled={status === "sending"}
        className="mt-2 bg-mustard px-6 py-3 font-medium text-ink transition-colors hover:bg-mustard/80 disabled:opacity-60"
      >
        {status === "sending" ? "Sending…" : "Send"}
      </button>

      {status === "error" && (
        <p className="text-sm text-clay">
          Something didn&apos;t go through — call us at 385-775-4313 instead.
        </p>
      )}
    </form>
  );
}

function Field({
  label,
  name,
  type = "text",
  required,
  min,
}: {
  label: string;
  name: string;
  type?: string;
  required?: boolean;
  min?: number;
}) {
  return (
    <label className="flex flex-col gap-1 text-sm">
      <span className="text-ink/80">{label}</span>
      <input
        name={name}
        type={type}
        required={required}
        min={min}
        className="border border-ink/30 bg-plaster px-3 py-2 text-ink focus:outline-2 focus:outline-offset-2 focus:outline-ink"
      />
    </label>
  );
}
