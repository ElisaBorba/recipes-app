import { Link } from 'react-router-dom';
import drinkIcon from '../images/drinkIcon.svg';
import mealIcon from '../images/mealIcon.svg';
import './Footer.css';

export default function Footer() {
  return (
    <footer className="footer" data-testid="footer">
      <Link
        to="/drinks"
      >
        <img data-testid="drinks-bottom-btn" src={ drinkIcon } alt={ drinkIcon } />
      </Link>

      <Link
        to="/meals"
      >
        <img data-testid="meals-bottom-btn" src={ mealIcon } alt={ drinkIcon } />
      </Link>
    </footer>
  );
}
