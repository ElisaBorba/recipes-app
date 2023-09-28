import { render, fireEvent, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router';
import userEvent from '@testing-library/user-event';
import { DataProvider } from '../context/dataprovider';
import { renderWithRouter } from './utils/renderWithRouter';
import App from '../App';
import SearchBar from '../components/SearchBar';
import MealsProvider from '../context/MealsContext/MealsProvider';
import DrinksProvider from '../context/DrinksContext/DrinksProvider';

const name = 'name-search-radio';
const ingredient = 'ingredient-search-radio';
const firstLetter = 'first-letter-search-radio';
const execButton = 'exec-search-btn';

describe('Testando o searchBar', () => {
  it('Verificar as buscas de comidas', async () => {
    renderWithRouter(<DataProvider><MealsProvider><DrinksProvider><App /></DrinksProvider></MealsProvider></DataProvider>, { route: '/meals' });

    const button = screen.getByRole('img', {
      name: /ícone de procura/i,
    });
    fireEvent.click(button);
    const inputSearch: HTMLInputElement = screen.getByPlaceholderText(/search/i);
    expect(inputSearch).toBeInTheDocument();

    const searchButton = screen.getByRole('button', {
      name: /search/i,
    });

    await userEvent.type(inputSearch, 'chicken');
    await userEvent.click(searchButton);
    expect(inputSearch.value).toBe('chicken');
  });
  it('Verificando buscas', async () => {
    render(
      <MemoryRouter>
        <DataProvider>
          <MealsProvider>
            <DrinksProvider>
              <App />
            </DrinksProvider>
          </MealsProvider>
        </DataProvider>
      </MemoryRouter>,
    );

    const emailInput = screen.getByRole('textbox', {
      name: /e-mail/i,
    });
    const passwordInput = screen.getByLabelText(/senha/i);
    const loginButton = screen.getByRole('button', {
      name: /entrar/i,
    });

    await userEvent.type(emailInput, 'alguem@email.com');
    await userEvent.type(passwordInput, '1234567');
    await userEvent.click(loginButton);

    const searchButton = screen.getByRole('img', {
      name: /ícone de procura/i,
    });
    fireEvent.click(searchButton);

    const inputSearch = screen.getByRole('textbox');
    expect(inputSearch).toBeInTheDocument();

    await userEvent.type(inputSearch, 'chicken');

    const searchButton2 = screen.getByRole('button', {
      name: /search/i,
    });
    await userEvent.click(searchButton2);

    const elemento = await screen.findByTestId('3-card-img');
    expect(elemento).toBeInTheDocument();

    const elemento2 = await screen.findByTestId('3-card-name');
    expect(elemento2).toBeInTheDocument();
  });
  it('Verificando busca por nome', async () => {
    renderWithRouter(<DataProvider><MealsProvider><DrinksProvider><App /></DrinksProvider></MealsProvider></DataProvider>, { route: '/drinks' });

    const searchButton = screen.getByRole('img', {
      name: /ícone de procura/i,
    });
    fireEvent.click(searchButton);

    const nameRadio = screen.getByTestId(ingredient);
    fireEvent.click(nameRadio);
    const inputSearch = screen.getByRole('textbox');
    expect(inputSearch).toBeInTheDocument();

    await userEvent.type(inputSearch, 'gin');

    const searchButton2 = screen.getByRole('button', {
      name: /search/i,
    });
    await userEvent.click(searchButton2);

    const elemento = await screen.findByTestId('1-card-img');
    expect(elemento).toBeInTheDocument();

    const elemento2 = await screen.findByTestId('2-card-name');
    expect(elemento2).toBeInTheDocument();
  });
  it('Busca por first letter', async () => {
    renderWithRouter(<DataProvider><MealsProvider><DrinksProvider><App /></DrinksProvider></MealsProvider></DataProvider>, { route: '/meals' });

    const searchButton = screen.getByRole('img', {
      name: /ícone de procura/i,
    });
    fireEvent.click(searchButton);

    const firstLetterRadio = screen.getByTestId(firstLetter);
    fireEvent.click(firstLetterRadio);
    const inputSearch = screen.getByRole('textbox');
    expect(inputSearch).toBeInTheDocument();

    await userEvent.type(inputSearch, 'a');

    const searchButton2 = screen.getByRole('button', {
      name: /search/i,
    });
    await userEvent.click(searchButton2);

    const elemento = await screen.findByTestId('1-card-img');
    expect(elemento).toBeInTheDocument();

    const elemento2 = await screen.findByTestId('3-card-name');
    expect(elemento2).toBeInTheDocument();
  });
});
describe('Teste de first letter', () => {
  it('Verificando first letter', async () => {
    renderWithRouter(<DataProvider><MealsProvider><DrinksProvider><App /></DrinksProvider></MealsProvider></DataProvider>, { route: '/drinks' });

    const searchButton = screen.getByRole('img', {
      name: /ícone de procura/i,
    });
    fireEvent.click(searchButton);

    const firstLetterRadio = screen.getByTestId(firstLetter);
    fireEvent.click(firstLetterRadio);
    const inputSearch = screen.getByRole('textbox');
    expect(inputSearch).toBeInTheDocument();

    await userEvent.type(inputSearch, 'a');

    const searchButton2 = screen.getByRole('button', {
      name: /search/i,
    });
    await userEvent.click(searchButton2);

    const elemento = await screen.findByTestId('2-card-img');
    expect(elemento).toBeInTheDocument();

    const elemento2 = await screen.findByTestId('2-card-name');
    expect(elemento2).toBeInTheDocument();
  });
});
describe('Verifica se o componente SearchBar existe e se funciona como o esperado', () => {
  it('Busca por name', async () => {
    renderWithRouter(<DataProvider><MealsProvider><DrinksProvider><App /></DrinksProvider></MealsProvider></DataProvider>, { route: '/meals' });

    const searchButton = screen.getByRole('img', {
      name: /ícone de procura/i,
    });
    fireEvent.click(searchButton);

    const nameRadio = screen.getByTestId(name);
    fireEvent.click(nameRadio);
    const inputSearch = screen.getByRole('textbox');
    expect(inputSearch).toBeInTheDocument();

    await userEvent.type(inputSearch, 'Brown Stew Chicken');

    const searchButton2 = screen.getByRole('button', {
      name: /search/i,
    });
    await userEvent.click(searchButton2);
  });
});
describe('Verifica se o componente SearchBar existe e se funciona como o esperado', () => {
  it('Busca por ingredient', async () => {
    renderWithRouter(<DataProvider><MealsProvider><DrinksProvider><App /></DrinksProvider></MealsProvider></DataProvider>, { route: '/drinks' });

    const searchButton = screen.getByRole('img', {
      name: /ícone de procura/i,
    });
    fireEvent.click(searchButton);

    const ingredientRadio = screen.getByTestId(ingredient);
    fireEvent.click(ingredientRadio);
    const inputSearch = screen.getByRole('textbox');
    expect(inputSearch).toBeInTheDocument();

    await userEvent.type(inputSearch, 'a');

    const searchButton2 = screen.getByRole('button', {
      name: /search/i,
    });
    await userEvent.click(searchButton2);
  });
});
describe('Teste de 1 item como resposta', () => {
  it('Busca por 1 item', async () => {
    renderWithRouter(<DataProvider><MealsProvider><DrinksProvider><App /></DrinksProvider></MealsProvider></DataProvider>, { route: '/drinks' });

    const searchButton = screen.getByRole('img', {
      name: /ícone de procura/i,
    });
    fireEvent.click(searchButton);

    const nameRadio = screen.getByTestId(name);
    fireEvent.click(nameRadio);
    const inputSearch = screen.getByRole('textbox');
    expect(inputSearch).toBeInTheDocument();

    await userEvent.type(inputSearch, 'aquamarine');

    const searchButton2 = screen.getByRole('button', {
      name: /search/i,
    });
    await userEvent.click(searchButton2);
  });
});
describe('Teste de comportamento esperado', () => {
  it('Busca por algo inexistente', async () => {
    renderWithRouter(<DataProvider><MealsProvider><DrinksProvider><App /></DrinksProvider></MealsProvider></DataProvider>, { route: '/meals' });

    const searchButton = screen.getByRole('img', {
      name: /ícone de procura/i,
    });
    fireEvent.click(searchButton);

    const nameRadio = screen.getByTestId(name);
    fireEvent.click(nameRadio);
    const inputSearch = screen.getByRole('textbox');
    expect(inputSearch).toBeInTheDocument();

    await userEvent.type(inputSearch, 'a');

    const searchButton2 = screen.getByRole('button', {
      name: /search/i,
    });
    await userEvent.click(searchButton2);
  });
});
describe('Testando pesquisa com 1 letra', () => {
  it('teste first letter com mais de 1 letra', async () => {
    renderWithRouter(<DataProvider><MealsProvider><DrinksProvider><App /></DrinksProvider></MealsProvider></DataProvider>, { route: '/drinks' });

    const searchButton = screen.getByRole('img', {
      name: /ícone de procura/i,
    });
    fireEvent.click(searchButton);

    const firstLetterRadio = screen.getByTestId(firstLetter);
    fireEvent.click(firstLetterRadio);
    const inputSearch = screen.getByRole('textbox');
    expect(inputSearch).toBeInTheDocument();

    await userEvent.type(inputSearch, 'ab');

    const searchButton2 = screen.getByRole('button', {
      name: /search/i,
    });
    await userEvent.click(searchButton2);
  });
});
describe('Teste com drinks', () => {
  it('Busca por drink inexistente', async () => {
    renderWithRouter(<DataProvider><MealsProvider><DrinksProvider><App /></DrinksProvider></MealsProvider></DataProvider>, { route: '/drinks' });

    const searchButton = screen.getByRole('img', {
      name: /ícone de procura/i,
    });
    fireEvent.click(searchButton);

    const nameRadio = screen.getByTestId(ingredient);
    fireEvent.click(nameRadio);
    const inputSearch = screen.getByRole('textbox');
    expect(inputSearch).toBeInTheDocument();

    await userEvent.type(inputSearch, 'a');

    const searchButton2 = screen.getByRole('button', {
      name: /search/i,
    });
    await userEvent.click(searchButton2);
  });
});
describe('Testando radios', () => {
  it('Verifica se os radios estão funcionando', async () => {
    renderWithRouter(<DataProvider><MealsProvider><DrinksProvider><App /></DrinksProvider></MealsProvider></DataProvider>, { route: '/meals' });

    const searchButton = screen.getByRole('img', {
      name: /ícone de procura/i,
    });
    fireEvent.click(searchButton);

    const nameRadio = screen.getByTestId(name);
    fireEvent.click(nameRadio);
    const inputSearch = screen.getByRole('textbox');
    expect(inputSearch).toBeInTheDocument();

    await userEvent.type(inputSearch, 'a');

    const searchButton2 = screen.getByRole('button', {
      name: /search/i,
    });
    await userEvent.click(searchButton2);
  });
});
describe('Testando log de erros', () => {
  it('Verifica se o log de erros está funcionando', async () => {
    renderWithRouter(<DataProvider><MealsProvider><DrinksProvider><App /></DrinksProvider></MealsProvider></DataProvider>, { route: '/meals' });

    const searchButton = screen.getByRole('img', {
      name: /ícone de procura/i,
    });
    fireEvent.click(searchButton);

    const nameRadio = screen.getByTestId(name);
    fireEvent.click(nameRadio);
    const inputSearch = screen.getByRole('textbox');
    expect(inputSearch).toBeInTheDocument();

    await userEvent.type(inputSearch, 'aaaaaaaa');

    const searchButton2 = screen.getByRole('button', {
      name: /search/i,
    });
    await userEvent.click(searchButton2);
  });
});
describe('Testando window alert', () => {
  it('Testando window alert quando o resultado é null', async () => {
    renderWithRouter(<DataProvider><MealsProvider><DrinksProvider><App /></DrinksProvider></MealsProvider></DataProvider>, { route: '/meals' });

    const searchButton = screen.getByRole('img', {
      name: /ícone de procura/i,
    });
    fireEvent.click(searchButton);

    const nameRadio = screen.getByTestId(name);
    fireEvent.click(nameRadio);
    const inputSearch = screen.getByRole('textbox');
    expect(inputSearch).toBeInTheDocument();

    await userEvent.type(inputSearch, 'aaaaaaaa');

    const searchButton2 = screen.getByRole('button', {
      name: /search/i,
    });
    await userEvent.click(searchButton2);
  });
});
describe('Testando a pagina e funcionalidades', () => {
  it('Testando a pagina e funcionalidades', async () => {
    renderWithRouter(<DataProvider><MealsProvider><DrinksProvider><App /></DrinksProvider></MealsProvider></DataProvider>, { route: '/meals' });

    const searchButton = screen.getByRole('img', {
      name: /ícone de procura/i,
    });
    fireEvent.click(searchButton);

    const nameRadio = screen.getByTestId(name);
    fireEvent.click(nameRadio);
    const inputSearch = screen.getByRole('textbox');
    expect(inputSearch).toBeInTheDocument();

    await userEvent.type(inputSearch, 'a');

    const searchButton2 = screen.getByRole('button', {
      name: /search/i,
    });

    await userEvent.click(searchButton2);

    const elemento = await screen.findByTestId('6-card-img');
    expect(elemento).toBeInTheDocument();
  });
});
describe('Testando as linhas 68 e 69 do searchbar', () => {
  it('Testando as linhas 68 e 69 do searchbar', async () => {
    renderWithRouter(<DataProvider><MealsProvider><DrinksProvider><App /></DrinksProvider></MealsProvider></DataProvider>, { route: '/meals' });

    const searchButton = screen.getByRole('img', {
      name: /ícone de procura/i,
    });

    fireEvent.click(searchButton);

    const nameRadio = screen.getByTestId(name);
    fireEvent.click(nameRadio);

    const inputSearch = screen.getByRole('textbox');
    expect(inputSearch).toBeInTheDocument();

    await userEvent.type(inputSearch, 'a');

    const searchButton2 = screen.getByRole('button', {
      name: /search/i,
    });

    await userEvent.click(searchButton2);

    const elemento = await screen.findByAltText(/big mac/i);
    expect(elemento).toBeInTheDocument();
  });
});

describe('SearchBar Component', () => {
  beforeEach(() => {
    render(

      <MemoryRouter>
        <DataProvider>
          <MealsProvider>
            <DrinksProvider>
              <SearchBar title="Meals" />
            </DrinksProvider>
          </MealsProvider>
        </DataProvider>
      </MemoryRouter>,
    );
  });

  it('Renders and switches search types', () => {
    const ingredientRadio = screen.getByTestId('ingredient-search-radio');
    const nameRadio = screen.getByTestId('name-search-radio');
    const firstLetterRadio = screen.getByTestId(firstLetter);
    const button = screen.getByTestId(execButton);

    expect(ingredientRadio).toBeInTheDocument();
    expect(nameRadio).toBeInTheDocument();
    expect(firstLetterRadio).toBeInTheDocument();
    expect(ingredientRadio).toBeChecked();

    fireEvent.click(nameRadio);
    expect(nameRadio).toBeChecked();
    expect(ingredientRadio).not.toBeChecked();

    fireEvent.click(firstLetterRadio);
    expect(firstLetterRadio).toBeChecked();
    expect(nameRadio).not.toBeChecked();

    fireEvent.click(button);
  });
});
