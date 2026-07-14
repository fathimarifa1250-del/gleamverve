"use client";

import { useCart } from "../context/CartContext";
import Link from "next/link";

export default function CartDrawer() {
const {
cart,
isCartOpen,
setIsCartOpen,
increaseQuantity,
decreaseQuantity,
removeFromCart,
} = useCart();

const subtotal = cart.reduce(
(sum: number, item: any) =>
sum + item.price * item.quantity,
0
);

if (!isCartOpen) return null;

return (
<>
<div
className="fixed inset-0 bg-black/20 z-40"
onClick={() => setIsCartOpen(false)}
/>

```
  <div className="fixed top-0 right-0 h-screen w-full md:w-[450px] bg-[#fffdf9] z-50 p-6 overflow-y-auto border-l border-[#e7d8c8]">

    <div className="flex justify-between items-center mb-8">
      <h2 className="text-3xl font-serif tracking-wide text-[#5a422a]">
        Your Cart
      </h2>

      <button
        onClick={() => setIsCartOpen(false)}
        className="text-2xl text-[#5a422a]"
      >
        ×
      </button>
    </div>

    {cart.length === 0 ? (
      <p className="text-[#5a422a]/70">
        Your Cart is empty.
      </p>
    ) : (
      <>
        {cart.map((item: any) => (
  <div
    key={item.id}
    className="flex gap-4 border-b border-[#eadfce] py-6"
  >
    {/* Product Image */}
    <img
      src={item.image}
      alt={item.name}
      className="w-20 h-20 rounded-2xl object-cover border border-[#eadfce]"
    />

    {/* Product Info */}
    <div className="flex-1">

      <h3 className="font-serif text-lg text-[#5a422a] leading-snug">
        {item.name}
      </h3>

      <p className="mt-1 text-[#5a422a]/70">
        ₹{item.price}
      </p>

      <div className="flex items-center mt-4">

        <div className="flex items-center border border-[#d9c6b2] rounded-full overflow-hidden">

          <button
            onClick={() => decreaseQuantity(item.id)}
            className="px-3 py-1 text-[#5a422a] hover:bg-[#f5eee6]"
          >
            −
          </button>

          <span className="px-4 text-[#5a422a]">
            {item.quantity}
          </span>

          <button
            onClick={() => increaseQuantity(item.id)}
            className="px-3 py-1 text-[#5a422a] hover:bg-[#f5eee6]"
          >
            +
          </button>

        </div>

        <button
          onClick={() => removeFromCart(item.id)}
          className="ml-auto text-[#5a422a]/40 hover:text-red-500 transition"
        >
          ✕
        </button>

      </div>

    </div>

  </div>
))}

        <div className="mt-8 border-t border-[#eadfce] pt-6">
          <div className="flex justify-between text-lg text-[#5a422a] font-medium">
            <span>Subtotal</span>
            <span>₹{subtotal}</span>
          </div>
        <Link
  href="/checkout"
  className="block w-full mt-6 bg-[#5a422a] text-white py-4 rounded-full hover:opacity-90 transition text-center"
>
  Proceed to Checkout
</Link>
        </div>
      </>
    )}
  </div>
</>

);
}
