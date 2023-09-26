import React, { useState } from 'react';
import Header from '../../components/Header';
import Footer from '../../components/Footer';

export default function Profile() {
  return (
    <>
      <header>
        <Header title="Profile" isProfile isSearch={ false } />
      </header>
      <Footer />
    </>
  );
}
