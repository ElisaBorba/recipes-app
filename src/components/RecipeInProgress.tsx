import { useContext } from 'react';
import DataContext from '../context/datacontext';

function RecipeInProgress() {
  const recipe = useContext(DataContext);
  const { category, alcoholicOrNot, name, image, instructions } = recipe.recipe;

  return (
    <div>
      <img data-testid="recipe-photo" src={ image } alt={ name } />
      <h2 data-testid="recipe-title">{name}</h2>
      {category && <p data-testid="recipe-category">{category}</p>}
      {alcoholicOrNot && <p data-testid="recipe-alcoholic">{alcoholicOrNot}</p>}

      <h3>Instructions:</h3>
      <p data-testid="instructions">{instructions}</p>

      <button data-testid="share-btn">Share</button>
      <button data-testid="favorite-btn">Favorite</button>
      <button data-testid="finish-recipe-btn">Finish Recipe</button>
    </div>
  );
}

export default RecipeInProgress;
