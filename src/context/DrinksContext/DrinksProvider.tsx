import React, { useEffect, useState } from 'react';
import { DrinkType } from '../../types';
import DrinksContext from './DrinksContext';
import { fetchDrinks } from '../../services/fetchAPI';

type DrinksProviderProps = {
  children: React.ReactNode;
};

function DrinksProvider({ children }: DrinksProviderProps) {
  const [drinksRecipes, setDrinksRecipes] = useState<DrinkType[] | null>([]);

  useEffect(() => {
    fetchDrinks()
      .then((recipes) => {
        setDrinksRecipes(recipes);
      })
      .catch((error) => {
        console.error('Erro ao buscar planetas:', error);
      });
  }, []);

  const value = {
    drinksRecipes,
    setDrinksRecipes,
  };

  return (
    <DrinksContext.Provider value={ value }>
      { children }
    </DrinksContext.Provider>
  );
}

export default DrinksProvider;
