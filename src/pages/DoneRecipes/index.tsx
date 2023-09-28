import { useEffect, useState } from 'react';
import { RecipesType } from '../../@type/ContextType';
import Header from '../../components/Header';
import Profile from '../Profile';

function DoneRecipes() {
  const [isLinkCopied, setIsLinkCopied] = useState(false);
  const [doneRecipes, setDoneRecipes] = useState<RecipesType[]>([]);
  const [activeFilter, setActiveFilter] = useState<string>('All'); // Estado para controlar o filtro
  const [filteredRecipes, setFilteredRecipes] = useState<RecipesType[]>(doneRecipes);

  useEffect(() => {
    if (localStorage.getItem('doneRecipes')) {
      const doneRecipesStorage = JSON.parse(localStorage
        .getItem('doneRecipes') as string);
      setDoneRecipes(doneRecipesStorage);
      setFilteredRecipes(doneRecipesStorage);
    }
  }, []);

  useEffect(() => {
    if (activeFilter === 'All') {
      setFilteredRecipes(doneRecipes);
    } else {
      const filtered = doneRecipes.filter((recipe) => recipe.category === activeFilter);
      setFilteredRecipes(filtered);
    }
  }, [activeFilter, doneRecipes]);

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

  return (
    <>
      <Header title="Done Recipes" isProfile isSearch={ false } />
      <Profile />
      <button
        data-testid="filter-by-all-btn"
        onClick={ () => setActiveFilter('All') }
      >
        All
      </button>
      <button data-testid="filter-by-meal-btn">Meals</button>
      <button data-testid="filter-by-drink-btn">Drinks</button>
      {filteredRecipes.map((recipe, index) => (
        <div key={ recipe.id }>
          <img
            src={ recipe.image }
            alt="imagem"
            data-testid={ `${index}-horizontal-image` }
          />
          <h2 data-testid={ `${index}-horizontal-name` }>{recipe.name}</h2>
          <p data-testid={ `${index}-horizontal-top-text` }>{recipe.category}</p>
          <p data-testid={ `${index}-horizontal-done-date` }>{recipe.doneDate}</p>
          <button
            data-testid={ `${index}-horizontal-share-btn` }
            onClick={ () => handleShareButtonClick(`/${recipe.type}s/${recipe.id}`) }
          >
            <img
              src="/src/images/shareIcon.svg"
              alt="share button"
            />
          </button>
          {isLinkCopied && <p>Link copied!</p>}
          {recipe.tags && recipe.tags.map((tag) => (
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
