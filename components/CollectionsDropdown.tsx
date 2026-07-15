"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

export default function CollectionsDropdown() {
  const [products, setProducts] = useState<any[]>([]);

  useEffect(() => {
    async function loadProducts() {
      try {
        const res = await fetch("/api/products");
        const data = await res.json();
        setProducts(data);
      } catch (err) {
        console.error(err);
      }
    }

    loadProducts();
  }, []);

  const active = products.filter(
    (p) => p.Status === "Active"
  );

  const categories = [
    "Rings",
    "Necklaces",
    "Bracelets",
    "Bangles",
  ];

  return (
    <div className="absolute left-1/2 top-full mt-4 -translate-x-1/2 w-[700px] rounded-3xl bg-white border border-[#eadfce] shadow-2xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 overflow-hidden z-50">

      <div className="grid grid-cols-4 gap-8 p-8">

        {categories.map((category) => {

          const items = active
            .filter((p) => p.Category === category)
            .sort(
        (a, b) =>
      Number(a["Display Order"] || 999) -
      Number(b["Display Order"] || 999)
             )
            .slice(0, 2);

          return (
            <div key={category}>

              <Link
                href={`/collections/${category.toLowerCase()}`}
                className="block mb-4 text-xs uppercase tracking-[0.3em] text-[#5a422a]/60 hover:text-[#5a422a]"
              >
                {category}
              </Link>

              <div className="space-y-4">

                {items.map((product) => (

                  <Link
                    key={product["Product ID"]}
                    href={`/product/${product["Product ID"]}`}
                    className="flex items-center gap-3 group/item"
                  >

                    <img
                    src={`/images/products/${product["Main Image"]}`}
                    alt={product.Name}
                     className="w-12 h-12 rounded-xl object-cover"
                    />

                    <span className="text-sm text-[#5a422a]/75 group-hover/item:text-[#5a422a] transition">
                      {product.Name}
                    </span>

                  </Link>

                ))}

              </div>

            </div>
          );
        })}

      </div>

      <div className="border-t border-[#eadfce] px-8 py-5">

        <Link
          href="/collections"
          className="text-sm text-[#5a422a] hover:underline"
        >
          View All Collections →
        </Link>

      </div>

    </div>
  );
}