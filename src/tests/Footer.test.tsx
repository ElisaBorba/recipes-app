import userEvent from '@testing-library/user-event';
import { screen } from '@testing-library/react';
import App from '../App';
import { renderWithRouter } from './utils/renderWithRouter';
import { DataProvider } from '../context/dataprovider';

describe('Verifica as funcionalidades do componente Footer', () => {
  it('Se tem dois ícones em footer', () => {
    renderWithRouter(<DataProvider><App /></DataProvider>, { route: '/meals' });

    const drinkIcon = screen.getByTestId('drinks-bottom-btn');
    const mealIcon = screen.getByTestId('meals-bottom-btn');
    expect(drinkIcon).toBeInTheDocument();
    expect(mealIcon).toBeInTheDocument();
  });

  it('Se os ícones redirecionam para a página correta', async () => {
    renderWithRouter(<DataProvider><App /></DataProvider>, { route: '/meals' });

    const drinkIcon = screen.getByTestId('drinks-bottom-btn');
    await userEvent.click(drinkIcon);
    expect(window.location.pathname).toBe('/drinks');
  });

  it('Se os ícones redirecionam para a página correta', async () => {
    renderWithRouter(<DataProvider><App /></DataProvider>, { route: '/drinks' });

    const mealIcon = screen.getByTestId('meals-bottom-btn');
    await userEvent.click(mealIcon);
    expect(window.location.pathname).toBe('/meals');
  });
});
