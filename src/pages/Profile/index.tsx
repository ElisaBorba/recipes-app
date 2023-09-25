import React from 'react';
import Header from '../../components/Header';
import Footer from '../../components/Footer';

export default function Profile() {
  const [ loading, setLoadin] = useState<boolean>(true)
  return (
    <>
      <header>
        <Header title="Profile" isProfile isSearch={ false } />
      </header>
      <Footer />
    </>
  );
}
