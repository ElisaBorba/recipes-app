import userEvent from '@testing-library/user-event';
import { screen, waitFor } from '@testing-library/react';
import App from '../App';
import { renderWithRouter } from './utils/renderWithRouter';
import { DataProvider } from '../context/dataprovider';
import MealsProvider from '../context/MealsContext/MealsProvider';
import DrinksProvider from '../context/DrinksContext/DrinksProvider';

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
  it('Botões de categoria de Meals, funcionam como um toggle ativa/desativa', async () => {
    renderWithRouter(<DataProvider><MealsProvider><DrinksProvider><App /></DrinksProvider></MealsProvider></DataProvider>, { route: '/meals' });

    await waitFor(() => {
      const btnBreakfast = screen.getByRole('button', { name: /breakfast/i });
      userEvent.click(btnBreakfast);
    });

    await waitFor(() => {
      const firstTitle = screen.getByText(/bread omelette/i);
      expect(firstTitle).toBeInTheDocument();
    });

    const btnBreakfast = screen.getByRole('button', { name: /breakfast/i });
    await userEvent.click(btnBreakfast);

    const secondTitle = screen.queryByText(/sushi/i);
    expect(secondTitle).toBeInTheDocument();

    const breadTitle = screen.queryByText(/bread omelette/i);
    expect(breadTitle).not.toBeInTheDocument();
  });

  it('Botões de categoria de Drinks, funcionam como um toggle ativa/desativa', async () => {
    renderWithRouter(<DataProvider><MealsProvider><DrinksProvider><App /></DrinksProvider></MealsProvider></DataProvider>, { route: '/drinks' });

    await waitFor(() => {
      const btnOrdinary = screen.getByRole('button', { name: /ordinary drink/i });
      userEvent.click(btnOrdinary);
    });

    await waitFor(() => {
      const firstTitle = screen.getByText(/410 gone/i);
      expect(firstTitle).toBeInTheDocument();
    });

    const btnOrdinary = screen.getByRole('button', { name: /ordinary drink/i });

    await userEvent.click(btnOrdinary);

    const secondTitle = screen.getByText(/a1/i);
    expect(secondTitle).toBeInTheDocument();

    const drinkOrdinaryTitle = screen.queryByText(/410 gone/i);
    expect(drinkOrdinaryTitle).not.toBeInTheDocument();
  });
});
