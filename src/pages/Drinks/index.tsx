import Header from '../../components/Header';
import Recipes from '../../components/Recipes';
import Footer from '../../components/Footer';

export default function Drinks() {
  return (
    <>
      <header>
        <Header title="Drinks" isProfile isSearch />
      </header>
      <main>
        <Recipes isDrinksPage />
      </main>
      <Footer />
    </>
  );
}
