import { createContext } from 'react';
import { DrinksContextType } from '../../types';

const DrinksContext = createContext <DrinksContextType>({
  drinksRecipes: [],
  setDrinksRecipes: () => {},
  drinksCategories: [],
  setDrinksCategories: () => {},
});

export default DrinksContext;
