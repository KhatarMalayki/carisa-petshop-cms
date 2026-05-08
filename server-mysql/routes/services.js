const express = require('express');
const router = express.Router();
const { PrismaClient } = require('@prisma/client');
const { auth } = require('../middleware/auth');

const prisma = new PrismaClient();

// Get all services
router.get('/', async (req, res) => {
  try {
    const services = await prisma.service.findMany({
      where: { active: true },
      orderBy: { order: 'asc' }
    });

    // Parse JSON strings
    const servicesWithParsedData = services.map(service => ({
      ...service,
      features: service.features ? JSON.parse(service.features) : []
    }));

    res.json(servicesWithParsedData);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Get service by slug
router.get('/:slug', async (req, res) => {
  try {
    const service = await prisma.service.findUnique({
      where: { slug: req.params.slug }
    });

    if (!service) {
      return res.status(404).json({ message: 'Service not found' });
    }

    res.json({
      ...service,
      features: service.features ? JSON.parse(service.features) : []
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Create service (protected)
router.post('/', auth, async (req, res) => {
  try {
    const data = {
      ...req.body,
      features: req.body.features ? JSON.stringify(req.body.features) : null
    };

    const service = await prisma.service.create({ data });
    res.status(201).json(service);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Update service (protected)
router.put('/:id', auth, async (req, res) => {
  try {
    const data = {
      ...req.body,
      features: req.body.features ? JSON.stringify(req.body.features) : undefined
    };

    const service = await prisma.service.update({
      where: { id: parseInt(req.params.id) },
      data
    });

    res.json(service);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Delete service (protected)
router.delete('/:id', auth, async (req, res) => {
  try {
    await prisma.service.delete({
      where: { id: parseInt(req.params.id) }
    });

    res.json({ message: 'Service deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

module.exports = router;
