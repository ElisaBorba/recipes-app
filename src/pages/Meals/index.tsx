import React from 'react';
import Header from '../../components/Header';
import Recipes from '../../components/Recipes';

export default function Meals() {
  return (
    <>
      <header>
        <Header title="Meals" isProfile isSearch />
      </header>
      <main>
        <Recipes isDrinksPage={ false } />
      </main>
    </>
  );
}
