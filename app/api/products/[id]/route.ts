import { NextResponse } from "next/server";

export async function GET(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

    const response = await fetch(
      "https://script.google.com/macros/s/AKfycby-QaipxdwIPAytLugKIWBhYi3ggxIV_UPOlVONP25l2Vve4KjuLBvMgfJeHc-VQi1P/exec"
    );

    const products = await response.json();

    const product = products.find(
      (p: any) => p["Product ID"] === id
    );

    if (!product) {
      return NextResponse.json(
        { error: "Product not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(product);
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to load product" },
      { status: 500 }
    );
  }
}