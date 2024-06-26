import { useNavigate } from 'react-router-dom';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import doneIcon from '../../images/done.png';
import heartIcon from '../../images/heart.png';
import logoutcon from '../../images/logout.png';
import styles from '../../styles/Profile.module.css';

function Profile() {
  const emailUser = localStorage.getItem('user');
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

  const emailTitle = emailUser ? emailUser.split(':')[1].trim().slice(1, -2) : '';

  return (
    <>
      <Header title="Profile" isProfile isSearch={ false } />
      <main className={ styles.container }>
        <h2
          className={ styles.email }
          data-testid="profile-email"
        >
          { emailTitle }
        </h2>
        <div className={ styles.buttons }>
          <button
            data-testid="profile-done-btn"
            onClick={ handleClickRecipes }
          >
            <img
              src={ doneIcon }
              alt="Done button"
            />
            Done Recipes
          </button>
          <hr />
          <button
            data-testid="profile-favorite-btn"
            onClick={ handleClickFavorite }
          >
            <img
              src={ heartIcon }
              alt="Favorite button"
            />
            Favorite Recipes
          </button>
          <hr />
          <button
            data-testid="profile-logout-btn"
            onClick={ handleClickLogout }
          >
            <img
              src={ logoutcon }
              alt="Logout button"
            />
            Logout
          </button>
        </div>
      </main>
      <Footer />
    </>
  );
}
export default Profile;
