const mongoose = require('mongoose');

const rankingSchema = new mongoose.Schema({
  position: {
    type: Number,
    required: true,
    unique: true
  },
  riderName: {
    type: String,
    required: true
  },
  riderNumber: {
    type: Number,
    required: true
  },
  team: {
    type: String,
    required: true
  },
  points: {
    type: Number,
    required: true,
    default: 0
  },
  wins: {
    type: Number,
    default: 0
  },
  podiums: {
    type: Number,
    default: 0
  },
  season: {
    type: Number,
    required: true,
    default: 2024
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Ranking', rankingSchema);
