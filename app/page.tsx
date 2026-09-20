import Image from "next/image";
import BookingForm from "./components/BookingForm";

const NAV = [
  { label: "Home", href: "#home" },
  { label: "Shop", href: "#shop" },
  { label: "Craft Studio", href: "#studio" },
  { label: "Book Here", href: "#book" },
];

export default function Home() {
  return (
    <main className="flex flex-col">
      <SiteHeader />
      <Hero />
      <AboutStrip />
      <Staples />
      <CeramicCreations />
      <CraftsGrid />
      <TileShopFeature />
      <ShopInventory />
      <BookHere />
      <SiteFooter />
    </main>
  );
}

function SiteHeader() {
  return (
    <header className="flex items-center justify-between border-b border-ink/10 bg-plaster px-6 py-4 sm:px-10">
      <span className="font-serif text-xl">Tiled House</span>
      <nav className="hidden gap-8 text-sm sm:flex">
        {NAV.map((item) => (
          <a key={item.href} href={item.href} className="hover:text-clay">
            {item.label}
          </a>
        ))}
      </nav>
      <a
        href="#book"
        className="border border-ink px-4 py-2 text-sm hover:bg-ink hover:text-plaster sm:hidden"
      >
        Book
      </a>
    </header>
  );
}

function Hero() {
  return (
    <section id="home" className="bg-sky">
      <div className="mx-auto flex max-w-6xl flex-col gap-8 px-6 pb-10 pt-12 sm:flex-row sm:items-start sm:justify-between sm:px-10 sm:pt-16">
        <h1 className="font-serif text-6xl font-bold leading-[0.85] tracking-tight text-terracotta sm:text-8xl">
          Tiled House
        </h1>
        <div className="flex shrink-0 flex-col items-start gap-4 sm:items-end">
          <Image
            src="/images/hero-logo.png"
            alt="Tiled House logo"
            width={156}
            height={166}
            className="hidden sm:block"
          />
          <div className="flex flex-wrap gap-3">
            <a
              href="#book"
              className="bg-khaki px-5 py-3 text-sm font-medium text-white underline underline-offset-2 hover:bg-khaki/80"
            >
              Book a Craft Studio
            </a>
            <a
              href="#shop"
              className="bg-khaki px-5 py-3 text-sm font-medium text-white underline underline-offset-2 hover:bg-khaki/80"
            >
              View our Inventory
            </a>
          </div>
        </div>
      </div>
      <div className="relative h-56 w-full sm:h-80">
        <Image
          src="/images/hero-flowers.png"
          alt="Twig of blue flowers"
          fill
          sizes="100vw"
          className="object-cover"
          priority
        />
      </div>
    </section>
  );
}

function AboutStrip() {
  return (
    <section className="bg-[linear-gradient(to_bottom_left,#c96951,#a23322)] px-6 py-20 sm:px-10 sm:py-28">
      <div className="mx-auto grid max-w-6xl gap-10 md:grid-cols-2">
        <div className="flex flex-col gap-10">
          <h2 className="font-serif text-6xl font-bold leading-[0.9] tracking-tight text-gold sm:text-8xl">
            About Us
          </h2>
          <div className="flex flex-col gap-6">
            <a
              href="#book"
              className="w-fit bg-gold px-8 py-5 text-base font-medium text-rose underline underline-offset-2 hover:bg-gold/80"
            >
              Book a Craft Studio
            </a>
            <a
              href="#shop"
              className="w-fit bg-gold px-8 py-5 text-base font-medium text-rose underline underline-offset-2 hover:bg-gold/80"
            >
              Shop our Inventory
            </a>
          </div>
        </div>
        <div className="flex flex-col justify-center gap-4 pt-4 text-offwhite md:pt-16">
          <p>
            A Craft Studio &amp; Home Decor Shop
            <br />
            A place to make your home feel like you.
          </p>
          <p>
            Come create something yourself and make a fun day out of it—whether
            you&apos;re coming alone, with friends, or with someone you love.
          </p>
          <p>Or</p>
          <p>
            shop our website for one-of-a-kind furniture and decor. Some
            pieces can even be customized, so you can choose the colors,
            details, and style to fit your home perfectly.
          </p>
          <p className="font-medium">CREATE IT. CUSTOMIZE IT. MAKE IT YOURS.</p>
        </div>
      </div>
    </section>
  );
}

