import React from 'react';
import ProfileIcon from '../images/profileIcon.svg';
import SearchIcon from '../images/searchIcon.svg';

type HeaderType = {
  title: string,
  isProfile: boolean,
  isSearch: boolean,
};

export default function Header({ title, isProfile, isSearch }: HeaderType) {
  return (
    <>
      {isProfile && (
        <img
          data-testid="profile-top-btn"
          src={ ProfileIcon }
          alt="Ícone de Perfil"
        />
      )}
      {isSearch && (
        <img
          data-testid="search-top-btn"
          src={ SearchIcon }
          alt="ícone de Procura"
        />
      )}
      <h1 data-testid="page-title">{title}</h1>
    </>
  );
}
