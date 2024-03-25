import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBellConcierge, faHeart } from '@fortawesome/free-solid-svg-icons';
import styles from '../styles/Icon.module.css';

function Icon() {
  return (
    <div>
      <div className={ styles.yellowBox }>
        <FontAwesomeIcon
          className={ styles.heart }
          icon={ faHeart }
          style={ { color: '#e44343', fontSize: '2.5em' } }
        />
        <FontAwesomeIcon
          icon={ faBellConcierge }
          className={ styles.icon }
          style={ { color: '#41197f', fontSize: '5em',
          } }
        />
        <div className={ styles.recipes }>
          <h1 className={ styles.title }>RECIPES</h1>
          <h2 className={ styles.subtitle }>app</h2>
        </div>
      </div>
    </div>
  );
}

export default Icon;
