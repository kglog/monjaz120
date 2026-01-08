import mongoose from 'mongoose';

export const connectToDB = async () => {
  if (mongoose.connections[0]?.readyState) return { db: (mongoose.connections[0] as any).db } as { db: any };
  const conn = await mongoose.connect(process.env.MONGODB_URI!);
  return { db: (conn.connections[0] as any).db } as { db: any };
};

export const connectDB = connectToDB;
export const connectToDatabase = connectToDB;
export default connectToDB;

// ASSISTANT_FINAL: true
