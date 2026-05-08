const express = require('express');
const router = express.Router();
const { PrismaClient } = require('@prisma/client');
const { auth } = require('../middleware/auth');

const prisma = new PrismaClient();

// Get all locations
router.get('/', async (req, res) => {
  try {
    const locations = await prisma.location.findMany({
      where: { active: true }
    });

    // Parse JSON strings
    const locationsWithParsedData = locations.map(location => ({
      ...location,
      services: location.services ? JSON.parse(location.services) : []
    }));

    res.json(locationsWithParsedData);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Get location by slug
router.get('/:slug', async (req, res) => {
  try {
    const location = await prisma.location.findUnique({
      where: { slug: req.params.slug }
    });

    if (!location) {
      return res.status(404).json({ message: 'Location not found' });
    }

    res.json({
      ...location,
      services: location.services ? JSON.parse(location.services) : []
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Create location (protected)
router.post('/', auth, async (req, res) => {
  try {
    const data = {
      ...req.body,
      services: req.body.services ? JSON.stringify(req.body.services) : null
    };

    const location = await prisma.location.create({ data });
    res.status(201).json(location);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Update location (protected)
router.put('/:id', auth, async (req, res) => {
  try {
    const data = {
      ...req.body,
      services: req.body.services ? JSON.stringify(req.body.services) : undefined
    };

    const location = await prisma.location.update({
      where: { id: parseInt(req.params.id) },
      data
    });

    res.json(location);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Delete location (protected)
router.delete('/:id', auth, async (req, res) => {
  try {
    await prisma.location.delete({
      where: { id: parseInt(req.params.id) }
    });

    res.json({ message: 'Location deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

module.exports = router;
