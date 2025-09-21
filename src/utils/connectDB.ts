import mongoose from 'mongoose';

const uri = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/monjaz';

let isConnected = false;

export default async function connectDB() {
  if (isConnected) {
    return;
  }

  try {
    const db = await mongoose.connect(uri);
    isConnected = true;
    console.log('✅ MongoDB connected');
  } catch (error) {
    console.error('❌ MongoDB connection error:', error);
    throw new Error('Connection failed');
  }
}
