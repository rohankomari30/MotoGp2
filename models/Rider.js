const mongoose = require('mongoose');

const riderSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  number: {
    type: Number,
    required: true,
    unique: true
  },
  nationality: {
    type: String,
    required: true
  },
  team: {
    type: String,
    required: true
  },
  bike: {
    type: String,
    required: true
  },
  age: {
    type: Number,
    required: true
  },
  championships: {
    type: Number,
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
  image: {
    type: String,
    default: ''
  },
  bio: {
    type: String,
    default: ''
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Rider', riderSchema);
