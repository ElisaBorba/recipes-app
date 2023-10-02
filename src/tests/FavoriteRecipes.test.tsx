import { screen, waitFor } from '@testing-library/react';
import App from '../App';
import { renderWithRouter } from './utils/renderWithRouter';

beforeEach(() => {
  localStorage.clear();
});

const horizontalImage = '0-horizontal-image';

test('Testa Favorite Recipes', async () => {
  const favoriteRecipes = [
    { id: '52771',
      type: 'meal',
      nationality: 'Italian',
      category: 'Vegetarian',
      alcoholicOrNot: '',
      name: 'Spicy Arrabiata Penne',
      image: 'https://www.themealdb.com/images/media/meals/ustsqw1468250014.jpg',

    },
    {
      id: '178319',
      type: 'drink',
      nationality: '',
      category: 'Cocktail',
      alcoholicOrNot: 'Alcoholic',
      name: 'Aquamarine',
      image: 'https://www.thecocktaildb.com/images/media/drink/zvsre31572902738.jpg',
    },
  ];

  localStorage.setItem('favoriteRecipes', JSON.stringify(favoriteRecipes));
  const { user } = renderWithRouter(<App />, { route: '/favorite-recipes' });
  await waitFor(() => { expect(screen.getByTestId('0-horizontal-image')).toBeInTheDocument(); }, { timeout: 3000 });
  await user.click(screen.getByTestId('0-horizontal-share-btn'));
  expect(screen.getAllByText(/link copied!/i)[0]).toBeInTheDocument();
  await user.click(screen.getByTestId('filter-by-drink-btn'));
  await user.click(screen.getByTestId('filter-by-meal-btn'));
  await user.click(screen.getByTestId('filter-by-all-btn'));
  expect(screen.getByTestId(horizontalImage)).toBeInTheDocument();
});
