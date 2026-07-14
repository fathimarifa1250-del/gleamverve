"use client";

import Link from "next/link";
import { useState } from "react";
import {
  Menu,
  X,
  Search,
  ShoppingCart,
} from "lucide-react";
import { useCart } from "../context/CartContext";
import SearchModal from "./SearchModal";

export default function Navbar() {
  const { cart, setIsCartOpen } = useCart();

  const [mobileOpen, setMobileOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);

  return (
    <>
      <nav className="fixed top-3 md:top-4 left-1/2 -translate-x-1/2 z-50 w-[96%] max-w-7xl">

        <div className="rounded-full border border-white/30 bg-[#f5eee6]/75 backdrop-blur-xl shadow-sm">

          <div className="relative flex items-center justify-between px-4 md:px-10 py-2 md:py-3">

            {/* Mobile Menu */}
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="md:hidden"
            >
              {mobileOpen ? (
                <X
                  size={20}
                  className="text-[#5a422a]"
                />
              ) : (
                <Menu
                  size={20}
                  className="text-[#5a422a]"
                />
              )}
            </button>

            {/* Logo */}
            <Link
              href="/"
              className="absolute left-1/2 -translate-x-1/2 md:static md:translate-x-0 leading-none text-center"
            >

              <p className="hidden md:block text-[10px] uppercase tracking-[0.45em] text-[#5a422a]/60 mb-1">
                EST. 2025
              </p>

              <h1 className="font-[var(--font-heading)] text-lg md:text-2xl tracking-[0.18em] text-[#5a422a]">
                GLEAMVERVE
              </h1>

            </Link>

            {/* Desktop Links */}
            <div className="hidden md:flex items-center gap-8 uppercase tracking-[0.18em] text-xs text-[#5a422a]">

              <Link href="/">Home</Link>

              <Link href="/collections">
                Collections
              </Link>

              <Link href="/about">
                About
              </Link>

              <Link href="/contact">
                Contact
              </Link>

            </div>

            {/* Right Side */}
            <div className="flex items-center gap-3 md:gap-5 ml-auto">

              <button
                onClick={() => setSearchOpen(true)}
              >
                <Search
                  size={20}
                  className="text-[#5a422a] hover:opacity-60 transition"
                />
              </button>

              <button
                onClick={() => setIsCartOpen(true)}
                className="relative"
              >
                <ShoppingCart
                  size={21}
                  className="text-[#5a422a] hover:opacity-60 transition"
                />

                {cart.length > 0 && (
                  <span className="absolute -top-2 -right-2 flex h-5 w-5 items-center justify-center rounded-full bg-[#5a422a] text-[10px] text-white">
                    {cart.length}
                  </span>
                )}

              </button>

            </div>

          </div>

          {mobileOpen && (
  <>
    {/* Backdrop */}
    <div
      className="fixed top-0 left-0 h-screen w-[72%] max-w-[270px] bg-[#5a422a] shadow-2xl p-6 flex flex-col text-white animate-[slideIn_.3s_ease]"
      onClick={() => setMobileOpen(false)}
    />

    {/* Drawer */}
    <div className="fixed top-0 left-0 z-50 h-screen w-[72%] max-w-[270px] bg-[#5a422a] shadow-2xl p-6 flex flex-col text-white">

      {/* Header */}
      <div className="flex items-center justify-between">

        <div>
          <p className="text-[10px] uppercase tracking-[0.4em] text-white/50">
            EST. 2025
          </p>

          <h2 className="mt-1 font-[var(--font-heading)] text-xl tracking-[0.12em] text-white">
            GLEAMVERVE
          </h2>
        </div>

        <button onClick={() => setMobileOpen(false)}>
          <X size={20} className="text-white/80 hover:text-white transition" />
        </button>

      </div>

      {/* Navigation */}
      <div className="mt=10 flex flex flex-col  gap-3 mt-4">

        <Link
          href="/"
          onClick={() => setMobileOpen(false)}
          className="text-xl font-serif text-white/90 hover:text-white transition"
        >
          Home
        </Link>

        <Link
          href="/collections"
          onClick={() => setMobileOpen(false)}
          className="text-xl font-serif text-white/90 hover:text-white transition"
        >
          Collections
        </Link>

        <Link
          href="/about"
          onClick={() => setMobileOpen(false)}
          className="text-xl font-serif text-white/90 hover:text-white transition"
        >
          About
        </Link>

        <Link
          href="/contact"
          onClick={() => setMobileOpen(false)}
          className="text-xl font-serif text-white/90 hover:text-white transition"
        >
          Contact
        </Link>

      </div>

      {/* Footer */}
      <div className="border-t border-white/10 pt-6">

        <p className="uppercase tracking-[0.3em] text-xs text-white/60">
          Instagram
        </p>

        <p className="uppercase tracking-[0.3em] text-xs text-white/60">
          Email
        </p>

        <p className="mt-8 text-xs text-white/40">
          © 2025 GleamVerve
        </p>

      </div>

    </div>
  </>
)}

        </div>

      </nav>

      <SearchModal
        open={searchOpen}
        onClose={() => setSearchOpen(false)}
      />
    </>
  );
}