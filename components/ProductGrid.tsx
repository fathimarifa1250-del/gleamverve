"use client";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useCart } from "../context/CartContext";

export default function ProductGrid() {
  const { addToCart } = useCart();

  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadProducts() {
      try {
        const response = await fetch("/api/products");
        const data = await response.json();
        setProducts(data);
      } catch (error) {
        console.error("Failed to load products:", error);
      } finally {
        setLoading(false);
      }
    }

    loadProducts();
  }, []);

  if (loading) {
    return (
      <section className="bg-[#f5eee6] px-6 md:px-20 py-28">
        <h2 className="text-4xl md:text-6xl text-[#5a422a] font-serif">
          Loading Products...
        </h2>
      </section>
    );
  }

  return (
    <section className="bg-[#f5eee6] px-6 md:px-20 py-28">
      <div className="mb-16">
        <p className="uppercase tracking-[0.3em] text-sm text-[#5a422a] mb-4">
          Shop
        </p>

        <h2 className="text-4xl md:text-6xl text-[#5a422a] font-serif">
          Best Sellers
        </h2>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
        {products
          .filter((product) => product.Status === "Active")
          .sort(
            (a, b) =>
              Number(a["Display Order"]) -
              Number(b["Display Order"])
          )
          .map((product: any) => {
            const price = Number(product.Price);
            const discount = Number(product["Discount %"] || 0);

            const salePrice =
              discount > 0
                ? Math.round(price * (1 - discount / 100))
                : price;

            return (
                <Link
                  href={`/product/${product["Product ID"]}`}
                   key={product["Product ID"]}
                   className="group block"
                >
                <div className="overflow-hidden rounded-[2rem]">
                  <img
                    src={
                      product["Main Image"]
                        ? `/images/products/${product["Main Image"]}`
                        : "/images/products/placeholder.jpg"
                    }
                    alt={product["Name"]}
                    className="h-[400px] w-full object-cover group-hover:scale-105 transition duration-700"
                  />
                </div>

                <div className="mt-6">
                  <h3 className="text-xl text-[#5a422a] font-serif">
                    {product["Name"]}
                  </h3>

                  {discount > 0 ? (
                    <div className="mb-4">
                      <span className="text-red-600 font-bold text-lg">
                        ₹{salePrice}
                      </span>

                      <span className="line-through text-gray-500 ml-2">
                        ₹{price}
                      </span>
                    </div>
                  ) : (
                    <p className="text-[#5a422a]/70 mt-1 mb-4">
                      ₹{price}
                    </p>
                  )}

                  <button
                    disabled={Number(product.Stock) <= 0}
                    onClick={() =>
                      addToCart({
                        id: product["Product ID"],
                        name: product["Name"],
                        price: salePrice,
                        image: `/images/products/${
                          product["Main Image"] || "placeholder.jpg"
                        }`,
                      })
                    }
                    className={`px-6 py-3 rounded-full transition ${
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
          })}
      </div>
    </section>
  );
}