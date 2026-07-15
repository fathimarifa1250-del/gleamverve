"use client";

import { useState } from "react";
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
const [openSection, setOpenSection] = useState("details");

const gallery =
  product["Image Gallery"]
    ?.split("|")
    .filter(
      (image: string) =>
        image &&
        image !== product["Main Image"]
    ) || [];

const [selectedImage, setSelectedImage] = useState(
  product["Main Image"]
);

const [touchStart, setTouchStart] = useState<number | null>(null);

const images = [
  product["Main Image"],
  ...gallery,
];

const currentIndex = images.indexOf(selectedImage);

const [imageVisible, setImageVisible] = useState(true);

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

const changeImage = (image: string) => {
  if (image === selectedImage) return;

  setImageVisible(false);

  setTimeout(() => {
    setSelectedImage(image);
    setImageVisible(true);
  }, 150);
};

const handleTouchEnd = (e: React.TouchEvent) => {
  if (touchStart === null) return;

  const touchEnd = e.changedTouches[0].clientX;
  const distance = touchStart - touchEnd;

  // Ignore very small swipes
  if (Math.abs(distance) < 50) return;

  // Swipe left → Next image
  if (distance > 0 && currentIndex < images.length - 1) {
    changeImage(images[currentIndex + 1]);
  }

  // Swipe right → Previous image
  if (distance < 0 && currentIndex > 0) {
    changeImage(images[currentIndex - 1]);
  }

  setTouchStart(null);
};

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

return ( <div 
className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">

{/* PRODUCT IMAGE */}
<div className="w-full max-w-[520px] mx-auto lg:mx-0">

  <div
    className="aspect-square overflow-hidden rounded-[2rem] bg-white shadow-sm"
    onTouchStart={(e) => setTouchStart(e.touches[0].clientX)}
    onTouchEnd={handleTouchEnd}
  >
    <img
      src={`/images/products/${selectedImage}`}
      alt={product.Name}
      className={`w-full h-full object-cover transition-all duration-500 ${
        imageVisible
          ? "opacity-100 scale-100"
          : "opacity-0 scale-[0.98]"
      }`}
    />
  </div>

  {/* Thumbnail Gallery */}
  <div className="flex justify-center gap-4 mt-5 flex-wrap">
    ...
  </div>

</div>
  {/* RIGHT SIDE */}

  <div>

    <h1 className="text-3xl md:text-5xl font-serif text-[#5a422a] mb-6">
      {product.Name}
    </h1>

    <div className="flex items-center gap-4 mb-10">

      <span className="text-3xl md:text-4xl font-bold text-[#5a422a]">
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

      <div className="flex items-center border border-[#d8c8b8] rounded-full overflow-hidden w-fit bg-white">

        <button
          onClick={() =>
            setQuantity(Math.max(1, quantity - 1))
          }
          className="px-5 py-3 text-2xl text-[#5a422a]/60 hover:text-[#5a422a] hover:bg-[#f5eee6] transition-all duration-300"
        >
          −
        </button>

        <span className="px-6 py-3 text-lg font-semibold text-[#5a422a] min-w-[50px] text-center">
          {quantity}
        </span>

        <button
          onClick={() =>
            setQuantity(quantity + 1)
          }
          className="px-5 py-3 text-2xl text-[#5a422a]/60 hover:text-[#5a422a] hover:bg-[#f5eee6] transition-all duration-300"
        >
          +
        </button>

      </div>

    </div>

    {/* BUTTONS */}

    <div className="flex gap-4 mb-14">

      <button
        onClick={handleAddToCart}
        className={`px-8 py-4 rounded-full transition-all duration-300 ${
          added
            ? "bg-[#7b5b3f] text-white scale-95 shadow-lg"
            : "bg-[#5a422a] text-white hover:opacity-90"
        }`}
      >
        {added
          ? `✓ Added (${cartQuantity})`
          : "🛒 Add to Cart"}
      </button>

      <button
        onClick={buyNow}
        className="border border-[#5a422a] text-[#5a422a] px-8 py-4 rounded-full hover:bg-[#5a422a] hover:text-white transition"
      >
        Buy Now
      </button>

    </div>

    {/* ACCORDION */}

    <div className="border-t border-[#d8c8b8]">

      {/* PRODUCT DETAILS */}

      <button
        onClick={() =>
          setOpenSection(
            openSection === "details"
              ? ""
              : "details"
          )
        }
        className="w-full flex justify-between items-center py-6"
      >
        <span className="uppercase tracking-[0.2em] text-sm text-[#5a422a]">
          Product Details
        </span>

        <span className="text-2xl text-[#5a422a]/60">
          {openSection === "details"
            ? "−"
            : "+"}
        </span>
      </button>

      {openSection === "details" && (
        <div className="pb-6 space-y-4 text-[#5a422a]/80">

          <div className="flex justify-between">
            <span>Material</span>
            <span>{product.Material}</span>
          </div>

          <div className="flex justify-between">
            <span>Category</span>
            <span>{product.Category}</span>
          </div>

          <div className="flex justify-between">
            <span>Finish</span>
            <span>
              {product.Finish ||
                "Premium Finish"}
            </span>
          </div>

        </div>
      )}

      <hr className="border-[#d8c8b8]" />

      {/* QUALITY */}

      <button
        onClick={() =>
          setOpenSection(
            openSection === "quality"
              ? ""
              : "quality"
          )
        }
        className="w-full flex justify-between items-center py-6"
      >
        <span className="uppercase tracking-[0.2em] text-sm text-[#5a422a]">
          Quality
        </span>

        <span className="text-2xl text-[#5a422a]/60">
          {openSection === "quality"
            ? "−"
            : "+"}
        </span>
      </button>

      {openSection === "quality" && (
        <div className="pb-6 space-y-2 text-[#5a422a]/80">
          <p>✓ Waterproof</p>
          <p>✓ Tarnish Resistant</p>
          <p>✓ Hypoallergenic</p>
          <p>✓ Everyday Wear</p>
        </div>
      )}

      <hr className="border-[#d8c8b8]" />

      {/* CARE */}

      <button
        onClick={() =>
          setOpenSection(
            openSection === "care"
              ? ""
              : "care"
          )
        }
        className="w-full flex justify-between items-center py-6"
      >
        <span className="uppercase tracking-[0.2em] text-sm text-[#5a422a]">
          Care
        </span>

        <span className="text-2xl text-[#5a422a]/60">
          {openSection === "care"
            ? "−"
            : "+"}
        </span>
      </button>

      {openSection === "care" && (
        <div className="pb-6 space-y-2 text-[#5a422a]/80">
          <p>• Avoid perfumes,lotion,hairspray,sanitizer..etc</p>
          <p>• Clean with a soft cloth</p>
          <p>• Remove before exercising and shower to last longer</p>
          <p>• Store in a dry place</p>
          <p>• Avoid rubbing against rough surfaces to prevent scratches</p>
          <p>• Not fully soap-proof or chemical-proof</p>
        </div>
      )}

    </div>

  </div>

</div>

);
}
