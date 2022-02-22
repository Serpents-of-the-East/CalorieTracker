import realm from "./realm";

/**
 * Gets today's info. Creates the day object if it didn't exist, using yesterday's goal (if that exists)
 * @returns Today's current food, weight, and the current day (goal and date)
 */
const getToday = () => {
  let today = new Date();
  today.setHours(0, 0, 0, 0);

  let result = {}

  result.food = realm.objects('Food').filtered("date = $0", today);
  result.weight = realm.objects('Weight').filtered("date = $0", today);
  result.day = realm.objects('Day').filtered("date = $0", today);

  if (!result.day.length){
    let yesterdayDate = new Date();
    yesterdayDate.setDate(today.getDate() - 1)

    const yesterday = realm.objects('Day').filtered("date = $0", yesterdayDate);
    realm.write(() => {
      const day = realm.create('Day', {
        date: today,
        goal: yesterday.length ? yesterday[0].goal : 2000,
      })
      result.day = day
    })
  }
  else{
    result.day = result.day[0]
  }

  return result;
}

/**
 * Returns an object with the given date's data (results may be null, you should check for that before blindly using)
 * @param {*} _date Date to get info for
 * @returns Object
 */
const getAllByDate = (_date) => {
  _date.setHours(0, 0, 0, 0);

  const result = {}

  const food = realm.objects('Food').filtered("date = $0", _date);
  const weight = realm.objects('Weight').filtered("date = $0", _date);
  const day = realm.objects('Day').filtered("date = $0", _date);

  
  result.food = food.length ? food[0] : {};
  result.weight = weight.length ? weight[0] : {};
  result.day = day.length ? day[0] : {};

  return result;
}

/**
 * Adds a food item for a given date
 */
const addFood = (_name, _calories, _category) => {
  let today = new Date().setHours(0, 0, 0, 0);

  realm.write(() => {
    const addedFood = realm.create('Food', {
      date: today,
      name: _name,
      calories: _calories,
      category: _category,
    })
  })
}

/**
 * Modifies the current date's goal
 */
const changeToday = (_goal) => {
  let today = new Date();
  today.setHours(0, 0, 0, 0);
  let result = realm.objects('Day').filtered("date = $0", today);
  if (!result.length){
    let yesterdayDate = new Date();
    yesterdayDate.setDate(today.getDate() - 1)
    const yesterday = realm.objects('Day').filtered("date = $0", yesterdayDate);
    realm.write(() => {
      const day = realm.create('Day', {
        date: today,
        goal: yesterday.length ? yesterday[0].goal : 2000,
      })
      result = day;
    })
  }
  else{
    result = result[0];
  }

  realm.write(() => {
    result.goal = _goal;
  })
}

/**
 * Return the given date's goal status in the following form:
 * 
 * {status: 'dateStatus'}
 * 
 * dateStatus can be 1 of 3 things
 *  'none', (no data for the given day)
 *  'over',
 *  'under',
 * 
 * @param {*} _date The date which you are looking for
 */
const getStatusByDate = (_date) => {
  _date.setHours(0, 0, 0, 0);
  const dayFood = realm.objects('Food').filtered('date = $0', _date);
  const dayInfo = realm.objects('Day').filtered('date = $0', _date);

  // No info for current day
  if (!dayFood.length || !dayInfo.length){
    return {status: 'none'}
  }

  let totalCalories = 0;
  for (let food of dayFood){
    totalCalories += food.calories;
  }

  if (totalCalories > dayInfo[0].goal){
    return {status: 'over'};
  }

  return {status: 'under'};
}

export {
  getToday,
  getStatusByDate,
  getAllByDate,
  changeToday,
  addFood,
}