import { useContext, useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import DataContext from '../context/datacontext';
import shareIcon from '../images/shareIcon.svg';
import blackHeartIcon from '../images/blackHeartIcon.svg';
import whiteHeartIcon from '../images/whiteHeartIcon.svg';

function RecipeDetails() {
  const { id } = useParams();
  const { recipe, setRecipe } = useContext(DataContext);
  const [buttonText, setButtonText] = useState('Start Recipe');
  const [copySuccess, setCopySuccess] = useState(false);
  const [isFavorite, setIsFavorite] = useState(false);
  const navigate = useNavigate();
  const typeOf = () => {
    if (window.location.pathname.includes('/meals/')) {
      return 'meals';
    }
    return 'drinks';
  };
  const StartRecipeButton = styled.button`
  position: fixed;
  bottom: 0;
  right: 50%;
  width: 10%;
  padding: 10px;
  background-color: #007bff;
  color: #fff;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  box-shadow: 0px -2px 5px rgba(0, 0, 0, 0.2);
`;

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
  }, [id, setRecipe]);
  useEffect(() => {
    const isRecipeFavorited = JSON.parse(localStorage
      .getItem('favoriteRecipes') || '[]').some(
      (favRecipe: {
        id: string;
        type: string;
        name: string;
        image: string;
        nationality: string;
        category: string;
        alcoholicOrNot: string;
      }) => favRecipe.id === id,
    );
    setIsFavorite(isRecipeFavorited);
  }, [id]);

  useEffect(() => {
    // Verifique o localStorage para a chave inProgressRecipes
    const inProgressRecipesFromLocalStorage = (
      JSON.parse(localStorage.getItem(`recipe-${id}-checklist`) || '{}'));

    // Verifique se a receita atual já está em andamento
    if (inProgressRecipesFromLocalStorage[id as string]) {
      setButtonText('Continue Recipe');
    }
  }, [id]);

  const toggleFavorite = () => {
    setIsFavorite((prevIsFavorite) => !prevIsFavorite);
    updateFavoriteRecipes();
  };
  const updateFavoriteRecipes = () => {
    const favoriteRecipe = {
      id,
      type: window.location.pathname.includes('/meals/') ? 'meal' : 'drink',
      name: recipe.strMeal || recipe.strDrink,
      image: recipe.strMealThumb || recipe.strDrinkThumb,
      nationality: recipe.strArea || '',
      category: recipe.strCategory || '',
      alcoholicOrNot: recipe.strAlcoholic || '',
    };
    const existingFavoriteRecipes = (
      JSON.parse(localStorage.getItem('favoriteRecipes') || '[]'));
    const isAlreadyFavorite = existingFavoriteRecipes.some(
      (favRecipe: {
        id: string;
        type: string;
        name: string;
        image: string;
        nationality: string;
        category: string;
        alcoholicOrNot: string;
      }) => favRecipe.id === favoriteRecipe.id,
    );
    if (isAlreadyFavorite) {
      const updatedFavoriteRecipes = existingFavoriteRecipes.filter(
        (favRecipe: {
          id: string;
          type: string;
          name: string;
          image: string;
          nationality: string;
          category: string;
          alcoholicOrNot: string;
        }) => favRecipe.id !== favoriteRecipe.id,
      );
      localStorage.setItem('favoriteRecipes', JSON.stringify(updatedFavoriteRecipes));
    } else {
      const updatedFavoriteRecipes = [...existingFavoriteRecipes, favoriteRecipe];
      localStorage.setItem('favoriteRecipes', JSON.stringify(updatedFavoriteRecipes));
    }
  };
  if (!recipe) {
    return <div>Receita não encontrada</div>;
  }
  const copyRecipeLink = () => {
    const recipeURL = window.location.href;
    const regex = /^(.*?)(?=\/in-progress|$)/;
    const result = recipeURL.match(regex);
    if (result) {
      const extractedPart = result[1];
      navigator.clipboard.writeText(extractedPart).then(() => {
        setCopySuccess(true);
      });
    } else {
      console.log('Não foi possível extrair a parte desejada da URL.');
    }
  };
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
      <StartRecipeButton
        data-testid="start-recipe-btn"
        onClick={ () => navigate(`/${typeOf()}/${id}/in-progress`) }
      >
        {buttonText}
      </StartRecipeButton>
      <input
        type="image"
        data-testid="share-btn"
        onClick={ copyRecipeLink }
        src={ shareIcon }
        alt="share"
      />
      {copySuccess && <p>Link copied!</p>}
      {isFavorite
        ? <input
            type="image"
            data-testid="favorite-btn"
            onClick={ toggleFavorite }
            src={ blackHeartIcon }
            alt="favorite"
        />
        : <input
            type="image"
            data-testid="favorite-btn"
            onClick={ toggleFavorite }
            src={ whiteHeartIcon }
            alt="favorite"
        />}
    </div>
  );
}

export default RecipeDetails;
