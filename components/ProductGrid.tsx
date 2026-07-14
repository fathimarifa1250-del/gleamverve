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
      <section className="bg-[#f5eee6] px-4 md:px-20 pt-1 md:pt-3 pb-10 md:pb-14">
        <h2 className="text-2xl md:text-5xl font-serif text-[#5a422a]">
          Loading Products...
        </h2>
      </section>
    );
  }

  return (
    <section className="bg-[#f5eee6] px-4 md:px-20 py-12 md:py-20">

      <div className="mb-4 md:mb-6">
        <p className="uppercase tracking-[0.3em] text-xs md:text-sm text-[#5a422a] mb-3">
          Shop
        </p>

        <h2 className="text-2xl md:text-5xl font-serif text-[#5a422a]">
          Best Sellers
        </h2>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-6">

        {products
          .filter((product) => product.Status === "Active")
          .sort(
            (a, b) =>
              Number(a["Display Order"]) -
              Number(b["Display Order"])
          )
          .map((product: any) => (
            <ProductCard
              key={product["Product ID"]}
              product={product}
            />
          ))}

      </div>

    </section>
  );
}