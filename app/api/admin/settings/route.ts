import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { getAdminSession } from "@/lib/auth";

export async function GET() {
  const settings = await db.getSettingsAsync();
  return NextResponse.json({ data: settings });
}

export async function PUT(req: NextRequest) {
  const session = await getAdminSession(req);
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const body = await req.json();
    const updated = await db.updateSettingsAsync(body);
    return NextResponse.json({ success: true, data: updated });
  } catch (err) {
    console.error("Error updating settings:", err);
    return NextResponse.json({ error: "Failed to update settings" }, { status: 500 });
  }
}
