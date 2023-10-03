import { Link } from 'react-router-dom';
import drinkIcon from '../images/drinkIcon.svg';
import mealIcon from '../images/mealIcon.svg';
import styles from './Footer.module.css';

export default function Footer() {
  return (
    <footer className={ styles.footer } data-testid="footer">
      <Link
        to="/drinks"
      >
        <img
          className={ styles.icons }
          data-testid="drinks-bottom-btn"
          src={ drinkIcon }
          alt={ drinkIcon }
        />
      </Link>
      <Link
        to="/meals"
      >
        <img
          className={ styles.icons }
          data-testid="meals-bottom-btn"
          src={ mealIcon }
          alt={ drinkIcon }
        />
      </Link>
    </footer>
  );
}
