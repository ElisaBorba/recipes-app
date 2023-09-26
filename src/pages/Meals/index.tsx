import React, { useContext, useEffect, useState } from 'react';
import Header from '../../components/Header';
import Recipes from '../../components/Recipes';
import MealsContext from '../../context/MealsContext/MealsContext';
import { fetchFilterMeals } from '../../services/fetchAPI';

export default function Meals() {
  const { mealsCategories } = useContext(MealsContext);
  const [filteredMeals, setFilteredMeals] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);

  useEffect(() => {
    if (selectedCategory) {
      fetchFilterMeals(selectedCategory)
        .then((filteredMealsData) => {
          setFilteredMeals(filteredMealsData);
        })
        .catch((error) => {
          console.error('Erro ao buscar receitas filtradas:', error);
        });
    }
  }, [selectedCategory]);

  const handleFilterFetch = (strCategory:any) => {
    setSelectedCategory(strCategory);
  };

  const handleFilterAll = () => {
  };

  return (
    <>
      <header>
        <Header title="Meals" isProfile isSearch />
      </header>
      <main>
        {mealsCategories && (
          <div>
            <button
              data-testid="All-category-filter"
              onClick={ handleFilterAll }
            >
              All
            </button>
            {mealsCategories.map(({ strCategory }, index) => (
              <button
                key={ index }
                data-testid={ `${strCategory}-category-filter` }
                onClick={ () => handleFilterFetch(strCategory) }
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
