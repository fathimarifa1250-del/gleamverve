import type { Metadata } from "next";
import "./globals.css";

import { CartProvider } from "../context/CartContext";
import Footer from "../components/Footer";

import {
  Cormorant_Garamond,
  Manrope,
} from "next/font/google";

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-heading",
});

const manrope = Manrope({
  subsets: ["latin"],
  variable: "--font-body",
});

export const metadata: Metadata = {
  title: "GleamVerve",
  description: "Luxury Jewelry and Accessories",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${cormorant.variable} ${manrope.variable}`}
    >
      <body className="font-[var(--font-body)]">
        <CartProvider>

          {children}

          <Footer />

        </CartProvider>
      </body>
    </html>
  );
}