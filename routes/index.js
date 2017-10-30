const express = require('express');
const router = express.Router();

// Require movie model
const Movie = require('../models/movie');

router.get('/', (req, res) => {
  res.redirect('/movies');
});

router.get('/search', (req, res) => {
  // create a case-insensitive regular expression for search
  let searchTerm = new RegExp(req.query.q, 'i');

  Movie.find({ 'title': searchTerm }).populate('actors director').exec((err, movies) => {
    if (err) {
      console.log(err);
    } else {
      // Render the search results
      // Disable search bar
      res.render('movies/index', { movies, disableSearch: true });
    }
  });
});

module.exports = router;