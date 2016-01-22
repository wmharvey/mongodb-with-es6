import { Coffee, Smoothie } from '../Classes/drink';
import { getDrinkModel } from '../models/drink';
var router = require('express').Router();

export default function (collection='Drink') {
  // collection = collection || 'Drink';
  var Drink = getDrinkModel(collection);

  router.get( '/', (req, res) => {
    //get all drinks
    Drink.find({})
      .then( drink => res.send(`All drinks: ${drink}`), err => res.send(`Error Occured ${err}`) );
  });

  router.post( '/', (req, res) => {
    //create new drink
    req.body.collection = collection;
    var myDrink;
    if (req.body.type === 'coffee') {
      myDrink = new Coffee(req.body);
    }
    if (req.body.type === 'smoothie') {
      myDrink = new Smoothie (req.body);
    }
    myDrink.addToDb()
      .then( drink => res.send(`New drink added: ${drink}`), err => res.send(`Error Occured ${err}`) );
  });

  router.get( '/:id', (req, res) => {
    //get a drink
    Drink.find( {_id: req.params.id} ).exec()
      .then( drink => res.send(`Drink selected: ${drink}`), err => res.send(`Error Occured ${err}`) );
  });

  router.put( '/:id', (req, res) => {
    //update whole drink
    var updatedDrink = {
      type: req.body.type,
      name: req.body.name,
      ingredients: req.body.ingredients,
      price: req.body.price
    };
    if (req.body.type === 'coffee') {
      updatedDrink.caffeine = req.body.caffeine;
    } else {
      updatedDrink.calories = req.body.calories;
    }
    Drink.findOneAndUpdate( {_id: req.params.id}, updatedDrink, {new: true, runValidators: true} )
    .then( drink => res.send(`Drink modified: ${drink}`), err => res.send(`Error Occured ${err}`) );
  });

  router.delete( '/:id', (req, res) => {
    //delete a drink
    Drink.remove( {_id: req.params.id} )
    .then( drink => res.send(`Drink removed`), err => res.send(`Error Occured ${err}`) );
  });

  router.patch( '/:id', (req, res) => {
    //update certain fields
    Drink.findOneAndUpdate( {_id: req.params.id}, req.body, {new: true, runValidators: true})
    .then( drink => res.send(`Drink modified: ${drink}`), err => res.send(`Error Occured ${err}`) );
  });

  return router;
}
