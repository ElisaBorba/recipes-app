import { useContext, useEffect, useState } from 'react';
import DrinksContext from '../context/DrinksContext/DrinksContext';
import MealsContext from '../context/MealsContext/MealsContext';
import { fetchFilterMeals, fetchFilterDrinks } from '../services/fetchAPI';
import { MealType, DrinkType } from '../types';

export default function Recipes({ isDrinksPage }: { isDrinksPage: boolean }) {
  const { drinksRecipes, drinksCategories, isLoading } = useContext(DrinksContext);
  const { mealsRecipes, mealsCategories } = useContext(MealsContext);
  const [filteredMeals, setFilteredMeals] = useState<MealType[] | undefined>([]);
  const [selectedMealCategory, setSelectedMealCategory] = useState(null);
  const [filteredDrinks, setFilteredDrinks] = useState<DrinkType[] | undefined>([]);
  const [selectedDrinkCategory, setSelectedDrinkCategory] = useState(null);

  const twelveDrinks = drinksRecipes?.slice(0, 12);
  const twelveMeals = mealsRecipes?.slice(0, 12);

  const mealsToShow : MealType[] | undefined = selectedMealCategory
    ? filteredMeals
    : twelveMeals;

  const drinksToShow : DrinkType[] | undefined = selectedDrinkCategory
    ? filteredDrinks
    : twelveDrinks;

  useEffect(() => {
    if (selectedMealCategory) {
      fetchFilterMeals(selectedMealCategory)
        .then((filteredMealsData) => {
          setFilteredMeals(filteredMealsData);
        })
        .catch((error) => {
          console.error('Erro ao buscar receitas filtradas:', error);
        });
    }
  }, [selectedMealCategory]);

  useEffect(() => {
    if (selectedDrinkCategory) {
      fetchFilterDrinks(selectedDrinkCategory)
        .then((filteredDrinksData) => {
          setFilteredDrinks(filteredDrinksData);
        })
        .catch((error) => {
          console.error('Erro ao buscar receitas filtradas:', error);
        });
    }
  }, [selectedDrinkCategory]);

  const handleFilterFetch = (strCategory:any, isDrinksCategory: boolean) => {
    if (isDrinksCategory) {
      setSelectedDrinkCategory(strCategory);
    } else {
      setSelectedMealCategory(strCategory);
    }
  };

  const handleFilterAll = () => {
    setFilteredMeals(twelveMeals);
    setFilteredDrinks(twelveDrinks);
  };

  if (isLoading) {
    return <p>Carregando...</p>;
  }

  return (
    <>
      {twelveDrinks && isDrinksPage && (
        <div>
          {drinksCategories && (
            <div>
              <button
                data-testid="All-category-filter"
                onClick={ handleFilterAll }
              >
                All
              </button>
              {drinksCategories.map(({ strCategory }, index) => (
                <button
                  key={ index }
                  data-testid={ `${strCategory}-category-filter` }
                  onClick={ () => handleFilterFetch(strCategory, true) }
                >
                  {strCategory}
                </button>
              ))}
            </div>
          )}
          {drinksToShow?.map(({ strDrinkThumb, strDrink, idDrink }, index: number) => (
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
                  onClick={ () => handleFilterFetch(strCategory, false) }
                >
                  {strCategory}
                </button>
              ))}
            </div>
          )}
          {mealsToShow?.map(({ strMealThumb, strMeal, idMeal }, index: number) => (
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
