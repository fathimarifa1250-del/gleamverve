"use client";

import Link from "next/link";
import { useCart } from "../context/CartContext";

export default function ProductCard({
  product,
}: {
  product: any;
}) {
  const { addToCart } = useCart();

  const price = Number(product.Price);
  const discount = Number(product["Discount %"] || 0);

  const salePrice =
    discount > 0
      ? Math.round(price * (1 - discount / 100))
      : price;

  return (
    <Link
      href={`/product/${product["Product ID"]}`}
      className="group block"
    >
      <div className="overflow-hidden rounded-2xl md:rounded-[2rem]">

        <img
          src={
            product["Main Image"]
              ? `/images/products/${product["Main Image"]}`
              : "/images/products/placeholder.jpg"
          }
          alt={product.Name}
          className="h-[220px] md:h-[400px] w-full object-cover group-hover:scale-105 transition duration-700"
        />

      </div>

      <div className="mt-3 md:mt-6">

        <h3 className="text-sm md:text-xl font-serif text-[#5a422a] leading-tight">
          {product.Name}
        </h3>

        {discount > 0 ? (
          <div className="mt-1 mb-3 md:mb-4">

            <span className="text-red-600 font-bold text-base md:text-lg">
              ₹{salePrice}
            </span>

            <span className="line-through text-gray-500 ml-2 text-xs md:text-base">
              ₹{price}
            </span>

          </div>
        ) : (
          <p className="text-[#5a422a]/70 mt-1 mb-3 md:mb-4 text-sm md:text-base">
            ₹{price}
          </p>
        )}

        <button
          disabled={Number(product.Stock) <= 0}
          onClick={(e) => {
            e.preventDefault();

            addToCart({
              id: product["Product ID"],
              name: product.Name,
              price: salePrice,
              image: `/images/products/${
                product["Main Image"] || "placeholder.jpg"
              }`,
            });
          }}
          className={`w-full rounded-full py-2 md:py-3 text-sm md:text-base transition ${
            Number(product.Stock) <= 0
              ? "bg-gray-300 text-gray-500 cursor-not-allowed"
              : "bg-[#5a422a] text-white hover:opacity-90"
          }`}
        >
          {Number(product.Stock) <= 0
            ? "Out of Stock"
            : "Add to Cart"}
        </button>

      </div>
    </Link>
  );
}
