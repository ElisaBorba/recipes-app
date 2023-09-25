import React, { useContext } from 'react';
import DrinksContext from '../context/DrinksContext/DrinksContext';
import MealsContext from '../context/MealsContext/MealsContext';

export default function Recipes() {
  const { drinksRecipes } = useContext(DrinksContext);
  console.log('drinksRecipes', drinksRecipes);

  const { mealsRecipes } = useContext(MealsContext);
  console.log('mealsRecipes', mealsRecipes);

  return (
    <div>
      <h1>Recipes</h1>
    </div>
  );
}
