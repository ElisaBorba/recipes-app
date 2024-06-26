import React, { useEffect, useState } from 'react';
import MealsContext from './MealsContext';
import { MealType, MealsCategories } from '../../types';
import { fetchMeals, fetchMealsCategories } from '../../services/fetchAPI';

type MealsProviderProps = {
  children: React.ReactNode;
};

function MealsProvider({ children }: MealsProviderProps) {
  const [mealsRecipes, setMealsRecipes] = useState<MealType[] | null >([]);
  const [mealsCategories,
    setMealsCategories] = useState<MealsCategories[] | null >([]);

  useEffect(() => {
    fetchMeals()
      .then((recipes) => {
        setMealsRecipes(recipes);
      })
      .catch((error) => {
        console.error('Erro ao buscar planetas:', error);
      });
  }, []);

  useEffect(() => {
    const getCategories = async () => {
      const categories = await fetchMealsCategories();
      setMealsCategories(categories);
    };

    getCategories();
  }, []);

  const value = {
    mealsRecipes,
    setMealsRecipes,
    mealsCategories,
    setMealsCategories,
  };

  return (
    <MealsContext.Provider value={ value }>
      { children }
    </MealsContext.Provider>
  );
}

export default MealsProvider;
