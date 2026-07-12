"use client";

import { useCart } from "../context/CartContext";
import { useRouter } from "next/navigation";

export default function ProductDetails({
  product,
}: {
  product: any;
}) {
  const { addToCart } = useCart();
  const router = useRouter();

  const price = Number(product.Price);
  const discount = Number(product["Discount %"] || 0);

  const salePrice =
    discount > 0
      ? Math.round(price * (1 - discount / 100))
      : price;

  const buyNow = () => {
    addToCart({
      id: product["Product ID"],
      name: product.Name,
      price: salePrice,
      image: `/images/products/${product["Main Image"]}`,
    });

    router.push("/checkout");
  };

  return (
    <div className="grid lg:grid-cols-2 gap-16">

      {/* IMAGE */}

      <div>
        <img
          src={`/images/products/${product["Main Image"]}`}
          alt={product.Name}
          className="rounded-[2rem] w-full"
        />
      </div>

      {/* DETAILS */}

      <div>

        <h1 className="text-5xl font-serif text-[#5a422a] mb-6">
          {product.Name}
        </h1>

        <div className="flex items-center gap-4 mb-8">

          <span className="text-3xl font-bold">
            ₹{salePrice}
          </span>

          {discount > 0 && (
            <>
              <span className="line-through text-gray-500">
                ₹{price}
              </span>

              <span className="bg-red-600 text-white px-3 py-1 rounded-full">
                {discount}% OFF
              </span>
            </>
          )}

        </div>

        <div className="flex gap-4 mb-10">

          <button
            onClick={() =>
              addToCart({
                id: product["Product ID"],
                name: product.Name,
                price: salePrice,
                image: `/images/products/${product["Main Image"]}`,
              })
            }
            className="bg-[#5a422a] text-white px-8 py-4 rounded-full"
          >
            Add to Cart
          </button>

          <button
            onClick={buyNow}
            className="border border-[#5a422a] text-[#5a422a] px-8 py-4 rounded-full"
          >
            Buy Now
          </button>

        </div>

      </div>

    </div>
  );
}