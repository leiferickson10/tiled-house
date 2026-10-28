import Image from "next/image";
import type { ReactNode } from "react";

/*
 * "Meet the Creators" section, shared by the desktop/tablet and phone home
 * layouts. Photo on the left (stacked on top below 900px), mustard text panel
 * on the right.
 *
 * The photo is portrait and gets cropped differently at each size, so the
 * script names and arrows are positioned as percentages of the *whole photo*
 * (the "stage", pinned to the bottom of the frame), not of the visible frame.
 * That keeps them on the right people at every width. Only the title is placed
 * against the frame, since it sits over the sky at the top.
 */

const HEAVY = {
  fontFamily: "var(--font-fraunces), serif",
  fontWeight: 800,
  lineHeight: 0.9,
  letterSpacing: "-0.026em",
} as const;
const SCRIPT = { fontFamily: "var(--font-yellowtail), cursive", lineHeight: 1 } as const;
const DM = { fontFamily: "var(--font-dm-sans), sans-serif" } as const;

const ROSE = "#B04F57";
const CREAM = "#FFFDF3";

// Brick-rose, bold and underlined: names and the brand.
function Name({ children }: { children: ReactNode }) {
  return (
    <strong className="underline" style={{ color: ROSE }}>
      {children}
    </strong>
  );
}

// Brick-rose only: highlighted phrases.
function Rose({ children }: { children: ReactNode }) {
  return <span style={{ color: ROSE }}>{children}</span>;
}

export default function MeetCreators({ id }: { id: string }) {
  return (
    <section id={id} aria-labelledby={`${id}-title`} className="p-3">
      <div className="grid grid-cols-1 overflow-hidden min-[900px]:min-h-[clamp(560px,56vw,820px)] min-[900px]:grid-cols-[66fr_34fr]">
        <div
          className="relative aspect-[4/5] overflow-hidden min-[900px]:aspect-auto"
          style={{ containerType: "inline-size" }}
        >
          <div
            className="absolute bottom-0 left-0 w-full"
            style={{ aspectRatio: "896 / 1345" }}
          >
            <Image
              src="/images/meet-the-creators.webp"
              alt="Leif and Callie Erickson standing on a salt flat with snow-capped mountains behind them."
              fill
              sizes="(min-width: 900px) 66vw, 100vw"
              className="object-cover"
            />

            {/* Decorative name labels and arrows (percent of the whole photo). */}
            <div aria-hidden="true" className="pointer-events-none absolute inset-0">
              <span
                className="absolute whitespace-nowrap"
                style={{ ...SCRIPT, color: ROSE, left: "17%", top: "61.2%", fontSize: "7.6cqw" }}
              >
                Leif
              </span>
              <svg
                className="absolute"
                style={{ left: "22.9%", top: "65.5%", width: "13.07%" }}
                viewBox="0 0 120 92"
                fill="none"
                stroke={ROSE}
                strokeWidth="3.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M8 9 C 14 50, 50 80, 106 82" />
                <path d="M92 72 L107 82 L92 91" />
              </svg>

              <span
                className="absolute whitespace-nowrap"
                style={{ ...SCRIPT, color: ROSE, left: "69%", top: "67.4%", fontSize: "7.8cqw" }}
              >
                Callie
              </span>
              <svg
                className="absolute"
                style={{ left: "59.9%", top: "63.4%", width: "14.16%" }}
                viewBox="0 0 130 75"
                fill="none"
                stroke={ROSE}
                strokeWidth="3.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M120 38 C 100 30, 60 30, 48 52 C 42 66, 62 62, 56 44 C 50 26, 30 16, 12 13" />
                <path d="M24 2 L8 13 L25 25" />
              </svg>
            </div>
          </div>

          <h2
            id={`${id}-title`}
            className="absolute left-[4%] top-[3%] z-10 text-[48px] min-[900px]:whitespace-nowrap min-[900px]:text-[clamp(56px,10.2cqw,110px)]"
            style={{ ...HEAVY, color: ROSE }}
          >
            Meet the Creators
          </h2>
        </div>

        <div
          className="flex flex-col justify-center p-6 min-[900px]:p-[22px]"
          style={{ background: "#DCCB6A", color: CREAM, ...DM }}
        >
          <h3 className="mb-10 text-[40px] min-[900px]:text-[clamp(30px,2.74vw,40px)]" style={{ ...HEAVY, color: CREAM }}>
            nice to meet you!
          </h3>
          <div className="space-y-6 text-[16px] font-normal leading-[1.4] min-[900px]:text-[clamp(15px,1.23vw,18px)]">
            <p>
              We are <Name>Leif &amp; Callie Erickson</Name>, the owners of{" "}
              <Name>Tiled House!</Name> We decided we wanted to work together
              and combine the things we love to create a{" "}
              <Rose>business</Rose> of our own.
            </p>
            <p>
              <Name>Leif</Name> loves all things <Rose>business</Rose> and{" "}
              <Rose>code</Rose>. He has always wanted to start his own company
              and turn his many ideas into something great. He enjoys finding
              creative ways to bring ideas to life and{" "}
              <Rose>turning our visions into something real</Rose>.
            </p>
            <p>
              <Name>Callie</Name> loves all things <Rose>design</Rose> and{" "}
              <Rose>decor</Rose>. She has a degree in interior design and has
              always wanted to create something of her own. She loves finding
              ways to <Rose>make spaces feel personal</Rose> and unique through
              color, texture, and thoughtful details.
            </p>
            <p>
              Together, we decided that <Name>Tiled House</Name> was the perfect
              way to combine our passions and create something we love.{" "}
              <Rose>
                We are so excited to share our work with you and truly
                appreciate all your support!
              </Rose>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
