import React from 'react';
import Header from '../../components/Header';
import Footer from '../../components/Footer';

export default function Meals() {
  return (
    <>
      <header>
        <Header title="Meals" isProfile isSearch />
      </header>
      <Footer />
    </>
  );
}
