import mongoose from 'mongoose';

const leadSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
    required: true,
  },
  email: {
    type: String,
  },
  budget: {
    type: String,
    required: true,
  },
  propertyType: {
    type: String,
    enum: ['Plot', 'Villa', 'Apartment', 'Commercial', 'Any'],
    default: 'Any',
  },
  sourcePage: {
    type: String,
  },
  message: {
    type: String,
  },
  status: {
    type: String,
    enum: ['New', 'Contacted', 'Qualified', 'Converted', 'Lost'],
    default: 'New',
  },
  notes: {
    type: String,
    default: '',
  },
}, { timestamps: true });

const Lead = mongoose.model('Lead', leadSchema);

export default Lead;
