import AboutGallery from "./AboutGallery";

/*
 * "About Us" section, shared by the desktop/tablet and phone home layouts.
 * Two columns (carousel left, copy right) from 900px up; stacked below that.
 */

const DM = { fontFamily: "var(--font-dm-sans), sans-serif" } as const;
const HEAVY = {
  fontFamily: "var(--font-fraunces), serif",
  fontWeight: 800,
  lineHeight: 0.9,
  letterSpacing: "-0.026em",
} as const;

const CREAM = "#FFFDF3";

export default function AboutSection({
  id,
  shopHref,
  gallerySizes,
}: {
  id: string;
  shopHref: string;
  gallerySizes: string;
}) {
  return (
    <section
      id={id}
      className="px-6 pb-10 pt-10 min-[900px]:px-[55px] min-[900px]:pb-[100px]"
      style={{ background: "#D3C467" }}
    >
      <h2
        className="mb-8"
        style={{ ...HEAVY, color: "#B04F57", fontSize: "clamp(56px, 6.9vw, 110px)" }}
      >
        About Us
      </h2>

      <div className="grid grid-cols-1 items-start gap-8 min-[900px]:grid-cols-[470fr_715fr] min-[900px]:gap-x-[150px]">
        <div className="min-[900px]:pl-[clamp(0px,6.2vw,90px)]">
          <div className="mx-auto w-full max-w-[380px] min-[900px]:mx-0">
            <AboutGallery sizes={gallerySizes} aspect="5 / 7" />
          </div>
        </div>

        <div
          className="text-[18px] leading-[1.3] min-[900px]:text-[22px]"
          style={{ ...DM, color: CREAM }}
        >
          <p className="mb-6">
            <strong>Tiled House</strong> is a Home Decor shop thats all about
            making your home feel like YOU!
          </p>
          <ul className="list-disc space-y-[22px] pl-5">
            <li>
              <a href={shopHref} className="underline">
                Shop our one-of-a-kind tile furniture and decor
              </a>
              , handmade with quality ensured.
            </li>
            <li>
              <a href="/custom" className="underline">
                Customize a piece
              </a>{" "}
              with your favorite colors and details, personaly selected by you
              to match your home. Leave it to us to hand craft your vision with
              our professional designers!
            </li>
            <li>
              <a href="#" className="underline">
                DIY your own
              </a>
              , get creative with one of our DIY kits. Hand make your own
              decor, select the colors materials to match the style you want
              and litterly make your home feel like you!
            </li>
          </ul>

          <p
            className="mt-10 flex flex-wrap justify-center gap-x-[70px] gap-y-3 text-center text-[20px] uppercase tracking-[0.12em] min-[900px]:text-[26px]"
            style={{ fontWeight: 300 }}
          >
            <span>Shop it.</span>
            <span>Customize it.</span>
            <span>DIY it.</span>
          </p>
          <p className="mt-[30px] text-center italic">
            Create something you love and make it yours
          </p>
        </div>
      </div>
    </section>
  );
}
