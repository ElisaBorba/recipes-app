import { createContext } from 'react';
import { MealsContextType } from '../../types';

const MealsContext = createContext<MealsContextType>({
  mealsRecipes: [],
  setMealsRecipes: () => {},
});

export default MealsContext;
