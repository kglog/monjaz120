import mongoose, { Schema, Model } from 'mongoose';

const userSchema = new Schema({
  name: String,
  email: { type: String, unique: true },
  password: String,
  role: { type: String, enum: ['vendor', 'buyer'], default: 'buyer' },
}, { timestamps: true });

const User = (mongoose.models.User || mongoose.model('User', userSchema)) as any;

export default User;
