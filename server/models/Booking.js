const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema({
  customerName: {
    type: String,
    required: true
  },
  phone: {
    type: String,
    required: true
  },
  email: {
    type: String
  },
  petName: {
    type: String,
    required: true
  },
  petType: {
    type: String,
    enum: ['kucing', 'anjing', 'lainnya'],
    required: true
  },
  service: {
    type: String,
    required: true
  },
  location: {
    type: String,
    required: true
  },
  bookingDate: {
    type: Date,
    required: true
  },
  notes: {
    type: String
  },
  status: {
    type: String,
    enum: ['pending', 'confirmed', 'completed', 'cancelled'],
    default: 'pending'
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Booking', bookingSchema);
