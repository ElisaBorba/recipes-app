import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import DrinksProvider from './context/DrinksContext/DrinksProvider';
import MealsProvider from './context/MealsContext/MealsProvider';

ReactDOM
  .createRoot(document.getElementById('root') as HTMLElement)
  .render(
    <BrowserRouter>
      <MealsProvider>
        <DrinksProvider>
          <App />
        </DrinksProvider>
      </MealsProvider>
    </BrowserRouter>,
  );
