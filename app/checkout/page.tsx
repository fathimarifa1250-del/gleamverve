"use client";

import { useCart } from "../../context/CartContext";
import { useState } from "react";

export default function CheckoutPage() {
  const { cart } = useCart();

  // FORM STATE
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [pin, setPin] = useState("");
  const [state, setState] = useState("kerala");

  // COUPON STATE
  const [coupon, setCoupon] = useState("");
  const [discount, setDiscount] = useState(0);

  // VALIDATION
  const isFormValid =
    name && phone && address && city && pin && cart.length > 0;

  // SUBTOTAL
  const subtotal = cart.reduce(
    (sum: number, item: any) =>
      sum + item.price * item.quantity,
    0
  );

  // SHIPPING LOGIC
  let shipping = 0;

  if (state === "kerala") {
    shipping = 50;
  } else if (state === "international") {
    shipping = 500;
  } else {
    shipping = 100;

    const northStates = [
      "jammu-kashmir",
      "ladakh",
      "himachal-pradesh",
      "uttarakhand",
      "punjab",
      "haryana",
      "delhi",
      "rajasthan",
      "uttar-pradesh",
      "bihar",
      "jharkhand",
      "west-bengal",
      "assam",
      "north-east",
    ];

    if (northStates.includes(state)) {
      shipping = 120;
    }
  }

  // APPLY COUPON
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
      alert("Invalid coupon code");
    }
  };

  const total = subtotal + shipping - discount;

  // PLACE ORDER
  const placeOrder = async () => {
    if (!isFormValid) {
      alert("Please fill all details and add items to cart.");
      return;
    }

    const orderId = "GV" + Date.now();

    const itemsText = cart
      .map(
        (item: any) =>
          `- ${item.name} x${item.quantity} = ₹${item.price * item.quantity}`
      )
      .join("\n");

    const appliedCoupon =
      discount > 0 ? coupon.trim().toUpperCase() : "NONE";

    // 1. SEND TO GOOGLE SHEETS
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
          address: `${address}, ${city} - ${pin}, ${state}`,
          items: itemsText,
          subtotal,
          shipping,
          discount,
          total,
        }),
      }
    );

    // 2. WHATSAPP MESSAGE
    const message = `
✨ GLEAMVERVE ORDER ✨

Order ID: ${orderId}

Customer:
${name}
${phone}

Address:
${address}
${city} - ${pin}
State: ${state}

Items:
${itemsText}

----------------------

Subtotal: ₹${subtotal}
Shipping: ₹${shipping}
Coupon: ${appliedCoupon}
Discount: -₹${discount}

TOTAL: ₹${total}

----------------------

Thank you for shopping with GleamVerve 💛
`;

    const url = `https://wa.me/919072457619?text=${encodeURIComponent(
      message
    )}`;

    window.open(url, "_blank");
  };

  return (
    <main className="min-h-screen bg-[#f5eee6] text-[#5a422a] px-6 md:px-20 py-20">
      <div className="max-w-4xl mx-auto">

        <h1 className="text-5xl font-serif text-[#5a422a] mb-10">
          Checkout
        </h1>

        <div className="bg-white rounded-[2rem] p-8 border border-[#eadfce]">

          {/* FORM */}
          <div className="grid gap-5">

            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Full Name"
              className="border border-[#d9c6b2] p-4 rounded-xl"
            />

            <input
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="Phone Number"
              className="border border-[#d9c6b2] p-4 rounded-xl"
            />

            <textarea
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              placeholder="Full Address"
              className="border border-[#d9c6b2] p-4 rounded-xl h-32"
            />

            <input
              value={city}
              onChange={(e) => setCity(e.target.value)}
              placeholder="City"
              className="border border-[#d9c6b2] p-4 rounded-xl"
            />

            <input
              value={pin}
              onChange={(e) => setPin(e.target.value)}
              placeholder="PIN Code"
              className="border border-[#d9c6b2] p-4 rounded-xl"
            />

            {/* STATE */}
            <select
              value={state}
              onChange={(e) => setState(e.target.value)}
              className="border border-[#d9c6b2] p-4 rounded-xl"
            >
              <option value="kerala">Kerala</option>
              <option value="tamil-nadu">Tamil Nadu</option>
              <option value="karnataka">Karnataka</option>
              <option value="maharashtra">Maharashtra</option>
              <option value="delhi">Delhi</option>
              <option value="rajasthan">Rajasthan</option>
              <option value="punjab">Punjab</option>
              <option value="uttar-pradesh">Uttar Pradesh</option>
              <option value="bihar">Bihar</option>
              <option value="west-bengal">West Bengal</option>
              <option value="north-east">North East</option>
              <option value="jammu-kashmir">Jammu & Kashmir</option>
              <option value="ladakh">Ladakh</option>
              <option value="international">International</option>
            </select>

          </div>

          {/* COUPON */}
          <div className="mt-6">
            <div className="flex gap-3 mt-4">
              <input
                value={coupon}
                onChange={(e) => setCoupon(e.target.value)}
                placeholder="Coupon Code"
                className="flex-1 border p-4 rounded-xl"
              />
              <button
                onClick={applyCoupon}
                className="bg-[#5a422a] text-white px-6 rounded-xl"
              >
                Apply
              </button>
            </div>
          </div>

          {/* SUMMARY */}
          <div className="mt-8 border-t pt-6">

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

            <div className="flex justify-between font-bold text-lg mt-2">
              <span>Total</span>
              <span>₹{total}</span>
            </div>

          </div>

          {/* BUTTON */}
          <button
            onClick={placeOrder}
            disabled={!isFormValid}
            className={`w-full mt-6 py-4 rounded-full ${
              isFormValid
                ? "bg-[#5a422a] text-white"
                : "bg-gray-300 text-gray-600"
            }`}
          >
            Place Order via WhatsApp
          </button>

        </div>
      </div>
    </main>
  );
}