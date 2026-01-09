import mongoose from 'mongoose';

const ServiceSchema = new mongoose.Schema({
  title: String,
  description: String,
  category: String,
  image: String,
  price: Number,
  vendorName: String,
  rating: Number,
}, { timestamps: true });

const ServiceModel = (mongoose.models.Service || mongoose.model('Service', ServiceSchema)) as any;

export default ServiceModel;
