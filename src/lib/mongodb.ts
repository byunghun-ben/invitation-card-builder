import { MongoClient, Db } from "mongodb";

declare global {
  var mongo: {
    conn: {
      client: MongoClient;
      db: Db;
    } | null;
    promise: Promise<{
      client: MongoClient;
      db: Db;
    }> | null;
  };
}

const MONGO_URI = process.env.MONGO_URI || "mongodb://localhost:27017";

if (!MONGO_URI || MONGO_URI === "") {
  throw new Error(
    "Please define the MONGO_URI environment variable inside .env.local",
  );
}

let cached = global.mongo;

if (!cached) {
  cached = global.mongo = { promise: null, conn: null };
}

async function connectDb() {
  if (cached.conn) {
    return cached.conn;
  }

  if (!cached.promise) {
    cached.promise = MongoClient.connect(MONGO_URI).then(client => {
      return {
        client,
        db: client.db("wed-invi"),
      };
    });
  }

  try {
    cached.conn = await cached.promise;
  } catch (e) {
    cached.promise = null;
    throw e;
  }

  return cached.conn;
}

export default connectDb;
