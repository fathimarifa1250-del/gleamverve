"use client";

import { useEffect, useState } from "react";
import { useCart } from "../context/CartContext";
import { useRouter } from "next/navigation";

export default function ProductDetails({
  product,
}: {
  product: any;
}) {
  const { addToCart, cart } = useCart();
  const router = useRouter();

  const [quantity, setQuantity] = useState(1);
  const [added, setAdded] = useState(false);

  const cartItem = cart.find(
  (item: any) => item.id === product["Product ID"]
);

const cartQuantity = cartItem?.quantity ?? 0;

  const price = Number(product.Price);
  const discount = Number(product["Discount %"] || 0);

  const salePrice =
    discount > 0
      ? Math.round(price * (1 - discount / 100))
      : price;
  const handleAddToCart = () => {
  addToCart(
    {
      id: product["Product ID"],
      name: product.Name,
      price: salePrice,
      image: `/images/products/${product["Main Image"]}`,
    },
    quantity
  );

  setAdded(true);

  setTimeout(() => {
    setAdded(false);
  }, 2000);
};

  const buyNow = () => {
    addToCart(
      {
        id: product["Product ID"],
        name: product.Name,
        price: salePrice,
        image: `/images/products/${product["Main Image"]}`,
      },
      quantity
    );

    router.push("/checkout");
  };

  return (
    <div className="grid lg:grid-cols-2 gap-16 items-start">

      {/* PRODUCT IMAGE */}

      <div>
        <img
          src={`/images/products/${product["Main Image"]}`}
          alt={product.Name}
          className="rounded-[2rem] w-full object-cover"
        />
      </div>

      {/* PRODUCT DETAILS */}

      <div>

        <h1 className="text-5xl font-serif text-[#5a422a] mb-6">
          {product.Name}
        </h1>

        <div className="flex items-center gap-4 mb-8">

          <span className="text-4xl font-bold text-[#5a422a]">
            ₹{salePrice}
          </span>

          {discount > 0 && (
            <>
              <span className="line-through text-gray-500 text-xl">
                ₹{price}
              </span>

              <span className="bg-red-600 text-white px-3 py-1 rounded-full text-sm">
                {discount}% OFF
              </span>
            </>
          )}

        </div>

        {/* QUANTITY */}

        <div className="mb-10">
            <div className="flex items-center border border-[#5a422a] rounded-full overflow-hidden w-fit bg-white">

                <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="px-5 py-3 text-2xl text-[#5a422a]/60 hover:text-[#5a422a] hover:bg-[#f5eee6] transition-all duration-300"
                 >
      −
                 </button>

             <span className="px-6 py-3 text-lg font-semibold text-[#5a422a] min-w-[50px] text-center">
                {quantity}
            </span>

                 <button
                     onClick={() => setQuantity(quantity + 1)}
                    className="px-5 py-3 text-2xl text-[#5a422a]/60 hover:text-[#5a422a] hover:bg-[#f5eee6] transition-all duration-300"
                    >
                      +
                 </button>

             </div>
        </div>

        {/* BUTTONS */}

        <div className="flex gap-4">

          <button
            onClick={handleAddToCart}
           className={`px-8 py-4 rounded-full transition-all duration-300 ${
           added
            ? "bg-[#7b5b3f] text-white scale-95 shadow-lg"
            : "bg-[#5a422a] text-white hover:opacity-90"
           }`}
            >
           {added
           ? `✓Cart (${cartQuantity})`
            : "🛒 Add to Cart"}
          </button>

          <button
            onClick={buyNow}
            className="border border-[#5a422a] text-[#5a422a] px-8 py-4 rounded-full hover:bg-[#5a422a] hover:text-white transition"
          >
            Buy Now
          </button>

        </div>

      </div>

    </div>
  );
}