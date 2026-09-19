import dns from "dns";
import { MongoClient, Db } from "mongodb";

// Configure public DNS servers for resolving MongoDB Atlas SRV records when available
try {
  dns.setServers(["8.8.8.8", "1.1.1.1"]);
} catch {
  // Ignore in restricted environments
}

// Direct replica set connection string for workforce.f18zegk.mongodb.net
// Completely bypasses DNS SRV lookups to eliminate querySrv ECONNREFUSED errors across all environments
const DIRECT_REPLICA_SET_URI =
  "mongodb://adarshdeepsachan_db_user:Do3OT5HokRM9tI0c@ac-kr1xzbk-shard-00-00.f18zegk.mongodb.net:27017,ac-kr1xzbk-shard-00-01.f18zegk.mongodb.net:27017,ac-kr1xzbk-shard-00-02.f18zegk.mongodb.net:27017/workforce?ssl=true&replicaSet=atlas-49g4pb-shard-0&authSource=admin&retryWrites=true&w=majority";

function getMongoUri(): string {
  if (process.env.MONGODB_DIRECT_URI) {
    return process.env.MONGODB_DIRECT_URI;
  }

  const envUri = process.env.MONGODB_URI;
  if (envUri) {
    // If an srv URI pointing to our known workforce cluster is provided, use direct replica set for 100% reliability
    if (envUri.includes("workforce.f18zegk.mongodb.net")) {
      return DIRECT_REPLICA_SET_URI;
    }
    return envUri;
  }

  return DIRECT_REPLICA_SET_URI;
}

const uri = getMongoUri();
const dbName = process.env.MONGODB_DB_NAME || "workforce";

declare global {
  // eslint-disable-next-line no-var
  var _mongoClientPromise: Promise<MongoClient> | undefined;
}

let clientPromise: Promise<MongoClient> | null = null;

async function createConnectedClient(connectionUri: string): Promise<MongoClient> {
  const client = new MongoClient(connectionUri, {
    maxPoolSize: 10,
    serverSelectionTimeoutMS: 8000,
    connectTimeoutMS: 10000,
  });
  return await client.connect();
}

export function getMongoClientPromise(): Promise<MongoClient> | null {
  if (!uri) {
    return null;
  }

  if (process.env.NODE_ENV === "development") {
    if (!global._mongoClientPromise) {
      global._mongoClientPromise = createConnectedClient(uri).catch((err) => {
        global._mongoClientPromise = undefined;
        throw err;
      });
    }
    return global._mongoClientPromise;
  } else {
    if (!clientPromise) {
      clientPromise = createConnectedClient(uri).catch((err) => {
        clientPromise = null;
        throw err;
      });
    }
    return clientPromise;
  }
}

export async function getMongoDb(): Promise<Db | null> {
  try {
    const promise = getMongoClientPromise();
    if (!promise) return null;
    const client = await promise;
    return client.db(dbName);
  } catch (err) {
    console.error("Failed to connect to MongoDB Atlas:", err);
    // Reset cached promises so subsequent requests can retry
    if (process.env.NODE_ENV === "development") {
      global._mongoClientPromise = undefined;
    } else {
      clientPromise = null;
    }
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

