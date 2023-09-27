import { useContext, useEffect, useState } from 'react';
import DrinksContext from '../context/DrinksContext/DrinksContext';
import MealsContext from '../context/MealsContext/MealsContext';
import { fetchFilterMeals, fetchFilterDrinks } from '../services/fetchAPI';
import { MealType, DrinkType, DrinksCategories, MealsCategories } from '../types';

export default function Recipes({ isDrinksPage }: { isDrinksPage: boolean }) {
  const { drinksRecipes, drinksCategories, isLoading } = useContext(DrinksContext);
  const { mealsRecipes, mealsCategories } = useContext(MealsContext);
  const [filteredMeals, setFilteredMeals] = useState<MealType[] | undefined>([]);
  const [selectedMealCategory,
    setSelectedMealCategory] = useState<MealsCategories | null>(null);
  const [filteredDrinks, setFilteredDrinks] = useState<DrinkType[] | undefined>([]);
  const [selectedDrinkCategory,
    setSelectedDrinkCategory] = useState<DrinksCategories | null>(null);
  const [filterActive, setFilterActive] = useState(false);

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
      fetchFilterMeals(selectedMealCategory.strCategory)
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
      fetchFilterDrinks(selectedDrinkCategory.strCategory)
        .then((filteredDrinksData) => {
          setFilteredDrinks(filteredDrinksData);
        })
        .catch((error) => {
          console.error('Erro ao buscar receitas filtradas:', error);
        });
    }
  }, [selectedDrinkCategory]);

  const handleMealsFilter = (strCategory: MealsCategories) => {
    if (selectedMealCategory?.strCategory === strCategory.strCategory && filterActive) {
      setSelectedMealCategory(null);
      setFilterActive(false);
    } else {
      setSelectedMealCategory(strCategory);
      setFilterActive(true);
    }
  };

  const handleDrinksFilter = (strCategory: DrinksCategories) => {
    if (selectedDrinkCategory?.strCategory === strCategory.strCategory && filterActive) {
      setSelectedDrinkCategory(null);
      setFilterActive(false);
    } else {
      setSelectedDrinkCategory(strCategory);
      setFilterActive(true);
    }
  };
  const handleFilterAll = () => {
    setSelectedMealCategory(null);
    setSelectedDrinkCategory(null);
    setFilterActive(false);
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
              {drinksCategories.map((category, index) => (
                <button
                  key={ index }
                  data-testid={ `${category.strCategory}-category-filter` }
                  onClick={ () => handleDrinksFilter(category) }
                >
                  {category.strCategory}
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
              {mealsCategories.map((category, index) => (
                <button
                  key={ index }
                  data-testid={ `${category.strCategory}-category-filter` }
                  onClick={ () => handleMealsFilter(category) }
                >
                  {category.strCategory}
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
