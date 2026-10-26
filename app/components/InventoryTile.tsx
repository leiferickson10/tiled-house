"use client";

import { useEffect, useState, type FormEvent, type ReactNode } from "react";
import { createPortal } from "react-dom";

/*
 * One clickable Coasters / Trays / Tables / Decor tile on the home page.
 * With an `href` it is a plain link (Coasters -> /shop). Without one it opens
 * the "coming soon" popup. The popup is portaled to <body> because the home
 * sections use container-type, which would otherwise clip a fixed overlay.
 */

const DISPLAY = { fontFamily: "var(--font-marcellus), serif" } as const;
const DM = { fontFamily: "var(--font-dm-sans), sans-serif" } as const;

export default function InventoryTile({
  label,
  href,
  children,
}: {
  label: string;
  href?: string;
  children: ReactNode;
}) {
  const [open, setOpen] = useState(false);

  const tileClass =
    "group block h-full w-full cursor-pointer text-inherit no-underline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#b15356]";

  if (href) {
    return (
      <a href={href} className={tileClass} aria-label={`Shop ${label.toLowerCase()}`}>
        {children}
      </a>
    );
  }

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        aria-haspopup="dialog"
        className={`${tileClass} border-0 bg-transparent p-0 text-left`}
      >
        {children}
      </button>
      {open && <ComingSoonModal label={label} onClose={() => setOpen(false)} />}
    </>
  );
}

function ComingSoonModal({
  label,
  onClose,
}: {
  label: string;
  onClose: () => void;
}) {
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">(
    "idle",
  );
  const name = label.charAt(0) + label.slice(1).toLowerCase();
  const verb = label === "DECOR" ? "is" : "are";

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = prevOverflow;
    };
  }, [onClose]);

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const email = new FormData(e.currentTarget).get("email");
    setStatus("sending");
    try {
      const res = await fetch("/api/notify", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, item: label }),
      });
      if (!res.ok) throw new Error("Request failed");
      setStatus("sent");
    } catch {
      setStatus("error");
    }
  }

  return createPortal(
    <div
      className="fixed inset-0 z-[1000] flex items-center justify-center p-4"
      style={{ background: "rgba(60, 25, 27, 0.55)" }}
      onClick={onClose}
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="coming-soon-title"
        className="relative w-full max-w-md px-7 py-9 text-center shadow-2xl"
        style={{ ...DM, background: "#f9f8f0", color: "#b15356" }}
        onClick={(e) => e.stopPropagation()}
      >
        <button
          type="button"
          onClick={onClose}
          aria-label="Close"
          className="absolute right-3 top-2 cursor-pointer border-0 bg-transparent text-3xl leading-none"
          style={{ color: "#b15356" }}
        >
          &times;
        </button>

        {status === "sent" ? (
          <div role="status" className="py-6">
            <p id="coming-soon-title" className="text-2xl" style={DISPLAY}>
              You&apos;re on the list!
            </p>
            <p className="mt-3 text-base">
              We&apos;ll email you as soon as {name.toLowerCase()} {verb} in store.
            </p>
          </div>
        ) : (
          <>
            <h2
              id="coming-soon-title"
              className="text-2xl leading-snug"
              style={DISPLAY}
            >
              {name} {verb} coming soon!
            </h2>
            <p className="mt-3 text-base leading-snug">
              Please put your email here if you would like us to update you when
              it is finally in store:
            </p>

            <form onSubmit={handleSubmit} className="mt-5 flex flex-col gap-3">
              <input
                type="email"
                name="email"
                required
                autoFocus
                autoComplete="email"
                placeholder="you@email.com"
                aria-label="Email address"
                className="w-full border px-3 py-3 text-base"
                style={{ borderColor: "#b15356", background: "#fff", color: "#333" }}
              />
              <button
                type="submit"
                disabled={status === "sending"}
                className="w-full cursor-pointer border-0 px-3 py-3 text-base disabled:opacity-60"
                style={{ background: "#ddcd71", color: "#ac5725" }}
              >
                {status === "sending" ? "Sending..." : "Get early access"}
              </button>
              {status === "error" && (
                <p role="alert" className="text-sm">
                  Something went wrong. Please try again.
                </p>
              )}
            </form>

            <div
              className="my-5 flex items-center gap-3 text-sm uppercase tracking-widest"
              aria-hidden="true"
            >
              <span className="h-px flex-1" style={{ background: "#b15356", opacity: 0.4 }} />
              or
              <span className="h-px flex-1" style={{ background: "#b15356", opacity: 0.4 }} />
            </div>

            <a
              href="/shop"
              className="block w-full px-3 py-3 text-base underline"
              style={{ background: "#ddcd71", color: "#ac5725" }}
            >
              Shop our current inventory
            </a>
          </>
        )}
      </div>
    </div>,
    document.body,
  );
}
