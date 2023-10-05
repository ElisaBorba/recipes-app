import { useContext, useState } from 'react';
import { NavLink } from 'react-router-dom';
import ProfileIcon from '../images/profileIcon.svg';
import SearchIcon from '../images/searchIcon.svg';
import SearchBar from './SearchBar';
import DataContext from '../context/datacontext';
import styles from './Header.module.css';

type HeaderType = {
  title: string,
  isProfile: boolean,
  isSearch: boolean,
};

export default function Header({ title, isProfile, isSearch }: HeaderType) {
  const infoData = useContext(DataContext);
  const [showSearchBar, setShowSearchBar] = useState(false);

  return (
    <div className={ styles.header }>
      <h1
        className={ styles.title }
        data-testid="page-title"
      >
        {title}
      </h1>
      {isProfile && (
        <NavLink to="/profile">
          <img data-testid="profile-top-btn" src={ ProfileIcon } alt="Ícone de Perfil" />
        </NavLink>
      )}

      {isSearch && (
        <button
          onClick={ () => setShowSearchBar(!showSearchBar) }
        >
          <img
            data-testid="search-top-btn"
            src={ SearchIcon }
            alt="Ícone de Procura"
          />
        </button>
      )}
      {showSearchBar
      && (
        <form className={ styles.searchBar }>
          <label htmlFor="searchBar">
            <input
              className={ `${styles.radioInput} ${styles.searchBarInput}` }
              type="text"
              id="searchBar"
              value={ infoData.search }
              onChange={ ({ target }) => infoData.setSearch(target.value) }
              data-testid="search-input"
              placeholder="Search"
            />
          </label>
          <SearchBar title={ title } />
        </form>
      )}
    </div>
  );
}
