import mongoose, { Schema } from 'mongoose';

const userSchema = new Schema({
  name: String,
  email: { type: String, unique: true },
  password: String,
  role: { type: String, enum: ['vendor', 'buyer'], default: 'buyer' },
}, { timestamps: true });

export default mongoose.models.User || mongoose.model('User', userSchema);
