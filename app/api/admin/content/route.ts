import { NextRequest, NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { db } from "@/lib/db";
import { getAdminSession } from "@/lib/auth";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export async function GET(req: NextRequest) {
  const session = await getAdminSession(req);
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const data = await db.getAllContentAsync();
  return NextResponse.json(
    { success: true, data },
    {
      headers: {
        "Cache-Control": "no-store, no-cache, must-revalidate, proxy-revalidate, max-age=0",
        "Pragma": "no-cache",
        "Expires": "0",
      },
    }
  );
}

export async function PUT(req: NextRequest) {
  const session = await getAdminSession(req);
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

    try {
      revalidatePath("/", "layout");
      revalidatePath("/");
      revalidatePath("/admin");
      revalidatePath("/gallery");
      revalidatePath("/contact");
      revalidatePath("/process");
      revalidatePath("/services");
      revalidatePath("/about");
    } catch (cacheErr) {
      console.warn("revalidatePath warning:", cacheErr);
    }

    const updated = await db.getAllContentAsync();
    return NextResponse.json(
      { success: true, data: updated },
      {
        headers: {
          "Cache-Control": "no-store, no-cache, must-revalidate, proxy-revalidate, max-age=0",
          "Pragma": "no-cache",
          "Expires": "0",
        },
      }
    );
  } catch (err: unknown) {
    console.error("Error updating site content:", err);
    const message = err instanceof Error ? err.message : "Failed to update content";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
