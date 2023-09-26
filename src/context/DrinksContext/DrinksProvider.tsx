import React, { useEffect, useState } from 'react';
import { DrinkType, DrinksCategories } from '../../types';
import DrinksContext from './DrinksContext';
import { fetchDrinks, fetchDrinksCategories } from '../../services/fetchAPI';

type DrinksProviderProps = {
  children: React.ReactNode;
};

function DrinksProvider({ children }: DrinksProviderProps) {
  const [isLoading, setIsLoading] = useState(true);
  const [drinksRecipes, setDrinksRecipes] = useState<DrinkType[] | null>([]);
  const [drinksCategories,
    setDrinksCategories] = useState<DrinksCategories[] | null >([]);

  useEffect(() => {
    fetchDrinks()
      .then((recipes) => {
        setDrinksRecipes(recipes);
        setIsLoading(false);
      })
      .catch((error) => {
        console.error('Erro ao buscar receitas de bebidas:', error);
        setIsLoading(false);
      });
  }, []);

  useEffect(() => {
    const getCategories = async () => {
      const categories = await fetchDrinksCategories();
      setDrinksCategories(categories);
    };

    getCategories();
  }, []);

  const value = {
    drinksRecipes,
    setDrinksRecipes,
    isLoading,
    drinksCategories,
    setDrinksCategories,
  };

  return (
    <DrinksContext.Provider value={ value }>
      { children }
    </DrinksContext.Provider>
  );
}

export default DrinksProvider;
