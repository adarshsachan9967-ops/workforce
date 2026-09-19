import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { getAdminSession } from "@/lib/auth";

export const dynamic = "force-dynamic";

export async function GET(req: NextRequest) {
  const session = await getAdminSession(req);
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const enquiries = await db.getEnquiriesAsync();
  const total = enquiries.length;
  const newCount = enquiries.filter((e) => e.status === "New").length;
  const contacted = enquiries.filter((e) => e.status === "Contacted").length;
  const inDiscussion = enquiries.filter((e) => e.status === "In Discussion").length;
  const converted = enquiries.filter((e) => e.status === "Converted").length;
  const closed = enquiries.filter((e) => e.status === "Closed").length;

  // Assembly districts count
  const districts = new Set(enquiries.map((e) => e.district));

  return NextResponse.json({
    total,
    newCount,
    contacted,
    inDiscussion,
    converted,
    closed,
    districtCoverageCount: districts.size
  });
}
