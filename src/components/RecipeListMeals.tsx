import { Link } from 'react-router-dom';
import { MealType } from '../types';
import styles from '../styles/Cards.module.css';

function RecipeListMeals({ recipes }: any) {
  return (
    <div className={ styles.cards }>
      {
        recipes.map((recipe: MealType, index: number) => (
          <Link
            className={ styles.card }
            key={ index }
            data-testid={ `${index}-recipe-card` }
            to={ `/meals/${recipe.idMeal}` }
          >
            <img
              data-testid={ `${index}-card-img` }
              src={ recipe.strMealThumb }
              alt={ recipe.strMeal }
            />
            <p
              className={ styles.title }
              data-testid={ `${index}-card-name` }
            >
              {recipe.strMeal}
            </p>
          </Link>
        ))
        }
    </div>
  );
}

export default RecipeListMeals;
