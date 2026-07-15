"use client";

import { useEffect, useState } from "react";
import ProductCard from "./ProductCard";

export default function ProductGrid() {
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
<section className="bg-[#f5eee6] px-4 md:px-18 pt-0 md:pt-4 pb-14 md:pb-20">
        <h2 className="text-2xl md:text-5xl font-serif text-[#5a422a]">
          Loading Products...
        </h2>
      </section>
    );
  }

  return (
<section className="bg-[#f5eee6] px-4 md:px-20 pt-2 md:pt-4 pb-14 md:pb-20">

    <div className="text-center mb-8">

      <p className="uppercase tracking-[0.45em] text-xs text-[#5a422a]/60 mb-3">
        OUR MOST LOVED
      </p>

      <h2 className="font-[var(--font-heading)] text-3xl md:text-5xl text-[#5a422a]">
        Best Sellers
      </h2>

      <p className="mt-4 text-[#5a422a]/70 max-w-xl mx-auto">
        Handpicked favourites loved for their timeless elegance and everyday luxury.
      </p>

    </div>

    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-8">

      {products
        .filter(
          (product) =>
            product.Status === "Active" &&
            (
              product["Best Seller"] === true ||
              product["Best Seller"] === "TRUE" ||
              product["Best Seller"] === "Yes" ||
              product["Best Seller"] === "yes"
            )
        )
        .sort(
          (a, b) =>
            Number(a["Display Order"] || 999) -
            Number(b["Display Order"] || 999)
        )
        .slice(0, 8)
        .map((product: any) => (
          <ProductCard
            key={product["Product ID"]}
            product={product}
          />
        ))}

    </div>

    <div className="flex justify-center mt-14">

      <a
        href="/collections"
        className="rounded-full border border-[#5a422a] px-8 py-3 text-[#5a422a] hover:bg-[#5a422a] hover:text-white transition"
      >
        View All Products
      </a>

    </div>

  </section>
);
}