const express = require('express');
const router = express.Router();
const Sponsor = require('../models/Sponsor');

// Get all sponsors
router.get('/', async (req, res) => {
  try {
    const sponsors = await Sponsor.find().sort({ name: 1 });
    res.json(sponsors);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Get single sponsor
router.get('/:id', async (req, res) => {
  try {
    const sponsor = await Sponsor.findById(req.params.id);
    if (!sponsor) {
      return res.status(404).json({ message: 'Sponsor not found' });
    }
    res.json(sponsor);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Create sponsor
router.post('/', async (req, res) => {
  const sponsor = new Sponsor({
    name: req.body.name,
    logo: req.body.logo,
    website: req.body.website,
    category: req.body.category,
    description: req.body.description
  });

  try {
    const newSponsor = await sponsor.save();
    res.status(201).json(newSponsor);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Update sponsor
router.put('/:id', async (req, res) => {
  try {
    const sponsor = await Sponsor.findById(req.params.id);
    if (!sponsor) {
      return res.status(404).json({ message: 'Sponsor not found' });
    }

    Object.keys(req.body).forEach(key => {
      sponsor[key] = req.body[key];
    });

    const updatedSponsor = await sponsor.save();
    res.json(updatedSponsor);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Delete sponsor
router.delete('/:id', async (req, res) => {
  try {
    const sponsor = await Sponsor.findById(req.params.id);
    if (!sponsor) {
      return res.status(404).json({ message: 'Sponsor not found' });
    }
    await sponsor.deleteOne();
    res.json({ message: 'Sponsor deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
