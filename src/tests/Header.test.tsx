import userEvent from '@testing-library/user-event';
import { screen } from '@testing-library/react';
import App from '../App';
import { renderWithRouter } from './utils/renderWithRouter';
import { DataProvider } from '../context/dataprovider';

const SEARCH_ICON = 'search-top-btn';

describe('Verifica se os elementos de Header existem e se funcionam como o esperado', () => {
  it('O ícone de perfil é um botão que redireciona para perfil', async () => {
    renderWithRouter(<DataProvider><App /></DataProvider>, { route: '/meals' });

    const mealsTitle = screen.getByRole('heading', {
      name: /meals/i,
    });

    expect(mealsTitle).toBeInTheDocument();
    expect(mealsTitle).toHaveTextContent('Meals');

    const profileBtn = screen.getByRole('img', { name: /ícone de perfil/i });
    expect(profileBtn).toBeInTheDocument();
    expect(profileBtn.getAttribute('src')).toBe('/src/images/profileIcon.svg');

    await userEvent.click(profileBtn);
    expect(window.location.pathname).toBe('/profile');

    const profileTitle = screen.getByRole('heading', { name: /profile/i });
    expect(profileTitle).toBeInTheDocument();
  });

  it('Na página Drinks, o ícone de perfil é um botão que redireciona para perfil', async () => {
    renderWithRouter(<DataProvider><App /></DataProvider>, { route: '/drinks' });

    const drinksTitle = screen.getByRole('heading', {
      name: /drinks/i,
    });

    expect(drinksTitle).toBeInTheDocument();
    expect(drinksTitle).toHaveTextContent('Drinks');

    const profileBtn = screen.getByRole('img', { name: /ícone de perfil/i });
    expect(profileBtn).toBeInTheDocument();
  });

  it('Botão Search existe em Header e ao clicá-lo é mostrado o input de pesquisa.', async () => {
    renderWithRouter(<DataProvider><App /></DataProvider>, { route: '/meals' });

    const searchBtn = screen.getByRole('img', { name: /ícone de procura/i });
    expect(searchBtn).toBeInTheDocument();

    await userEvent.click(searchBtn);

    const inputSearch: HTMLInputElement = screen.getByPlaceholderText(/search/i);
    expect(inputSearch).toBeInTheDocument();

    expect(inputSearch.value).toBe('');
    await userEvent.type(inputSearch, 'Teste');
    expect(inputSearch.value).toBe('Teste');
  });

  it('O ícone de perfil deve aparecer na página Done Recipes, mas não o ícone de procura', async () => {
    renderWithRouter(<DataProvider><App /></DataProvider>, { route: '/done-recipes' });

    const profileBtn = screen.getByRole('img', { name: /ícone de perfil/i });
    const searchBtn = screen.queryByTestId(SEARCH_ICON);

    const doneRecipesTitle = screen.getByRole('heading', { name: /done recipes/i });

    expect(profileBtn).toBeInTheDocument();
    expect(doneRecipesTitle).toBeInTheDocument();
    expect(searchBtn).not.toBeInTheDocument();
  });

  it('O ícone de perfil e o ícone de procura não devem aparecer na página Drinks in Progress, somente seu título', async () => {
    renderWithRouter(<DataProvider><App /></DataProvider>, { route: '/drinks/:id-da-receita/in-progress' });

    const profileBtn = screen.queryByTestId('profile-top-btn');
    const searchBtn = screen.queryByTestId(SEARCH_ICON);

    expect(profileBtn).not.toBeInTheDocument();
    expect(searchBtn).not.toBeInTheDocument();
  });

  it('Verifica se existe o titulo e o ícone de perfil na página Favorite Recipes', async () => {
    renderWithRouter(<DataProvider><App /></DataProvider>, { route: '/favorite-recipes' });

    const favoriteRecipesTitle = screen.getByRole('heading', { name: /favorite recipes/i });

    expect(favoriteRecipesTitle).toBeInTheDocument();
    expect(favoriteRecipesTitle).toHaveTextContent('Favorite Recipes');

    const profileBtn = screen.getByRole('img', { name: /ícone de perfil/i });
    expect(profileBtn).toBeInTheDocument();
  });
});
