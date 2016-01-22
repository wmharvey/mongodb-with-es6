const mongoose = require('mongoose');
const Schema = mongoose.Schema;

export var drinkSchema = new Schema({
    type: {
      type: String,
      required: true
    },
    name: {
      type: String,
      required: true
    },
    ingredients: {
      type: [String],
      required: true
    },
    price: {
      type: Number,
      required: true
    }
  });

export function getDrinkModel (collection) {
  return mongoose.model(collection, drinkSchema);
}
