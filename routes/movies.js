const express = require('express');
const router = express.Router();

// Require movie model
const Movie = require('../models/movie');
const Actor = require('../models/actor');
const Director = require('../models/director');

// INDEX - show all movies
router.get('/', (req, res) => {
  // find all the movies in the database
  Movie.find({}).populate('actors director').exec((err, movies) => {
    if (err) {
      console.error(err);
      req.flash('error', err.message);
      res.redirect('/movies');
    } else {
      // find all the actors in the database
      Actor.find({}, (err, actors) => {
        if (err) {
          console.error(err);
          req.flash('error', err.message);
          res.redirect('/movies');
        } else {
          // find all the directors in the database
          Director.find({}, (err, directors) => {
            if (err) {
              console.error(err);
              req.flash('error', err.message);
              res.redirect('/movies');
            } else {
              // Render index page
              res.render('movies/index', { movies, actors, directors });
            }
          });
        }
      });
    }
  });
});

// NEW - show form to add a new movie
router.get('/new', (req, res) => {
  // find all the actors in the database
  Actor.find({}, (err, actors) => {
    if (err) {
      console.error(err);
      req.flash('error', err.message);
      res.redirect('/movies');
    } else {
      // find all the directors in the database
      Director.find({}, (err, directors) => {
        if (err) {
          console.error(err);
          req.flash('error', err.message);
          res.redirect('/movies');
        } else {
          // Render new movie form
          res.render('movies/new', { title: "Add a new movie", actors, directors });
        }
      });
    }
  });
});

// CREATE - add a new movie
router.post('/', (req, res) => {
  // Create new movie in the database
  Movie.create(req.body.movie, (err, createdMovie) => {
    if (err) {
      console.error(err);
      req.flash('error', err.message);
      res.redirect('movies/new');
    } else {
      // Redirect to the movies index
      req.flash('success', "Successfully added a new movie!");
      res.redirect('/movies');
    }
  });
});

// EDIT - shows edit form for movie
router.get('/:id/edit', (req, res) => {
  Movie.findById(req.params.id, (err, movie) => {
    if (err) {
      console.error(err);
      req.flash('error', err.message);
      res.redirect('/movies');
    } else {
      res.render('movies/edit', { title: "Edit movie", movie });
    }
  });
});

// UPDATE - updates movie
router.put('/:id', (req, res) => {
  Movie.findByIdAndUpdate(req.params.id, req.body.movie, (err, updatedMovie) => {
    if (err) {
      console.error(err);
      req.flash('error', err.message);
      res.redirect('movies/new');
    } else {
      // Redirect to the updated index of movies
      req.flash('success', "Succesfully updated movie!");
      res.redirect('/movies');
    }
  });
});

// DESTROY - deletes movie from the database
router.delete('/:id', (req, res) => {
  Movie.findByIdAndRemove(req.params.id, (err) => {
    if (err) {
      console.error(err);
      req.flash('error', err.message);
      res.redirect('/movies');
    } else {
      req.flash('success', "Succesfully deleted movie!");
      res.redirect('/movies');
    }
  });
});

module.exports = router;