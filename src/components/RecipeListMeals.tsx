import React from 'react';

function RecipeListMeals({ recipes }: any) {
  return (
    <div>
      {
        recipes.map((recipe: any, index: any) => (
          <div key={ index } data-testid={ `${index}-recipe-card` }>
            <img
              data-testid={ `${index}-card-img` }
              src={ recipe.strMealThumb }
              alt={ recipe.strMeal }
            />
            <p data-testid={ `${index}-card-name` }>{recipe.strMeal}</p>
          </div>
        ))
        }
    </div>
  );
}

export default RecipeListMeals;
