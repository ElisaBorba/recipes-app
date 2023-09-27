import userEvent from '@testing-library/user-event';
import { screen } from '@testing-library/react';
import App from '../App';
import { renderWithRouter } from './utils/renderWithRouter';
import { DataProvider } from '../context/dataprovider';

describe('Verifica se os elementos de Recipe existem e se funcionam como o esperado', () => {
  it('Verifica se existe o titulo e o ícone de perfil na página Favorite Recipes', async () => {
    renderWithRouter(<DataProvider><App /></DataProvider>, { route: '/meals' });

    // expect(profileBtn).toBeInTheDocument();
  });
});
