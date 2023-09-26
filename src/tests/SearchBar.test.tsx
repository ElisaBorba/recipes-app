import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router';
import userEvent from '@testing-library/user-event';
import SearchBar from '../components/SearchBar';
import { DataProvider } from '../context/dataprovider';
import { renderWithRouter } from './utils/renderWithRouter';
import App from '../App';

describe('Verifica se o componente SearchBar existe e se funciona como o esperado', () => {
  test('Renderiza o componente SearchBar e verifica a seleção de radio buttons', () => {
    render(
      <MemoryRouter>
        <DataProvider>
          <SearchBar title="Meals" />
        </DataProvider>
      </MemoryRouter>,
    );

    // Verifica se os elementos de radio estão renderizados e inicia com "Ingredient" selecionado.
    const ingredientRadio = screen.getByTestId('ingredient-search-radio');
    const nameRadio = screen.getByTestId('name-search-radio');
    const firstLetterRadio = screen.getByTestId('first-letter-search-radio');
    const button = screen.getByTestId('exec-search-btn');

    expect(ingredientRadio).toBeInTheDocument();
    expect(nameRadio).toBeInTheDocument();
    expect(firstLetterRadio).toBeInTheDocument();
    expect(ingredientRadio).toBeChecked();

    // Clique nos radio buttons para alternar a seleção.
    fireEvent.click(nameRadio);
    expect(nameRadio).toBeChecked();
    expect(ingredientRadio).not.toBeChecked();

    fireEvent.click(firstLetterRadio);
    expect(firstLetterRadio).toBeChecked();
    expect(nameRadio).not.toBeChecked();

    fireEvent.click(button);
    expect(firstLetterRadio).toBeChecked();

    fireEvent.click(ingredientRadio);
    expect(ingredientRadio).toBeChecked();
    expect(firstLetterRadio).not.toBeChecked();

    fireEvent.click(button);
    expect(ingredientRadio).toBeChecked();

    fireEvent.click(nameRadio);
    expect(nameRadio).toBeChecked();
    expect(ingredientRadio).not.toBeChecked();

    fireEvent.click(button);
    expect(nameRadio).toBeChecked();

    fireEvent.click(firstLetterRadio);
    expect(firstLetterRadio).toBeChecked();
    expect(nameRadio).not.toBeChecked();

    fireEvent.click(button);
    expect(firstLetterRadio).toBeChecked();

    // Verifica se o botão de execução de busca está renderizado.
    expect(button).toBeInTheDocument();
  });
  it('Verificar as buscas de drinks', async () => {
    renderWithRouter(<DataProvider><App /></DataProvider>, { route: '/drinks' });
    const button = screen.getByRole('img', {
      name: /ícone de procura/i,
    });
    fireEvent.click(button);
    const inputSearch: HTMLInputElement = screen.getByPlaceholderText(/search/i);
    expect(inputSearch).toBeInTheDocument();

    const searchButton = screen.getByRole('button', {
      name: /search/i,
    });

    await userEvent.type(inputSearch, 'gin');
    await userEvent.click(searchButton);
  });
});
