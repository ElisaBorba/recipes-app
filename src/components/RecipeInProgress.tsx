import { useContext, useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import DataContext from '../context/datacontext';
import shareIcon from '../images/shareIcon.svg';
import blackHeartIcon from '../images/blackHeartIcon.svg';
import whiteHeartIcon from '../images/whiteHeartIcon.svg';

function RecipeInProgress() {
  const { recipe, setRecipe } = useContext(DataContext);
  const { id } = useParams();
  const navigate = useNavigate();

  const [ingredientChecklist, setIngredientChecklist] = useState([]);
  const [isFavorite, setIsFavorite] = useState(false);
  const [copySuccess, setCopySuccess] = useState(false);
  const [areAllIngredientsChecked, setAreAllIngredientsChecked] = useState(false);

  const handleFinishRecipe = () => {
    navigate('/done-recipes');
  };

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
    // Verifique se a receita atual está favoritada no localStorage ao carregar a página
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

  const toggleFavorite = () => {
    // Atualize o estado "isFavorite" e o localStorage ao clicar no botão "Favoritar"
    setIsFavorite((prevIsFavorite) => !prevIsFavorite);
    updateFavoriteRecipes(); // Atualize as receitas favoritas
  };

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

  const toggleIngredientCheck = (ingredientIndex: string) => {
    const updatedIngredientChecklist = {
      ...ingredientChecklist,
      [ingredientIndex]: !ingredientChecklist[parseInt(ingredientIndex, 10)],
    };

    setIngredientChecklist(updatedIngredientChecklist);
    localStorage.setItem(`recipe-${id}-checklist`, JSON
      .stringify(updatedIngredientChecklist));

    const allChecked = Object.keys(updatedIngredientChecklist).every(
      (key) => updatedIngredientChecklist[key],
    );
    setAreAllIngredientsChecked(allChecked);
  };

  useEffect(() => {
    const savedIngredientChecklist = JSON.parse(
      localStorage.getItem(`recipe-${id}-checklist`) || '[]',
    );
    setIngredientChecklist(savedIngredientChecklist);
  }, [id]);

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

  const {
    strMealThumb,
    strDrinkThumb,
    strMeal,
    strDrink,
    strCategory,
    strAlcoholic,
    strInstructions,
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
                  data-testid={ `${parseInt(ingredientIndex, 10) - 1}-ingredient-step` }
                  style={ {
                    textDecoration: ingredientChecklist[parseInt(ingredientIndex, 10)]
                      ? 'line-through solid black'
                      : 'none',
                  } }
                >
                  <input
                    type="checkbox"
                    checked={
                        ingredientChecklist[parseInt(ingredientIndex, 10)] || false
                    }
                    onChange={ () => toggleIngredientCheck(ingredientIndex) }
                  />
                  {`${recipe[key]} - ${recipe[measureKey]}`}
                </label>
              </li>
            );
          }
          return null;
        })}
      </ul>
      <button
        data-testid="share-btn"
        onClick={ copyRecipeLink }
      >
        <img src={ shareIcon } alt="share" />
      </button>
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
      <button
        data-testid="finish-recipe-btn"
        disabled={ !areAllIngredientsChecked }
        onClick={ handleFinishRecipe }
      >
        Finalizar Receita
      </button>
    </div>
  );
}

export default RecipeInProgress;
