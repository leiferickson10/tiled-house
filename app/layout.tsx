import type { Metadata } from "next";
import { Cormorant_Garamond, DM_Sans, Fraunces, Inter, Marcellus } from "next/font/google";
import "./globals.css";
import SiteFooter from "./components/SiteFooter";
import { SITE_NAME, SITE_URL } from "./lib/site";

const fraunces = Fraunces({
  variable: "--font-fraunces",
  subsets: ["latin"],
  style: ["normal", "italic"],
});

const dmSans = DM_Sans({
  variable: "--font-dm-sans",
  subsets: ["latin"],
  weight: ["300", "400", "700"],
  style: ["normal", "italic"],
});

const cormorant = Cormorant_Garamond({
  variable: "--font-cormorant",
  subsets: ["latin"],
  weight: "400",
});

const marcellus = Marcellus({
  variable: "--font-marcellus",
  subsets: ["latin"],
  weight: "400",
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: "Tiled House — A Home Decor Shop",
  description:
    "One-of-a-kind ceramics, tile pieces, and home decor. Shop the collection.",
  openGraph: {
    siteName: SITE_NAME,
    type: "website",
    locale: "en_US",
    images: [
      {
        url: "/images/home/hero.jpg",
        width: 2708,
        height: 979,
        alt: "Handmade glass tile coasters in blue, red and sage green beside orange leaves",
      },
    ],
  },
  twitter: { card: "summary_large_image" },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${fraunces.variable} ${inter.variable} ${dmSans.variable} ${marcellus.variable} ${cormorant.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col font-sans bg-plaster text-ink">
        {children}
        <SiteFooter />
      </body>
    </html>
  );
}
