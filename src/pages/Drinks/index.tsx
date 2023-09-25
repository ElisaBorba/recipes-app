import React from 'react';
import Header from '../../components/Header';
import Footer from '../../components/Footer';

export default function Drinks() {
  return (
    <>
      <header>
        <Header title="Drinks" isProfile isSearch />
      </header>
      <Footer />
    </>
  );
}
