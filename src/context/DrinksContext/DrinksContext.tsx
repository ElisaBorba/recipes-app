import { createContext } from 'react';
import { DrinksContextType } from '../../types';

const DrinksContext = createContext <DrinksContextType>({
  isLoading: true,
  drinksRecipes: [],
  setDrinksRecipes: () => {},
  drinksCategories: [],
  setDrinksCategories: () => {},
});

export default DrinksContext;
