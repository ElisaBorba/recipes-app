import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { RecipesType } from '../../types';
import Header from '../../components/Header';
import allDrinkIcon from '../../images/drinkall.png';
import allMealsIcon from '../../images/mealall.png';
import allIcon from '../../images/All.png';
import Modal from '../../components/Modal';
import styles from '../../styles/DoneRecipes.module.css';

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
      <div className={ styles.buttons }>
        <button
          data-testid="filter-by-all-btn"
          onClick={ () => filterDoneRecipes('all') }
        >
          <img
            src={ allIcon }
            alt="All Button"
          />
          All
        </button>
        <button
          data-testid="filter-by-meal-btn"
          onClick={ () => filterDoneRecipes('meal') }
        >
          <img
            src={ allMealsIcon }
            alt="All Button"
          />
          Meals
        </button>
        <button
          data-testid="filter-by-drink-btn"
          onClick={ () => filterDoneRecipes('drink') }
        >
          <img
            src={ allDrinkIcon }
            alt="All Button"
          />
          Drinks
        </button>
      </div>
      {doneRecipes
        .map((recipe, index) => (
          <div
            className={ styles.card }
            key={ recipe.id }
          >
            <Link
              to={ `/${recipe.type}s/${recipe.id}` }
            >
              <img
                className={ styles.cardImg }
                src={ recipe.image }
                alt="imagem"
                data-testid={ `${index}-horizontal-image` }
              />
            </Link>
            <Link
              className={ styles.title }
              to={ `/${recipe.type}s/${recipe.id}` }
            >
              <p data-testid={ `${index}-horizontal-name` }>{recipe.name}</p>
            </Link>
            {recipe.type === 'meal' && (
              <p
                className={ styles.subtitle }
                data-testid={ `${index}-horizontal-top-text` }
              >
                {`${recipe.nationality} - ${recipe.category}`}
              </p>
            )}
            {' '}
            {recipe.type === 'drink' && (
              <p
                className={ styles.tag }
                data-testid={ `${index}-horizontal-top-text` }
              >
                {recipe.alcoholicOrNot}
              </p>
            )}
            <p
              className={ styles.dataText }
              data-testid={ `${index}-horizontal-done-date` }
            >
              {recipe.doneDate}

            </p>
            <button
              onClick={ () => handleShareButtonClick(`/${recipe.type}s/${recipe.id}`) }
            >
              <img
                className={ styles.shareImg }
                src="/src/images/shareIcon.svg"
                data-testid={ `${index}-horizontal-share-btn` }
                alt="share button"
              />
            </button>
            {recipe.tags && recipe.tags.slice(0, 2).map((tag) => (
              <p
                className={ styles.tag }
                key={ tag }
                data-testid={ `${index}-${tag}-horizontal-tag` }
              >
                {tag}
              </p>
            ))}
          </div>
        ))}
      {isLinkCopied && <Modal />}
    </>
  );
}
export default DoneRecipes;
