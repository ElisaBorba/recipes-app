import { Link } from 'react-router-dom';

function RecipeListDrinks({ recipes }: any) {
  return (
    <div>
      {
        recipes.map((recipe: any, index: number) => (
          <Link
            key={ index }
            data-testid={ `${index}-recipe-card` }
            to={ `/drinks/${recipe.idDrink}` }
          >
            <p data-testid={ `${index}-card-name` }>{recipe.strDrink}</p>
            <img
              data-testid={ `${index}-card-img` }
              src={ recipe.strDrinkThumb }
              alt={ recipe.strDrink }
            />
          </Link>
        ))
        }
    </div>
  );
}

export default RecipeListDrinks;
