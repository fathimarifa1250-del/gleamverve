"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

export default function RelatedProducts({
  category,
  currentId,
}: {
  category: string;
  currentId: string;
}) {
  const [products, setProducts] = useState<any[]>([]);

  useEffect(() => {
    async function loadProducts() {
      const res = await fetch("/api/products");
      const data = await res.json();

      const related = data
        .filter(
          (p: any) =>
            p.Status === "Active" &&
            p.Category === category &&
            p["Product ID"] !== currentId
        )
        .slice(0, 4);

      setProducts(related);
    }

    loadProducts();
  }, [category, currentId]);

  if (products.length === 0) return null;

  return (
    <section className="mt-24">

      <h2 className="text-4xl font-serif text-[#5a422a] mb-10">
        You May Also Like
      </h2>

      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">

        {products.map((product) => (
          <Link
            key={product["Product ID"]}
            href={`/product/${product["Product ID"]}`}
            className="group"
          >

            <div className="overflow-hidden rounded-[2rem]">

              <img
                src={`/images/products/${product["Main Image"]}`}
                alt={product.Name}
                className="h-[320px] w-full object-cover group-hover:scale-105 transition duration-500"
              />

            </div>

            <h3 className="mt-4 text-xl font-serif text-[#5a422a]">
              {product.Name}
            </h3>

            <p className="text-[#5a422a]/70 mt-1">
              ₹{product.Price}
            </p>

          </Link>
        ))}

      </div>

    </section>
  );
}