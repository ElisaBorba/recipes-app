import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import Login from '../components/Login';

const validEmail = 'valid@example.com';
const emailEnter = 'email-input';
const passwordEnter = 'password-input';
const btnEnter = 'login-submit-btn';

test('renderiza o formulário de login', () => {
  const { getByText, getByTestId } = render(
    <MemoryRouter>
      <Login />
    </MemoryRouter>,
  );
  const heading = getByText('LOGIN');
  const emailInput = getByTestId(emailEnter);
  const passwordInput = getByTestId(passwordEnter);
  const submitButton = getByTestId(btnEnter);

  expect(heading).toBeInTheDocument();
  expect(emailInput).toBeInTheDocument();
  expect(passwordInput).toBeInTheDocument();
  expect(submitButton).toBeInTheDocument();
});

test('valida o email e a senha', () => {
  const { getByTestId } = render(
    <MemoryRouter>
      <Login />
    </MemoryRouter>,
  );
  const emailInput = getByTestId(emailEnter);
  const passwordInput = getByTestId(passwordEnter);

  fireEvent.change(emailInput, { target: { value: 'invalidemail' } });
  fireEvent.change(passwordInput, { target: { value: 'short' } });

  const submitButton = getByTestId(btnEnter);

  expect(submitButton).toBeDisabled();
});

test('habilita o botão de envio quando o email e a senha são válidos', () => {
  const { getByTestId } = render(
    <MemoryRouter>
      <Login />
    </MemoryRouter>,
  );
  const emailInput = getByTestId(emailEnter);
  const passwordInput = getByTestId(passwordEnter);

  fireEvent.change(emailInput, { target: { value: validEmail } });
  fireEvent.change(passwordInput, { target: { value: 'validpassword' } });

  const submitButton = getByTestId(btnEnter);

  expect(submitButton).not.toBeDisabled();
});

test('envia o formulário com dados válidos', async () => {
  const { getByTestId } = render(
    <MemoryRouter>
      <Login />
    </MemoryRouter>,
  );
  const emailInput = getByTestId(emailEnter);
  const passwordInput = getByTestId(passwordEnter);
  const submitButton = getByTestId(btnEnter);

  fireEvent.change(emailInput, { target: { value: validEmail } });
  fireEvent.change(passwordInput, { target: { value: 'validpassword' } });

  fireEvent.click(submitButton);

  await waitFor(() => {

  });
});
