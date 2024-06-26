import { useContext, useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import DataContext from '../context/datacontext';
import shareIcon from '../images/shareIcon.svg';
import blackHeartIcon from '../images/blackHeartIcon.svg';
import whiteHeartIcon from '../images/whiteHeartIcon.svg';
import styles from '../styles/RecipeId.module.css';

function RecipeInProgress() {
  const { recipe, setRecipe } = useContext(DataContext);
  const { id } = useParams();
  const navigate = useNavigate();
  const [ingredientChecklist, setIngredientChecklist] = useState([]);
  const [isFavorite, setIsFavorite] = useState(false);
  const [copySuccess, setCopySuccess] = useState(false);
  const [areAllIngredientsChecked, setAreAllIngredientsChecked] = useState(false);
  const pageTitle = window.location.pathname.includes('/meals/') ? 'meal' : 'drink';
  const dateNow = new Date();
  const handleFinishRecipe = () => {
    navigate('/done-recipes');
    const doneRecipe = {
      id,
      nationality: recipe.strArea || '',
      name: recipe.strMeal || recipe.strDrink,
      category: recipe.strCategory || '',
      image: recipe.strMealThumb || recipe.strDrinkThumb,
      tags: recipe.strTags ? recipe.strTags.split(',') : [],
      alcoholicOrNot: recipe.strAlcoholic || '',
      type: pageTitle,
      doneDate: dateNow.toISOString(),
    };
    const existingDoneRecipes = JSON.parse(localStorage.getItem('doneRecipes') || '[]');
    const updatedDoneRecipes = [...existingDoneRecipes, doneRecipe];
    localStorage.setItem('doneRecipes', JSON.stringify(updatedDoneRecipes));
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
    setIsFavorite((prevIsFavorite) => !prevIsFavorite);
    updateFavoriteRecipes();
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
    const updatedIngredientChecklist: any = {
      ...ingredientChecklist,
      [ingredientIndex]: !ingredientChecklist[parseInt(ingredientIndex, 10)],
    };
    setIngredientChecklist(updatedIngredientChecklist);
    localStorage
      .setItem(`recipe-${id}-checklist`, JSON.stringify(updatedIngredientChecklist));
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
    <div
      className={ styles.container }
    >
      <img
        data-testid="recipe-photo"
        className={ styles.image }
        src={ strMealThumb || strDrinkThumb }
        alt={ strMeal || strDrink }
      />
      <h2 className={ styles.title } data-testid="recipe-title">
        {strMeal || strDrink}
      </h2>
      {strCategory && (
        <p className={ styles.typeFood } data-testid="recipe-category">
          {strCategory}
        </p>
      )}
      {strAlcoholic && (
        <p className={ styles.typeDrink } data-testid="recipe-alcoholic">
          {strAlcoholic}
        </p>
      )}
      <h3>Ingredientes:</h3>
      <ul className={ styles.ingredients }>
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
      <h3>Instruções:</h3>
      <p data-testid="instructions">{strInstructions}</p>
      <button
        data-testid="share-btn"
        onClick={ copyRecipeLink }
      >
        <img src={ shareIcon } alt="share" />
      </button>
      {copySuccess && <p>Link copied!</p>}
      <button
        data-testid="finish-recipe-btn"
        disabled={ !areAllIngredientsChecked }
        onClick={ handleFinishRecipe }
      >
        FINALIZAR RECEITA
      </button>
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
export default RecipeInProgress;
