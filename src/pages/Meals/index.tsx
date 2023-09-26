import React, { useContext } from 'react';
import Header from '../../components/Header';
import Recipes from '../../components/Recipes';
import MealsContext from '../../context/MealsContext/MealsContext';

export default function Meals() {
  const { mealsCategories } = useContext(MealsContext);
  return (
    <>
      <header>
        <Header title="Meals" isProfile isSearch />
      </header>
      <main>
        {mealsCategories && (
          <div>
            {mealsCategories.map(({ strCategory }, index) => (
              <button
                key={ index }
                data-testid={ `${strCategory}-category-filter` }
              >
                {strCategory}
              </button>
            ))}
          </div>
        )}
        <Recipes isDrinksPage={ false } />
      </main>
    </>
  );
}
