import mongoose from 'mongoose';
import { MongoClient } from 'mongodb';

export const connectToDB = async () => {
  // If mongoose is already connected, return a compatibility object
  if (mongoose.connections[0]?.readyState) {
    // mongoose doesn't expose the native db easily, but many routes expect
    // an object like { db } with a `collection` method. We'll return a small
    // compatibility object that proxies to mongoose.connection.db when available.
    const nativeDb = (mongoose.connections[0] as any).db;
    return { db: nativeDb } as { db: any };
  }

  // Otherwise, connect via mongoose (primary path for app) and return the native db
  const conn = await mongoose.connect(process.env.MONGODB_URI!);
  const nativeDb = (conn.connections[0] as any).db;
  return { db: nativeDb } as { db: any };
};

// backward-compatible aliases used across the repo
export const connectDB = connectToDB;
export const connectToDatabase = connectToDB;

// provide a default export for files that import the module as default
export default connectToDB;

// ASSISTANT_FINAL: true
