import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { getAdminSession } from "@/lib/auth";

export const dynamic = "force-dynamic";

export async function GET() {
  const session = await getAdminSession();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const data = await db.getAllContentAsync();
  return NextResponse.json({ success: true, data });
}

export async function PUT(req: NextRequest) {
  const session = await getAdminSession();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const body = await req.json();
    const { section } = body;
    const data = body.data !== undefined ? body.data : body.content;

    switch (section) {
      case "settings":
        await db.updateSettingsAsync(data);
        break;
      case "homepage":
        await db.updateHomepageContentAsync(data);
        break;
      case "pages":
        await db.updatePagesContentAsync(data);
        break;
      case "navigation":
        await db.saveNavigationAsync(data);
        break;
      case "faqs":
        if (Array.isArray(data)) {
          for (const faq of data) {
            await db.saveFaqAsync(faq);
          }
        }
        break;
      case "faq-item":
        if (data && data.id) {
          await db.saveFaqAsync(data);
        }
        break;
      case "gallery":
        await db.updateGalleryAsync(data);
        break;
      case "trackRecord":
        await db.updateTrackRecordAsync(data);
        break;
      case "hiring":
        await db.updateHiringAsync(data);
        break;
      default:
        // If full content payload provided
        if (body.settings) await db.updateSettingsAsync(body.settings);
        if (body.homepage) await db.updateHomepageContentAsync(body.homepage);
        if (body.pages) await db.updatePagesContentAsync(body.pages);
        if (body.navigation) await db.saveNavigationAsync(body.navigation);
        if (body.gallery) await db.updateGalleryAsync(body.gallery);
        if (body.trackRecord) await db.updateTrackRecordAsync(body.trackRecord);
        if (body.hiring) await db.updateHiringAsync(body.hiring);
        break;
    }

    const updated = await db.getAllContentAsync();
    return NextResponse.json({ success: true, data: updated });
  } catch (err) {
    console.error("Error updating site content:", err);
    return NextResponse.json({ error: "Failed to update content" }, { status: 500 });
  }
}
