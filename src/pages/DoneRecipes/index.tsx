import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { RecipesType } from '../../@type/ContextType';
import Header from '../../components/Header';
import Profile from '../Profile';

function DoneRecipes() {
  const [isLinkCopied, setIsLinkCopied] = useState(false);
  const [doneRecipes, setDoneRecipes] = useState<RecipesType[]>([]);

  useEffect(() => {
    if (localStorage.getItem('doneRecipes')) {
      const doneRecipesStorage = JSON.parse(localStorage
        .getItem('doneRecipes') as string);
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

  const filterDoneRecipes = (type: string) => {
    const doneRecipesStorage:
    RecipesType[] = JSON.parse(localStorage.getItem('doneRecipes') as string);
    const filteredRecipes = type === 'all'
      ? doneRecipesStorage : doneRecipesStorage.filter((recipe) => recipe.type === type);
    setDoneRecipes(filteredRecipes);
  };

  return (
    <>
      <Header title="Done Recipes" isProfile isSearch={ false } />
      <Profile />
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
      {doneRecipes
        .map((recipe, index) => (
          <div key={ recipe.id }>
            <Link to={ `/${recipe.type}s/${recipe.id}` }>
              <img
                style={ { width: '200px' } }
                src={ recipe.image }
                alt="imagem"
                data-testid={ `${index}-horizontal-image` }
              />
              <p data-testid={ `${index}-horizontal-name` }>{recipe.name}</p>
            </Link>
            {recipe.type === 'meal' && (
              <p data-testid={ `${index}-horizontal-top-text` }>
                {`${recipe.nationality} - ${recipe.category}`}
              </p>
            )}
            {' '}
            {recipe.type === 'drink' && (
              <p data-testid={ `${index}-horizontal-top-text` }>
                {recipe.alcoholicOrNot}
              </p>
            )}
            <p data-testid={ `${index}-horizontal-done-date` }>{recipe.doneDate}</p>
            <button
              onClick={ () => handleShareButtonClick(`/${recipe.type}s/${recipe.id}`) }
            >
              <img
                src="/src/images/shareIcon.svg"
                data-testid={ `${index}-horizontal-share-btn` }
                alt="share button"
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
export default DoneRecipes;
