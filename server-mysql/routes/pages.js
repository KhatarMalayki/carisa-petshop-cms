const express = require('express');
const router = express.Router();
const { PrismaClient } = require('@prisma/client');
const { auth } = require('../middleware/auth');

const prisma = new PrismaClient();

// Get all pages
router.get('/', async (req, res) => {
  try {
    const { status } = req.query;
    const where = status ? { status } : {};
    
    const pages = await prisma.page.findMany({
      where,
      orderBy: { createdAt: 'desc' }
    });

    res.json(pages);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Get page by slug
router.get('/:slug', async (req, res) => {
  try {
    const page = await prisma.page.findUnique({
      where: { slug: req.params.slug }
    });

    if (!page) {
      return res.status(404).json({ message: 'Page not found' });
    }

    res.json(page);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Create page (protected)
router.post('/', auth, async (req, res) => {
  try {
    const page = await prisma.page.create({
      data: req.body
    });

    res.status(201).json(page);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Update page (protected)
router.put('/:id', auth, async (req, res) => {
  try {
    const page = await prisma.page.update({
      where: { id: parseInt(req.params.id) },
      data: req.body
    });

    res.json(page);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Delete page (protected)
router.delete('/:id', auth, async (req, res) => {
  try {
    await prisma.page.delete({
      where: { id: parseInt(req.params.id) }
    });

    res.json({ message: 'Page deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

module.exports = router;
