import React, { useContext } from 'react';
import DrinksContext from '../context/DrinksContext/DrinksContext';
import MealsContext from '../context/MealsContext/MealsContext';

interface RecipesProps {
  isDrinksPage: boolean;
}

export default function Recipes({ isDrinksPage }: RecipesProps) {
  const { drinksRecipes } = useContext(DrinksContext);
  const twelveDrinks = drinksRecipes?.slice(0, 12);

  const { mealsRecipes } = useContext(MealsContext);
  const twelveMeals = mealsRecipes?.slice(0, 12);

  return (
    <>
      {twelveDrinks && isDrinksPage && (
        <div>
          {twelveDrinks.map(({ strDrinkThumb, strDrink, idDrink }, index: number) => (
            <div
              key={ idDrink }
              data-testid={ `${index}-recipe-card` }
            >
              <p data-testid={ `${index}-card-name` }>{strDrink}</p>
              <img
                data-testid={ `${index}-card-img` }
                src={ strDrinkThumb }
                alt={ strDrink }
              />
            </div>
          ))}
        </div>
      )}

      {twelveMeals && !isDrinksPage && (
        <div>
          {twelveMeals.map(({ strMealThumb, strMeal, idMeal }, index: number) => (
            <div
              key={ idMeal }
              data-testid={ `${index}-recipe-card` }
            >
              <p data-testid={ `${index}-card-name` }>{strMeal}</p>
              <img
                data-testid={ `${index}-card-img` }
                src={ strMealThumb }
                alt={ strMeal }
              />
            </div>
          ))}
        </div>
      )}
    </>
  );
}
