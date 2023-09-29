import { fireEvent, screen, waitFor } from '@testing-library/react';
import App from '../App';
import { renderWithRouter } from './utils/renderWithRouter';

beforeEach(() => {
  localStorage.clear();
});

const horizontalImage = '0-horizontal-image';
const data = '23/06/2020';
const nameSpicy = 'Spicy Arrabiata Penne';
const urlImage = 'https://www.themealdb.com/images/media/meals/ustsqw1468250014.jpg';
const recipesD = '/done-recipes';

test('Testa Done Recipes', async () => {
  const doneRecipes = [
    {
      id: '52771',
      type: 'meal',
      nationality: 'Italian',
      category: 'Vegetarian',
      alcoholicOrNot: '',
      name: nameSpicy,
      image: urlImage,
      doneDate: data,
      tags: ['Pasta', 'Curry'],
    },
    {
      id: '178319',
      type: 'drink',
      nationality: '',
      category: 'Cocktail',
      alcoholicOrNot: 'Alcoholic',
      name: 'Aquamarine',
      image: 'https://www.thecocktaildb.com/images/media/drink/zvsre31572902738.jpg',
      doneDate: data,
      tags: [],
    },
  ];

  localStorage.setItem('doneRecipes', JSON.stringify(doneRecipes));
  const { user } = renderWithRouter(<App />, { route: recipesD });
  await waitFor(() => { expect(screen.getByTestId(horizontalImage)).toBeInTheDocument(); }, { timeout: 3000 });
  await user.click(screen.getByTestId('0-horizontal-share-btn'));
  expect(screen.getAllByText(/link copied!/i)[0]).toBeInTheDocument();
  await user.click(screen.getByTestId('filter-by-drink-btn'));
  await user.click(screen.getByTestId('filter-by-meal-btn'));
  await user.click(screen.getByTestId('filter-by-all-btn'));
  expect(screen.getByTestId('0-horizontal-image')).toBeInTheDocument();
});

test('Testa a filtragem de receitas por tipo "meal"', async () => {
  const doneRecipes = [
    {
      id: '52771',
      type: 'meal',
      nationality: 'Italian',
      category: 'Vegetarian',
      alcoholicOrNot: '',
      name: nameSpicy,
      image: urlImage,
      doneDate: data,
      tags: ['Pasta', 'Curry'],
    },
    {
      id: '178319',
      type: 'drink',
      nationality: '',
      category: 'Cocktail',
      alcoholicOrNot: 'Alcoholic',
      name: 'Aquamarine',
      image: 'https://www.thecocktaildb.com/images/media/drink/zvsre31572902738.jpg',
      doneDate: data,
      tags: [],
    },
  ];

  localStorage.setItem('doneRecipes', JSON.stringify(doneRecipes));
  renderWithRouter(<App />, { route: recipesD });

  const filterByMealButton = screen.getByTestId('filter-by-meal-btn');
  fireEvent.click(filterByMealButton);
});

test('Testa a exibição de tags nas receitas', async () => {
  const doneRecipes = [
    {
      id: '52771',
      type: 'meal',
      nationality: 'Italian',
      category: 'Vegetarian',
      alcoholicOrNot: '',
      name: nameSpicy,
      image: urlImage,
      doneDate: data,
      tags: ['Pasta', 'Curry'],
    },
  ];

  localStorage.setItem('doneRecipes', JSON.stringify(doneRecipes));
  renderWithRouter(<App />, { route: recipesD });
});
