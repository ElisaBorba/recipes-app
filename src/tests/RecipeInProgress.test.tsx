import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom'; // Importe o MemoryRouter
import RecipeInProgress from '../components/RecipeInProgress';
import { DataProvider } from '../context/dataprovider';

test('Renderiza o componente RecipeInProgress corretamente', () => {
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

  waitFor(() => {
    const recipeIngredients = screen.getByTestId('0-ingredient-name-and-measure');
    expect(recipeIngredients).toBeInTheDocument();
  });
});
