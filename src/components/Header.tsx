import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import ProfileIcon from '../images/profileIcon.svg';
import SearchIcon from '../images/searchIcon.svg';

type HeaderType = {
  title: string,
  isProfile: boolean,
  isSearch: boolean,
};

export default function Header({ title, isProfile, isSearch }: HeaderType) {
  const [searchBar, setSearchBar] = useState('');
  const [showSearchBar, setShowSearchBar] = useState(false);

  const handleClickSearchBar = () => {
    setShowSearchBar(true);

    if (showSearchBar === true) {
      setShowSearchBar(false);
    }
  };

  const handleSearchBar = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchBar(e.target.value);
  };

  return (
    <>
      {isProfile && (
        <NavLink to="/profile">
          <img data-testid="profile-top-btn" src={ ProfileIcon } alt="Ícone de Perfil" />
        </NavLink>
      )}

      {isSearch && (
        <button
          onClick={ handleClickSearchBar }
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
              onChange={ handleSearchBar }
              data-testid="search-input"
              placeholder="Search"
            />
          </label>
        </form>
      )}
    </>
  );
}
