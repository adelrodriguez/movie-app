const mongoose = require('mongoose');

const directorSchema = mongoose.Schema({
  name: {
    type: String,
    required: true
  }
});

module.exports = mongoose.model('Director', directorSchema);