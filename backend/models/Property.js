import mongoose from 'mongoose';

const propertySchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true,
  },
  description: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  location: {
    type: String,
    required: true,
  },
  propertyType: {
    type: String,
    enum: ['Plot', 'Villa', 'Apartment', 'Commercial'],
    required: true,
  },
  investmentType: {
    type: String,
    enum: ['High ROI', 'Long Term', 'Rental Income'],
    required: true,
  },
  images: {
    type: [String],
    required: true,
  },
  highlights: {
    type: [String],
    default: [],
  },
  amenities: {
    type: [String],
    default: [],
  },
  mapLocation: {
    type: String, // Google Maps embed URL
    default: '',
  },
  isFeatured: {
    type: Boolean,
    default: false,
  },
}, { timestamps: true });

const Property = mongoose.model('Property', propertySchema);

export default Property;
