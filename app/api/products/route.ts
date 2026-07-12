import { NextResponse } from "next/server";

export async function GET() {
  try {
    const response = await fetch(
      "https://script.google.com/macros/s/AKfycby-QaipxdwIPAytLugKIWBhYi3ggxIV_UPOlVONP25l2Vve4KjuLBvMgfJeHc-VQi1P/exec",
      {
        cache: "no-store",
      }
    );

    const products = await response.json();

    return NextResponse.json(products);

  } catch (error) {
    console.error("Products API Error:", error);

    return NextResponse.json([], {
      status: 500,
    });
  }
}