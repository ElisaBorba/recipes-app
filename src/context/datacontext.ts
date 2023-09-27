import { createContext } from 'react';

type DataContextType = {
  search: string;
  setSearch: (search: string) => void;
  results: never[];
  setResults: (results: []) => void;
  recipe: {
    category: string;
    alcoholicOrNot: boolean;
    name: string;
    image: string;
    instructions: string; }
  setRecipe: (recipe: {
    category: string;
    alcoholicOrNot: boolean;
    name: string;
    image: string;
    instructions: string;
  }) => void;
};

const DataContext = createContext<DataContextType>({} as DataContextType);

export default DataContext;
