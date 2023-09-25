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
    const getFetchApi = async () => {
      try {
        const dataDrinks = await fetchDrinks();
        setDrinksRecipes(dataDrinks);
      } catch (error) {
        console.error('Erro ao buscar planetas:', error);
      }
    };

    getFetchApi();
  }, []);

  return (
    <DrinksContext.Provider value={ drinksRecipes }>
      { children }
    </DrinksContext.Provider>
  );
}

export default DrinksProvider;
