import mongoose, { Schema } from 'mongoose';

const ratingSchema = new Schema({
  orderId: {
    type: String,
    required: true,
  },
  vendorId: {
    type: String,
    required: true,
  },
  rating: {
    type: Number,
    required: true,
  },
  serviceName: {
    type: String,
    required: true,
  },
}, { timestamps: true });

export default mongoose.models.Rating || mongoose.model('Rating', ratingSchema);
