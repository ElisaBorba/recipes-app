import { useState } from 'react';
import DataContext from './datacontext';

type DataProviderProps = {
  children: React.ReactNode;
};

export function DataProvider({ children }: DataProviderProps) {
  const [search, setSearch] = useState('');
  const [results, setResults] = useState([]);
  const [pageTitle, setPageTitle] = useState('');
  const [recipe, setRecipe] = useState(null);

  const values = {
    search,
    setSearch,
    results,
    setResults,
    pageTitle,
    setPageTitle,
    recipe,
    setRecipe,
  };

  return (
    <DataContext.Provider value={ values }>
      {children}
    </DataContext.Provider>
  );
}
