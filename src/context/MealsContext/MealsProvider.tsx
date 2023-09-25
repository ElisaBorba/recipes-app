import React, { useEffect, useState } from 'react';
import MealsContext from './MealsContext';
import { MealType } from '../../types';
import { fetchMeals } from '../../services/fetchAPI';

type MealsProviderProps = {
  children: React.ReactNode;
};

function MealsProvider({ children }: MealsProviderProps) {
  const [mealsRecipes, setMealsRecipes] = useState<MealType[] | null >([]);

  useEffect(() => {
    fetchMeals()
      .then((recipes) => {
        setMealsRecipes(recipes);
      })
      .catch((error) => {
        console.error('Erro ao buscar planetas:', error);
      });
  }, []);

  const value = {
    mealsRecipes,
    setMealsRecipes,
  };

  return (
    <MealsContext.Provider value={ value }>
      { children }
    </MealsContext.Provider>
  );
}

export default MealsProvider;
