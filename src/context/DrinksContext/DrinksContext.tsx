import { createContext } from 'react';
import { DrinksContextType } from '../../types';

const DrinksContext = createContext <DrinksContextType>({
  drinksRecipes: [],
  setDrinksRecipes: () => {},
});

export default DrinksContext;
