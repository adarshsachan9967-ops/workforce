import { NextRequest, NextResponse } from "next/server";
import { db, Enquiry } from "@/lib/db";
import { getAdminSession } from "@/lib/auth";

export async function PATCH(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const session = await getAdminSession(req);
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const resolvedParams = await params;
    const { id } = resolvedParams;
    const body = await req.json();
    const { status, adminNotes } = body;

    let updated = null;

    if (status) {
      const validStatuses: Enquiry["status"][] = ["New", "Contacted", "In Discussion", "Converted", "Closed"];
      if (!validStatuses.includes(status)) {
        return NextResponse.json({ error: "Invalid status value" }, { status: 400 });
      }
      updated = await db.updateEnquiryStatusAsync(id, status);
    }

    if (typeof adminNotes === "string") {
      updated = await db.updateEnquiryNotesAsync(id, adminNotes);
    }

    if (!updated) {
      return NextResponse.json({ error: "Enquiry not found" }, { status: 404 });
    }

    return NextResponse.json({ success: true, data: updated });
  } catch (err) {
    console.error("Error updating enquiry:", err);
    return NextResponse.json({ error: "Internal error" }, { status: 500 });
  }
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const session = await getAdminSession(req);
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const resolvedParams = await params;
    const { id } = resolvedParams;
    const success = await db.deleteEnquiryAsync(id);

    if (!success) {
      return NextResponse.json({ error: "Enquiry not found" }, { status: 404 });
    }

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("Error deleting enquiry:", err);
    return NextResponse.json({ error: "Internal error" }, { status: 500 });
  }
}
