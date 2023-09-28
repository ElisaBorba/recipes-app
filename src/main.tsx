import ReactDOM from 'react-dom/client';
import './index.css';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import DrinksProvider from './context/DrinksContext/DrinksProvider';
import MealsProvider from './context/MealsContext/MealsProvider';
import { DataProvider } from './context/dataprovider';

ReactDOM
  .createRoot(document.getElementById('root') as HTMLElement)
  .render(
    <BrowserRouter>
      <DataProvider>
        <MealsProvider>
          <DrinksProvider>
            <App />
          </DrinksProvider>
        </MealsProvider>
      </DataProvider>
    </BrowserRouter>,
  );
