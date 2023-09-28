import Header from '../../components/Header';
import Recipes from '../../components/Recipes';
import Footer from '../../components/Footer';

export default function Meals() {
  return (
    <>
      <header>
        <Header title="Meals" isProfile isSearch />
      </header>
      <main>
        <Recipes isDrinksPage={ false } />
      </main>
      <Footer />
    </>
  );
}
