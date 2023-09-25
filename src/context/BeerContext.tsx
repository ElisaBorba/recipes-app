import { createContext } from 'react';
import { UserContextType } from '../@type/ContextType';

const bebidas = createContext<UserContextType>({} as UserContextType);

export default bebidas;