const STAPLE_PHOTOS = [
  {
    src: "/images/staples-3.png",
    alt: "Ceramic shell dishes arranged overhead",
    style: { left: "5.6%", top: "30.6%", width: "24.7%", height: "53.6%", zIndex: 10 },
  },
  {
    src: "/images/staples-2.png",
    alt: "Shells arranged in a grid on a textured wall",
    style: { left: "71.2%", top: "15.0%", width: "20.4%", height: "35.1%", zIndex: 10 },
  },
  {
    src: "/images/staples-4.png",
    alt: "Shell jewelry tray with pearls and a starfish",
    style: { left: "40.1%", top: "44.8%", width: "25.8%", height: "51.6%", zIndex: 10 },
  },
];

function Staples() {
  return (
    <section className="bg-[#e6e7ea] px-6 py-12 sm:px-10 sm:py-16">
      <div className="relative mx-auto aspect-[1366/772] max-w-6xl">
        <h2
          className="absolute font-serif text-2xl font-bold leading-[0.9] tracking-tight text-teal sm:text-4xl lg:text-6xl"
          style={{ left: "3.5%", top: "2.5%", width: "45.2%" }}
        >
          the staples
          <br />
          behind our name
        </h2>
        {STAPLE_PHOTOS.map((photo) => (
          <div
            key={photo.src}
            className="absolute overflow-hidden"
            style={photo.style}
          >
            <Image
              src={photo.src}
              alt={photo.alt}
              fill
              sizes="30vw"
              className="object-cover"
            />
          </div>
        ))}
        <a
          href="#book"
          className="absolute flex items-center justify-center bg-teal px-2 text-center text-[10px] font-medium text-white underline underline-offset-2 hover:bg-teal/80 sm:text-sm"
          style={{ left: "75.6%", top: "64.2%", width: "16.0%", height: "6.3%" }}
        >
          Book a Craft Studio
        </a>
        <a
          href="#shop"
          className="absolute flex items-center justify-center bg-teal px-2 text-center text-[10px] font-medium text-white underline underline-offset-2 hover:bg-teal/80 sm:text-sm"
          style={{ left: "75.6%", top: "75.8%", width: "16.0%", height: "6.3%" }}
        >
          Shop the Shore Shop.
        </a>
      </div>
    </section>
  );
}

function CeramicCreations() {
  return (
    <section id="studio" className="bg-forest px-6 py-12 sm:px-10 sm:py-16">
      <div className="relative mx-auto aspect-[1366/763] max-w-6xl">
        <div
          className="absolute overflow-hidden"
          style={{ left: "1.3%", top: "13.8%", width: "18.0%", height: "48.1%" }}
        >
          <Image
            src="/images/ceramic-matches.png"
            alt="Ceramic matchstick holder"
            fill
            sizes="20vw"
            className="object-cover"
          />
        </div>
        <div
          className="absolute overflow-hidden"
          style={{ left: "59.2%", top: "17.7%", width: "36.0%", height: "82.4%" }}
        >
          <Image
            src="/images/ceramic-mug.png"
            alt="Ceramic mug and bud vase on a tile tray"
            fill
            sizes="40vw"
            className="object-cover"
          />
        </div>
        <h2
          className="absolute font-serif text-2xl font-bold leading-[0.9] tracking-tight text-sprout sm:text-4xl lg:text-6xl"
          style={{ left: "21.1%", top: "24.2%", width: "32.4%" }}
        >
          Ceramic Creations
        </h2>
        <p
          className="absolute text-xs text-offwhite sm:text-base lg:text-xl"
          style={{ left: "22.2%", top: "53.5%", width: "32.4%" }}
        >
          Brand photography Lifestyle sessions Editorial collaborations
          <br />
          Creative direction
        </p>
        <a
          href="#shop"
          className="absolute flex items-center justify-center bg-olive px-2 text-center text-[10px] font-medium text-ink underline underline-offset-2 hover:bg-olive/80 sm:text-sm"
          style={{ left: "14.4%", top: "84.4%", width: "16.6%", height: "7.6%" }}
        >
          Shop our Ceramics
        </a>
        <a
          href="#book"
          className="absolute flex items-center justify-center bg-olive px-2 text-center text-[10px] font-medium text-ink underline underline-offset-2 hover:bg-olive/80 sm:text-sm"
          style={{ left: "35.2%", top: "84.4%", width: "16.6%", height: "7.6%" }}
        >
          Book a Craft Studio
        </a>
      </div>
    </section>
  );
}

