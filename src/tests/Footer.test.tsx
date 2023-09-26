import React from 'react';
import { render } from '@testing-library/react';
// import Meals from '../pages/Meals';
import Footer from '../components/Footer';

test('Se tem dois icones em footer', () => {
  const { getByTestId } = render(<Footer />);
  const primeiroIcone = getByTestId('drinks-bottom-btn');
  const segundoIcone = getByTestId('meals-bottom-btn');
  expect(primeiroIcone).toBeInTheDocument();
  expect(segundoIcone).toBeInTheDocument();
});
