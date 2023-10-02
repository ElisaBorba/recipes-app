import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter } from 'react-router-dom';
import RecipeDetails from '../components/RecipeDetails'; // Importe o componente que você deseja testar
import { DataProvider } from '../context/dataprovider';

const favButton = 'favorite-btn';
const rcpTitle = 'recipe-title';
const strRcp = 'start-recipe-btn';
const fnsBtn = 'finish-recipe-btn';
const ingZero = '0-ingredient-step';
const meals = '/meals/52977';
const blackHeartIcon = '/images/blackHeartIcon.svg';
const textDec = 'text-decoration: line-through solid black';

it('Renderiza o componente RecipeDetails corretamente', async () => {
  render(
    <MemoryRouter initialEntries={ [meals] }>
      <DataProvider>
        <RecipeDetails />
      </DataProvider>
    </MemoryRouter>,
  );
  waitFor(async () => {
    const recipeTitle = screen.getByTestId(rcpTitle);
    expect(recipeTitle).toBeInTheDocument();

    expect(screen.getByTestId(rcpTitle)).toBeInTheDocument();
    expect(screen.getByTestId('recipe-photo')).toBeInTheDocument();
    expect(screen.getByTestId('recipe-category')).toBeInTheDocument();
    expect(screen.getByTestId('instructions')).toBeInTheDocument();
    expect(screen.getByTestId('video')).toBeInTheDocument();
    expect(screen.getByTestId('0-ingredient-name-and-measure')).toBeInTheDocument();
    expect(screen.getByTestId(favButton)).toBeInTheDocument();
    expect(screen.getByTestId('share-btn')).toBeInTheDocument();
    expect(screen.getByTestId(strRcp)).toBeInTheDocument();

    await userEvent.click(screen.getByTestId(favButton));
    expect(screen.getByTestId(favButton)).toHaveAttribute('src', blackHeartIcon);

    await userEvent.click(screen.getByTestId('share-btn'));
    const link = screen.getByTestId('share-url');
    expect(link).toBeInTheDocument();
    expect(link).toHaveTextContent('http://localhost:3000/meals/52977');

    await userEvent.click(screen.getByTestId(strRcp));
    expect(screen.getByTestId(fnsBtn)).toBeInTheDocument();

    await userEvent.click(screen.getByTestId(fnsBtn));
    expect(screen.getByTestId(ingZero)).toBeInTheDocument();
    expect(screen.getByTestId(ingZero)).toHaveStyle(textDec);
  });
});

it('Teste da parte de drinks', async () => {
  render(
    <MemoryRouter initialEntries={ ['/drinks/15997'] }>
      <DataProvider>
        <RecipeDetails />
      </DataProvider>
    </MemoryRouter>,
  );
  waitFor(async () => {
    const recipeTitle = screen.getByTestId(rcpTitle);
    expect(recipeTitle).toBeInTheDocument();

    expect(screen.getByTestId(rcpTitle)).toBeInTheDocument();
    expect(screen.getByTestId('recipe-photo')).toBeInTheDocument();
    expect(screen.getByTestId('recipe-category')).toBeInTheDocument();
    expect(screen.getByTestId('instructions')).toBeInTheDocument();
    expect(screen.getByTestId('video')).toBeInTheDocument();
    expect(screen.getByTestId('0-ingredient-name-and-measure')).toBeInTheDocument();
    expect(screen.getByTestId(favButton)).toBeInTheDocument();
    expect(screen.getByTestId('share-btn')).toBeInTheDocument();
    expect(screen.getByTestId(strRcp)).toBeInTheDocument();

    await userEvent.click(screen.getByTestId(favButton));
    expect(screen.getByTestId(favButton)).toHaveAttribute('src', blackHeartIcon);

    await userEvent.click(screen.getByTestId('share-btn'));
    const link = screen.getByTestId('share-url');
    expect(link).toBeInTheDocument();
    expect(link).toHaveTextContent('http://localhost:3000/drinks/15997');

    await userEvent.click(screen.getByTestId(strRcp));
    expect(screen.getByTestId(fnsBtn)).toBeInTheDocument();

    await userEvent.click(screen.getByTestId(fnsBtn));
    expect(screen.getByTestId(ingZero)).toBeInTheDocument();
    expect(screen.getByTestId(ingZero)).toHaveStyle(textDec);
  });
});

