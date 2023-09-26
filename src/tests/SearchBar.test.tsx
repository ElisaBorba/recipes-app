import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import SearchBar from '../components/SearchBar';
import { DataProvider } from '../context/dataprovider';

describe('Verifica se o componente SearchBar existe e se funciona como o esperado', () => {
  test('Renderiza o componente SearchBar e verifica a seleção de radio buttons', () => {
    render(
      <DataProvider>
        <SearchBar title="Meals" />
      </DataProvider>,
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
  });
});
