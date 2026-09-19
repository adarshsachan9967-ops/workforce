import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { getAdminSession } from "@/lib/auth";

export const dynamic = "force-dynamic";

function escapeCsvField(field: any): string {
  if (field === null || field === undefined) return '""';
  const str = String(field).replace(/"/g, '""');
  return `"${str}"`;
}

export async function GET(req: NextRequest) {
  const session = await getAdminSession(req);
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const enquiries = await db.getEnquiriesAsync();

    const headers = [
      "Lead ID",
      "Date (IST)",
      "Status",
      "Full Name (नाम)",
      "Phone Number (मोबाइल)",
      "Email (ईमेल)",
      "Assembly Constituency (विधानसभा)",
      "District (जिला)",
      "Services Required (आवश्यक सेवाएं)",
      "Campaign Requirement (अभियान आवश्यकता)",
      "Preferred Time (पसंदीदा समय)",
      "Message (संदेश)",
      "Admin Notes (प्रशासनिक टिप्पणी)"
    ];

    const rows = enquiries.map((e) => [
      escapeCsvField(e.id),
      escapeCsvField(new Date(e.createdAt).toLocaleString("en-IN", { timeZone: "Asia/Kolkata" })),
      escapeCsvField(e.status),
      escapeCsvField(e.name),
      escapeCsvField(e.phone),
      escapeCsvField(e.email || ""),
      escapeCsvField(e.assembly),
      escapeCsvField(e.district),
      escapeCsvField(e.services.join(", ")),
      escapeCsvField(e.campaignRequirement || ""),
      escapeCsvField(e.preferredTime || ""),
      escapeCsvField(e.message || ""),
      escapeCsvField(e.adminNotes || "")
    ]);

    const csvContent = "\uFEFF" + [
      headers.map(escapeCsvField).join(","),
      ...rows.map((row) => row.join(","))
    ].join("\r\n");

    const filename = `workforce-up2027-leads-${new Date().toISOString().slice(0, 10)}.csv`;

    return new NextResponse(csvContent, {
      status: 200,
      headers: {
        "Content-Type": "text/csv; charset=utf-8",
        "Content-Disposition": `attachment; filename="${filename}"`,
        "Cache-Control": "no-store"
      }
    });
  } catch (err) {
    console.error("CSV Export error:", err);
    return NextResponse.json({ error: "Failed to export leads" }, { status: 500 });
  }
}
