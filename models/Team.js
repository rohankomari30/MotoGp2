const mongoose = require('mongoose');

const teamSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true
  },
  manufacturer: {
    type: String,
    required: true
  },
  country: {
    type: String,
    required: true
  },
  teamPrincipal: {
    type: String,
    required: true
  },
  founded: {
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
  logo: {
    type: String,
    default: ''
  },
  description: {
    type: String,
    default: ''
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Team', teamSchema);
