import drinkIcon from '../images/drinkIcon.svg';
import mealIcon from '../images/mealIcon.svg';
import './Footer.css';

export default function Footer() {
  return (
    <footer className="footer" data-testid="footer">

      <img data-testid="drinks-bottom-btn" src={ drinkIcon } alt="" />

      <img data-testid="meals-bottom-btn" src={ mealIcon } alt="" />

    </footer>
  );
}
