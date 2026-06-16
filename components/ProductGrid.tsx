"use client";

import { products } from "../data/products";
import { useCart } from "../context/CartContext";

export default function ProductGrid() {
const { addToCart } = useCart();

return ( <section className="bg-[#f5eee6] px-6 md:px-20 py-28"> <div className="mb-16"> <p className="uppercase tracking-[0.3em] text-sm text-[#5a422a] mb-4">
Shop </p>

```
    <h2 className="text-4xl md:text-6xl text-[#5a422a] font-serif">
      Best Sellers
    </h2>
  </div>

  <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
    {products.map((product) => (
      <div key={product.id} className="group">
        <div className="overflow-hidden rounded-[2rem]">
          <img
            src={product.image}
            alt={product.name}
            className="h-[400px] w-full object-cover group-hover:scale-105 transition duration-700"
          />
        </div>

        <div className="mt-6">
          <h3 className="text-xl text-[#5a422a] font-serif">
            {product.name}
          </h3>

          <p className="text-[#5a422a]/70 mt-1 mb-4">
            ₹{product.price}
          </p>

          <button
            onClick={() => addToCart(product)}
            className="bg-[#5a422a] text-white px-6 py-3 rounded-full hover:opacity-90 transition"
          >
            Add to Cart
          </button>
        </div>
      </div>
    ))}
  </div>
</section>

);
}
