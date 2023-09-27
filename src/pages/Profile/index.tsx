import { useNavigate } from 'react-router-dom';
import Header from '../../components/Header';

function Profile() {
  const emailUser = localStorage.getItem('user');
  console.log(emailUser);

  const navigate = useNavigate();
  const handleClickRecipes = () => {
    navigate('/done-recipes');
  };

  const handleClickFavorite = () => {
    navigate('/favorite-recipes');
  };

  const handleClickLogout = () => {
    localStorage.clear();
    navigate('/');
  };
  //testando

  return (
    <>
      <Header title="Profile" isProfile={ false } isSearch={ false } />
      <h2 data-testid="profile-email">{ emailUser }</h2>
      <button
        data-testid="profile-done-btn"
        onClick={ handleClickRecipes }
      >
        Done Recipes
      </button>
      <button
        data-testid="profile-favorite-btn"
        onClick={ handleClickFavorite }
      >
        Favorite Recipes
      </button>
      <button
        data-testid="profile-logout-btn"
        onClick={ handleClickLogout }
      >
        Logout
      </button>
    </>
  );
}
export default Profile;
