import { MongoClient, Db } from "mongodb";

let lastMongoError: string | null = null;

export function getLastMongoError(): string | null {
  return lastMongoError;
}

// 1. Standard SRV URI for MongoDB Atlas (primary strategy for Vercel / Cloud environments)
const SRV_URI =
  process.env.MONGODB_URI ||
  "mongodb+srv://adarshdeepsachan_db_user:Do3OT5HokRM9tI0c@workforce.f18zegk.mongodb.net/workforce?retryWrites=true&w=majority";

// 2. Direct Replica Set URI with tls=true (fallback strategy if DNS blocks SRV records)
const DIRECT_REPLICA_SET_URI =
  process.env.MONGODB_DIRECT_URI ||
  "mongodb://adarshdeepsachan_db_user:Do3OT5HokRM9tI0c@ac-kr1xzbk-shard-00-00.f18zegk.mongodb.net:27017,ac-kr1xzbk-shard-00-01.f18zegk.mongodb.net:27017,ac-kr1xzbk-shard-00-02.f18zegk.mongodb.net:27017/workforce?tls=true&replicaSet=atlas-49g4pb-shard-0&authSource=admin&retryWrites=true&w=majority";

const dbName = process.env.MONGODB_DB_NAME || "workforce";

declare global {
  // eslint-disable-next-line no-var
  var _mongoClientPromise: Promise<MongoClient> | undefined;
}

async function createConnectedClient(): Promise<MongoClient> {
  // Strategy 1: Standard SRV URI (recommended for Vercel Serverless / Linux)
  try {
    const client = new MongoClient(SRV_URI, {
      maxPoolSize: 10,
      serverSelectionTimeoutMS: 5000,
      connectTimeoutMS: 6000,
    });
    const connected = await client.connect();
    // Verify connection with ping
    await connected.db(dbName).command({ ping: 1 });
    lastMongoError = null;
    return connected;
  } catch (srvErr: any) {
    console.warn("MongoDB SRV connection attempt failed, trying direct replica set:", srvErr.message);
    lastMongoError = `SRV: ${srvErr.message}`;
  }

  // Strategy 2: Direct Replica Set URI with modern tls=true
  try {
    const directClient = new MongoClient(DIRECT_REPLICA_SET_URI, {
      maxPoolSize: 10,
      serverSelectionTimeoutMS: 5000,
      connectTimeoutMS: 6000,
    });
    const connected = await directClient.connect();
    await connected.db(dbName).command({ ping: 1 });
    lastMongoError = null;
    return connected;
  } catch (directErr: any) {
    console.error("MongoDB direct replica set connection also failed:", directErr.message);
    lastMongoError = `Direct: ${directErr.message}`;
    throw directErr;
  }
}

export function getMongoClientPromise(): Promise<MongoClient> | null {
  if (!global._mongoClientPromise) {
    global._mongoClientPromise = createConnectedClient().catch((err) => {
      global._mongoClientPromise = undefined;
      throw err;
    });
  }
  return global._mongoClientPromise;
}

export async function getMongoDb(): Promise<Db | null> {
  try {
    const promise = getMongoClientPromise();
    if (!promise) return null;
    const client = await promise;
    return client.db(dbName);
  } catch (err: any) {
    console.error("Failed to connect to MongoDB Atlas:", err.message);
    lastMongoError = err.message;
    global._mongoClientPromise = undefined;
    return null;
  }
}

export async function isMongoConnected(): Promise<boolean> {
  try {
    const db = await getMongoDb();
    if (!db) return false;
    await db.command({ ping: 1 });
    return true;
  } catch {
    return false;
  }
}
