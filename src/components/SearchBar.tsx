import { useState, useContext } from 'react';
import DataContext from '../context/datacontext';

function SearchBar({ title }: { title: string }) {
  const [searchType, setSearchType] = useState('ingredient');
  const infoData = useContext(DataContext);
  const firstLetter = 'first-letter';

  const handleSearch = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    event.preventDefault();
    if (searchType === firstLetter && infoData.search.length !== 1) {
      window.alert('Your search must have only 1 (one) character');
    } else if (title === 'Meals') {
      performSearchMeals();
    } else if (title === 'Drinks') {
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
      infoData.setResults(data.meals || []); // Verifique a estrutura da resposta da API
    } catch (error) {
      console.error('Error fetching data:', error);
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
      infoData.setResults(data.drinks || []); // Verifique a estrutura da resposta da API
    } catch (error) {
      console.error('Error fetching data:', error);
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
