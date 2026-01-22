import mongoose from 'mongoose';

const ServiceSchema = new mongoose.Schema({
  title: String,
  description: String,
  category: String,
  image: String,
  price: Number,
  vendorName: String,
  rating: Number,
  vendorId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: false,
  },
}, { timestamps: true });

export default mongoose.models.Service || mongoose.model('Service', ServiceSchema);
