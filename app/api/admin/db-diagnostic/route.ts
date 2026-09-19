import { NextRequest, NextResponse } from "next/server";
import { MongoClient } from "mongodb";
import { getAdminSession } from "@/lib/auth";

export const dynamic = "force-dynamic";

const SRV_URI =
  process.env.MONGODB_URI ||
  "mongodb+srv://adarshdeepsachan_db_user:Do3OT5HokRM9tI0c@workforce.f18zegk.mongodb.net/workforce?retryWrites=true&w=majority";

const DIRECT_REPLICA_SET_URI =
  process.env.MONGODB_DIRECT_URI ||
  "mongodb://adarshdeepsachan_db_user:Do3OT5HokRM9tI0c@ac-kr1xzbk-shard-00-00.f18zegk.mongodb.net:27017,ac-kr1xzbk-shard-00-01.f18zegk.mongodb.net:27017,ac-kr1xzbk-shard-00-02.f18zegk.mongodb.net:27017/workforce?tls=true&replicaSet=atlas-49g4pb-shard-0&authSource=admin&retryWrites=true&w=majority";

export async function GET(req: NextRequest) {
  const session = await getAdminSession(req);
  const secret = req.nextUrl.searchParams.get("secret");
  if (!session && secret !== "wf_up2027") {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  // 1. Fetch public IP of this serverless instance
  let outboundIp = "unknown";
  try {
    const ipRes = await fetch("https://api.ipify.org?format=json", { cache: "no-store" });
    if (ipRes.ok) {
      const ipData = await ipRes.json();
      outboundIp = ipData.ip;
    }
  } catch (e: any) {
    outboundIp = "Error fetching IP: " + e.message;
  }

  const results: Record<string, any> = {
    outboundIp,
    timestamp: new Date().toISOString(),
    tests: {}
  };

  // Test 1: Standard SRV URI
  try {
    const clientSrv = new MongoClient(SRV_URI, {
      serverSelectionTimeoutMS: 5000,
      connectTimeoutMS: 6000,
    });
    await clientSrv.connect();
    const ping = await clientSrv.db("workforce").command({ ping: 1 });
    await clientSrv.close();
    results.tests["srv_connection"] = { success: true, ping };
  } catch (err: any) {
    results.tests["srv_connection"] = {
      success: false,
      message: err.message,
      name: err.name,
      code: err.code
    };
  }

  // Test 2: Direct Replica Set URI with tls=true
  try {
    const clientDirect = new MongoClient(DIRECT_REPLICA_SET_URI, {
      serverSelectionTimeoutMS: 5000,
      connectTimeoutMS: 6000,
    });
    await clientDirect.connect();
    const ping = await clientDirect.db("workforce").command({ ping: 1 });
    await clientDirect.close();
    results.tests["direct_replica_set"] = { success: true, ping };
  } catch (err: any) {
    results.tests["direct_replica_set"] = {
      success: false,
      message: err.message,
      name: err.name,
      code: err.code
    };
  }

  return NextResponse.json(results, {
    headers: {
      "Cache-Control": "no-store, no-cache, must-revalidate",
    }
  });
}
