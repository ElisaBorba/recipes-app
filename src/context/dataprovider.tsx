import { useState } from 'react';
import DataContext from './datacontext';

type DataProviderProps = {
  children: React.ReactNode;
};

export function DataProvider({ children }: DataProviderProps) {
  const [search, setSearch] = useState('');
  const [results, setResults] = useState([]);
  const [recipe, setRecipe] = useState({
    category: '',
    alcoholicOrNot: false,
    name: '',
    image: '',
    instructions: '' });

  const values = {
    search,
    setSearch,
    results,
    setResults,
    recipe,
    setRecipe,
  };

  return (
    <DataContext.Provider value={ values }>
      {children}
    </DataContext.Provider>
  );
}
