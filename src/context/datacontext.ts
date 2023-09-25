import { createContext } from 'react';

type DataContextType = {
  search: string;
  setSearch: (search: string) => void;
  results: never[];
  setResults: (results: []) => void;
};

const DataContext = createContext<DataContextType>({} as DataContextType);

export default DataContext;
