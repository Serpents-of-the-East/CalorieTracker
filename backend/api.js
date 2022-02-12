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
    const yesterday = realm.objects('Day').filtered("date = $0", new Date().setDate(today.getDate() - 1));
    realm.write(() => {
      const day = realm.create('Day', {
        date: today,
        goal: yesterday.length ? yesterday[0].goal : 2000,
      })
      result.day = [day]
    })
  }

  return result;
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

  if (totalCalories > dayInfo.goal){
    return {status: 'over'};
  }

  return {status: 'under'};
}

export { getToday, getStatusByDate }