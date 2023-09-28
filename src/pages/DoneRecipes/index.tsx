import React from 'react';
import Header from '../../components/Header';
import Profile from '../Profile';

export default function DoneRecipes() {
  return (
    <header>
      <Header title="Done Recipes" isProfile isSearch={ false } />
      <Profile />
    </header>
  );
}
// inciando aqui
