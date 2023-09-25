import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import ProfileIcon from '../images/profileIcon.svg';
import SearchIcon from '../images/searchIcon.svg';
import SearchBar from './SearchBar';

type HeaderType = {
  title: string,
  isProfile: boolean,
  isSearch: boolean,
};

export default function Header({ title, isProfile, isSearch }: HeaderType) {
  const [searchBar, setSearchBar] = useState('');
  const [showSearchBar, setShowSearchBar] = useState(false);

  return (
    <div>
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
      <h1 data-testid="page-title">{title}</h1>

      {showSearchBar
      && (
        <form>
          <label htmlFor="searchBar">
            <input
              type="text"
              id="searchBar"
              value={ searchBar }
              onChange={ ({ target }) => setSearchBar(target.value) }
              data-testid="search-input"
              placeholder="Search"
            />
          </label>
          <SearchBar />
        </form>
      )}
    </div>
  );
}
