const express = require('express');
const router = express.Router();
const Rider = require('../models/Rider');

// Get all riders
router.get('/', async (req, res) => {
  try {
    const riders = await Rider.find().sort({ number: 1 });
    res.json(riders);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Get single rider
router.get('/:id', async (req, res) => {
  try {
    const rider = await Rider.findById(req.params.id);
    if (!rider) {
      return res.status(404).json({ message: 'Rider not found' });
    }
    res.json(rider);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Create rider
router.post('/', async (req, res) => {
  const rider = new Rider({
    name: req.body.name,
    number: req.body.number,
    nationality: req.body.nationality,
    team: req.body.team,
    bike: req.body.bike,
    age: req.body.age,
    championships: req.body.championships,
    wins: req.body.wins,
    podiums: req.body.podiums,
    image: req.body.image,
    bio: req.body.bio
  });

  try {
    const newRider = await rider.save();
    res.status(201).json(newRider);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Update rider
router.put('/:id', async (req, res) => {
  try {
    const rider = await Rider.findById(req.params.id);
    if (!rider) {
      return res.status(404).json({ message: 'Rider not found' });
    }

    Object.keys(req.body).forEach(key => {
      rider[key] = req.body[key];
    });

    const updatedRider = await rider.save();
    res.json(updatedRider);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Delete rider
router.delete('/:id', async (req, res) => {
  try {
    const rider = await Rider.findById(req.params.id);
    if (!rider) {
      return res.status(404).json({ message: 'Rider not found' });
    }
    await rider.deleteOne();
    res.json({ message: 'Rider deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
