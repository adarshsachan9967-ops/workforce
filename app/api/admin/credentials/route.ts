import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { getAdminSession, verifyAdminCredentials } from "@/lib/auth";

export const dynamic = "force-dynamic";

export async function POST(req: NextRequest) {
  const session = await getAdminSession(req);
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const { currentPassword, newEmail, newPassword } = await req.json();

    if (!currentPassword || !newPassword) {
      return NextResponse.json({ error: "वर्तमान और नया पासवर्ड आवश्यक है।" }, { status: 400 });
    }

    if (newPassword.length < 6) {
      return NextResponse.json({ error: "नया पासवर्ड कम से कम 6 अक्षरों का होना चाहिए।" }, { status: 400 });
    }

    const isCurrentValid = await verifyAdminCredentials(session.user, currentPassword);
    if (!isCurrentValid) {
      return NextResponse.json({ error: "वर्तमान पासवर्ड अमान्य है।" }, { status: 400 });
    }

    const emailToSet = (newEmail && newEmail.trim()) ? newEmail.trim() : session.user;
    await db.updateAdminCredentialsAsync(emailToSet, newPassword);

    return NextResponse.json({
      success: true,
      message: "क्रेडेंशियल्स सफलतापूर्वक अपडेट किए गए।",
      user: emailToSet
    });
  } catch (err) {
    console.error("Credentials update error:", err);
    return NextResponse.json({ error: "Failed to update credentials" }, { status: 500 });
  }
}
