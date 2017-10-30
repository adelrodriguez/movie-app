const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const methodOverride = require('method-override');

// Require routes
const indexRoutes = require('./routes/index');
const movieRoutes = require('./routes/movies');
const actorRoutes = require('./routes/actors');
const directorRoutes = require('./routes/directors');

// Use native promises
mongoose.Promise = global.Promise;

// Database setup
const mongoDB = process.env.DATABASE || "mongodb://localhost/movie_app";
mongoose.connect(mongoDB, {
  useMongoClient: true
});

const database = mongoose.connection;
database.on('error', console.error.bind(console, "MongoDB connection error:"));
database.once('open', () => {
  console.log("Connected to the database!");
});

// Use environment port, otherwise use port 3000
const PORT = process.env.PORT || 3000;

// Express setup
const app = express();

app.set('view engine', 'pug');
app.use(bodyParser.urlencoded({ extended: true }));
// Server static files
app.use(express.static('public'));
// Override POST methods for PUT and DELETE requests
app.use(methodOverride('_method'));

// Routes setup
app.use('/', indexRoutes);
app.use('/movies', movieRoutes);
app.use('/actors', actorRoutes);
app.use('/directors', directorRoutes);

app.listen(PORT, () => {
  console.log("Server has started...");
});