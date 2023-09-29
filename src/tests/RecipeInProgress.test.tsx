import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom'; // Importe o MemoryRouter
import userEvent from '@testing-library/user-event';
import RecipeInProgress from '../components/RecipeInProgress';
import { DataProvider } from '../context/dataprovider';

test('Renderiza o componente RecipeInProgress corretamente', async () => {
  render(
    <MemoryRouter initialEntries={ ['/meals/52977/in-progress'] }>
      <DataProvider>
        <RecipeInProgress />
      </DataProvider>
    </MemoryRouter>,
  );

  waitFor(() => {
    const recipeTitle = screen.getByTestId('recipe-title');
    expect(recipeTitle).toBeInTheDocument();
  });

  waitFor(() => {
    const recipePhoto = screen.getByTestId('recipe-photo');
    expect(recipePhoto).toBeInTheDocument();
  });

  waitFor(() => {
    const recipeCategory = screen.getByTestId('recipe-category');
    expect(recipeCategory).toBeInTheDocument();
  });

  waitFor(() => {
    const recipeInstructions = screen.getByTestId('instructions');
    expect(recipeInstructions).toBeInTheDocument();
  });

  waitFor(() => {
    const recipeVideo = screen.getByTestId('video');
    expect(recipeVideo).toBeInTheDocument();
  });

  waitFor(async () => {
    const recipeIngredients = screen.getByTestId('0-ingredient-name-and-measure');
    expect(recipeIngredients).toBeInTheDocument();
    const favoriteButton = screen.getByTestId('favorite-btn');
    expect(favoriteButton).toBeInTheDocument();
    expect(favoriteButton).toHaveAttribute('src', '/images/whiteHeartIcon.svg');

    await userEvent.click(favoriteButton);
    expect(favoriteButton).toHaveAttribute('src', '/images/blackHeartIcon.svg');

    const shareButton = screen.getByTestId('share-btn');
    expect(shareButton).toBeInTheDocument();
    await userEvent.click(shareButton);
    const link = screen.getByTestId('share-url');
    expect(link).toBeInTheDocument();
    expect(link).toHaveTextContent('http://localhost:3000/meals/52977');

    const finishRecipeButton = screen.getByTestId('finish-recipe-btn');
    expect(finishRecipeButton).toBeInTheDocument();
    await userEvent.click(finishRecipeButton);
    expect(window.location.pathname).toBe('/done-recipes');

    waitFor(() => {
      const doneRecipes = JSON.parse(localStorage.getItem('doneRecipes') || '[]');
      expect(doneRecipes[0].id).toBe('52977');
      expect(doneRecipes[0].type).toBe('meal');
      expect(doneRecipes[0].name).toBe('Corba');
      expect(doneRecipes[0].image).toBe('https://www.themealdb.com/images/media/meals/58oia61564916529.jpg');
    });

    waitFor(() => {
      const favoriteRecipes = JSON.parse(localStorage.getItem('favoriteRecipes') || '[]');
      expect(favoriteRecipes[0].id).toBe('52977');
      expect(favoriteRecipes[0].type).toBe('meal');
      expect(favoriteRecipes[0].area).toBe('Turkish');
      expect(favoriteRecipes[0].category).toBe('Side');
      expect(favoriteRecipes[0].alcoholicOrNot).toBe('');
      expect(favoriteRecipes[0].name).toBe('Corba');
      expect(favoriteRecipes[0].image).toBe('https://www.themealdb.com/images/media/meals/58oia61564916529.jpg');
    });
  });
});

test('Renderiza o componente RecipeInProgress corretamente', async () => {
  render(
    <MemoryRouter initialEntries={ ['/drinks/15997/in-progress'] }>
      <DataProvider>
        <RecipeInProgress />
      </DataProvider>
    </MemoryRouter>,
  );
  waitFor(() => {
    const recipeTitle = screen.getByTestId('recipe-title');
    expect(recipeTitle).toBeInTheDocument();
  });

  waitFor(() => {
    const recipePhoto = screen.getByTestId('recipe-photo');
    expect(recipePhoto).toBeInTheDocument();
  });

  waitFor(() => {
    const recipeCategory = screen.getByTestId('recipe-category');
    expect(recipeCategory).toBeInTheDocument();
  });

  waitFor(async () => {
    const recipeIngredients = screen.getByTestId('0-ingredient-name-and-measure');
    expect(recipeIngredients).toBeInTheDocument();
    const favoriteButton = screen.getByTestId('favorite-btn');
    expect(favoriteButton).toBeInTheDocument();
    expect(favoriteButton).toHaveAttribute('src', '/images/whiteHeartIcon.svg');

    await userEvent.click(favoriteButton);
    expect(favoriteButton).toHaveAttribute('src', '/images/blackHeartIcon.svg');

    const shareButton = screen.getByTestId('share-btn');
    expect(shareButton).toBeInTheDocument();
    await userEvent.click(shareButton);
    const link = screen.getByTestId('share-url');
    expect(link).toBeInTheDocument();
    expect(link).toHaveTextContent('http://localhost:3000/drinks/15997');

    const finishRecipeButton = screen.getByTestId('finish-recipe-btn');
    expect(finishRecipeButton).toBeInTheDocument();
    await userEvent.click(finishRecipeButton);
    expect(window.location.pathname).toBe('/done-recipes');
  });
});
