import React, { useEffect, useState } from 'react';
import MealsContext from './MealsContext';
import { fetchMeals } from '../../services/fetchAPI';

type MealsProviderProps = {
  children: React.ReactNode;
};

function MealsProvider({ children }: MealsProviderProps) {
  const [mealsRecipes, setDrinksRecipes] = useState<any[]>([]);

  useEffect(() => {
    const getFetchApi = async () => {
      const dataMeals = await fetchMeals();
      setDrinksRecipes(dataMeals);
    };

    getFetchApi();
  }, []);

  return (
    <MealsContext.Provider value={ mealsRecipes }>
      { children }
    </MealsContext.Provider>
  );
}

export default MealsProvider;
