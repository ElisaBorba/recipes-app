export const fetchMeals = async () => {
  const URL = 'https://www.themealdb.com/api/json/v1/1/search.php?s=';
  const response = await fetch(URL);
  const data = await response.json();
  // console.log('data.meals', data.meals);
  return data.meals;
};

export const fetchDrinks = async () => {
  const URL = 'https://www.thecocktaildb.com/api/json/v1/1/search.php?s=';
  const response = await fetch(URL);
  const data = await response.json();
  // console.log('data', data.drinks);
  return data.drinks;
};
