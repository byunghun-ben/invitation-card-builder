import { MongoClient } from "mongodb";

/* eslint-disable no-var */
export declare global {
  var _mongoClientPromise: Promise<MongoClient>;
}
