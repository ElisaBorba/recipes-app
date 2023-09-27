import React from 'react';

function RecipeListDrinks({ recipes }: any) {
  return (
    <div>
      {
        recipes.map((recipe: any, index: any) => (
          <div key={ index } data-testid={ `${index}-recipe-card` }>
            <img
              data-testid={ `${index}-card-img` }
              src={ recipe.strDrinkThumb }
              alt={ recipe.strDrink }
            />
            <p data-testid={ `${index}-card-name` }>{recipe.strDrink}</p>
          </div>
        ))
        }
    </div>
  );
}

export default RecipeListDrinks;
