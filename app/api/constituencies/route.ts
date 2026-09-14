import { NextRequest, NextResponse } from "next/server";
import { searchConstituencies, getDistricts, constituencies } from "@/lib/constituencies";

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const query = searchParams.get("q") || "";
    const state = searchParams.get("state") || undefined;
    const limit = parseInt(searchParams.get("limit") || "25", 10);
    const type = searchParams.get("type"); // "districts" or "all" or undefined

    if (type === "districts") {
      const districts = getDistricts(state || "Uttar Pradesh");
      return NextResponse.json({
        success: true,
        count: districts.length,
        state: state || "Uttar Pradesh",
        districts
      });
    }

    if (type === "stats") {
      return NextResponse.json({
        success: true,
        totalConstituencies: constituencies.length,
        upConstituencies: constituencies.filter((c) => c.state === "Uttar Pradesh").length,
        totalStates: new Set(constituencies.map((c) => c.state)).size
      });
    }

    const matches = searchConstituencies(query, Math.min(limit, 100), state);

    return NextResponse.json({
      success: true,
      query,
      count: matches.length,
      data: matches
    });
  } catch (error) {
    console.error("Constituencies API Error:", error);
    return NextResponse.json(
      { success: false, error: "Failed to fetch constituencies data" },
      { status: 500 }
    );
  }
}
