"use client";

import { useCart } from "../context/CartContext";

export default function Navbar() {
  const { cart, setIsCartOpen } = useCart();

  return (
    <nav className="fixed top-0 left-0 w-full z-50 bg-[#f5eee6]/80 backdrop-blur-md">
      <div className="flex items-center justify-between px-6 md:px-20 py-6">
        <h1 className="text-2xl font-serif text-[#5a422a]">
          GleamVerve
        </h1>

        <div className="hidden md:flex gap-10 text-[#5a422a] text-sm tracking-wide">
          <a href="#" className="hover:opacity-70 transition">
            Home
          </a>

          <a href="#" className="hover:opacity-70 transition">
            Collections
          </a>

          <a href="#" className="hover:opacity-70 transition">
            Shop
          </a>

          <a href="#" className="hover:opacity-70 transition">
            Contact
          </a>
        </div>

        <button
  onClick={() => setIsCartOpen(true)}
  className="bg-[#5a422a] text-white rounded-full px-6 py-3 font-medium shadow-lg hover:scale-105 transition"
>
  Cart 🛍️ ({cart.length})
</button>
      </div>
    </nav>
  );
}