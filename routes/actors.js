const express = require('express');
const router = express.Router();

// Require models
const Movie = require('../models/movie');
const Actor = require('../models/actor');

// NEW - show form to create new actor
router.get('/new', (req, res) => {
  Movie.find({}, (err, movies) => {
    if (err) {
      console.error(err);
      req.flash('error', err.message);
      res.redirect('/movies');
    } else {
      res.render('actors/new', { movies });
    }
  });
});

// CREATE - create a new actor
router.post('/', (req, res) => {
  // Create the new actor
  Actor.create({ name: req.body.actor }, (err, actor) => {
    if (err) {
      console.error(err);
      req.flash('error', err.message);
      res.redirect('actors/new');      
    } else {
      // Find all movies that the actor appears in
      req.body.movies.forEach((movie) => {
        Movie.findOne({ title: movie }, (err, foundMovie) => {
          if (err) {
            console.error(err);
            req.flash('error', err.message);
            res.redirect('actors/new');
          } else {
            foundMovie.actors.push(actor);
            foundMovie.save();
          }
        });
      });
      // Redirect to index
      req.flash('success', "Successfully added a new actor!");
      res.redirect('/movies');
    }
  });
});

module.exports = router;