function CraftsGrid() {
  return (
    <section className="bg-dustyplum px-6 py-12 sm:px-10 sm:py-16">
      <div className="relative mx-auto aspect-[1366/778] max-w-6xl">
        <h2
          className="absolute font-serif text-2xl leading-[1.17] tracking-tight sm:text-4xl lg:text-6xl"
          style={{ left: "2.3%", top: "1.8%", width: "66.3%" }}
        >
          <span className="text-white">crafts to make your home</span>
          <br />
          <span className="text-maroon underline underline-offset-4">
            your home
          </span>
        </h2>
        <div
          className="absolute overflow-hidden"
          style={{ left: "44.9%", top: "13.7%", width: "25.8%", height: "42.5%" }}
        >
          <Image
            src="/images/crafts-magnets.png"
            alt="Ceramic button magnets on cards"
            fill
            sizes="30vw"
            className="object-cover"
          />
        </div>
        <div
          className="absolute overflow-hidden"
          style={{ left: "3.3%", top: "35.0%", width: "24.8%", height: "38.1%" }}
        >
          <Image
            src="/images/crafts-markers.png"
            alt="Ceramic vegetable plant markers"
            fill
            sizes="30vw"
            className="object-cover"
          />
        </div>
        <div
          className="absolute overflow-hidden"
          style={{ left: "72.7%", top: "36.9%", width: "24.9%", height: "54.0%" }}
        >
          <Image
            src="/images/crafts-spoons.png"
            alt="Wooden spoons on ceramic dishes"
            fill
            sizes="30vw"
            className="object-cover"
          />
        </div>
        <div
          className="absolute overflow-hidden"
          style={{ left: "31.4%", top: "59.5%", width: "20.8%", height: "32.3%" }}
        >
          <Image
            src="/images/crafts-vases.png"
            alt="Magnetic bud vases on a fridge"
            fill
            sizes="20vw"
            className="object-cover"
          />
        </div>
        <a
          href="#studio"
          className="absolute flex items-center justify-center bg-espresso px-2 text-center text-[10px] font-medium text-white underline underline-offset-2 hover:bg-espresso/80 sm:text-sm"
          style={{ left: "54.6%", top: "74.3%", width: "16.6%", height: "7.5%" }}
        >
          Shop our Ceramics
        </a>
        <a
          href="#book"
          className="absolute flex items-center justify-center bg-espresso px-2 text-center text-[10px] font-medium text-white underline underline-offset-2 hover:bg-espresso/80 sm:text-sm"
          style={{ left: "54.6%", top: "84.4%", width: "16.6%", height: "7.5%" }}
        >
          Book a Craft Studio
        </a>
      </div>
    </section>
  );
}

function TileShopFeature() {
  return (
    <section className="bg-mustard px-6 py-20 text-ink sm:px-10">
      <div className="mx-auto max-w-4xl">
        <h2 className="font-serif text-4xl sm:text-5xl">The Tile Shop</h2>
        <p className="mt-4 max-w-lg text-ink/80">
          One-of-a-kind pieces, made in small batches. No two tile boards
          glaze exactly the same — that&apos;s the point.
        </p>
      </div>
    </section>
  );
}

const INVENTORY = [
  { label: "Shell Shop", image: "/images/beach-house-2.png" },
  { label: "Tile Pieces", image: null },
  { label: "Ceramic Creations", image: "/images/beach-house-5.png" },
  { label: "Furniture", image: null },
];

function ShopInventory() {
  return (
    <section id="shop" className="bg-plaster px-6 py-20 sm:px-10">
      <div className="mx-auto max-w-5xl">
        <p className="text-sm tracking-wide text-clay">Shop our Inventory</p>
        <div className="mt-8 grid gap-6 sm:grid-cols-2 md:grid-cols-4">
          {INVENTORY.map((item) => (
            <div key={item.label} className="flex flex-col gap-3">
              <div className="relative aspect-[3/4] overflow-hidden bg-mauve/40">
                {item.image && (
                  <Image
                    src={item.image}
                    alt={item.label}
                    fill
                    sizes="(min-width: 768px) 25vw, 50vw"
                    className="object-cover"
                  />
                )}
              </div>
              <span className="text-sm font-medium">{item.label}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function BookHere() {
  return (
    <section id="book" className="bg-mauve/30 px-6 py-20 sm:px-10">
      <div className="mx-auto grid max-w-4xl gap-10 md:grid-cols-2">
        <div>
          <h2 className="font-serif text-4xl sm:text-5xl">Book Here</h2>
          <p className="mt-4 max-w-sm text-ink/80">
            Let us know the date and time you&apos;d like to reserve our
            craft services to come to you. We&apos;ll confirm availability,
            or call us at{" "}
            <a href="tel:3857754313" className="underline">
              385-775-4313
            </a>
            .
          </p>
        </div>
        <BookingForm />
      </div>
    </section>
  );
}

function SiteFooter() {
  return (
    <footer className="mt-auto border-t border-ink/10 bg-plaster px-6 py-8 text-sm text-ink/60 sm:px-10">
      <div className="mx-auto flex max-w-5xl flex-wrap items-center justify-between gap-4">
        <span>Tiled House</span>
        <span>tiledhouse.com</span>
      </div>
    </footer>
  );
}
