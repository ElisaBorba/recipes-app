import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { RecipesType } from '../../@type/ContextType';
import Header from '../../components/Header';
import ShareIcon from '../../images/shareIcon.svg';
import blackHeartIcon from '../../images/blackHeartIcon.svg';
import styles from '../../components/Favorite.module.css';
import allDrinkIcon from '../../images/drinkall.png';
import allMealsIcon from '../../images/mealall.png';
import allIcon from '../../images/All.png';
import Modal from '../../components/Modal';

function FavoriteRecipes() {
  const [isLinkCopied, setIsLinkCopied] = useState(false);
  const [doneFavorite, setFavoriteDone] = useState<RecipesType[]>([]);

  useEffect(() => {
    if (localStorage.getItem('favoriteRecipes')) {
      const doneRecipesStorage = JSON.parse(localStorage.getItem('favoriteRecipes') as
      string);
      setFavoriteDone(doneRecipesStorage);
    }
  }, []);

  const handleShareButtonClick = (pathName: string) => {
    navigator.clipboard.writeText(`http://localhost:3000${pathName}`).then(() => {
      setIsLinkCopied(true);
      setTimeout(() => {
        setIsLinkCopied(false);
      }, 1500);
    });
  };

  const handleFavoriteClick = (favoriteId: string) => {
    const isFavorited = doneFavorite.some((favorite) => favorite.id === favoriteId);

    if (isFavorited) {
      // Remova a receita da lista de favoritos
      const updatedRecipes = doneFavorite.filter((favorite) => favorite.id
      !== favoriteId);
      setFavoriteDone(updatedRecipes);
      localStorage.setItem('favoriteRecipes', JSON.stringify(updatedRecipes));
    } else {
      // Adicione a receita à lista de favoritos
      const favoritedRecipe = doneFavorite.find((favorite) => favorite.id === favoriteId);
      if (favoritedRecipe) {
        const updatedRecipes = [...doneFavorite, favoritedRecipe];
        setFavoriteDone(updatedRecipes);
        localStorage.setItem('favoriteRecipes', JSON.stringify(updatedRecipes));
      }
    }
  };

  const filterDoneRecipes = (type: string) => {
    const doneRecipesStorage: RecipesType[] = JSON.parse(
      localStorage.getItem('favoriteRecipes') as string,
    );
    const filteredRecipes = type === 'all'
      ? doneRecipesStorage
      : doneRecipesStorage.filter((recipe) => recipe.type === type);
    setFavoriteDone(filteredRecipes);
  };

  return (
    <>
      <Header title="Favorite Recipes" isProfile isSearch={ false } />
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
      {doneFavorite.map((favorite, index) => (
        <div
          className={ styles.card }
          key={ index }
        >
          <Link to={ `/${favorite.type}s/${favorite.id}` }>
            <img
              className={ styles.cardImg }
              data-testid={ `${index}-horizontal-image` }
              src={ favorite.image }
              alt="imagem"
            />
          </Link>
          <div className={ styles.cardInfo }>
            <Link to={ `/${favorite.type}s/${favorite.id}` }>
              <p
                className={ styles.title }
                data-testid={ `${index}-horizontal-name` }
              >
                {favorite.name}
              </p>
            </Link>
            {favorite.type === 'meal' && (
              <p
                className={ styles.subtitle }
                data-testid={ `${index}-horizontal-top-text` }
              >
                {`${favorite.nationality} - ${favorite.category}`}
              </p>
            )}
            {favorite.type === 'drink' && (
              <p
                className={ styles.subtitle }
                data-testid={ `${index}-horizontal-top-text` }
              >
                {favorite.alcoholicOrNot}
              </p>
            )}
            <div className={ styles.icons }>
              <button
                onClick={ () => handleShareButtonClick(`/${favorite
                  .type}s/${favorite.id}`) }
              >
                <img
                  className={ styles.shareImg }
                  data-testid={ `${index}-horizontal-share-btn` }
                  src={ ShareIcon }
                  alt="share-button"
                />
              </button>
              <button
                onClick={ () => handleFavoriteClick(favorite.id) }
              >
                <img
                  data-testid={ `${index}-horizontal-favorite-btn` }
                  src={ blackHeartIcon }
                  alt="favorite-button"
                />
              </button>
              {isLinkCopied && <Modal />}
            </div>
          </div>
        </div>
      ))}
    </>
  );
}

export default FavoriteRecipes;
