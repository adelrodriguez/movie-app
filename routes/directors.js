const express = require('express');
const router = express.Router();

// Require models
const Movie = require('../models/movie');
const Director = require('../models/director');

// NEW - show form to create new director
router.get('/new', (req, res) => {
  Movie.find({ director: null }, (err, movies) => {
    if (err) {
      console.log(err);
    } else {
      res.render('directors/new', { movies });
    }
  });
});

// CREATE - create a new director
router.post('/', (req, res) => {
  // Create the new director
  Director.create({ name: req.body.director }, (err, director) => {
    if (err) {
      console.log(err);
    } else {
      // Find all movies directed
      req.body.movies.forEach((movie) => {
        Movie.findOne({ title: movie }, (err, foundMovie) => {
          if (err) {
            console.log(err);
          } else {
            foundMovie.director = director;
            foundMovie.save();
          }
        });
      });
      // Redirect to index
      res.redirect('/movies');
    }
  });
});

module.exports = router;