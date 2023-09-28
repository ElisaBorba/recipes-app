import { screen } from '@testing-library/dom';
import userEvent from '@testing-library/user-event';
import Profile from '../pages/Profile';
import { renderWithRouter } from './utils/renderWithRouter';
import DoneRecipies from '../pages/DoneRecipes/index';
import FavoriteRecipies from '../pages/FavoriteRecipes/index';
import Login from '../components/Login';

test('testes da pagina de Profile', async () => {
  renderWithRouter(<Profile />);

  const h2 = screen.getByTestId('profile-email');
  const buttonDone = screen.getByTestId('profile-done-btn');
  const buttonFavorite = screen.getByTestId('profile-favorite-btn');
  const buttonLogout = screen.getByTestId('profile-logout-btn');

  expect(h2).toBeInTheDocument();
  expect(buttonDone).toBeInTheDocument();
  expect(buttonFavorite).toBeInTheDocument();
  expect(buttonLogout).toBeInTheDocument();

  await userEvent.click(buttonDone);
  renderWithRouter(<DoneRecipies />);

  await userEvent.click(buttonFavorite);
  renderWithRouter(<FavoriteRecipies />);

  await userEvent.click(buttonLogout);
  renderWithRouter(<Login />);
});