it('Teste de início de receita e marcação como favorito', async () => {
  render(
    <MemoryRouter initialEntries={ [meals] }>
      <DataProvider>
        <RecipeDetails />
      </DataProvider>
    </MemoryRouter>,
  );
  waitFor(async () => {
    // Simule o clique no botão "Start Recipe"
    await userEvent.click(screen.getByTestId(strRcp));

    // Verifique se o botão "Finish Recipe" aparece
    expect(screen.getByTestId(fnsBtn)).toBeInTheDocument();

    // Simule o clique no botão "Favorite"
    await userEvent.click(screen.getByTestId(favButton));

    // Verifique se o ícone de coração preto está visível
    expect(screen.getByTestId(favButton)).toHaveAttribute('src', blackHeartIcon);

    // Simule o clique novamente no botão "Favorite"
    await userEvent.click(screen.getByTestId(favButton));

    // Verifique se o ícone de coração branco está visível
    expect(screen.getByTestId(favButton)).toHaveAttribute('src', '/images/whiteHeartIcon.svg');
  });
});

it('Teste de compartilhamento de receita', async () => {
  render(
    <MemoryRouter initialEntries={ [meals] }>
      <DataProvider>
        <RecipeDetails />
      </DataProvider>
    </MemoryRouter>,
  );
  waitFor(async () => {
    // Simule o clique no botão "Share"
    await userEvent.click(screen.getByTestId('share-btn'));

    // Verifique se o link de compartilhamento é exibido
    const link = screen.getByTestId('share-url');
    expect(link).toBeInTheDocument();

    // Verifique se o link contém a URL correta
    expect(link).toHaveTextContent('http://localhost:3000/meals/52977');
  });
});

it('Teste de marcação de ingredientes como concluídos', async () => {
  render(
    <MemoryRouter initialEntries={ [meals] }>
      <DataProvider>
        <RecipeDetails />
      </DataProvider>
    </MemoryRouter>,
  );
  waitFor(async () => {
    // Simule o clique no botão "Start Recipe"
    await userEvent.click(screen.getByTestId(strRcp));

    // Simule o clique no botão "Finish Recipe"
    await userEvent.click(screen.getByTestId(fnsBtn));

    // Verifique se o primeiro ingrediente está marcado como concluído
    const ingredientZero = screen.getByTestId(ingZero);
    expect(ingredientZero).toBeInTheDocument();
    expect(ingredientZero).toHaveStyle(textDec);

    // Simule o clique novamente no botão "Finish Recipe"
    await userEvent.click(screen.getByTestId(fnsBtn));

    // Verifique se o primeiro ingrediente não está mais marcado como concluído
    expect(ingredientZero).toHaveStyle('text-decoration: none');
  });
});

// teste das linhas 41,45-51,53-54,63-70,82-83,87-89,91-130,134-162,172-186,222-228

it('Teste de início de receita e marcação como favorito', async () => {
  render(
    <MemoryRouter initialEntries={ [meals] }>
      <DataProvider>
        <RecipeDetails />
      </DataProvider>
    </MemoryRouter>,
  );
  waitFor(async () => {
    // Simule o clique no botão "Start Recipe"
    await userEvent.click(screen.getByTestId(strRcp));

    // Verifique se o botão "Finish Recipe" aparece
    expect(screen.getByTestId(fnsBtn)).toBeInTheDocument();

    // Simule o clique no botão "Favorite"
    await userEvent.click(screen.getByTestId(favButton));

    // Verifique se o ícone de coração preto está visível
    expect(screen.getByTestId(favButton)).toHaveAttribute('src', blackHeartIcon);

    // Simule o clique novamente no botão "Favorite"
    await userEvent.click(screen.getByTestId(favButton));

    // Verifique se o ícone de coração branco está visível
    expect(screen.getByTestId(favButton)).toHaveAttribute('src', '/images/whiteHeartIcon.svg');
  });
});
