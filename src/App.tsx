import React from 'react';
import './App.css';
import AllRoutes from './routes/AllRoutes';
import MealsProvider from './context/MealsContext/MealsProvider';
import DrinksProvider from './context/DrinksContext/DrinksProvider';

function App() {
  return (
    <MealsProvider>
      <DrinksProvider>
        <AllRoutes />
      </DrinksProvider>
    </MealsProvider>
  );
}

export default App;
