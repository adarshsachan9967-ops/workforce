import { NextRequest, NextResponse } from "next/server";
import { verifyAdminCredentials, createAdminSession } from "@/lib/auth";

export async function POST(req: NextRequest) {
  try {
    const { email, password } = await req.json();

    if (!email || !password) {
      return NextResponse.json({ error: "Email and password are required." }, { status: 400 });
    }

    const isValid = await verifyAdminCredentials(email, password);
    if (!isValid) {
      return NextResponse.json({ error: "अमान्य क्रेडेंशियल्स। कृपया सही ईमेल और पासवर्ड दर्ज करें।" }, { status: 401 });
    }

    const token = await createAdminSession(email);
    return NextResponse.json({ success: true, user: email, token });
  } catch (err) {
    console.error("Login error:", err);
    return NextResponse.json({ error: "Internal error" }, { status: 500 });
  }
}
