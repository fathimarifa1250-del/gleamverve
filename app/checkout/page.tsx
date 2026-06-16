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

  // FIXED VALIDATION (IMPORTANT)
  const isFormValid = Boolean(
    name && phone && address && city && pin && cart.length > 0
  );

  // SUBTOTAL
  const subtotal = cart.reduce(
    (sum: number, item: any) => sum + item.price * item.quantity,
    0
  );

  // SHIPPING
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

  // COUPON
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
    console.log("Order clicked");

    if (!isFormValid) {
      alert("Fill all details first");
      return;
    }

    const orderId = "GV" + Date.now();

    const itemsText = cart
      .map(
        (item: any) =>
          `- ${item.name} x${item.quantity} = ₹${item.price * item.quantity}`
      )
      .join("\n");

    const appliedCoupon = discount > 0 ? coupon : "NONE";

    // Google Sheets
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

    // WhatsApp
    const message = encodeURIComponent(`
✨ GLEAMVERVE ORDER ✨

Order ID: ${orderId}

Name: ${name}
Phone: ${phone}

Address:
${address}
${city} - ${pin}
State: ${state}

Items:
${itemsText}

Subtotal: ₹${subtotal}
Shipping: ₹${shipping}
Coupon: ${appliedCoupon}
Discount: -₹${discount}

TOTAL: ₹${total}
`);

    const url = `https://wa.me/919072457619?text=${message}`;

    window.location.href = url;
  };

  return (
    <main className="min-h-screen bg-[#f5eee6] text-[#5a422a] px-6 md:px-20 py-20">
      <div className="max-w-4xl mx-auto">

        <h1 className="text-5xl font-serif mb-10">
          Checkout
        </h1>

        <div className="bg-white rounded-[2rem] p-8 border border-[#eadfce]">

          {/* FORM */}
          <div className="grid gap-5">
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Full Name"
              className="border p-4 rounded-xl"
            />

            <input
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="Phone Number"
              className="border p-4 rounded-xl"
            />

            <textarea
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              placeholder="Address"
              className="border p-4 rounded-xl h-28"
            />

            <input
              value={city}
              onChange={(e) => setCity(e.target.value)}
              placeholder="City"
              className="border p-4 rounded-xl"
            />

            <input
              value={pin}
              onChange={(e) => setPin(e.target.value)}
              placeholder="PIN Code"
              className="border p-4 rounded-xl"
            />

            <select
              value={state}
              onChange={(e) => setState(e.target.value)}
              className="border p-4 rounded-xl"
            >
              <option value="kerala">Kerala</option>
              <option value="tamil-nadu">Tamil Nadu</option>
              <option value="karnataka">Karnataka</option>
              <option value="delhi">Delhi</option>
              <option value="maharashtra">Maharashtra</option>
              <option value="rajasthan">Rajasthan</option>
              <option value="jammu-kashmir">Jammu & Kashmir</option>
              <option value="ladakh">Ladakh</option>
              <option value="international">International</option>
            </select>
          </div>

          {/* COUPON */}
          <div className="flex gap-2 mt-6">
            <input
              value={coupon}
              onChange={(e) => setCoupon(e.target.value)}
              placeholder="Coupon Code"
              className="flex-1 border p-3 rounded-xl"
            />
            <button
              onClick={applyCoupon}
              className="bg-[#5a422a] text-white px-6 rounded-xl"
            >
              Apply
            </button>
          </div>

          {/* SUMMARY */}
          <div className="flex justify-between"> 
            <span>Subtotal</span>
            <span>₹{subtotal}</span> 
          </div> <div className="flex justify-between"> 
            <span>Shipping</span> 
            <span>₹{shipping}</span> 
          </div> <div className="flex justify-between"> 
            <span>Discount</span> 
            <span>-₹{discount}</span> 
          </div> <div className="flex justify-between font-bold text-lg mt-2"> 
            <span>Total</span> 
            <span>₹{total}</span> 
          </div> 
          </div>

          {/* BUTTON (FORCE VISIBLE) */}
          <button
            onClick={placeOrder}
            className="w-full mt-6 py-4 rounded-full bg-[#5a422a] text-white"
          >
            Place Order via WhatsApp
          </button>

        </div>
      </div>
    </main>
  );
}