import { Link } from 'react-router-dom';
import { DrinkType } from '../types';
import styles from './Cards.module.css';

function RecipeListDrinks({ recipes }: any) {
  return (
    <div className={ styles.cards }>
      {
        recipes.map((recipe: DrinkType, index: number) => (
          <Link
            key={ index }
            className={ styles.card }
            data-testid={ `${index}-recipe-card` }
            to={ `/drinks/${recipe.idDrink}` }
          >
            <img
              data-testid={ `${index}-card-img` }
              src={ recipe.strDrinkThumb }
              alt={ recipe.strDrink }
            />
            <p
              className={ styles.title }
              data-testid={ `${index}-card-name` }
            >
              {recipe.strDrink}
            </p>
          </Link>
        ))
        }
    </div>
  );
}

export default RecipeListDrinks;
