import { useContext, useEffect, useState } from 'react';
import DrinksContext from '../context/DrinksContext/DrinksContext';
import MealsContext from '../context/MealsContext/MealsContext';
import { fetchFilterMeals, fetchFilterDrinks } from '../services/fetchAPI';
import { MealType, DrinkType, DrinksCategories, MealsCategories } from '../types';
import RecipeListMeals from './RecipeListMeals';
import RecipeListDrinks from './RecipeListDrinks';
import DataContext from '../context/datacontext';
import styles from './Recipes.module.css';
import allDrinkIcon from '../images/drinkall.png';
import cocktailIcon from '../images/cocktail.png';
import shakeIcon from '../images/shake.png';
import ordinaryIcon from '../images/ordinarydrink.png';
import cocoaIcon from '../images/cocoa.png';
import otherUnknowIcon from '../images/other.png';
import allMealsIcon from '../images/mealall.png';
import chickenIcon from '../images/chicken.png';
import breakfastIcon from '../images/breakfast.png';
import dessertIcon from '../images/dessert.png';
import goatIcon from '../images/goat.png';
import beefIcon from '../images/beef.png';

export default function Recipes({ isDrinksPage }: { isDrinksPage: boolean }) {
  const { drinksRecipes, drinksCategories } = useContext(DrinksContext);
  const { mealsRecipes, mealsCategories } = useContext(MealsContext);
  const [filteredMeals, setFilteredMeals] = useState<MealType[] | undefined>([]);
  const [selectedMealCategory,
    setSelectedMealCategory] = useState<MealsCategories | null>(null);
  const [filteredDrinks, setFilteredDrinks] = useState<DrinkType[] | undefined>([]);
  const [selectedDrinkCategory,
    setSelectedDrinkCategory] = useState<DrinksCategories | null>(null);
  const [filterActive, setFilterActive] = useState(false);

  const infoData = useContext(DataContext);

  const twelveDrinks = drinksRecipes?.slice(0, 12);
  const twelveMeals = mealsRecipes?.slice(0, 12);

  const mealsToShow : MealType[] | undefined = selectedMealCategory
    ? filteredMeals
    : twelveMeals;

  const drinksToShow : DrinkType[] | undefined = selectedDrinkCategory
    ? filteredDrinks
    : twelveDrinks;

  const mapCategoryToIconKey = (category: string) => {
    if (category === 'Ordinary Drink') {
      return 'OrdinaryDrink';
    } if (category === 'Other / Unknown') {
      return 'OtherUnknown';
    }

    return category;
  };

  const iconMap = {
    OrdinaryDrink: ordinaryIcon,
    Cocktail: cocktailIcon,
    Shake: shakeIcon,
    OtherUnknown: otherUnknowIcon,
    Cocoa: cocoaIcon,
  };

  const iconMealMap = {
    Beef: beefIcon,
    Breakfast: breakfastIcon,
    Chicken: chickenIcon,
    Dessert: dessertIcon,
    Goat: goatIcon,
  };

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

  return (
    <>
      {twelveDrinks && isDrinksPage && (
        <div>
          {drinksCategories && (
            <div className={ styles.buttons }>
              <button
                data-testid="All-category-filter"
                onClick={ handleFilterAll }
              >
                <img
                  src={ allDrinkIcon }
                  alt="All Icon"
                />
                All
              </button>
              {drinksCategories.map((category, index) => (
                <button
                  key={ index }
                  data-testid={ `${category.strCategory}-category-filter` }
                  onClick={ () => handleDrinksFilter(category) }
                >
                  <img
                    src={ iconMap[mapCategoryToIconKey(category
                      .strCategory) as keyof typeof iconMap] }
                    alt={ `${category.strCategory}Icon` }
                  />
                  {category.strCategory}
                </button>
              ))}
            </div>
          )}
          {infoData.results.length > 0 ? (
            <RecipeListDrinks recipes={ infoData.results.slice(0, 12) } />
          ) : <RecipeListDrinks recipes={ drinksToShow } />}
        </div>
      )}

      {twelveMeals && !isDrinksPage && (
        <div>
          {mealsCategories && (
            <div className={ styles.buttons }>
              <button
                data-testid="All-category-filter"
                onClick={ handleFilterAll }
              >
                <img
                  src={ allMealsIcon }
                  alt="All Icon"
                />
                All
              </button>
              {mealsCategories.map((category, index) => (
                <button
                  key={ index }
                  data-testid={ `${category.strCategory}-category-filter` }
                  onClick={ () => handleMealsFilter(category) }
                >
                  <img
                    src={ iconMealMap[category.strCategory] }
                    alt={ `${category.strCategory}Icon` }
                  />
                  {category.strCategory}
                </button>
              ))}
            </div>
          )}
          {infoData.results.length > 0 ? (
            <RecipeListMeals recipes={ infoData.results.slice(0, 12) } />
          ) : <RecipeListMeals recipes={ mealsToShow } />}
        </div>
      )}
    </>
  );
}
