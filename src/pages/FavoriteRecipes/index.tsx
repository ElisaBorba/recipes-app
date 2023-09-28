import React from 'react';
import Header from '../../components/Header';
import Profile from '../Profile';

export default function FavoriteRecipes() {
  return (
    <header>
      <Header title="Favorite Recipes" isProfile isSearch={ false } />
      <Profile />
    </header>
  );
}
