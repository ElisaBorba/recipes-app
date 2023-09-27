import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

function RecipeDetails() {
  const { idDaReceita } = useParams();
  const [recipe, setRecipe] = useState(null);

  useEffect(() => {
    const fetchRecipeDetails = async () => {
      try {
        const isFoodRecipe = window.location.pathname.includes('/meals/');
        const apiUrl = isFoodRecipe
          ? `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${idDaReceita}`
          : `https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${idDaReceita}`;

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
  }, [idDaReceita]);

  if (!recipe) {
    return <div>Receita não encontrada</div>;
  }
}

export default RecipeDetails;
