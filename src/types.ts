export type MealsContextType = {
  mealsRecipes: MealType[] | null;
  setMealsRecipes: (meals: MealType[]) => void;
  mealsCategories: MealsCategories[] | null;
  setMealsCategories: (mealsCategories: MealsCategories[]) => void;
};

export type DrinksContextType = {
  drinksRecipes: DrinkType[] | null;
  setDrinksRecipes: (drinks: DrinkType[]) => void;
  drinksCategories: DrinksCategories[] | null;
  setDrinksCategories: (drinksCategories: DrinksCategories[]) => void;
};

export type MealType = {
  idMeal: string;
  strMeal: string;
  strMealThumb: string;
};

export type DrinkType = {
  idDrink: string;
  strDrink: string;
  strDrinkThumb: string;
};

export type MealsCategories = {
  strCategory: 'Beef' | 'Breakfast' | 'Chicken' | 'Dessert' | 'Goat';
};

export type DrinksCategories = {
  strCategory:
    | 'Ordinary Drink'
    | 'Cocktail'
    | 'Other / Unknown'
    | 'Cocoa'
    | 'Shake';
};
