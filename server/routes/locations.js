const express = require('express');
const router = express.Router();
const Location = require('../models/Location');
const { auth } = require('../middleware/auth');

// Get all locations
router.get('/', async (req, res) => {
  try {
    const locations = await Location.find({ active: true });
    res.json(locations);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Get location by slug
router.get('/:slug', async (req, res) => {
  try {
    const location = await Location.findOne({ slug: req.params.slug });
    if (!location) {
      return res.status(404).json({ message: 'Location not found' });
    }
    res.json(location);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Create location (protected)
router.post('/', auth, async (req, res) => {
  try {
    const location = new Location(req.body);
    await location.save();
    res.status(201).json(location);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Update location (protected)
router.put('/:id', auth, async (req, res) => {
  try {
    const location = await Location.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!location) {
      return res.status(404).json({ message: 'Location not found' });
    }
    res.json(location);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Delete location (protected)
router.delete('/:id', auth, async (req, res) => {
  try {
    const location = await Location.findByIdAndDelete(req.params.id);
    if (!location) {
      return res.status(404).json({ message: 'Location not found' });
    }
    res.json({ message: 'Location deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

module.exports = router;
