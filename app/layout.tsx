import type { Metadata } from "next";
import { DM_Sans, Fraunces, Inter, Marcellus } from "next/font/google";
import "./globals.css";
import SiteFooter from "./components/SiteFooter";

const fraunces = Fraunces({
  variable: "--font-fraunces",
  subsets: ["latin"],
  style: ["normal", "italic"],
});

const dmSans = DM_Sans({
  variable: "--font-dm-sans",
  subsets: ["latin"],
  weight: ["400", "700"],
  style: ["normal", "italic"],
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
  title: "Tiled House — A Home Decor Shop",
  description:
    "One-of-a-kind ceramics, tile pieces, and home decor. Shop the collection.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${fraunces.variable} ${inter.variable} ${dmSans.variable} ${marcellus.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col font-sans bg-plaster text-ink">
        {children}
        <SiteFooter />
      </body>
    </html>
  );
}
