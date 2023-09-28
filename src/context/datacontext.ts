import { createContext } from 'react';

type DataContextType = {
  search: string;
  setSearch: (search: string) => void;
  results: never[];
  setResults: (results: []) => void;
  pageTitle: string,
  setPageTitle:(page: string) => void;
};

const DataContext = createContext<DataContextType>({} as DataContextType);

export default DataContext;
