import { useContext, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import DataContext from '../context/datacontext';

function RecipeInProgress() {
  const { recipe, setRecipe } = useContext(DataContext);
  const { id } = useParams();

  useEffect(() => {
    const fetchRecipeDetails = async () => {
      try {
        const isFoodRecipe = window.location.pathname.includes('/meals/');
        const apiUrl = isFoodRecipe
          ? `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`
          : `https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${id}`;

        const response = await fetch(apiUrl);

        if (response.ok) {
          const data = await response.json();
          setRecipe(data.meals?.[0] || data.drinks?.[0] || null);
        } else {
          console.error('Erro ao buscar detalhes da receita:', response);
        }
      } catch (error) {
        console.error('Erro ao buscar detalhes da receita:', error);
      }
    };

    fetchRecipeDetails();
  }, [id]);

  if (!recipe) {
    return <div>Receita não encontrada</div>;
  }

  const {
    strMealThumb, // URL da imagem da receita
    strDrinkThumb, // URL da imagem da bebida
    strMeal, // Título da receita
    strDrink, // Título da bebida
    strCategory, // Categoria da receita (em caso de comidas)
    strAlcoholic, // Se é alcoólica (em caso de bebidas)
    strInstructions, // Instruções da receita
  } = recipe;

  return (
    <div>
      <img
        data-testid="recipe-photo"
        src={ strMealThumb || strDrinkThumb }
        alt={ strMeal || strDrink }
      />
      <h2 data-testid="recipe-title">{strMeal || strDrink}</h2>
      {strCategory && <p data-testid="recipe-category">{strCategory}</p>}
      {strAlcoholic && <p data-testid="recipe-alcoholic">{strAlcoholic}</p>}

      <h3>Instruções:</h3>
      <p data-testid="instructions">{strInstructions}</p>

      <h3>Ingredientes:</h3>
      <ul>
        {Object.keys(recipe).map((key) => {
          if (key.startsWith('strIngredient') && recipe[key]) {
            const ingredientIndex = key.replace('strIngredient', '');
            const measureKey = `strMeasure${ingredientIndex}`;
            return (
              <li key={ ingredientIndex }>
                <label
                  data-testid={ (
                     `${parseInt(ingredientIndex, 10) - 1}-ingredient-step`) }
                >
                  <input type="checkbox" />
                  {`${recipe[key]} - ${recipe[measureKey]}`}
                </label>
              </li>
            );
          }
          return null;
        })}
      </ul>

      <button data-testid="share-btn">Compartilhar</button>
      <button data-testid="favorite-btn">Favoritar</button>
      <button data-testid="finish-recipe-btn">Finalizar Receita</button>
    </div>
  );
}

export default RecipeInProgress;
