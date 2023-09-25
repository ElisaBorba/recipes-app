import { createContext } from 'react';

const MealsContext = createContext<any>({
  mealsRecipes: [],
  setMealsRecipes: () => {},
});

export default MealsContext;
