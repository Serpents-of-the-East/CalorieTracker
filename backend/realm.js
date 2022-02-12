import Realm from 'realm';

class FoodSchema extends Realm.Object {}
FoodSchema.schema = {
  name: 'Food',
  properties: {
    name: 'string',
    date: 'date',
    calories: 'float',
    category: 'string'
  }
}

class WeightSchema extends Realm.Object {}
WeightSchema.schema = {
  name: 'Weight',
  properties: {
    count: 'float',
    units: 'string',
    date: 'date'
  }
}

class DaySchema extends Realm.Object {}
DaySchema.schema = {
  name: 'Day',
  properties: {
    date: 'date',
    goal: 'float',
  }
}

let realm = new Realm({schema: [FoodSchema, WeightSchema, DaySchema], schemaVersion: 1})

export default realm;
