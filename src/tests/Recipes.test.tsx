import userEvent from '@testing-library/user-event';
import { screen, waitFor } from '@testing-library/react';
import { vi } from 'vitest';
import App from '../App';
import { renderWithRouter } from './utils/renderWithRouter';
import { DataProvider } from '../context/dataprovider';
import MealsProvider from '../context/MealsContext/MealsProvider';
import DrinksProvider from '../context/DrinksContext/DrinksProvider';
import { mockDrinks } from './utils/mockRecipe';

describe('Verifica se os elementos de Recipe existem e se funcionam como o esperado', () => {
  it('Botões de categoria filtram corretamente pelo seu nome', async () => {
    renderWithRouter(<DataProvider><MealsProvider><DrinksProvider><App /></DrinksProvider></MealsProvider></DataProvider>, { route: '/meals' });

    await waitFor(() => {
      const btnBeef = screen.getByRole('button', { name: /beef/i });
      expect(btnBeef).toBeInTheDocument();
    });

    const btnBeef = screen.getByRole('button', { name: /beef/i });
    userEvent.click(btnBeef);

    await waitFor(() => {
      const firstTitle = screen.getByText(/beef and mustard pie/i);
      expect(firstTitle).toBeInTheDocument();

      const firstCard = screen.getByRole('img', { name: /beef and mustard pie/i });
      expect(firstCard).toBeInTheDocument();

      const notInScreenLink = screen.queryByRole('link', { name: /corba/i });
      expect(notInScreenLink).not.toBeInTheDocument();
    });
  });

  it('Botões de categoria funcionam conforme a categoria', async () => {
    renderWithRouter(<DataProvider><MealsProvider><DrinksProvider><App /></DrinksProvider></MealsProvider></DataProvider>, { route: '/drinks' });

    const btnAll = screen.getByRole('button', { name: /all/i });
    expect(btnAll).toBeInTheDocument();

    await waitFor(() => {
      const btnCocktail = screen.getByRole('button', { name: /cocktail/i });
      expect(btnCocktail).toBeInTheDocument();
    });

    const btnCocktail = screen.getByRole('button', { name: /cocktail/i });
    userEvent.click(btnCocktail);

    await waitFor(() => {
      const firstTitle = screen.getByText(/155 belmont/i);
      expect(firstTitle).toBeInTheDocument();

      const firstCard = screen.getByRole('img', { name: /155 belmont/i });
      expect(firstCard).toBeInTheDocument();

      const notInScreenLink = screen.queryByRole('link', { name: /gg/i });
      expect(notInScreenLink).not.toBeInTheDocument();
    });

    await userEvent.click(btnAll);
    const firstAfterBtnAllClick = screen.queryByRole('link', { name: /gg/i });

    expect(firstAfterBtnAllClick).toBeInTheDocument();

    const cardNotInScreen = screen.queryByRole('img', { name: /155 belmont/i });
    expect(cardNotInScreen).not.toBeInTheDocument();
  });

  it('Ao utilizar a barra de procura, renderiza somente o que foi pesquisado', async () => {
    renderWithRouter(<DataProvider><MealsProvider><DrinksProvider><App /></DrinksProvider></MealsProvider></DataProvider>, { route: '/drinks' });

    await waitFor(() => {
      const cocoaBtn = screen.getByRole('button', { name: /cocoa/i });
      expect(cocoaBtn).toBeInTheDocument();
    });

    const cocoaBtn = screen.getByRole('button', { name: /cocoa/i });
    userEvent.click(cocoaBtn);

    await waitFor(() => {
      const firstCard = screen.getByRole('img', { name: /castillian hot chocolate/i });
      expect(firstCard).toBeInTheDocument();
    });

    const iconSearch = screen.getByRole('img', { name: /ícone de procura/i });
    await userEvent.click(iconSearch);
    const inputSearch = screen.queryByRole('textbox');
    expect(inputSearch).toBeInTheDocument();

    if (inputSearch) {
      await userEvent.type(inputSearch, 'lemon');
      const btnSearch = screen.getByRole('button', { name: /search/i });
      await userEvent.click(btnSearch);
    }

    await waitFor(() => {
      const firstCard = screen.getByRole('img', { name: /a true amaretto sour/i });
      expect(firstCard).toBeInTheDocument();
    });
  });

  // it('A categoria selecionada corresponde à categoria clicada', async () => {
  //   renderWithRouter(<DataProvider><MealsProvider><DrinksProvider><App /></DrinksProvider></MealsProvider></DataProvider>, { route: '/drinks' });

  //   await waitFor(() => {
  //     const btnShake = screen.getByRole('button', { name: /shake/i });
  //     expect(btnShake).toBeInTheDocument();
  //   });

  //   const btnShake = screen.getByRole('button', { name: /shake/i });
  //   userEvent.click(btnShake);

  //   await waitFor(() => {
  //     const firstCard = screen.getByRole('img', { name: /151 florida bushwacker/i });

  //     expect(firstCard.getAttribute('src')).toBe('https://www.thecocktaildb.com/images/media/drink/rvwrvv1468877323.jpg');
  //     expect(firstCard.getAttribute('alt')).toBe('151 Florida Bushwacker');
  //   });
  // });
});

// describe('Verifica se os elementos de Recipe existem e se funcionam como o esperado', () => {
//   it('Endpoint', async () => {
//     renderWithRouter(<DataProvider><MealsProvider><DrinksProvider><App /></DrinksProvider></MealsProvider></DataProvider>, { route: '/drinks' });

//      const URL_API = 'https://www.thecocktaildb.com/api/json/v1/1/search.php?s=';
//     expect(fetch).toBeCalledWith(URL_API);
//   });
// });
