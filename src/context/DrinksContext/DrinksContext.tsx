import { createContext } from 'react';
import { DrinksContextType } from '../../types';

const DrinksContext = createContext < DrinksContextType | null >({
  drinksRecipes: [],
  setDrinksRecipes: () => {},
});

export default DrinksContext;
