import { NextRequest, NextResponse } from "next/server";
import { getAdminSession } from "@/lib/auth";
import { listImageKitFiles, deleteFromImageKit } from "@/lib/imagekit";

export const dynamic = "force-dynamic";

export async function GET(req: NextRequest) {
  const session = await getAdminSession(req);
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const { searchParams } = new URL(req.url);
    const folder = searchParams.get("folder") || "workforce";
    const files = await listImageKitFiles(folder, 50);

    return NextResponse.json({
      success: true,
      files,
    });
  } catch (error: any) {
    console.error("ImageKit list error:", error);
    return NextResponse.json(
      { error: error.message || "Failed to list ImageKit media" },
      { status: 500 }
    );
  }
}

export async function DELETE(req: NextRequest) {
  const session = await getAdminSession(req);
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const { searchParams } = new URL(req.url);
    const fileId = searchParams.get("fileId");

    if (!fileId) {
      return NextResponse.json({ error: "fileId query parameter is required" }, { status: 400 });
    }

    await deleteFromImageKit(fileId);
    return NextResponse.json({ success: true, message: "File deleted successfully" });
  } catch (error: any) {
    console.error("ImageKit delete error:", error);
    return NextResponse.json(
      { error: error.message || "Failed to delete file from ImageKit" },
      { status: 500 }
    );
  }
}
