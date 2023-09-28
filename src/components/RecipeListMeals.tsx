import { Link } from 'react-router-dom';
import { MealType } from '../types';

function RecipeListMeals({ recipes }: any) {
  return (
    <div>
      {
        recipes.map((recipe: MealType, index: number) => (
          <Link
            key={ index }
            data-testid={ `${index}-recipe-card` }
            to={ `/meals/${recipe.idMeal}` }
          >
            <p data-testid={ `${index}-card-name` }>{recipe.strMeal}</p>
            <img
              data-testid={ `${index}-card-img` }
              src={ recipe.strMealThumb }
              alt={ recipe.strMeal }
            />
          </Link>
        ))
        }
    </div>
  );
}

export default RecipeListMeals;
