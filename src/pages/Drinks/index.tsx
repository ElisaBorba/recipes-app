import React from 'react';
import Header from '../../components/Header';
import Recipes from '../../components/Recipes';

export default function Drinks() {
  return (
    <>
      <header>
        <Header title="Drinks" isProfile isSearch />
      </header>
      <main>
        <Recipes isDrinksPage />
      </main>
    </>
  );
}
