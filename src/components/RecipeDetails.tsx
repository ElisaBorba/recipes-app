import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

function RecipeDetails() {
  const { id } = useParams();
  const [recipe, setRecipe] = useState(null);

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
        // Trate o erro aqui.
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
    strYoutube, // Link do vídeo do YouTube (somente comidas)
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
      {strAlcoholic && <p data-testid="recipe-category">{strAlcoholic}</p>}

      <h3>Ingredientes:</h3>
      <ul>
        {Object.keys(recipe).map((key) => {
          if (key.startsWith('strIngredient') && recipe[key]) {
            const ingredientIndex = key.replace('strIngredient', '');
            const measureKey = `strMeasure${ingredientIndex}`;
            return (
              <li
                key={ ingredientIndex }
                data-testid={ (
                     `${parseInt(ingredientIndex, 10) - 1}-ingredient-name-and-measure`) }
              >
                {`${recipe[key]} - ${recipe[measureKey]}`}
              </li>
            );
          }
          return null;
        })}
      </ul>

      <h3>Instruções:</h3>
      <p data-testid="instructions">{strInstructions}</p>

      {strYoutube && (
        <div>
          <h3>Vídeo:</h3>
          <iframe
            data-testid="video"
            width="560"
            height="315"
            src={ `https://www.youtube.com/embed/${(strYoutube as string).substring(
              (strYoutube as string).lastIndexOf('/') + 1,
            )}` }
            title="Embedded Video"
            allowFullScreen
          />
        </div>
      )}
    </div>
  );
}

export default RecipeDetails;
