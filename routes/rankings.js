const express = require('express');
const router = express.Router();
const Ranking = require('../models/Ranking');

// Get all rankings
router.get('/', async (req, res) => {
  try {
    const rankings = await Ranking.find().sort({ position: 1 });
    res.json(rankings);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Get single ranking
router.get('/:id', async (req, res) => {
  try {
    const ranking = await Ranking.findById(req.params.id);
    if (!ranking) {
      return res.status(404).json({ message: 'Ranking not found' });
    }
    res.json(ranking);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Create ranking
router.post('/', async (req, res) => {
  const ranking = new Ranking({
    position: req.body.position,
    riderName: req.body.riderName,
    riderNumber: req.body.riderNumber,
    team: req.body.team,
    points: req.body.points,
    wins: req.body.wins,
    podiums: req.body.podiums,
    season: req.body.season
  });

  try {
    const newRanking = await ranking.save();
    res.status(201).json(newRanking);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Update ranking
router.put('/:id', async (req, res) => {
  try {
    const ranking = await Ranking.findById(req.params.id);
    if (!ranking) {
      return res.status(404).json({ message: 'Ranking not found' });
    }

    Object.keys(req.body).forEach(key => {
      ranking[key] = req.body[key];
    });

    const updatedRanking = await ranking.save();
    res.json(updatedRanking);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Delete ranking
router.delete('/:id', async (req, res) => {
  try {
    const ranking = await Ranking.findById(req.params.id);
    if (!ranking) {
      return res.status(404).json({ message: 'Ranking not found' });
    }
    await ranking.deleteOne();
    res.json({ message: 'Ranking deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
