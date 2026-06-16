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

  // GOOGLE SHEETS
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

  // WHATSAPP MESSAGE (FIXED)
  const message = encodeURIComponent(`
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

Subtotal: ₹${subtotal}
Shipping: ₹${shipping}
Coupon: ${appliedCoupon}
Discount: -₹${discount}

TOTAL: ₹${total}

Thank you for shopping with GleamVerve 💛
`);

  const url = `https://wa.me/919072457619?text=${message}`;

  // IMPORTANT FIX (no popup issues)
  window.location.href = url;
};