const mongoose = require('mongoose');

const locationSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  slug: {
    type: String,
    required: true,
    unique: true
  },
  address: {
    type: String,
    required: true
  },
  mapUrl: {
    type: String
  },
  phone: {
    type: String
  },
  whatsapp: {
    type: String
  },
  hours: {
    type: String,
    default: '24 Jam'
  },
  services: [{
    type: String
  }],
  image: {
    type: String
  },
  active: {
    type: Boolean,
    default: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Location', locationSchema);
