import "server-only";
import { MongoClient } from "mongodb";

const uri = process.env.MONGODB_URI;
const dbName = process.env.MONGODB_DB || "portfolio";

let cached = globalThis.__portfolioMongo;

if (!cached) {
  cached = globalThis.__portfolioMongo = {
    client: null,
    promise: null,
  };
}

export async function getDb() {
  if (!uri) {
    throw new Error("MONGODB_URI is not configured");
  }

  if (cached.client) {
    return cached.client.db(dbName);
  }

  if (!cached.promise) {
    const client = new MongoClient(uri);
    const p = client.connect();
    p.catch(() => {}); // Prevent global unhandled rejection
    cached.promise = p;
  }

  try {
    cached.client = await cached.promise;
    return cached.client.db(dbName);
  } catch (error) {
    cached.promise = null; // Clear cache on failure
    throw error;
  }
}
