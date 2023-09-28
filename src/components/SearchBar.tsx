import { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import DataContext from '../context/datacontext';

function SearchBar({ title }: { title: string }) {
  const [searchType, setSearchType] = useState('ingredient');
  const infoData = useContext(DataContext);
  const firstLetter = 'first-letter';
  const navigate = useNavigate();
  const alert = "Sorry, we haven't found any recipes for these filters.";

  const handleSearch = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    event.preventDefault();
    if (searchType === firstLetter && infoData.search.length !== 1) {
      window.alert('Your search must have only 1 (one) character');
    } else if (title === 'Meals') {
      performSearchMeals();
    } else {
      performSearchDrinks();
    }
  };

  const performSearchMeals = async () => {
    let endpoint = '';

    if (searchType === 'ingredient') {
      endpoint = `https://www.themealdb.com/api/json/v1/1/filter.php?i=${infoData.search}`;
    } else if (searchType === 'name') {
      endpoint = `https://www.themealdb.com/api/json/v1/1/search.php?s=${infoData.search}`;
    } else if (searchType === firstLetter) {
      endpoint = `https://www.themealdb.com/api/json/v1/1/search.php?f=${infoData.search}`;
    }

    try {
      const response = await fetch(endpoint);
      const data = await response.json();
      if (data.meals === null) {
        window.alert(alert);
      }
      if (data.meals.length === 1) {
      // Se apenas uma comida for encontrada, redirecione para a página de detalhes.
        navigate(`/meals/${data.meals[0].idMeal}`);
      } else {
        infoData.setResults(data.meals);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const performSearchDrinks = async () => {
    let endpoint = '';

    if (searchType === 'ingredient') {
      endpoint = `https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=${infoData.search}`;
    } else if (searchType === 'name') {
      endpoint = `https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${infoData.search}`;
    } else if (searchType === firstLetter) {
      endpoint = `https://www.thecocktaildb.com/api/json/v1/1/search.php?f=${infoData.search}`;
    }

    try {
      const response = await fetch(endpoint);
      const data = await response.json();
      if (data.drinks === null) {
        window.alert(alert);
      }
      if (data.drinks.length === 1) {
      // Se apenas uma comida for encontrada, redirecione para a página de detalhes.
        navigate(`/drinks/${data.drinks[0].idDrink}`);
      } else {
        infoData.setResults(data.drinks);
      }
    } catch (error) {
      window.alert(alert);
      console.log(error);
    }
  };
  return (
    <div>
      <input
        data-testid="ingredient-search-radio"
        type="radio"
        name="search-type"
        value="ingredient"
        checked={ searchType === 'ingredient' }
        onChange={ () => setSearchType('ingredient') }
      />
      <label htmlFor="ingredient">Ingredient</label>
      <input
        data-testid="name-search-radio"
        name="search-type"
        type="radio"
        checked={ searchType === 'name' }
        value="name"
        onChange={ () => setSearchType('name') }
      />
      <label htmlFor="name">Name</label>
      <input
        data-testid="first-letter-search-radio"
        name="search-type"
        type="radio"
        checked={ searchType === firstLetter }
        value="first-letter"
        onChange={ () => setSearchType(firstLetter) }
      />
      <label htmlFor="first-letter">First Letter</label>
      <button
        data-testid="exec-search-btn"
        onClick={ handleSearch }
      >
        Search
      </button>
    </div>
  );
}

export default SearchBar;
