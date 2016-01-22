const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
mongoose.Promise = global.Promise;
import getDrinkRouter from './routes/drinks';

export default function (collection) {
  collection = collection || 'Drink';
  var router = getDrinkRouter(collection);
  mongoose.connect('mongodb://localhost/drinks');
  var db = mongoose.connection;
  db.on('error', console.error.bind(console, 'connection error:'));

  app.use( bodyParser.json() );
  app.use('/drinks', router);
  app.use(function(req, res) {
    res.send('No such path exists');
  });

  return app;
}
