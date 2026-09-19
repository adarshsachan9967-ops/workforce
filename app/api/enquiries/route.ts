import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { getAdminSession } from "@/lib/auth";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { name, phone, email, assembly, district, state, services, campaignRequirement, preferredTime, message } = body;

    if (!name || typeof name !== "string" || name.trim().length < 2) {
      return NextResponse.json({ error: "कृपया सही नाम दर्ज करें।" }, { status: 400 });
    }

    const cleanPhone = phone?.toString().replace(/\D/g, "");
    if (!cleanPhone || cleanPhone.length < 10) {
      return NextResponse.json({ error: "कृपया वैध 10-अंकीय मोबाइल नंबर दर्ज करें।" }, { status: 400 });
    }

    if (!assembly || typeof assembly !== "string" || assembly.trim().length < 2) {
      return NextResponse.json({ error: "कृपया विधानसभा क्षेत्र का नाम दर्ज करें।" }, { status: 400 });
    }

    if (!district || typeof district !== "string" || district.trim().length < 2) {
      return NextResponse.json({ error: "कृपया जिला दर्ज करें।" }, { status: 400 });
    }

    const servicesList = Array.isArray(services) && services.length > 0 ? services : ["सामान्य चुनाव परामर्श"];

    const newRecord = await db.addEnquiryAsync({
      name: name.trim(),
      phone: cleanPhone,
      email: email?.trim() || undefined,
      assembly: assembly.trim(),
      district: district.trim(),
      state: state?.trim() || undefined,
      services: servicesList,
      campaignRequirement: campaignRequirement?.trim() || undefined,
      preferredTime: preferredTime?.trim() || undefined,
      message: message?.trim() || undefined
    });

    return NextResponse.json({ success: true, data: newRecord }, { status: 201 });
  } catch (err) {
    console.error("Error creating enquiry:", err);
    return NextResponse.json({ error: "सर्वर त्रुटि: कृपया पुनः प्रयास करें।" }, { status: 500 });
  }
}

export async function GET(req: NextRequest) {
  try {
    const session = await getAdminSession(req);
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const list = await db.getEnquiriesAsync();
    return NextResponse.json({ data: list });
  } catch (err) {
    console.error("Error fetching enquiries:", err);
    return NextResponse.json({ error: "Internal error" }, { status: 500 });
  }
}
