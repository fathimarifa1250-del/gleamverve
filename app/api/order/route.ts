import { NextResponse } from "next/server";

export async function POST(req: Request) {
  console.log("✅ API Route Called");

  try {
    const data = await req.json();

    const response = await fetch(
      "https://script.google.com/macros/s/AKfycbx7voLfzB8aFrv0sj_Ul5Ryq7g0AXkbq9_Q8okCpecp9xbUk6yJL_rbqfgE0a6zecrbOA/exec",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      }
    );

    console.log("Google Apps Script status:", response.status);

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("API ERROR:", error);

    return NextResponse.json(
      { success: false },
      { status: 500 }
    );
  }
}