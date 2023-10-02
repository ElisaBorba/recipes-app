import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { RecipesType } from '../../@type/ContextType';
import Header from '../../components/Header';

function FavoriteRecipes() {
  const [isLinkCopied, setIsLinkCopied] = useState(false);
  const [doneRecipes, setDoneRecipes] = useState<RecipesType[]>([]);

  useEffect(() => {
    if (localStorage.getItem('doneRecipes')) {
      const doneRecipesStorage = JSON.parse(localStorage.getItem('doneRecipes') as
      string);
      setDoneRecipes(doneRecipesStorage);
    }
  }, []);

  const handleShareButtonClick = (pathName: string) => {
    navigator.clipboard.writeText(`http://localhost:3000${pathName}`).then(
      () => {
        try {
          setIsLinkCopied(true);
        } finally {
          setTimeout(() => {
            setIsLinkCopied(false);
          }, 1500);
        }
      },
    );
  };

  const handleFavoriteClick = (recipeId: string) => {
    const updatedRecipes = doneRecipes.filter((recipe) => recipe.id !== recipeId);
    setDoneRecipes(updatedRecipes);
    localStorage.setItem('doneRecipes', JSON.stringify(updatedRecipes));
  };

  const filterDoneRecipes = (type: string) => {
    const doneRecipesStorage:
    RecipesType[] = JSON.parse(localStorage.getItem('doneRecipes') as string);
    const filteredRecipes = type === 'all'
      ? doneRecipesStorage
      : doneRecipesStorage.filter((recipe) => recipe.type === type);
    setDoneRecipes(filteredRecipes);
  };

  return (
    <>
      <Header title="Favorite Recipes" isProfile isSearch={ false } />
      <button
        data-testid="filter-by-all-btn"
        onClick={ () => filterDoneRecipes('all') }
      >
        All
      </button>
      <button
        data-testid="filter-by-meal-btn"
        onClick={ () => filterDoneRecipes('meal') }
      >
        Meals
      </button>
      <button
        data-testid="filter-by-drink-btn"
        onClick={ () => filterDoneRecipes('drink') }
      >
        Drinks
      </button>
      {doneRecipes.map((recipe, index) => (
        <div key={ recipe.id }>
          <Link to={ `/${recipe.type}s/${recipe.id}` }>
            <img
              data-testid={ `${index}-horizontal-image` }
              style={ { width: '100px' } }
              src={ recipe.image }
              alt={ recipe.name }
            />
            <p data-testid={ `${index}-horizontal-name` }>{recipe.name}</p>
          </Link>
          {recipe.type === 'meal' && (
            <p data-testid={ `${index}-horizontal-top-text` }>
              {`${recipe.nationality} - ${recipe.category}`}
            </p>
          )}
          {recipe.type === 'drink' && (
            <p data-testid={ `${index}-horizontal-top-text` }>
              {recipe.alcoholicOrNot}
            </p>
          )}
          <button
            onClick={ () => handleShareButtonClick(`/${recipe.type}s/${recipe.id}`) }
          >
            <img
              data-testid={ `${index}-horizontal-share-btn` }
              src="/src/images/shareIcon.svg"
              alt={ recipe.name }
            />
          </button>
          <button
            data-testid={ `${index}-horizontal-favorite-btn` }
            onClick={ () => handleFavoriteClick(recipe.id) }
          >
            <img
              src="/src/images/blackHeartIcon.svg"
              alt={ recipe.name }
            />
          </button>
          {isLinkCopied && <p>Link copied!</p>}
          {recipe.tags && recipe.tags.slice(0, 2).map((tag) => (
            <p
              key={ tag }
              data-testid={ `${index}-${tag}-horizontal-tag` }
            >
              {tag}
            </p>
          ))}
        </div>
      ))}
    </>
  );
}

export default FavoriteRecipes;
