export const fetchMeals = async () => {
  const URL = 'https://www.themealdb.com/api/json/v1/1/search.php?s=';
  const response = await fetch(URL);
  const data = await response.json();
  return data.meals;
};

export const fetchDrinks = async () => {
  const URL = 'https://www.thecocktaildb.com/api/json/v1/1/search.php?s=';
  const response = await fetch(URL);
  const data = await response.json();
  return data.drinks;
};

export const fetchMealsCategories = async () => {
  const URL = 'https://www.themealdb.com/api/json/v1/1/list.php?c=list';
  const response = await fetch(URL);
  const data = await response.json();
  const fiveCategories = data.meals?.slice(0, 5);
  return fiveCategories;
};

export const fetchDrinksCategories = async () => {
  const URL = 'https://www.thecocktaildb.com/api/json/v1/1/list.php?c=list';
  const response = await fetch(URL);
  const data = await response.json();
  const fiveCategories = data.drinks?.slice(0, 5);
  return fiveCategories;
};

export const fetchFilterMeals = async (url: string) => {
  const URL = `https://www.themealdb.com/api/json/v1/1/filter.php?c=${url}`;
  const response = await fetch(URL);
  const data = await response.json();
  const twelveCategories = data.meals?.slice(0, 12);
  console.log('FILTER MEALS', twelveCategories);
  return twelveCategories;
};

export const fetchFilterDrinks = async (url: string) => {
  const URL = `https://www.thecocktaildb.com/api/json/v1/1/filter.php?c=${url}`;
  const response = await fetch(URL);
  const data = await response.json();
  const twelveCategories = data.drinks?.slice(0, 12);
  console.log('DRINKS MEALS', twelveCategories);
  return twelveCategories;
};
