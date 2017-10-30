const mongoose = require('mongoose');

const movieSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  genres: {
    type: [String],
    required: true
  },
  director: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Director'
  },
  actors: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Actor'
  }],
});

module.exports = mongoose.model('Movie', movieSchema);