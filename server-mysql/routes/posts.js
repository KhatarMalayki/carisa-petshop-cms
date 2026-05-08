const express = require('express');
const router = express.Router();
const { PrismaClient } = require('@prisma/client');
const { auth } = require('../middleware/auth');

const prisma = new PrismaClient();

// Get all posts (public)
router.get('/', async (req, res) => {
  try {
    const { status, category, limit = 10, page = 1 } = req.query;
    
    const where = {};
    if (status) where.status = status;
    if (category) where.category = category;

    const posts = await prisma.post.findMany({
      where,
      include: {
        author: {
          select: { username: true }
        }
      },
      orderBy: { createdAt: 'desc' },
      take: parseInt(limit),
      skip: (parseInt(page) - 1) * parseInt(limit)
    });

    const total = await prisma.post.count({ where });

    res.json({ 
      posts, 
      total, 
      page: parseInt(page), 
      pages: Math.ceil(total / limit) 
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Get single post by slug
router.get('/:slug', async (req, res) => {
  try {
    const post = await prisma.post.findUnique({
      where: { slug: req.params.slug },
      include: {
        author: {
          select: { username: true }
        }
      }
    });

    if (!post) {
      return res.status(404).json({ message: 'Post not found' });
    }

    res.json(post);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Create post (protected)
router.post('/', auth, async (req, res) => {
  try {
    const { title, slug, content, excerpt, featuredImage, category, status } = req.body;

    const post = await prisma.post.create({
      data: {
        title,
        slug,
        content,
        excerpt,
        featuredImage,
        category,
        status,
        authorId: req.user.id,
        publishedAt: status === 'published' ? new Date() : null
      }
    });

    res.status(201).json(post);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Update post (protected)
router.put('/:id', auth, async (req, res) => {
  try {
    const post = await prisma.post.update({
      where: { id: parseInt(req.params.id) },
      data: {
        ...req.body,
        publishedAt: req.body.status === 'published' && !req.body.publishedAt 
          ? new Date() 
          : req.body.publishedAt
      }
    });

    res.json(post);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Delete post (protected)
router.delete('/:id', auth, async (req, res) => {
  try {
    await prisma.post.delete({
      where: { id: parseInt(req.params.id) }
    });

    res.json({ message: 'Post deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

module.exports = router;
