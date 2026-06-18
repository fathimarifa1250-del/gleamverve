"use client";

import { useCart } from "../../context/CartContext";
import { useState } from "react";

export default function CheckoutPage() {
  const { cart } = useCart();

  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [pin, setPin] = useState("");
  const [state, setState] = useState("kerala");

  const [coupon, setCoupon] = useState("");
  const [discount, setDiscount] = useState(0);

  const subtotal = cart.reduce(
    (sum: number, item: any) => sum + item.price * item.quantity,
    0
  );

  let shipping = 0;

  if (state === "kerala") shipping = 50;
  else if (state === "international") shipping = 500;
  else shipping = 100;

  const total = subtotal + shipping - discount;

  const isFormValid =
    name &&
    phone &&
    address &&
    city &&
    pin &&
    cart.length > 0;

  const applyCoupon = () => {
    const code = coupon.trim().toUpperCase();

    if (code === "WELCOME10") {
      setDiscount(subtotal * 0.1);
    } else if (code === "SAVE200") {
      setDiscount(200);
    } else if (code === "FREESHIP") {
      setDiscount(shipping);
    } else {
      setDiscount(0);
      alert("Invalid coupon");
    }
  };

  const placeOrder = async () => {
    if (!isFormValid) {
      alert("Please fill all details.");
      return;
    }

    try {
      const orderId = "GV" + Date.now();

      const itemsText = cart
        .map(
          (item: any) =>
            `• ${item.name} x${item.quantity} = ₹${item.price * item.quantity}`
        )
        .join("\n");

      const appliedCoupon = discount > 0 ? coupon : "NONE";

      await fetch(
        "https://script.google.com/macros/s/AKfycbx7voLfzB8aFrv0sj_Ul5Ryq7g0AXkbq9_Q8okCpecp9xbUk6yJL_rbqfgE0a6zecrbOA/exec",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            orderId,
            name,
            phone,
            address: `${address}, ${city}, ${pin}, ${state}`,
            items: itemsText,
            subtotal,
            shipping,
            discount,
            total,
          }),
        }
      );

      const message = encodeURIComponent(`
✨ GLEAMVERVE ORDER ✨

Order ID: ${orderId}

Name: ${name}
Phone: ${phone}

Address:
${address}
${city}
${pin}
${state}

Items:
${itemsText}

Subtotal: ₹${subtotal}
Shipping: ₹${shipping}
Coupon: ${appliedCoupon}
Discount: -₹${discount}

TOTAL: ₹${total}
`);

      window.location.href = `https://wa.me/919072457619?text=${message}`;
    } catch (err) {
      console.error(err);
      alert("Checkout failed.");
    }
  };

  return (
    <main className="min-h-screen bg-[#f5eee6] text-[#5a422a] px-6 md:px-20 py-20">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-5xl font-serif mb-10">
          Checkout
        </h1>

        <div className="bg-white rounded-[2rem] p-8 border border-[#eadfce]">
          <div className="grid gap-5">

            <input
              className="border p-4 rounded-xl"
              placeholder="Full Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />

            <input
              className="border p-4 rounded-xl"
              placeholder="Phone Number"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
            />

            <textarea
              className="border p-4 rounded-xl h-28"
              placeholder="Address"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
            />

            <input
              className="border p-4 rounded-xl"
              placeholder="City"
              value={city}
              onChange={(e) => setCity(e.target.value)}
            />

            <input
              className="border p-4 rounded-xl"
              placeholder="PIN Code"
              value={pin}
              onChange={(e) => setPin(e.target.value)}
            />            <select
              className="border p-4 rounded-xl"
              value={state}
              onChange={(e) => setState(e.target.value)}
            >
              <option value="kerala">Kerala</option>
              <option value="india">Rest of India</option>
              <option value="international">International</option>
            </select>

            <div className="flex gap-3">
              <input
                className="border p-4 rounded-xl flex-1"
                placeholder="Coupon Code"
                value={coupon}
                onChange={(e) => setCoupon(e.target.value)}
              />

              <button
                onClick={applyCoupon}
                className="bg-black text-white px-6 rounded-xl"
              >
                Apply
              </button>
            </div>

            <hr className="my-4" />

            <h2 className="text-2xl font-semibold">
              Order Summary
            </h2>

            {cart.length === 0 ? (
              <p>Your cart is empty.</p>
            ) : (
              <div className="space-y-3">
                {cart.map((item: any) => (
                  <div
                    key={item.id}
                    className="flex justify-between"
                  >
                    <span>
                      {item.name} × {item.quantity}
                    </span>

                    <span>
                      ₹{item.price * item.quantity}
                    </span>
                  </div>
                ))}
              </div>
            )}

            <hr className="my-2" />

            <div className="space-y-2 text-lg">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span>₹{subtotal}</span>
              </div>

              <div className="flex justify-between">
                <span>Shipping</span>
                <span>₹{shipping}</span>
              </div>

              <div className="flex justify-between">
                <span>Discount</span>
                <span>-₹{discount}</span>
              </div>

              <div className="flex justify-between text-2xl font-bold pt-4">
                <span>Total</span>
                <span>₹{total}</span>
              </div>
            </div>

            <button
              onClick={placeOrder}
              disabled={!isFormValid}
              className={`mt-8 py-4 rounded-xl text-lg font-semibold transition ${
                isFormValid
                  ? "bg-black text-white hover:bg-gray-800"
                  : "bg-gray-300 text-gray-600 cursor-not-allowed"
              }`}
            >
              Place Order on WhatsApp
            </button>

          </div>
        </div>
      </div>
    </main>
  );
}