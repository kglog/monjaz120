// models/Order.ts
import mongoose from 'mongoose';

const orderSchema = new mongoose.Schema(
  {
    serviceTitle: String,
    serviceSlug: String,
    servicePrice: Number,
    buyerEmail: String,
    status: {
      type: String,
      default: 'بانتظار الموافقة',
    },
  },
  { timestamps: true }
);

export default mongoose.models.Order || mongoose.model('Order', orderSchema);
