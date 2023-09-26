import { createContext } from 'react';
import { MealsContextType } from '../../types';

const MealsContext = createContext<MealsContextType>({
  isLoading: true,
  mealsRecipes: [],
  setMealsRecipes: () => {},
  mealsCategories: [],
  setMealsCategories: () => {},
});

export default MealsContext;
