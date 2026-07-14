"use client";

import { useEffect, useState } from "react";
import { X, Search } from "lucide-react";
import Link from "next/link";

export default function SearchModal({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  const [query, setQuery] = useState("");
  const [products, setProducts] = useState<any[]>([]);

  useEffect(() => {
    if (!open) return;

    async function loadProducts() {
      const res = await fetch("/api/products");
      const data = await res.json();

      setProducts(
        data.filter((p: any) => p.Status === "Active")
      );
    }

    loadProducts();
  }, [open]);

  const filteredProducts =
    query.length === 0
      ? []
      : products.filter((product: any) =>
          `${product.Name} ${product.Category}`
            .toLowerCase()
            .includes(query.toLowerCase())
        );

  if (!open) return null;

  return (
    <>
      <div
        className="fixed inset-0 bg-black/30 backdrop-blur-sm z-[60]"
        onClick={onClose}
      />

      <div className="fixed top-20 left-1/2 -translate-x-1/2 z-[70] w-[92%] max-w-2xl rounded-3xl bg-white shadow-2xl overflow-hidden">

        <div className="flex items-center gap-4 border-b px-6 py-5">

          <Search
            size={20}
            className="text-[#5a422a]/60"
          />

          <input
            autoFocus
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search jewelry..."
            className="flex-1 outline-none text-lg text-[#5a422a] placeholder:text-[#5a422a]/40"
          />

          <button onClick={onClose}>
            <X size={22} className="text-[#5a422a]" />
          </button>

        </div>

        <div className="max-h-[420px] overflow-y-auto">

          {query === "" ? (

            <p className="p-6 text-[#5a422a]/50">
              Search by product name or category.
            </p>

          ) : filteredProducts.length === 0 ? (

            <p className="p-6 text-[#5a422a]/50">
              No products found.
            </p>

          ) : (

            filteredProducts.map((product: any) => (
              <Link
                key={product["Product ID"]}
                href={`/product/${product["Product ID"]}`}
                onClick={onClose}
                className="flex items-center gap-4 px-6 py-4 hover:bg-[#f8f3ee] transition"
              >

                <img
                  src={`/images/products/${
                    product["Main Image"] || "placeholder.jpg"
                  }`}
                  alt={product.Name}
                  className="h-16 w-16 rounded-xl object-cover"
                />

                <div className="flex-1">

                  <h3 className="font-serif text-[#5a422a]">
                    {product.Name}
                  </h3>

                  <p className="text-sm text-[#5a422a]/60">
                    {product.Category}
                  </p>

                </div>

                <span className="font-medium text-[#5a422a]">
                  ₹{product.Price}
                </span>

              </Link>
            ))

          )}

        </div>

      </div>
    </>
  );
}