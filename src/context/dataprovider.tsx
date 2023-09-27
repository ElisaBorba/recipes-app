import { useState } from 'react';
import DataContext from './datacontext';

type DataProviderProps = {
  children: React.ReactNode;
};

export function DataProvider({ children }: DataProviderProps) {
  const [search, setSearch] = useState('');
  const [results, setResults] = useState([]);

  const values = {
    search,
    setSearch,
    results,
    setResults,
  };

  return (
    <DataContext.Provider value={ values }>
      {children}
    </DataContext.Provider>
  );
}
