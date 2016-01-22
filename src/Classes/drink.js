const mongoose = require('mongoose');
const Schema = mongoose.Schema;
import { drinkSchema } from '../models/drink';

class Drink {
  constructor (options) {
    this.type = options.type;
    this.name = options.name;
    this.ingredients = options.ingredients;
    this.price = options.price;
    this.collection = options.collection;
    this.schema = drinkSchema;
  }
  createModel () {
    this.model = mongoose.model(this.collection, this.schema);
  }
  addToDb () {
    return new this.model(this).save();
  }
}

export class Coffee extends Drink {
  constructor (options) {
    super(options);
    this.caffeine = options.caffeine;
    this.schema.add({ caffeine: 'number' });
    this.createModel();
  }
}

export class Smoothie extends Drink {
  constructor(options) {
    super(options);
    this.calories = options.calories;
    this.schema.add({ calories: 'number' });
    this.createModel();
  }
}
