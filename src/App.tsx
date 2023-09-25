import React from 'react';
import './App.css';
import { Route, Routes } from 'react-router-dom';
import Login from './components/Login';
import Home from './pages/Home';
import Meals from './pages/Meals';
import Drinks from './pages/Drinks';
import Profile from './pages/Profile';
import DoneRecipes from './pages/DoneRecipes';
import FavoriteRecipes from './pages/FavoriteRecipes';
import DrinksProgress from './pages/DrinksProgress';
import DrinksReceita from './pages/DrinksReceita';
import MealsProgress from './pages/MealsProgress';
import MealsReceita from './pages/MealsReceita';

function App() {
  return (
    <Routes>
      <Route path="/" element={ <Home /> } />
      <Route path="/login" element={ <Login /> } />
      <Route path="/meals" element={ <Meals /> } />
      <Route path="/drinks" element={ <Drinks /> } />
      <Route path="/meals/:id-da-receita" element={ <MealsReceita /> } />
      <Route path="/drinks/:id-da-receita" element={ <DrinksReceita /> } />
      <Route path="/meals/:id-da-receita/in-progress" element={ <MealsProgress /> } />
      <Route path="/drinks/:id-da-receita/in-progress" element={ <DrinksProgress /> } />
      <Route path="/profile" element={ <Profile /> } />
      <Route path="/done-recipes" element={ <DoneRecipes /> } />
      <Route path="/favorite-recipes" element={ <FavoriteRecipes /> } />
    </Routes>
  );
}

export default App;
