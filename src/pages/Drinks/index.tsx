import { useContext } from 'react';
import Header from '../../components/Header';
import Recipes from '../../components/Recipes';
import DrinksContext from '../../context/DrinksContext/DrinksContext';
import Footer from '../../components/Footer';

export default function Drinks() {
  const { drinksCategories } = useContext(DrinksContext);
  return (
    <>
      <header>
        <Header title="Drinks" isProfile isSearch />
      </header>
      <main>
        {drinksCategories && (
          <div>
            {drinksCategories.map(({ strCategory }, index) => (
              <button
                key={ index }
                data-testid={ `${strCategory}-category-filter` }
              >
                {strCategory}
              </button>
            ))}
          </div>
        )}
        <Recipes isDrinksPage />
      </main>
      <Footer />
    </>
  );
}
