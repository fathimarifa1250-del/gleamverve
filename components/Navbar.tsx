"use client";

import Link from "next/link";
import { useState } from "react";
import CollectionsDropdown from "./CollectionsDropdown";
import {
  Menu,
  X,
  Search,
  ShoppingCart,
  ChevronDown,
} from "lucide-react";

import { useCart } from "../context/CartContext";
import SearchModal from "./SearchModal";

export default function Navbar() {
  const { cart, setIsCartOpen } = useCart();

  const [mobileOpen, setMobileOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [collectionsOpen, setCollectionsOpen] = useState(false);
  return (
    <>
      <nav className="fixed top-3 md:top-4 left-1/2 -translate-x-1/2 z-50 w-[96%] max-w-7xl">

        <div className="rounded-full border border-white/30 bg-[#f5eee6]/75 backdrop-blur-xl shadow-sm">

          <div className="relative flex items-center justify-between px-4 md:px-10 py-2 md:py-2">

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileOpen(true)}
              className="md:hidden"
            >
              <Menu size={20} className="text-[#5a422a]" />
            </button>

            {/* Logo */}
           <Link
            href="/"
            onClick={() => setMobileOpen(false)}
            className="absolute left-1/2 -translate-x-1/2 md:static md:translate-x-0 leading-none text-center"
            >
              <p className="hidden md:block text-[10px] uppercase tracking-[0.45em] text-[#5a422a]/60 mb-1">
                EST. 2025
              </p>

              <h1 className="font-[var(--font-heading)] text-lg md:text-2xl tracking-[0.18em] text-[#5a422a]">
                GLEAMVERVE
              </h1>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center gap-14 ml-20 uppercase tracking-[0.18em] text-xs text-[#5a422a]">
            <Link href="/">Home</Link>

            <div className="relative group py-4 -my-4">

              <Link
              href="/collections"
             className="hover:text-[#8a6746] transition"
              >
              Collections
            </Link>

              <CollectionsDropdown />

            </div>

              <Link href="/about">About</Link>

              <Link href="/contact">Contact</Link>

            </div>

            {/* Right Side */}
            <div className="flex items-center gap-3 md:gap-5 ml-auto">

              <button onClick={() => setSearchOpen(true)}>
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
         </div>

      </nav>

      {/* Mobile Drawer */}
      {mobileOpen && (
        <>
          {/* Dark Backdrop */}
          <div
            className="fixed inset-0 bg-black/40 z-40"
            onClick={() => setMobileOpen(false)}
          />

          {/* Drawer */}
          <div className="fixed top-0 left-0 z-50 h-screen w-[72%] max-w-[270px] bg-[#5a422a] shadow-2xl p-6 flex flex-col">

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
                <X size={20} className="text-white" />
              </button>

            </div>

            {/* Navigation */}
            <div className="mt-10 flex flex-col gap-5">

              <Link
                href="/"
                onClick={() => setMobileOpen(false)}
                className="text-xl font-serif text-white"
              >
                Home
              </Link>

              <div>
  <button
    onClick={() => setCollectionsOpen(!collectionsOpen)}
    className="w-full flex justify-between items-center text-xl font-serif text-white"
  >
    <span>Collections</span>
    <ChevronDown
  size={18}
  className={`transition-transform duration-300 ${
    collectionsOpen ? "rotate-180" : ""
  }`}
/>
  </button>

 {collectionsOpen && (
  <div className="mt-3 ml-4 flex flex-col gap-3 text-white/70">

    <Link
      href="/collections"
      onClick={() => setMobileOpen(false)}
      className="font-medium text-white hover:text-white"
    >
      All Collections
    </Link>

    <div className="border-t border-white/20 my-1" />

    <Link
      href="/collections/rings"
      onClick={() => setMobileOpen(false)}
      className="hover:text-white transition"
    >
      Rings
    </Link>

    <Link
      href="/collections/necklaces"
      onClick={() => setMobileOpen(false)}
      className="hover:text-white transition"
    >
      Necklaces
    </Link>

    <Link
      href="/collections/bracelets"
      onClick={() => setMobileOpen(false)}
      className="hover:text-white transition"
    >
      Bracelets
    </Link>

    <Link
      href="/collections/bangles"
      onClick={() => setMobileOpen(false)}
      className="hover:text-white transition"
    >
      Bangles
    </Link>

    <Link
      href="/collections/studs"
      onClick={() => setMobileOpen(false)}
      className="hover:text-white transition"
    >
      Studs
    </Link>

    <Link
      href="/collections/cuff"
      onClick={() => setMobileOpen(false)}
      className="hover:text-white transition"
    >
      Cuff
    </Link>

    <Link
      href="/collections/combo"
      onClick={() => setMobileOpen(false)}
      className="hover:text-white transition"
    >
      Combo
    </Link>
  <Link
      href="/collections/hoops"
      onClick={() => setMobileOpen(false)}
      className="hover:text-white transition"
    >
      hoops
    </Link>
  </div>
)}
</div>

              <Link
                href="/about"
                onClick={() => setMobileOpen(false)}
                className="text-xl font-serif text-white"
              >
                About
              </Link>

              <Link
                href="/contact"
                onClick={() => setMobileOpen(false)}
                className="text-xl font-serif text-white"
              >
                Contact
              </Link>

            </div>

            {/* Footer */}
            <div className="mt-auto border-t border-white/10 pt-6">

              <p className="uppercase tracking-[0.3em] text-xs text-white/60">
                Instagram
              </p>

              <p className="uppercase tracking-[0.3em] text-xs text-white/60 mt-2">
                Email
              </p>

              <p className="mt-8 text-xs text-white/40">
                © 2025 GleamVerve
              </p>

            </div>

          </div>
        </>
      )}

      <SearchModal
        open={searchOpen}
        onClose={() => setSearchOpen(false)}
      />
    </>
  );
}